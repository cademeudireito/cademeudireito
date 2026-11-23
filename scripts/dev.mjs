// Servidor de desenvolvimento sem dependências. Segue site.json (draftVisibility). Use --strict para só validados.
import path from 'node:path';
import { SRC, ROOT, loadAllData } from './lib-data.mjs';
import { serve } from './lib-server.mjs';
import { buildPublicContent } from '../src/services/content.js';

const strict = process.argv.includes('--strict');
const port = Number(process.env.PORT ?? 5173);

serve({
  root: SRC,
  port,
  fallbackHtml: async () => ({ path: path.join(SRC, 'index.html') }),
  virtual: async (pathname) => {
    if (pathname === '/data/content.json') {
      const data = await loadAllData();
      const includeDrafts = !strict && data.site.draftVisibility === 'show';
      const body = { includeDrafts, site: data.site, search: { groups: data.search.groups }, ...buildPublicContent(data, { includeDrafts }) };
      return { type: 'application/json; charset=utf-8', body: JSON.stringify(body) };
    }
    for (const f of ['favicon.svg', 'robots.txt']) if (pathname === `/${f}`) {
      const { readFile } = await import('node:fs/promises');
      return { type: f.endsWith('svg') ? 'image/svg+xml' : 'text/plain', body: await readFile(path.join(ROOT, 'public', f)) };
    }
    return null;
  },
});
console.log(strict ? 'Modo estrito: só conteúdo published' : 'Modo normal: conforme draftVisibility do site.json');
