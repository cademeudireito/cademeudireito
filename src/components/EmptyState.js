import { h, link } from '../utils/dom.js';

/** actions: [{label, href}] */
export function EmptyState(title, text, actions = []) {
  return h(
    'div',
    { class: 'empty', role: 'status' },
    h('p', { class: 'empty__title', text: title }),
    h('p', { text }),
    actions.length ? h('p', { class: 'empty__actions' }, actions.map((a) => link(a.href, { class: 'btn btn--secondary' }, a.label))) : null,
  );
}
