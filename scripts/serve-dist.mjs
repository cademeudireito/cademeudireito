import path from 'node:path';
import { ROOT } from './lib-data.mjs';
import { serve } from './lib-server.mjs';

const dir = process.argv.includes('--strict') ? 'dist-strict' : 'dist';
const root = path.join(ROOT, dir);
serve({ root, port: Number(process.env.PORT ?? 4173), fallbackHtml: async () => ({ path: path.join(root, '404.html'), status: 404 }) });
