// Build estático sem dependências. Gera dist/ (público) ou dist-preview/ (--preview).
// Público: contém SOMENTE conteúdo `published`. Rascunhos nunca entram em dist/.
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { ROOT, SRC, loadAllData } from './lib-data.mjs';
import { validateContent, buildPublicContent } from '../src/services/content.js';

const strict = process.argv.includes('--strict');
const OUT = path.join(ROOT, strict ? 'dist-strict' : 'dist');

const data = await loadAllData();
const site0 = data.site;
const { errors, warnings } = validateContent(data);
if (errors.length) {
  console.error(`Build abortado: ${errors.length} erro(s) de conteúdo`);
  errors.forEach((e) => console.error(' ✗', e));
  process.exit(1);
}

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });
await cp(SRC, OUT, { recursive: true, filter: (p) => !p.startsWith(path.join(SRC, 'data')) && path.basename(p) !== 'index.html' });
await cp(path.join(ROOT, 'public'), OUT, { recursive: true });

// ---- conteúdo ----
// Política (decisão do responsável): site.json "draftVisibility": "show" exibe conteúdo em revisão
// com aviso claro; --strict (ou "hide") publica somente `published`. `archived` nunca é exibido.
const includeDrafts = !strict && site0.draftVisibility === 'show';
const pub = buildPublicContent(data, { includeDrafts });
// Notas internas de revisão nunca vão ao site.
pub.articles = pub.articles.map(({ reviewNotes, ...rest }) => rest);
pub.guides = pub.guides.map(({ reviewNotes, ...rest }) => rest);
const content = { includeDrafts, site: data.site, ...pub };
await mkdir(path.join(OUT, 'data'), { recursive: true });
await writeFile(path.join(OUT, 'data', 'content.json'), JSON.stringify(content));

// ---- HTML por rota (URLs diretas funcionam em qualquer hospedagem estática) ----
const shell = await readFile(path.join(SRC, 'index.html'), 'utf8');
const site = data.site;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const base = site.siteUrl ? site.siteUrl.replace(/\/$/, '') : null;

function page(route, title, description, noindex = false) {
  const full = title.includes(site.name) ? title : `${title} — ${site.name}`;
  let html = shell
    .replace(/<title>.*?<\/title>/, `<title>${esc(full)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(description)}$2`);
  const extra = [
    `<meta property="og:title" content="${esc(full)}">`,
    `<meta property="og:description" content="${esc(description)}">`,
    '<meta property="og:type" content="website">',
    '<meta property="og:locale" content="pt_BR">',
  ];
  if (base) extra.push(`<link rel="canonical" href="${base}${route}">`, `<meta property="og:url" content="${base}${route}">`);
  extra.push(noindex ? '<meta name="robots" content="noindex, nofollow">' : '<meta name="robots" content="index, follow">');
  return html.replace('<!--HEAD_EXTRA-->', extra.join('\n  '));
}

const routes = [
  ['/', `${site.name} — ${site.slogan}`, 'Descubra o que a lei diz, entenda o que você pode fazer e encontre caminhos para situações do dia a dia. Sem juridiquês.'],
  ['/enciclopedia/', 'Enciclopédia de direitos', 'Encontre situações do dia a dia explicadas em linguagem simples, organizadas por categoria.'],
  ['/orientador/', 'Encontrar meus direitos', 'Responda perguntas simples, uma por vez, e encontre conteúdos relevantes para a sua situação.'],
  ...content.categories.map((c) => [`/categoria/${c.slug}/`, c.title, c.description]),
  ...content.articles.map((a) => [`/assunto/${a.slug}/`, a.title, a.summary, a.status !== 'published']),
  ...content.guides.map((g) => [`/orientador/${g.slug}/`, g.title, g.description, g.status !== 'published']),
  ...content.pages.map((p) => [`/${p.slug}/`, p.title, p.description]),
];
for (const [route, title, desc, noindex] of routes) {
  const file = route === '/' ? path.join(OUT, 'index.html') : path.join(OUT, route, 'index.html');
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, page(route, title, desc, noindex));
}
await writeFile(path.join(OUT, '404.html'), page('/404', 'Página não encontrada', 'A página que você procura não existe ou ainda não foi publicada.'));

// ---- sitemap / robots ----
if (base) {
  const urls = routes.filter(([, , , noindex]) => !noindex).map(([r]) => `  <url><loc>${base}${r}</loc></url>`).join('\n');
  await writeFile(path.join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
  await writeFile(path.join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`);
} else {
  console.warn('Aviso: "siteUrl" não definido em src/data/site.json — sitemap.xml e canonical não foram gerados.');
}

const unvalidated = content.articles.filter((a) => a.status !== 'published').length;
console.log(`✓ Build ${strict ? 'ESTRITO (só validados)' : includeDrafts ? 'com conteúdo em revisão visível' : 'público'} em ${path.relative(ROOT, OUT)}/`);
console.log(`  páginas: ${routes.length + 1} | artigos: ${content.articles.length} (${unvalidated} em revisão, noindex) | guias: ${content.guides.length}`);
console.log(`  excluídos do build: ${data.articles.length - content.articles.length} artigos, ${data.guides.length - content.guides.length} guias`);
