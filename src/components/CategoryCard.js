import { h, link } from '../utils/dom.js';
import { icon } from '../utils/icons.js';

export function CategoryCard(category, count) {
  return link(
    `/categoria/${category.slug}/`,
    { class: 'card card--category', 'data-cat': category.id },
    h('span', { class: 'card__icon' }, icon(category.icon, { size: 28 })),
    h('span', { class: 'card__title', text: category.title }),
    h('span', { class: 'card__text', text: category.description }),
    h('span', { class: 'card__meta' }, count === undefined ? 'Ver assuntos' : `${count} ${count === 1 ? 'assunto' : 'assuntos'}`, icon('arrow', { size: 18 })),
  );
}
