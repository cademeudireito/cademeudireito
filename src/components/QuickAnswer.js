import { h } from '../utils/dom.js';
import { icon } from '../utils/icons.js';

export function QuickAnswer(text) {
  return h('section', { class: 'quick-answer', 'aria-labelledby': 'quick-title' }, h('h2', { id: 'quick-title', class: 'quick-answer__title' }, icon('info'), 'Resposta rápida'), h('p', { text }));
}
