import { h } from '../utils/dom.js';
import { STATUS_LABELS } from '../services/content.js';

/** Aviso de situação editorial. Itens publicados (validados) não mostram etiqueta. */
export function StatusLabel(status) {
  if (status === 'published') return null;
  return h('span', { class: `status status--${status}` }, h('span', { 'aria-hidden': 'true', text: '● ' }), STATUS_LABELS[status] ?? status);
}
