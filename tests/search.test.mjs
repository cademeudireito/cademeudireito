import test from 'node:test';
import assert from 'node:assert/strict';
import { load } from './data.mjs';
import { buildIndex, search } from '../src/services/search.js';
import { normalize } from '../src/services/text.js';

const { articles, categories } = load();
const idx = buildIndex(articles, categories);

test('normaliza acentos e caixa', () => assert.equal(normalize('  Férias, Não!  '), 'ferias nao'));
test('busca por título', () => assert.equal(search(idx, 'salário atrasado')[0].article.id, 'TRA-001'));
test('busca sem acento', () => assert.equal(search(idx, 'salario atrasado')[0].article.id, 'TRA-001'));
test('busca por palavra-chave/sinônimo', () => assert.equal(search(idx, 'nome sujo')[0].article.id, 'CON-009'));
test('busca por frase natural', () => assert.ok(search(idx, 'Quero cancelar uma compra').some((r) => r.article.id === 'CON-001')));
test('sem resultados', () => assert.deepEqual(search(idx, 'xyzabc'), []));
test('busca vazia', () => assert.deepEqual(search(idx, '   '), []));
test('restrita à categoria', () => {
  const r = search(idx, 'cobrança', { category: 'consumidor' });
  assert.ok(r.length && r.every((x) => x.article.category === 'consumidor'));
});
test('ordenação determinística', () => assert.deepEqual(search(idx, 'cobrança').map((r) => r.article.id), search(idx, 'cobrança').map((r) => r.article.id)));
