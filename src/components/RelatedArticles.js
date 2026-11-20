import { h } from '../utils/dom.js';
import { ArticleCard } from './ArticleCard.js';

export function RelatedArticles(articles) {
  if (!articles.length) return null;
  return h('section', { class: 'article__section', 'aria-labelledby': 'rel-title' }, h('h2', { id: 'rel-title', text: 'Conteúdos relacionados' }), h('ul', { class: 'list list--cards' }, articles.map((a) => ArticleCard(a))));
}
