import test from 'node:test';
import assert from 'node:assert/strict';
import { load } from './data.mjs';
import { buildIndex, search } from '../src/services/search.js';
import { normalize } from '../src/services/text.js';

const { articles, categories } = load();
import { readFileSync } from 'node:fs';
import { stem, distance } from '../src/services/search.js';
const searchData = JSON.parse(readFileSync(new URL('../src/data/search.json', import.meta.url), 'utf8'));
const idx = buildIndex(articles, categories, searchData);

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

const top = (q, n = 3) => search(idx, q).slice(0, n).map((r) => r.article.id);

test('radical junta variações da mesma palavra', () => {
  assert.equal(stem('pagou'), stem('pagar'));
  assert.equal(stem('salarios'), stem('salario'));
  assert.equal(stem('atrazado'), stem('atrasado'));
});
test('distância de edição conta troca de letras vizinhas como um erro', () => assert.equal(distance('divorcio', 'divorico', 2), 1));
test('tolera erro de digitação', () => {
  assert.equal(top('salario atrazado')[0], 'TRA-001');
  assert.equal(top('devorcio')[0], 'FAM-004');
  assert.equal(top('carteira asinada')[0], 'TRA-005');
});
test('aceita palavra pela metade', () => assert.ok(top('salar atras')[0] === 'TRA-001'));
test('entende expressões equivalentes (contexto)', () => {
  assert.ok(top('mandaram embora').includes('TRA-004'));
  assert.ok(top('meu patrão não me pagou')[0] === 'TRA-001');
  assert.equal(top('meu marido me bate')[0], 'MUL-001');
  assert.equal(top('aluguel subiu')[0], 'MOR-001');
  assert.equal(top('internet caiu')[0], 'CON-014');
});
test('frase natural com uma palavra desconhecida ainda acha o assunto', () => {
  assert.equal(top('fui despedido ontem')[0], 'TRA-004');
  assert.ok(top('salário atrasado ontem').includes('TRA-001'));
});
test('assunto inexistente não traz resultado nenhum', () => {
  assert.deepEqual(search(idx, 'astronauta marciano'), []);
  assert.deepEqual(search(idx, 'granja de porcos'), []);
});
test('título, palavras-chave e sinônimos de cada assunto o encontram entre os 5 primeiros', () => {
  let falhas = 0;
  let total = 0;
  for (const a of articles) {
    for (const q of [a.title, ...(a.keywords ?? []), ...(a.synonyms ?? [])]) {
      total++;
      if (!search(idx, q).slice(0, 5).some((r) => r.article.id === a.id)) falhas++;
    }
  }
  assert.ok(falhas / total < 0.03, `falhas: ${falhas}/${total}`);
});
