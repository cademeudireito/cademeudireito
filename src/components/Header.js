import { h, link } from '../utils/dom.js';
import { icon } from '../utils/icons.js';

const NAV = [
  ['/', 'Início'],
  ['/orientador/', 'Encontrar meus direitos'],
  ['/enciclopedia/', 'Enciclopédia'],
  ['/sobre/', 'Sobre'],
];

export function Header(site, pathname) {
  const isCurrent = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href.replace(/\/$/, '')));
  const list = h(
    'ul',
    { class: 'nav__list' },
    NAV.map(([href, label]) =>
      h('li', {}, link(href, { class: 'nav__link', 'aria-current': isCurrent(href) ? 'page' : null }, label)),
    ),
  );
  const cta = link('/orientador/', { class: 'btn btn--primary btn--sm nav__cta' }, 'Descobrir meus direitos');

  const nav = h('nav', { id: 'menu', class: 'nav', 'aria-label': 'Principal' }, list, cta);
  const toggle = h(
    'button',
    { class: 'menu-toggle', type: 'button', 'aria-expanded': 'false', 'aria-controls': 'menu' },
    icon('menu'),
    h('span', { text: 'Menu' }),
  );
  const setOpen = (open) => {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.replaceChildren(icon(open ? 'close' : 'menu'), h('span', { text: open ? 'Fechar' : 'Menu' }));
  };
  toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
  nav.addEventListener('click', (e) => e.target.closest('a') && setOpen(false));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
    }
  });

  return h(
    'header',
    { class: 'site-header' },
    h(
      'div',
      { class: 'container header__inner' },
      link('/', { class: 'wordmark', 'aria-label': `${site.name} — página inicial` }, h('span', { class: 'wordmark__mark', 'aria-hidden': 'true', text: '?' }), h('span', { text: site.name })),
      toggle,
      nav,
    ),
  );
}
