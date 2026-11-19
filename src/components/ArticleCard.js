import { h, link } from '../utils/dom.js';
import { StatusLabel } from './StatusLabel.js';

export function ArticleCard(article, { categoryTitle = null, preview = false } = {}) {
  return h(
    'li',
    { class: 'list__item' },
    link(
      `/assunto/${article.slug}/`,
      { class: 'card card--article' },
      categoryTitle ? h('span', { class: 'card__eyebrow', text: categoryTitle }) : null,
      h('span', { class: 'card__title', text: article.title }),
      h('span', { class: 'card__text', text: article.summary }),
      preview ? StatusLabel(article.status) : null,
    ),
  );
}
