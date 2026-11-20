// Modelo, regras de publicação e validação de conteúdo (docs/04 e docs/07).
// Módulo puro: usado pelo navegador, pelo build e pelos scripts de validação.
import { validateGuide } from './guideEngine.js';

export const ARTICLE_STATUSES = ['draft', 'pending_review', 'published', 'outdated', 'archived'];
export const REVIEW_STATUSES = ['pending_review', 'in_review', 'approved'];
export const REF_STATUSES = ['pending_verification', 'verified', 'changed', 'revoked', 'uncertain'];
export const SPHERES = ['federal', 'estadual', 'distrital', 'municipal'];
export const ICON_NAMES = [
  'shopping-bag', 'briefcase', 'heart-pulse', 'home', 'shield-phone', 'book-open', 'landmark',
];

export const STATUS_LABELS = {
  draft: 'Em revisão · ainda não validado',
  pending_review: 'Em revisão · ainda não validado',
  published: 'Validado',
  outdated: 'Pode estar desatualizado',
  archived: 'Arquivado',
};

/** Somente `published` é público (docs/04 §6). */
export function isPublic(item) {
  return item?.status === 'published';
}

export function filterPublic(items) {
  return items.filter(isPublic);
}

function isHttpUrl(value) {
  try {
    const u = new URL(value);
    return u.protocol === 'https:' || u.protocol === 'http:';
  } catch {
    return false;
  }
}

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Valida todo o conteúdo. Retorna { errors, warnings }.
 * `warnings` = pendências esperadas em rascunhos (ex.: referência sem URL verificada).
 */
export function validateContent({ categories, articles, guides, pages = [] }) {
  const errors = [];
  const warnings = [];

  const catIds = new Set();
  const catSlugs = new Set();
  for (const c of categories) {
    for (const f of ['id', 'slug', 'title', 'description', 'icon', 'order'])
      if (c[f] === undefined || c[f] === '') errors.push(`Categoria ${c.id ?? '?'}: campo "${f}" ausente`);
    if (catIds.has(c.id)) errors.push(`Categoria duplicada: id ${c.id}`);
    if (catSlugs.has(c.slug)) errors.push(`Categoria duplicada: slug ${c.slug}`);
    if (c.slug && !SLUG_RE.test(c.slug)) errors.push(`Categoria ${c.id}: slug inválido "${c.slug}"`);
    if (c.icon && !ICON_NAMES.includes(c.icon)) errors.push(`Categoria ${c.id}: ícone desconhecido "${c.icon}"`);
    catIds.add(c.id);
    catSlugs.add(c.slug);
  }

  const ids = new Set();
  const slugs = new Set();
  const byId = new Map(articles.map((a) => [a.id, a]));
  for (const a of articles) {
    const w = `Artigo ${a.id ?? '?'}`;
    for (const f of ['id', 'slug', 'title', 'category', 'summary', 'status', 'reviewStatus'])
      if (!a[f]) errors.push(`${w}: campo "${f}" ausente`);
    if (!Array.isArray(a.keywords) || a.keywords.length === 0) errors.push(`${w}: keywords ausentes`);
    if (!Array.isArray(a.legalReferences)) errors.push(`${w}: legalReferences deve ser lista`);
    if (!('lastReviewed' in a)) errors.push(`${w}: campo "lastReviewed" ausente (pode ser null)`);
    if (ids.has(a.id)) errors.push(`${w}: id duplicado`);
    if (slugs.has(a.slug)) errors.push(`${w}: slug duplicado "${a.slug}"`);
    ids.add(a.id);
    slugs.add(a.slug);
    if (a.slug && !SLUG_RE.test(a.slug)) errors.push(`${w}: slug inválido "${a.slug}" (sem acentos/maiúsculas)`);
    if (a.category && !catIds.has(a.category)) errors.push(`${w}: categoria inexistente "${a.category}"`);
    if (a.status && !ARTICLE_STATUSES.includes(a.status)) errors.push(`${w}: status inválido "${a.status}"`);
    if (a.reviewStatus && !REVIEW_STATUSES.includes(a.reviewStatus))
      errors.push(`${w}: reviewStatus inválido "${a.reviewStatus}"`);
    if (typeof a.quickAnswer !== 'string' || !a.quickAnswer) errors.push(`${w}: quickAnswer ausente`);
    const s = a.sections ?? {};
    if (!s.explanation) errors.push(`${w}: sections.explanation ausente`);
    for (const f of ['whenApplies', 'exceptions', 'steps', 'documentsToKeep', 'ifDenied'])
      if (s[f] !== undefined && !Array.isArray(s[f])) errors.push(`${w}: sections.${f} deve ser lista`);

    (a.legalReferences ?? []).forEach((r, i) => {
      const rw = `${w} ref[${i}]`;
      if (!r.name) errors.push(`${rw}: nome ausente`);
      if (!SPHERES.includes(r.sphere)) errors.push(`${rw}: esfera inválida "${r.sphere}"`);
      if (!Array.isArray(r.provisions)) errors.push(`${rw}: provisions deve ser lista`);
      if (!REF_STATUSES.includes(r.status)) errors.push(`${rw}: status inválido "${r.status}"`);
      if (r.officialUrl && !isHttpUrl(r.officialUrl)) errors.push(`${rw}: officialUrl inválida`);
      if (a.status === 'published') {
        if (!r.officialUrl) errors.push(`${rw}: referência sem URL oficial em conteúdo publicado`);
        if (r.status !== 'verified') errors.push(`${rw}: referência não verificada em conteúdo publicado`);
        if (!r.checkedAt) errors.push(`${rw}: checkedAt ausente em conteúdo publicado`);
      } else if (!r.officialUrl) {
        warnings.push(`${w}: "${r.name}" — URL oficial específica ainda não registrada`);
      }
    });

    for (const rel of a.relatedArticles ?? [])
      if (!byId.has(rel)) errors.push(`${w}: artigo relacionado inexistente "${rel}"`);

    if (a.status === 'published') {
      if (a.reviewStatus !== 'approved') errors.push(`${w}: publicado sem reviewStatus "approved"`);
      if (!a.lastReviewed) errors.push(`${w}: publicado sem lastReviewed`);
      if (!a.legalReferences?.length) errors.push(`${w}: publicado sem referências legais`);
      for (const rel of a.relatedArticles ?? [])
        if (byId.get(rel) && byId.get(rel).status !== 'published')
          errors.push(`${w}: publicado, mas relacionado "${rel}" não está publicado`);
    }
  }

  const gIds = new Set();
  const gSlugs = new Set();
  for (const g of guides) {
    const w = `Guia ${g.id ?? '?'}`;
    for (const f of ['id', 'slug', 'title', 'description', 'status', 'startQuestion', 'reviewStatus'])
      if (!g[f]) errors.push(`${w}: campo "${f}" ausente`);
    if (gIds.has(g.id)) errors.push(`${w}: id duplicado`);
    if (gSlugs.has(g.slug)) errors.push(`${w}: slug duplicado`);
    gIds.add(g.id);
    gSlugs.add(g.slug);
    if (g.slug && !SLUG_RE.test(g.slug)) errors.push(`${w}: slug inválido "${g.slug}"`);
    if (g.status && !ARTICLE_STATUSES.includes(g.status)) errors.push(`${w}: status inválido`);
    errors.push(...validateGuide(g, byId));
    if (g.status === 'published') {
      if (g.reviewStatus !== 'approved') errors.push(`${w}: publicado sem reviewStatus "approved"`);
      for (const r of Object.values(g.results ?? {})) {
        for (const aid of [r.articleId, ...(r.relatedArticleIds ?? [])]) {
          const art = byId.get(aid);
          if (art && art.status !== 'published')
            errors.push(`${w}: resultado "${r.id}" aponta para artigo não publicado "${aid}"`);
        }
      }
    }
  }

  const pSlugs = new Set();
  for (const p of pages) {
    if (!p.slug || !p.title || !Array.isArray(p.blocks)) errors.push(`Página ${p.slug ?? '?'}: slug/title/blocks ausentes`);
    if (pSlugs.has(p.slug)) errors.push(`Página duplicada: ${p.slug}`);
    pSlugs.add(p.slug);
  }

  return { errors, warnings };
}

