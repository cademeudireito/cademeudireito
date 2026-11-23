import test from 'node:test';
import assert from 'node:assert/strict';
import { applyEvent, parse, render, formatDate } from '../scripts/sugestoes.mjs';

const open = (n, title, at = '2026-11-23T05:10:00Z') => ({ action: 'opened', issue: { number: n, title, created_at: at } });

test('registra sugestão nova como pendente, no horário de Brasília', () => {
  const rows = new Map();
  assert.ok(applyEvent(rows, open(7, 'Sugestão de tema: acúmulo de função')));
  const r = rows.get(7);
  assert.equal(r.term, 'acúmulo de função');
  assert.equal(r.status, '⏳ pendente');
  assert.equal(r.received, '23/11/2026 02:10');
});
test('ignora issues que não são sugestões', () => {
  const rows = new Map();
  assert.equal(applyEvent(rows, open(8, 'Erro na página de férias')), false);
  assert.equal(rows.size, 0);
});
test('fechar marca como feito ou descartado; reabrir volta a pendente', () => {
  const rows = new Map();
  applyEvent(rows, open(1, 'Sugestão de tema: a'));
  applyEvent(rows, { action: 'closed', issue: { number: 1, title: 'Sugestão de tema: a', state_reason: 'completed', closed_at: '2026-11-24T15:00:00Z' } });
  assert.equal(rows.get(1).status, '✅ feito');
  assert.equal(rows.get(1).resolved, '24/11/2026 12:00');
  applyEvent(rows, { action: 'closed', issue: { number: 1, title: 'Sugestão de tema: a', state_reason: 'not_planned', closed_at: '2026-11-24T15:00:00Z' } });
  assert.equal(rows.get(1).status, '🚫 descartado');
  applyEvent(rows, { action: 'reopened', issue: { number: 1, title: 'Sugestão de tema: a' } });
  assert.equal(rows.get(1).status, '⏳ pendente');
});
test('texto da issue não quebra a tabela', () => {
  const rows = new Map();
  applyEvent(rows, open(2, 'Sugestão de tema: a | b\n| c |'));
  assert.ok(!rows.get(2).term.includes('|'));
  assert.equal(parse(render(rows)).size, 1);
});
test('arquivo gerado é relido sem perder nada, mais novas primeiro', () => {
  const rows = new Map();
  applyEvent(rows, open(1, 'Sugestão de tema: um'));
  applyEvent(rows, open(2, 'Sugestão de tema: dois'));
  const md = render(rows);
  assert.ok(md.indexOf('#2') < md.indexOf('#1'));
  assert.equal(render(parse(md)), md);
});
test('data inválida não derruba', () => assert.equal(formatDate('lixo'), ''));
