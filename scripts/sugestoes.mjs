// Registra as sugestões de tema (issues do GitHub) no arquivo docs/sugestoes-de-temas.md.
// Roda dentro do GitHub Actions a cada abertura, edição ou fechamento de issue
// (.github/workflows/sugestoes.yml). Não usa serviço de terceiros e não executa nada do texto das issues.
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const PREFIX = /^\s*sugest[aã]o de tema\s*:\s*/i;
const FILE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'docs', 'sugestoes-de-temas.md');

const HEADER = `# Sugestões de temas

Lista feita **automaticamente** a partir do botão "Sugerir tema" do site (cada sugestão é uma *issue* do GitHub do projeto).
Não precisa editar à mão: quando você **fechar a issue**, a linha aqui muda sozinha.

- ⏳ **pendente**: ainda não foi tratada.
- ✅ **feito**: a issue foi fechada como concluída (o tema entrou no site ou já existia).
- 🚫 **descartado**: a issue foi fechada como "não planejada".

Cada pessoa só escreve o que pesquisou; o site não coleta dados pessoais. Datas no horário de Brasília.

| Issue | Recebida em | O que pesquisaram | Situação | Resolvida em |
|---|---|---|---|---|
`;

const clean = (s) => String(s ?? '').replace(/[\r\n|]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 120);

export function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const parts = new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(d);
  const g = (t) => parts.find((p) => p.type === t).value;
  return `${g('day')}/${g('month')}/${g('year')} ${g('hour')}:${g('minute')}`;
}

/** Lê as linhas da tabela de um arquivo já existente. */
export function parse(md) {
  const rows = new Map();
  for (const line of String(md ?? '').split('\n')) {
    const m = /^\|\s*#(\d+)\s*\|(.*)\|\s*$/.exec(line);
    if (!m) continue;
    const cells = m[2].split('|').map((c) => c.trim());
    if (cells.length < 4) continue;
    rows.set(Number(m[1]), { number: Number(m[1]), received: cells[0], term: cells[1], status: cells[2], resolved: cells[3] });
  }
  return rows;
}

export function render(rows) {
  const list = [...rows.values()].sort((a, b) => b.number - a.number);
  const body = list.map((r) => `| #${r.number} | ${r.received} | ${r.term} | ${r.status} | ${r.resolved} |`).join('\n');
  return HEADER + (body ? body + '\n' : '');
}

/** Aplica um evento de issue. Devolve true se mudou algo. */
export function applyEvent(rows, event) {
  const issue = event?.issue;
  if (!issue || issue.pull_request || !PREFIX.test(issue.title ?? '')) return false;
  const term = clean(issue.title.replace(PREFIX, '')) || '(sem texto)';
  const prev = rows.get(issue.number);
  const row = prev ?? { number: issue.number, received: formatDate(issue.created_at), term, status: '⏳ pendente', resolved: '' };
  if (!prev || event.action === 'edited') row.term = term;
  if (event.action === 'closed') {
    row.status = issue.state_reason === 'not_planned' ? '🚫 descartado' : '✅ feito';
    row.resolved = formatDate(issue.closed_at);
  } else if (event.action === 'reopened') {
    row.status = '⏳ pendente';
    row.resolved = '';
  }
  const before = JSON.stringify(prev);
  rows.set(issue.number, row);
  return before !== JSON.stringify(row);
}

async function main() {
  const event = JSON.parse(await readFile(process.env.GITHUB_EVENT_PATH, 'utf8'));
  let md = '';
  try {
    md = await readFile(FILE, 'utf8');
  } catch {
    /* arquivo ainda não existe */
  }
  const rows = parse(md);
  if (!applyEvent(rows, event)) return console.log('Nada a registrar.');
  await writeFile(FILE, render(rows));
  console.log('Arquivo de sugestões atualizado.');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();
