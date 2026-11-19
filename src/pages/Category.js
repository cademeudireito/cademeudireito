import { h, link } from '../utils/dom.js';
import { icon } from '../utils/icons.js';
import { Breadcrumbs } from '../components/Breadcrumbs.js';
import { SearchPanel } from './Encyclopedia.js';
import { NotFound } from './NotFound.js';

export async function Category({ ctx, content }) {
  const category = content.categories.find((c) => c.slug === ctx.params.slug);
  if (!category) return NotFound({ ctx, content });
  return {
    title: category.title,
    description: category.description,
    main: h(
      'div',
      { class: 'container page' },
      Breadcrumbs([{ label: 'Início', href: '/' }, { label: 'Enciclopédia', href: '/enciclopedia/' }, { label: category.title }]),
      h('div', { class: 'page__head' }, h('span', { class: 'card__icon card__icon--lg' }, icon(category.icon, { size: 32 })), h('h1', { text: category.title })),
      h('p', { class: 'page__lead', text: category.description }),
      SearchPanel({ content, category: category.id, initial: ctx.query.get('q') ?? '', idPrefix: 'cat' }),
      h('p', { class: 'page__back' }, link('/enciclopedia/', {}, '← Voltar à enciclopédia')),
    ),
  };
}
