import test from 'node:test';
import assert from 'node:assert/strict';
import { load } from './data.mjs';
import { validateContent, buildPublicContent, filterPublic } from '../src/services/content.js';

const data = load();

test('conteúdo atual é válido', () => assert.deepEqual(validateContent(data).errors, []));
test('30 assuntos cadastrados, todos rascunho', () => {
  assert.equal(data.articles.length, 30);
  assert.ok(data.articles.every((a) => a.status === 'draft' && a.reviewStatus === 'pending_review' && a.lastReviewed === null));
});
test('modo estrito não contém rascunhos', () => {
  const pub = buildPublicContent(data);
  assert.equal(pub.articles.length, 0);
  assert.equal(pub.guides.length, 0);
});
test('com rascunhos visíveis, mostra draft/pending/outdated/published e nunca archived', () => {
  const d = structuredClone(data);
  d.articles[0].status = 'archived';
  d.articles[1].status = 'outdated';
  const pub = buildPublicContent(d, { includeDrafts: true });
  assert.ok(!pub.articles.some((a) => a.status === 'archived'));
  assert.ok(pub.articles.some((a) => a.status === 'outdated'));
  assert.equal(pub.articles.length, d.articles.length - 1);
  assert.ok(pub.articles.every((a) => (a.relatedArticles ?? []).every((id) => pub.articles.some((x) => x.id === id))));
});
test('guia some se algum artigo do resultado não é exibido', () => {
  const d = structuredClone(data);
  const target = d.guides[0].results[Object.keys(d.guides[0].results)[0]].articleId;
  d.articles.find((a) => a.id === target).status = 'archived';
  const pub = buildPublicContent(d, { includeDrafts: true });
  assert.ok(!pub.guides.some((g) => g.id === d.guides[0].id));
});
test('apenas published é público', () => {
  const items = ['draft', 'pending_review', 'published', 'outdated', 'archived'].map((status) => ({ status }));
  assert.deepEqual(filterPublic(items), [{ status: 'published' }]);
});
test('publicar sem verificação é bloqueado pelo validador', () => {
  const bad = structuredClone(data);
  bad.articles[0].status = 'published';
  const { errors } = validateContent(bad);
  assert.ok(errors.some((e) => /reviewStatus "approved"/.test(e)));
  assert.ok(errors.some((e) => /não verificada|sem URL oficial/.test(e)));
});
test('detecta slug duplicado, categoria inexistente e relacionado inexistente', () => {
  const bad = structuredClone(data);
  bad.articles[1].slug = bad.articles[0].slug;
  bad.articles[2].category = 'nao-existe';
  bad.articles[3].relatedArticles = ['XXX-999'];
  const e = validateContent(bad).errors.join('\n');
  assert.match(e, /slug duplicado/);
  assert.match(e, /categoria inexistente/);
  assert.match(e, /relacionado inexistente/);
});
test('guia publicado com artigo não publicado é barrado', () => {
  const bad = structuredClone(data);
  bad.guides[0].status = 'published';
  bad.guides[0].reviewStatus = 'approved';
  assert.ok(validateContent(bad).errors.some((e) => /artigo não publicado/.test(e)));
});
