import { h, link } from '../utils/dom.js';
import { Breadcrumbs } from '../components/Breadcrumbs.js';
import { QuickAnswer } from '../components/QuickAnswer.js';
import { LegalReference } from '../components/LegalReference.js';
import { RelatedArticles } from '../components/RelatedArticles.js';
import { StatusLabel } from '../components/StatusLabel.js';
import { Notice } from '../components/Notice.js';
import { formatDate } from '../services/text.js';
import { NotFound } from './NotFound.js';

function section(id, title, body) {
  if (!body) return null;
  return h('section', { class: 'article__section', 'aria-labelledby': id }, h('h2', { id, text: title }), body);
}
const ul = (items, cls = 'bullets') => (items?.length ? h('ul', { class: cls }, items.map((i) => h('li', { text: i }))) : null);

export async function Article({ ctx, content }) {
  const a = content.articleBySlug.get(ctx.params.slug);
  if (!a) return NotFound({ ctx, content });
  const cat = content.categories.find((c) => c.id === a.category);
  const s = a.sections ?? {};
  const related = (a.relatedArticles ?? []).map((id) => content.articleById.get(id)).filter(Boolean);
  const reviewed = formatDate(a.lastReviewed);

  const main = h(
    'div',
    { class: 'container page' },
    Breadcrumbs([{ label: 'Início', href: '/' }, { label: 'Enciclopédia', href: '/enciclopedia/' }, { label: cat.title, href: `/categoria/${cat.slug}/` }, { label: a.title }]),
    h(
      'article',
      { class: 'article' },
      h('p', { class: 'article__cat' }, link(`/categoria/${cat.slug}/`, {}, cat.title)),
      h('h1', { text: a.title }),
      a.status !== 'published' ? h('div', { class: 'review-box' }, StatusLabel(a.status), h('p', { text: 'Este conteúdo está em revisão e ainda não foi validado juridicamente. Use como informação geral e confira as fontes oficiais antes de tomar decisões.' })) : null,
      QuickAnswer(a.quickAnswer),
      section('s-explain', 'Entenda melhor', s.explanation ? h('p', { text: s.explanation }) : null),
      section('s-when', 'Quando isso se aplica', ul(s.whenApplies)),
      section('s-steps', 'O que você pode fazer', s.steps?.length ? h('ol', { class: 'numbered' }, s.steps.map((i) => h('li', { text: i }))) : null),
      section('s-docs', 'Quais documentos guardar', ul(s.documentsToKeep)),
      section('s-denied', 'E se não resolver?', ul(s.ifDenied)),
      section('s-law', 'O que diz a lei', a.legalReferences?.length ? h('div', {}, h('p', { class: 'muted', text: 'Não reproduzimos a lei na íntegra. Use os links oficiais para ler o texto completo.' }), h('ul', { class: 'legal-list' }, a.legalReferences.map((r) => LegalReference(r, content.site.fallbackLegalUrl)))) : null),
      section('s-exc', 'Exceções e pontos de atenção', ul(s.exceptions)),
      RelatedArticles(related),
      h('p', { class: 'article__review', text: reviewed ? `Última revisão: ${reviewed}.` : 'Última revisão: ainda não revisado.' }),
      Notice(content.site.defaultNotice, { title: 'Aviso educativo' }),
    ),
  );
  return { title: a.title, description: a.summary, main, noindex: a.status !== 'published' };
}
