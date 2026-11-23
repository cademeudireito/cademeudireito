import { h, link } from '../utils/dom.js';

/**
 * Grupos de números (bloco "numeros" de uma página em src/data/pages).
 * Cada grupo: { titulo, descricao?, itens: [{ numero, nome, uso, horario?, extra?, nota?, url? }] }
 */
export function NumberGroups(grupos = []) {
  return h(
    'div',
    { class: 'numbers' },
    grupos.map((g, gi) => {
      const id = `numeros-grupo-${gi + 1}`;
      return h(
        'section',
        { class: 'article__section', 'aria-labelledby': `${id}-titulo` },
        h('h2', { id: `${id}-titulo`, text: g.titulo }),
        g.descricao ? h('p', { class: 'muted', text: g.descricao }) : null,
        h(
          'ul',
          { class: 'contacts' },
          g.itens.map((i) =>
            h(
              'li',
              { class: 'contact' },
              h('p', { class: 'contact__digits', text: i.numero }),
              h('p', { class: 'contact__name', text: i.nome }),
              h('p', { text: i.uso }),
              i.horario ? h('p', { class: 'muted', text: `Atendimento: ${i.horario}` }) : null,
              i.extra ? h('p', { text: i.extra }) : null,
              i.nota ? h('p', { class: 'muted', text: i.nota }) : null,
              i.url ? h('p', { class: 'contact__link' }, link(i.url, { class: 'ext-link' }, 'Ir ao site do órgão')) : null,
            ),
          ),
        ),
      );
    }),
  );
}
