import { h, link } from '../utils/dom.js';

/** items: [{label, href?}] — o último é a página atual. */
export function Breadcrumbs(items) {
  return h(
    'nav',
    { class: 'breadcrumbs', 'aria-label': 'Você está em' },
    h(
      'ol',
      {},
      items.map((it, i) =>
        h('li', {}, it.href && i < items.length - 1 ? link(it.href, {}, it.label) : h('span', { 'aria-current': 'page', text: it.label })),
      ),
    ),
  );
}
