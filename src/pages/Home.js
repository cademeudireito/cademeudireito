import { h, link, svgFromTrustedString } from '../utils/dom.js';
import { icon } from '../utils/icons.js';
import { SearchBar } from '../components/SearchBar.js';
import { CategoryCard } from '../components/CategoryCard.js';
import { ArticleCard } from '../components/ArticleCard.js';
import { EmptyState } from '../components/EmptyState.js';

const SUGGESTIONS = [
  'Quero cancelar uma compra',
  'Não recebi meu salário',
  'Meu plano de saúde negou atendimento',
  'Tenho problemas com meu aluguel',
];

// Ilustração editorial decorativa (estática, sem texto essencial).
const HERO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 380" role="presentation" aria-hidden="true" focusable="false">
<circle cx="210" cy="190" r="170" fill="#E4F2ED"/><circle cx="330" cy="90" r="36" fill="#F4C66A" opacity=".85"/><circle cx="80" cy="300" r="26" fill="#E88C72" opacity=".8"/>
<rect x="150" y="150" width="120" height="170" rx="30" fill="#243747"/><circle cx="210" cy="112" r="38" fill="#E88C72"/>
<path d="M176 100c4-26 54-30 68 0-12-10-38-14-68 0z" fill="#243747"/>
<rect x="188" y="206" width="76" height="104" rx="12" fill="#fff" transform="rotate(-6 226 258)"/>
<g stroke="#187C72" stroke-width="5" stroke-linecap="round" transform="rotate(-6 226 258)"><path d="M200 230h48M200 248h48M200 266h30"/></g>
<g><rect x="20" y="70" width="150" height="46" rx="14" fill="#fff" stroke="#E5E8E6"/><circle cx="44" cy="93" r="10" fill="#187C72"/><path d="M60 93h86" stroke="#9AA9B3" stroke-width="6" stroke-linecap="round"/></g>
<g><rect x="262" y="200" width="140" height="46" rx="14" fill="#fff" stroke="#E5E8E6"/><circle cx="286" cy="223" r="10" fill="#F4C66A"/><path d="M302 223h80" stroke="#9AA9B3" stroke-width="6" stroke-linecap="round"/></g>
<g><rect x="14" y="250" width="140" height="46" rx="14" fill="#fff" stroke="#E5E8E6"/><circle cx="38" cy="273" r="10" fill="#E88C72"/><path d="M54 273h76" stroke="#9AA9B3" stroke-width="6" stroke-linecap="round"/></g>
</svg>`;

export async function Home({ content }) {
  const { site, categories, articles, preview } = content;
  const counts = new Map(categories.map((c) => [c.id, articles.filter((a) => a.category === c.id).length]));

  const hero = h(
    'section',
    { class: 'hero', 'aria-labelledby': 'hero-title' },
    h(
      'div',
      { class: 'container hero__grid' },
      h(
        'div',
        { class: 'hero__text' },
        h('h1', { id: 'hero-title', class: 'hero__title', text: site.promise }),
        h('p', { class: 'hero__lead', text: 'Descubra o que a lei diz, entenda o que você pode fazer e encontre caminhos para resolver situações do dia a dia. Sem juridiquês e sem complicação.' }),
        SearchBar({ id: 'home-search', label: 'Pesquise sua situação', placeholder: 'Ex.: a loja não quer devolver meu dinheiro…', large: true }),
        h('p', { class: 'hero__suggest-label', text: 'Sugestões:' }),
        h('ul', { class: 'chips' }, SUGGESTIONS.map((s) => h('li', {}, link(`/enciclopedia/?q=${encodeURIComponent(s)}`, { class: 'chip' }, s)))),
      ),
      h('div', { class: 'hero__art' }, svgFromTrustedString(HERO_SVG)),
    ),
  );

  const guideCard = h(
    'section',
    { class: 'container section', 'aria-labelledby': 'guide-title' },
    h(
      'div',
      { class: 'guide-banner' },
      h('span', { class: 'guide-banner__icon' }, icon('compass', { size: 36 })),
      h('div', { class: 'guide-banner__text' }, h('h2', { id: 'guide-title', text: 'Não sabe por onde começar?' }), h('p', { text: 'Responda algumas perguntas simples e descubra quais direitos podem se aplicar à sua situação.' })),
      link('/orientador/', { class: 'btn btn--primary btn--lg' }, 'Me ajude a descobrir'),
    ),
  );

  const cats = h(
    'section',
    { class: 'container section', 'aria-labelledby': 'cats-title' },
    h('h2', { id: 'cats-title', class: 'section__title', text: 'Qual assunto você precisa entender?' }),
    h('p', { class: 'section__lead', text: 'Escolha uma área e encontre respostas para situações do seu dia a dia.' }),
    h('ul', { class: 'grid grid--cats' }, categories.map((c) => h('li', {}, CategoryCard(c, counts.get(c.id))))),
  );

  const popular = articles.slice(0, 6);
  const pop = h(
    'section',
    { class: 'container section', 'aria-labelledby': 'pop-title' },
    h('h2', { id: 'pop-title', class: 'section__title', text: 'Assuntos populares' }),
    popular.length
      ? h('ul', { class: 'list list--cards' }, popular.map((a) => ArticleCard(a, { preview })))
      : EmptyState('Os primeiros assuntos estão em revisão', 'Cada conteúdo só é publicado depois de conferido em fontes oficiais. Enquanto isso, você pode explorar as categorias.', [{ label: 'Ver a enciclopédia', href: '/enciclopedia/' }]),
  );

  const steps = [
    ['search', 'Encontre sua situação', 'Pesquise com suas palavras ou escolha uma categoria.'],
    ['book-open', 'Entenda o que a lei diz', 'Explicamos em linguagem simples, com link para a fonte oficial.'],
    ['list', 'Descubra o que pode fazer', 'Veja próximos passos, o que guardar e onde buscar ajuda.'],
  ];
  const how = h(
    'section',
    { class: 'container section', 'aria-labelledby': 'how-title' },
    h('h2', { id: 'how-title', class: 'section__title', text: 'Entender seus direitos não precisa ser complicado.' }),
    h('ol', { class: 'steps' }, steps.map(([ic, t, d], i) => h('li', { class: 'steps__item' }, h('span', { class: 'steps__icon' }, icon(ic, { size: 28 })), h('h3', { text: `${i + 1}. ${t}` }), h('p', { text: d })))),
  );

  return {
    title: `${site.name} — ${site.slogan}`,
    description: 'Descubra o que a lei diz, entenda o que você pode fazer e encontre caminhos para situações do dia a dia. Sem juridiquês.',
    main: h('div', {}, hero, guideCard, cats, pop, how),
  };
}
