import { readFileSync, readdirSync } from 'node:fs';
const dir = new URL('../src/data/', import.meta.url);
const readDir = (d) => readdirSync(new URL(d + '/', dir)).filter((f) => f.endsWith('.json')).map((f) => JSON.parse(readFileSync(new URL(`${d}/${f}`, dir), 'utf8')));
export const load = () => ({
  categories: JSON.parse(readFileSync(new URL('categories.json', dir), 'utf8')),
  articles: readDir('articles'),
  guides: readDir('guides'),
  pages: readDir('pages'),
});
