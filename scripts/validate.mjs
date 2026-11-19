import { loadAllData } from './lib-data.mjs';
import { validateContent } from '../src/services/content.js';

const verbose = process.argv.includes('--warnings');
const data = await loadAllData();
const { errors, warnings } = validateContent(data);

console.log(
  `Categorias: ${data.categories.length} | Artigos: ${data.articles.length} | Guias: ${data.guides.length} | Páginas: ${data.pages.length}`,
);
const byStatus = {};
for (const a of data.articles) byStatus[a.status] = (byStatus[a.status] ?? 0) + 1;
console.log('Artigos por status:', byStatus);
if (verbose) warnings.forEach((w) => console.log('  pendência:', w));
else console.log(`Pendências (rascunho): ${warnings.length} (use --warnings para listar)`);

if (errors.length) {
  console.error(`\n${errors.length} erro(s):`);
  errors.forEach((e) => console.error(' ✗', e));
  process.exit(1);
}
console.log('✓ Conteúdo válido');
