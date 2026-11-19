import { h } from '../utils/dom.js';
import { Breadcrumbs } from '../components/Breadcrumbs.js';
import { Notice } from '../components/Notice.js';
import { NotFound } from './NotFound.js';

export async function StaticPage({ ctx, content, slug }) {
  const page = content.pages.find((p) => p.slug === (slug ?? ctx.params.slug));
  if (!page) return NotFound({ ctx, content });
  const blocks = page.blocks.map((b) => {
    if (b.type === 'h2') return h('h2', { text: b.text });
    if (b.type === 'p') return h('p', { text: b.text });
    if (b.type === 'ul') return h('ul', { class: 'bullets' }, b.items.map((i) => h('li', { text: i })));
    if (b.type === 'notice') return Notice(b.key ? content.site[b.key] : b.text);
    return null;
  });
  return {
    title: page.title,
    description: page.description,
    main: h('div', { class: 'container page' }, Breadcrumbs([{ label: 'Início', href: '/' }, { label: page.title }]), h('article', { class: 'prose' }, h('h1', { text: page.title }), page.intro ? h('p', { class: 'page__lead', text: page.intro }) : null, blocks)),
  };
}
