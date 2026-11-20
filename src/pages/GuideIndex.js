import { h, link } from '../utils/dom.js';
import { icon } from '../utils/icons.js';
import { Breadcrumbs } from '../components/Breadcrumbs.js';
import { EmptyState } from '../components/EmptyState.js';
import { Notice } from '../components/Notice.js';
import { StatusLabel } from '../components/StatusLabel.js';

export async function GuideIndex({ content }) {
  const { guides, site } = content;
  const card = (g) => h('li', { class: 'list__item' }, link(`/orientador/${g.slug}/`, { class: 'card card--article' }, h('span', { class: 'card__icon' }, icon('compass', { size: 26 })), h('span', { class: 'card__title', text: g.title }), h('span', { class: 'card__text', text: g.description }), StatusLabel(g.status), h('span', { class: 'card__meta' }, 'Começar', icon('arrow', { size: 18 }))));
  const groups = content.categories.map((c) => [c, guides.filter((g) => g.category === c.id)]).filter(([, list]) => list.length);
  const others = guides.filter((g) => !content.categories.some((c) => c.id === g.category));
  const body = guides.length
    ? h('div', {}, groups.map(([c, list]) => h('section', { class: 'article__section' }, h('h2', { text: c.title }), h('ul', { class: 'list list--cards' }, list.map(card)))), others.length ? h('ul', { class: 'list list--cards' }, others.map(card)) : null)
    : EmptyState('Os orientadores estão em revisão', 'Cada guia só é publicado depois que seus resultados e fontes forem validados. Enquanto isso, você pode pesquisar na enciclopédia.', [{ label: 'Ver a enciclopédia', href: '/enciclopedia/' }]);
  return {
    title: 'Encontrar meus direitos',
    description: 'Responda perguntas simples, uma por vez, e encontre conteúdos relevantes para a sua situação.',
    main: h('div', { class: 'container page' }, Breadcrumbs([{ label: 'Início', href: '/' }, { label: 'Encontrar meus direitos' }]), h('h1', { text: 'Encontrar meus direitos' }), h('p', { class: 'page__lead', text: 'Responda a perguntas simples, uma por vez. Não pedimos cadastro nem dados pessoais.' }), Notice('As respostas são educativas e seguem regras fixas. Elas não analisam o seu caso e não substituem orientação individual.'), body, h('p', { class: 'muted', text: site.footerNotice })),
  };
}
