import { filterPublic, buildPublicContent } from './content.js';
import { buildIndex } from './search.js';

let store = null;

/** Carrega /data/content.json. Rascunhos só aparecem se o build for de prévia (mode === 'preview'). */
export async function loadContent() {
  if (store) return store;
  let raw;
  try {
    const res = await fetch('/data/content.json', { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    raw = await res.json();
  } catch (err) {
    throw new Error(`Não foi possível carregar o conteúdo (${err.message}).`);
  }
  const preview = raw.mode === 'preview';
  const data = preview ? raw : { ...raw, ...buildPublicContent(raw) };
  const articles = preview ? data.articles : filterPublic(data.articles);
  store = {
    preview,
    site: raw.site,
    categories: data.categories.slice().sort((a, b) => a.order - b.order),
    articles,
    guides: preview ? data.guides : filterPublic(data.guides),
    pages: data.pages,
    articleById: new Map(articles.map((a) => [a.id, a])),
    articleBySlug: new Map(articles.map((a) => [a.slug, a])),
    index: buildIndex(articles, data.categories),
  };
  return store;
}
