import path from 'node:path';
import { ROOT } from './lib-data.mjs';
import { readFile } from 'node:fs/promises';
import { serve } from './lib-server.mjs';

const dir = process.argv.includes('--strict') ? 'dist-strict' : 'dist';
const root = path.join(ROOT, dir);
const site = JSON.parse(await readFile(path.join(ROOT, 'src', 'data', 'site.json'), 'utf8'));
const basePath = (process.env.BASE_PATH ?? site.basePath ?? '').replace(/\/+$/, '');
serve({ root, basePath, port: Number(process.env.PORT ?? 4173), fallbackHtml: async () => ({ path: path.join(root, '404.html'), status: 404 }) });
