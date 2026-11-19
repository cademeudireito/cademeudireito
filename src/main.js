import { h } from './utils/dom.js';
import { loadContent } from './services/contentLoader.js';
import { defineRoutes, startRouter } from './services/router.js';
import { Header } from './components/Header.js';
import { Footer } from './components/Footer.js';
import { Home } from './pages/Home.js';
import { Encyclopedia } from './pages/Encyclopedia.js';
import { Category } from './pages/Category.js';
import { Article } from './pages/Article.js';
import { GuideIndex } from './pages/GuideIndex.js';
import { Guide } from './pages/Guide.js';
import { StaticPage } from './pages/StaticPage.js';
import { NotFound } from './pages/NotFound.js';

const app = document.getElementById('app');
let content = null;

function setMeta(name, value, attr = 'name') {
  let el = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.append(el);
  }
  el.setAttribute('content', value);
}

function applyHead({ title, description }, site, preview) {
  const full = title.includes(site.name) ? title : `${title} — ${site.name}`;
  document.title = full;
  setMeta('description', description);
  setMeta('og:title', full, 'property');
  setMeta('og:description', description, 'property');
  setMeta('og:type', 'website', 'property');
  setMeta('og:locale', 'pt_BR', 'property');
  if (preview) setMeta('robots', 'noindex, nofollow');
}

async function renderPage(handler, ctx) {
  try {
    content = content ?? (await loadContent());
  } catch (err) {
    app.replaceChildren(h('main', { id: 'conteudo', class: 'container page', tabindex: '-1' }, h('h1', { text: 'Não foi possível carregar o site' }), h('p', { text: err.message }), h('p', {}, h('a', { href: ctx ? location.href : '/' }, 'Tentar novamente'))));
    return;
  }
  let result;
  try {
    result = await handler({ ctx, content, slug: handler.slug });
  } catch (err) {
    console.error(err);
    result = await NotFound({ ctx, content });
  }
  applyHead(result, content.site, content.preview);
  const banner = content.preview ? h('div', { class: 'preview-banner', role: 'note', text: 'Ambiente de prévia interna: inclui conteúdo em rascunho, NÃO validado juridicamente. Não publicar.' }) : null;
  const main = h('main', { id: 'conteudo', tabindex: '-1' }, result.main);
  app.replaceChildren(banner, Header(content.site, location.pathname), main, Footer(content.site, content.categories));
  window.scrollTo(0, 0);
  if (!location.hash) {
    const heading = main.querySelector('h1');
    if (heading) { heading.setAttribute('tabindex', '-1'); heading.focus({ preventScroll: true }); }
  }
}

const staticPage = (slug) => Object.assign((args) => StaticPage({ ...args, slug }), { slug });

defineRoutes(
  [
    ['/', Home],
    ['/enciclopedia', Encyclopedia],
    ['/categoria/:slug', Category],
    ['/assunto/:slug', Article],
    ['/orientador', GuideIndex],
    ['/orientador/:slug', Guide],
    ['/sobre', staticPage('sobre')],
    ['/fontes-e-metodologia', staticPage('fontes-e-metodologia')],
    ['/aviso-educativo', staticPage('aviso-educativo')],
    ['/acessibilidade', staticPage('acessibilidade')],
    ['/privacidade', staticPage('privacidade')],
  ],
  NotFound,
  renderPage,
);
startRouter();
