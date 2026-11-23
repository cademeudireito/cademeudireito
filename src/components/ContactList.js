import { h, link } from '../utils/dom.js';

/**
 * Órgãos oficiais ligados a uma categoria (campo `contatos` em categories.json).
 * Não aparece nada quando a categoria não tem canais nacionais.
 */
export function ContactList(contatos, { id = 'contatos', title = 'Onde buscar ajuda' } = {}) {
  if (!contatos?.length) return null;
  return h(
    'section',
    { id, class: 'article__section', 'aria-labelledby': `${id}-titulo` },
    h('h2', { id: `${id}-titulo`, text: title }),
    h('p', { class: 'muted', text: 'Canais de órgãos federais. Antes de ligar ou enviar, confira no site do órgão se o contato continua o mesmo.' }),
    h(
      'ul',
      { class: 'contacts' },
      contatos.map((c) =>
        h(
          'li',
          { class: 'contact' },
          h('p', { class: 'contact__name', text: c.nome }),
          c.telefone ? h('p', { class: 'contact__phone' }, 'Telefone: ', h('strong', { text: c.telefone })) : null,
          c.extra ? h('p', { text: c.extra }) : null,
          c.canal ? h('p', { text: c.canal }) : null,
          c.horario ? h('p', { class: 'muted', text: `Atendimento: ${c.horario}` }) : null,
          h('p', { text: c.uso }),
          h('p', { class: 'contact__link' }, link(c.url, { class: 'ext-link' }, 'Ir ao site do órgão')),
        ),
      ),
    ),
  );
}
