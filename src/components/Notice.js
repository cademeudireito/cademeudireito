import { h } from '../utils/dom.js';
import { icon } from '../utils/icons.js';

export function Notice(text, { title = null, tone = 'info' } = {}) {
  return h('aside', { class: `notice notice--${tone}` }, icon(tone === 'warning' ? 'alert' : 'info'), h('div', {}, title ? h('p', { class: 'notice__title', text: title }) : null, h('p', { text })));
}
