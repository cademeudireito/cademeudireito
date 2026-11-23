import { h } from '../utils/dom.js';
import { SearchBar } from '../components/SearchBar.js';
import { ArticleCard } from '../components/ArticleCard.js';
import { EmptyState } from '../components/EmptyState.js';
import { Breadcrumbs } from '../components/Breadcrumbs.js';
import { search } from '../services/search.js';
import { suggestionLink } from '../services/suggest.js';

/** Monta busca com resultados ao vivo; usada na enciclopédia e nas categorias. */
export function SearchPanel({ content, category = null, initial = '', idPrefix }) {
  const { articles, categories, index } = content;
  const catTitle = new Map(categories.map((c) => [c.id, c.title]));
  const scope = category ? articles.filter((a) => a.category === category) : articles;
  const status = h('p', { class: 'search-status', role: 'status', 'aria-live': 'polite' });
  const results = h('div', { class: 'search-results' });

  function renderAll() {
    status.textContent = '';
    if (category) {
      results.replaceChildren(
        scope.length
          ? h('ul', { class: 'list list--cards' }, scope.map((a) => ArticleCard(a)))
          : EmptyState('Ainda não há assuntos publicados nesta categoria', 'Os conteúdos só são publicados depois de conferidos em fontes oficiais.', [{ label: 'Voltar à enciclopédia', href: '/enciclopedia/' }]),
      );
      return;
    }
    const nodes = [];
    for (const c of categories) {
      const list = scope.filter((a) => a.category === c.id);
      if (!list.length) continue;
      nodes.push(h('section', { class: 'article__section' }, h('h2', { text: c.title }), h('ul', { class: 'list list--cards' }, list.map((a) => ArticleCard(a)))));
    }
    results.replaceChildren(
      nodes.length ? h('div', {}, nodes) : EmptyState('Ainda não há assuntos publicados', 'Os conteúdos só são publicados depois de conferidos em fontes oficiais. Você pode explorar as categorias ou conhecer o orientador.', [{ label: 'Ver categorias', href: '/' }, { label: 'Abrir o orientador', href: '/orientador/' }]),
    );
  }

  function notFound(query) {
    const href = suggestionLink(content.site, query);
    const actions = [{ label: 'Abrir o orientador', href: '/orientador/' }, { label: 'Ver categorias', href: '/' }];
    if (href) actions.unshift({ label: 'Sugerir tema', href, external: true, primary: true });
    return EmptyState(
      'Ainda não temos esse assunto',
      'Não encontramos nada sobre isso. Tente outras palavras, veja as categorias ou use o orientador, que faz perguntas simples. Se quiser, sugira o tema para o site.',
      actions,
      href ? 'Ao tocar em “Sugerir tema”, uma página do GitHub se abre com a sua busca já escrita. Não escreva dados pessoais.' : null,
    );
  }

  function update(q) {
    const query = q.trim();
    const url = new URL(location.href);
    if (query) url.searchParams.set('q', query);
    else url.searchParams.delete('q');
    history.replaceState({}, '', url.pathname + url.search);
    if (!query) return renderAll();
    const found = search(index, query, { category });
    status.textContent = found.length ? `${found.length} ${found.length === 1 ? 'resultado' : 'resultados'} para “${query}”.` : `Nenhum resultado para “${query}”.`;
    results.replaceChildren(
      found.length
        ? h('ul', { class: 'list list--cards' }, found.map(({ article }) => ArticleCard(article, { categoryTitle: category ? null : catTitle.get(article.category) })))
        : notFound(query),
    );
  }

  const bar = SearchBar({ id: `${idPrefix}-search`, label: category ? 'Buscar nesta categoria' : 'Buscar na enciclopédia', value: initial, placeholder: 'Ex.: cobrança que não reconheço', action: category ? `/categoria/${content.categories.find((c) => c.id === category).slug}/` : '/enciclopedia/', onInput: update });
  if (initial) update(initial);
  else renderAll();
  return h('div', {}, bar, status, results);
}

export async function Encyclopedia({ ctx, content }) {
  const q = ctx.query.get('q') ?? '';
  return {
    title: 'Enciclopédia de direitos',
    description: 'Encontre situações do dia a dia explicadas em linguagem simples, organizadas por categoria.',
    main: h('div', { class: 'container page' }, Breadcrumbs([{ label: 'Início', href: '/' }, { label: 'Enciclopédia' }]), h('h1', { text: 'Enciclopédia de direitos' }), h('p', { class: 'page__lead', text: 'Pesquise pelo seu problema ou navegue pelos assuntos.' }), SearchPanel({ content, initial: q, idPrefix: 'enc' })),
  };
}
