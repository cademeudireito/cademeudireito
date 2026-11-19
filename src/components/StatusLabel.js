import { h } from '../utils/dom.js';
import { STATUS_LABELS } from '../services/content.js';

/** Só deve ser usado em prévia interna (nunca em build público). */
export function StatusLabel(status) {
  return h('span', { class: `status status--${status}` }, h('span', { 'aria-hidden': 'true', text: '● ' }), `Situação: ${STATUS_LABELS[status] ?? status}`);
}
