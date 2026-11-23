import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateContent } from '../src/services/content.js';

const categoria = (contatos) => ({
  categories: [{ id: 'x', slug: 'x', title: 'X', description: 'd', icon: 'home', order: 1, contatos }],
  articles: [],
  guides: [],
});
const ok = { nome: 'Órgão', uso: 'Para tal coisa.', url: 'https://www.gov.br/exemplo' };

test('contato válido não gera erro', () => {
  const { errors } = validateContent(categoria([ok]));
  assert.deepEqual(errors.filter((e) => e.includes('contato')), []);
});

test('contato sem https é recusado', () => {
  const { errors } = validateContent(categoria([{ ...ok, url: 'http://exemplo.gov.br' }]));
  assert.ok(errors.some((e) => e.includes('deve ser um endereço https')));
});

test('contato sem nome ou uso é recusado', () => {
  const { errors } = validateContent(categoria([{ url: ok.url }]));
  assert.ok(errors.some((e) => e.includes('"nome" ausente')));
  assert.ok(errors.some((e) => e.includes('"uso" ausente')));
});

test('contatos que não são lista são recusados', () => {
  const { errors } = validateContent(categoria('nada'));
  assert.ok(errors.some((e) => e.includes('"contatos" deve ser uma lista')));
});
