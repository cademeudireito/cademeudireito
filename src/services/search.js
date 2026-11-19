import { normalize, tokenize } from './text.js';

// Pesos simples e determinísticos (docs/06 §5).
const WEIGHTS = { title: 5, keywords: 3, synonyms: 3, summary: 1.5, category: 1 };

/**
 * Cria um índice em memória. `articles` deve conter apenas o que pode ser exibido.
 * @param {Array} articles
 * @param {Array} categories
 */
export function buildIndex(articles, categories = []) {
  const catTitle = new Map(categories.map((c) => [c.id, c.title]));
  return articles.map((article) => ({
    article,
    title: normalize(article.title),
    keywords: (article.keywords ?? []).map(normalize),
    synonyms: (article.synonyms ?? []).map(normalize),
    summary: normalize(article.summary),
    category: normalize(catTitle.get(article.category) ?? article.category),
  }));
}

function fieldScore(haystack, token) {
  if (!haystack) return 0;
  const words = haystack.split(' ');
  if (words.includes(token)) return 1; // palavra exata
  if (token.length >= 3 && words.some((w) => w.startsWith(token))) return 0.7; // prefixo
  if (token.length >= 4 && haystack.includes(token)) return 0.4; // trecho
  return 0;
}

function listScore(list, token) {
  let best = 0;
  for (const item of list) best = Math.max(best, fieldScore(item, token));
  return best;
}

/**
 * Busca determinística. Cada termo precisa casar em algum campo.
 * @returns {Array<{article, score}>} ordenado por relevância e depois por título.
 */
export function search(index, query, { category = null } = {}) {
  const tokens = tokenize(query);
  if (!tokens.length) return [];
  const results = [];
  for (const entry of index) {
    if (category && entry.article.category !== category) continue;
    let total = 0;
    let matchedAll = true;
    for (const token of tokens) {
      const s =
        WEIGHTS.title * fieldScore(entry.title, token) +
        WEIGHTS.keywords * listScore(entry.keywords, token) +
        WEIGHTS.synonyms * listScore(entry.synonyms, token) +
        WEIGHTS.summary * fieldScore(entry.summary, token) +
        WEIGHTS.category * fieldScore(entry.category, token);
      if (s === 0) {
        matchedAll = false;
        break;
      }
      total += s;
    }
    if (matchedAll) results.push({ article: entry.article, score: total });
  }
  results.sort(
    (a, b) => b.score - a.score || a.article.title.localeCompare(b.article.title, 'pt-BR'),
  );
  return results;
}
