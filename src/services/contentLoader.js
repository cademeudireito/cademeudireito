import { buildPublicContent } from './content.js';
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
  // Defesa em profundidade: reaplica a política mesmo se o JSON trouxer itens a mais.
  const includeDrafts = raw.includeDrafts === true;
  const data = buildPublicContent(raw, { includeDrafts });
  const articles = data.articles;
  store = {
    includeDrafts,
    site: raw.site,
    categories: data.categories.slice().sort((a, b) => a.order - b.order),
    articles,
    guides: data.guides,
    pages: data.pages,
    articleById: new Map(articles.map((a) => [a.id, a])),
    articleBySlug: new Map(articles.map((a) => [a.slug, a])),
    index: buildIndex(articles, data.categories),
  };
  return store;
}
