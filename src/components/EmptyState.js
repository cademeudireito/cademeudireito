import { h, link, externalLink } from '../utils/dom.js';

/**
 * actions: [{label, href, external?, primary?}]  (external abre em outra aba; primary destaca o botão)
 * note: texto pequeno opcional abaixo dos botões.
 */
export function EmptyState(title, text, actions = [], note = null) {
  const btn = (a) => {
    const cls = `btn ${a.primary ? 'btn--primary' : 'btn--secondary'}`;
    return a.external ? externalLink(a.href, a.label, { class: cls }) : link(a.href, { class: cls }, a.label);
  };
  return h(
    'div',
    { class: 'empty', role: 'status' },
    h('p', { class: 'empty__title', text: title }),
    h('p', { text }),
    actions.length ? h('p', { class: 'empty__actions' }, actions.map(btn)) : null,
    note ? h('p', { class: 'empty__note', text: note }) : null,
  );
}
