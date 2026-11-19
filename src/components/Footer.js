import { h, link, externalLink } from '../utils/dom.js';

export function Footer(site, categories) {
  const col = (title, items) =>
    h('div', { class: 'footer__col' }, h('h2', { class: 'footer__title', text: title }), h('ul', { class: 'footer__list' }, items.map((i) => h('li', {}, i))));
  return h(
    'footer',
    { class: 'site-footer' },
    h(
      'div',
      { class: 'container' },
      h(
        'div',
        { class: 'footer__grid' },
        h('div', { class: 'footer__brand' }, h('p', { class: 'footer__name', text: site.name }), h('p', { text: site.slogan })),
        col('Navegação', [
          link('/', {}, 'Início'),
          link('/orientador/', {}, 'Encontrar meus direitos'),
          link('/enciclopedia/', {}, 'Enciclopédia'),
        ]),
        col('Categorias', categories.map((c) => link(`/categoria/${c.slug}/`, {}, c.title))),
        col('O projeto', [
          link('/sobre/', {}, 'Sobre o projeto'),
          link('/fontes-e-metodologia/', {}, 'Como usamos as leis'),
          link('/aviso-educativo/', {}, 'Aviso educativo'),
          link('/acessibilidade/', {}, 'Acessibilidade'),
          link('/privacidade/', {}, 'Privacidade'),
          site.githubUrl ? externalLink(site.githubUrl, 'Repositório no GitHub') : null,
        ]),
      ),
      h('p', { class: 'footer__notice', text: site.footerNotice }),
    ),
  );
}