/** Situações exibidas no site quando a política permite mostrar conteúdo em revisão. */
export const VISIBLE_WITH_DRAFTS = ['published', 'draft', 'pending_review', 'outdated'];
export const VISIBLE_STRICT = ['published'];

export function visibleStatuses(includeDrafts) {
  return includeDrafts ? VISIBLE_WITH_DRAFTS : VISIBLE_STRICT;
}

/** Conteúdo ainda não validado juridicamente (precisa de aviso na interface). */
export function isUnvalidated(item) {
  return item?.status !== 'published';
}

/**
 * Seleciona o que o site exibe. Com `includeDrafts` (decisão do responsável, site.json),
 * rascunhos aparecem com aviso; `archived` nunca aparece. Guias cujos resultados apontam
 * para artigos não exibidos são removidos (nunca quebram a página).
 */
export function buildPublicContent({ categories, articles, guides, pages = [] }, { includeDrafts = false } = {}) {
  const allowed = new Set(visibleStatuses(includeDrafts));
  const shown = articles.filter((a) => allowed.has(a.status));
  const ids = new Set(shown.map((a) => a.id));
  const cleanArticles = shown.map((a) => ({
    ...a,
    relatedArticles: (a.relatedArticles ?? []).filter((id) => ids.has(id)),
  }));
  const shownGuides = guides.filter(
    (g) =>
      allowed.has(g.status) &&
      Object.values(g.results ?? {}).every((r) =>
        [r.articleId, ...(r.relatedArticleIds ?? [])].every((id) => ids.has(id)),
      ),
  );
  return { categories, articles: cleanArticles, guides: shownGuides, pages };
}
