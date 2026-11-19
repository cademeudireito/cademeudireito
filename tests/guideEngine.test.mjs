import test from 'node:test';
import assert from 'node:assert/strict';
import { load } from './data.mjs';
import { getStart, answer, validateGuide, enumeratePaths, maxQuestionsFrom } from '../src/services/guideEngine.js';

const { guides, articles } = load();
const byId = new Map(articles.map((a) => [a.id, a]));

test('há três guias iniciais', () => assert.equal(guides.length, 3));

for (const g of guides) {
  test(`${g.id}: estrutura válida`, () => assert.deepEqual(validateGuide(g, byId), []));
  test(`${g.id}: todos os caminhos chegam a um resultado existente`, () => {
    const paths = enumeratePaths(g);
    assert.ok(paths.length > 1);
    for (const { trail, resultId } of paths) {
      assert.ok(g.results[resultId], `resultado ${resultId}`);
      let step = getStart(g);
      for (const [qid, i] of trail) {
        assert.equal(step.type, 'question');
        assert.equal(step.node.id, qid);
        step = answer(g, qid, i);
      }
      assert.equal(step.type, 'result');
      assert.equal(step.node.id, resultId);
    }
  });
  test(`${g.id}: progresso máximo coerente`, () => assert.ok(maxQuestionsFrom(g, g.startQuestion) >= 2));
}

test('opção inválida e pergunta inexistente lançam erro', () => {
  assert.throws(() => answer(guides[0], 'q1', 99));
  assert.throws(() => answer(guides[0], 'nope', 0));
});

test('validador detecta referência quebrada, órfão e ciclo', () => {
  const bad = {
    id: 'X', startQuestion: 'a',
    questions: {
      a: { id: 'a', text: 'A', options: [{ label: '1', next: 'b' }, { label: '2', next: 'zzz' }] },
      b: { id: 'b', text: 'B', options: [{ label: '1', next: 'a' }, { label: '2', next: 'a' }] },
      o: { id: 'o', text: 'O', options: [{ label: '1', next: 'r' }, { label: '2', next: 'r' }] },
    },
    results: { r: { id: 'r', title: 't', indicates: 'i', articleId: 'CON-001' } },
  };
  const errs = validateGuide(bad, byId).join('\n');
  assert.match(errs, /inexistente/);
  assert.match(errs, /órfão/);
  assert.match(errs, /ciclo/);
  assert.match(errs, /não leva a nenhum resultado/);
});
