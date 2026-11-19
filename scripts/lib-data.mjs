// Carrega os JSON de src/data (usado por build, dev, validate e report).
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const SRC = path.join(ROOT, 'src');
const DATA = path.join(SRC, 'data');

async function readJson(file) {
  try {
    return JSON.parse(await readFile(file, 'utf8'));
  } catch (err) {
    throw new Error(`Falha ao ler ${path.relative(ROOT, file)}: ${err.message}`);
  }
}

async function readDir(dir) {
  const names = (await readdir(path.join(DATA, dir))).filter((n) => n.endsWith('.json')).sort();
  return Promise.all(names.map((n) => readJson(path.join(DATA, dir, n))));
}

export async function loadAllData() {
  const [categories, site, articles, guides, pages] = await Promise.all([
    readJson(path.join(DATA, 'categories.json')),
    readJson(path.join(DATA, 'site.json')),
    readDir('articles'),
    readDir('guides'),
    readDir('pages'),
  ]);
  categories.sort((a, b) => a.order - b.order);
  articles.sort((a, b) => a.id.localeCompare(b.id));
  guides.sort((a, b) => a.id.localeCompare(b.id));
  return { categories, site, articles, guides, pages };
}
