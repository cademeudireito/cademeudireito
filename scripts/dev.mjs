// Servidor de desenvolvimento sem dependências. Por padrão inclui rascunhos (prévia interna).
// Use --public para simular o build público.
import path from 'node:path';
import { SRC, ROOT, loadAllData } from './lib-data.mjs';
import { serve } from './lib-server.mjs';
import { buildPublicContent } from '../src/services/content.js';

const publicMode = process.argv.includes('--public');
const port = Number(process.env.PORT ?? 5173);

serve({
  root: SRC,
  port,
  fallbackHtml: async () => ({ path: path.join(SRC, 'index.html') }),
  virtual: async (pathname) => {
    if (pathname === '/data/content.json') {
      const data = await loadAllData();
      const body = publicMode ? { mode: 'public', site: data.site, ...buildPublicContent(data) } : { mode: 'preview', ...data };
      return { type: 'application/json; charset=utf-8', body: JSON.stringify(body) };
    }
    for (const f of ['favicon.svg', 'robots.txt']) if (pathname === `/${f}`) {
      const { readFile } = await import('node:fs/promises');
      return { type: f.endsWith('svg') ? 'image/svg+xml' : 'text/plain', body: await readFile(path.join(ROOT, 'public', f)) };
    }
    return null;
  },
});
console.log(publicMode ? 'Modo: público (só conteúdo published)' : 'Modo: prévia interna (inclui rascunhos — não publicar)');
