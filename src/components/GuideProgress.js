import { h } from '../utils/dom.js';

export function GuideProgress(current, max) {
  const pct = Math.min(100, Math.round((current / max) * 100));
  const fill = h('span', { class: 'progress__fill' });
  fill.style.width = `${pct}%`;
  return h(
    'div',
    { class: 'progress' },
    h('p', { class: 'progress__label', text: `Pergunta ${current} de até ${max}` }),
    h('div', { class: 'progress__bar', role: 'progressbar', 'aria-valuemin': 0, 'aria-valuemax': max, 'aria-valuenow': current, 'aria-label': 'Progresso do orientador' }, fill),
  );
}
