import { h, link } from '../utils/dom.js';
import { icon } from '../utils/icons.js';
import { Breadcrumbs } from '../components/Breadcrumbs.js';
import { SearchPanel } from './Encyclopedia.js';
import { NotFound } from './NotFound.js';
import { StatusLabel } from '../components/StatusLabel.js';
import { ContactList } from '../components/ContactList.js';

export async function Category({ ctx, content }) {
  const category = content.categories.find((c) => c.slug === ctx.params.slug);
  if (!category) return NotFound({ ctx, content });
  const guides = content.guides.filter((g) => g.category === category.id);
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
      guides.length ? h('section', { class: 'article__section', 'aria-labelledby': 'cat-guides' }, h('h2', { id: 'cat-guides', text: 'Orientador interativo' }), h('ul', { class: 'list list--cards' }, guides.map((g) => h('li', { class: 'list__item' }, link(`/orientador/${g.slug}/`, { class: 'card card--article' }, h('span', { class: 'card__icon' }, icon('compass', { size: 26 })), h('span', { class: 'card__title', text: g.title }), h('span', { class: 'card__text', text: g.description }), StatusLabel(g.status), h('span', { class: 'card__meta' }, 'Começar', icon('arrow', { size: 18 }))))))) : null,
      ContactList(category.contatos, { id: 'cat-contatos' }),
      h('p', { class: 'page__back' }, link('/enciclopedia/', {}, '← Voltar à enciclopédia')),
    ),
  };
}
