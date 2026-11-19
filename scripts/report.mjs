// Gera relatórios em docs/relatorios/ (rotas, assuntos e referências pendentes).
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { ROOT, loadAllData } from './lib-data.mjs';

const data = await loadAllData();
const out = path.join(ROOT, 'docs', 'relatorios');
await mkdir(out, { recursive: true });
const cat = new Map(data.categories.map((c) => [c.id, c.title]));
const date = new Date().toISOString().slice(0, 10);

const routes = [
  ['/', 'Página inicial'], ['/enciclopedia/', 'Enciclopédia e busca'], ['/orientador/', 'Índice dos guias'],
  ...data.categories.map((c) => [`/categoria/${c.slug}/`, `Categoria: ${c.title}`]),
  ...data.articles.map((a) => [`/assunto/${a.slug}/`, `Assunto ${a.id} (${a.status})`]),
  ...data.guides.map((g) => [`/orientador/${g.slug}/`, `Guia ${g.id} (${g.status})`]),
  ...data.pages.map((p) => [`/${p.slug}/`, `Institucional: ${p.title}`]),
];
await writeFile(path.join(out, 'rotas.md'), `# Rotas implementadas\n\nGerado em ${date} por \`npm run report\`. Rotas de assuntos e guias só existem no build público quando o conteúdo está \`published\`.\n\n| Rota | Página |\n|---|---|\n${routes.map(([r, d]) => `| \`${r}\` | ${d} |`).join('\n')}\n`);

await writeFile(path.join(out, 'assuntos.md'), `# Assuntos cadastrados e situação\n\nGerado em ${date}. Total: ${data.articles.length}.\n\n| ID | Assunto | Categoria | Status | Revisão | Última revisão |\n|---|---|---|---|---|---|\n${data.articles.map((a) => `| ${a.id} | ${a.title} | ${cat.get(a.category)} | \`${a.status}\` | \`${a.reviewStatus}\` | ${a.lastReviewed ?? '—'} |`).join('\n')}\n\n## Guias\n\n| ID | Guia | Status |\n|---|---|---|\n${data.guides.map((g) => `| ${g.id} | ${g.title} | \`${g.status}\` |`).join('\n')}\n`);

const rows = [];
for (const a of data.articles) for (const r of a.legalReferences) rows.push(`| ${a.id} | ${r.name} | ${r.provisions.join('; ')} | ${r.officialUrl ? 'registrada (a verificar)' : '**falta**'} | \`${r.status}\` |`);
await writeFile(path.join(out, 'referencias-pendentes.md'), `# Referências legais pendentes de verificação\n\nGerado em ${date}. Nenhuma referência foi verificada em fonte oficial. As URLs marcadas "registrada" vêm da documentação do projeto e ainda precisam ser abertas e conferidas; as demais precisam ser localizadas.\n\nTotal: ${rows.length}\n\n| Assunto | Norma | Dispositivos | URL oficial | Situação |\n|---|---|---|---|---|\n${rows.join('\n')}\n`);
console.log('Relatórios gerados em docs/relatorios/');
