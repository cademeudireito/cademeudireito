// Busca da enciclopédia — roda inteira no navegador, sem servidor e sem enviar nada a ninguém.
//
// Como funciona (de forma determinística, sem IA):
//  1. Normaliza o texto (sem acento, minúsculas) e reduz cada palavra ao "radical"
//     (pagou, pagar, pagamento → "pag"), para achar variações da mesma palavra.
//  2. Tolera erros de digitação (troca, falta ou sobra de letra) e aceita palavra pela metade.
//  3. Entende expressões equivalentes (ex.: "mandaram embora" = "demitido") a partir dos
//     grupos de src/data/search.json.
//  4. Ordena por relevância: título e palavras-chave valem mais do que o texto do corpo,
//     e palavras raras valem mais do que palavras comuns.
//  5. Só mostra resultado se a busca for bem coberta. Se a pessoa procurar algo que o site
//     não tem, a lista vem vazia (a tela então oferece "sugerir tema").
import { normalize } from './text.js';

const STOP = new Set([
  'a', 'o', 'as', 'os', 'um', 'uma', 'uns', 'umas', 'de', 'da', 'do', 'das', 'dos', 'em', 'no', 'na', 'nos', 'nas',
  'e', 'ou', 'que', 'se', 'por', 'pra', 'para', 'com', 'sem', 'meu', 'minha', 'meus', 'minhas', 'seu', 'sua',
  'eu', 'me', 'mim', 'te', 'foi', 'ser', 'estou', 'esta', 'esse', 'essa', 'isso', 'ao', 'aos', 'ja', 'nao', 'nem',
  'mas', 'como', 'qual', 'quais', 'quando', 'onde', 'quem', 'posso', 'pode', 'podem', 'tenho', 'tem', 'ter',
  'quero', 'preciso', 'precisa', 'fui', 'sobre', 'mais', 'muito', 'la', 'ele', 'ela', 'eles', 'elas', 'ficou',
  'esta', 'estao', 'ha', 'vai', 'vou', 'estava', 'meio', 'so', 'tambem', 'todo', 'toda', 'sao', 'sera', 'ate',
]);

// Peso de cada campo. "strong" = campos que descrevem o assunto (o corpo do texto, sozinho, não basta).
const W = { title: 5, keywords: 4, synonyms: 4, category: 1.2, summary: 2.5, quick: 2, body: 0.7 };
const MIN_COVERAGE = 0.6;
const GROUP_FACTOR = 0.85;
const MIN_RELATIVE = 0.4;

// Sufixos removidos para chegar ao radical (do mais longo para o mais curto).
const SUFFIXES = ['amento', 'imento', 'mente', 'adora', 'ador', 'acao', 'ando', 'endo', 'indo', 'aram', 'eram', 'iram', 'avam', 'ado', 'ido', 'ada', 'ida', 'ou', 'ei', 'ar', 'er', 'ir', 'ao', 'o', 'a', 'e'];

/** Aproxima o som: "atrazado" e "atrasado", "xave" e "chave" ficam iguais. */
function phon(w) {
  return w
    .replace(/^h/, '')
    .replace(/ph/g, 'f')
    .replace(/ss|sc(?=[ei])|c(?=[ei])|z/g, 's')
    .replace(/ch|x/g, '§')
    .replace(/qu|c/g, 'k')
    .replace(/g(?=[ei])/g, 'j')
    .replace(/§/g, 'ch')
    .replace(/y/g, 'i')
    .replace(/w/g, 'u');
}

/** Radical aproximado de uma palavra já normalizada (e com o som aproximado). */
export function stem(word) {
  return phon(rawStem(word));
}

function rawStem(word) {
  if (word.length <= 3 || /^\d/.test(word)) return word;
  let s = word.replace(/(oes|aes)$/, 'ao').replace(/ais$/, 'al').replace(/eis$/, 'el').replace(/ns$/, 'm').replace(/(res|zes)$/, (m) => m[0]);
  if (s.endsWith('s') && s.length > 3) s = s.slice(0, -1);
  for (const suf of SUFFIXES) {
    if (s.length - suf.length >= 3 && s.endsWith(suf)) {
      s = s.slice(0, -suf.length);
      break;
    }
  }
  return s;
}

/** Distância de edição (com troca de letras vizinhas); para cedo se passar de `max`. */
export function distance(a, b, max = 2) {
  if (a === b) return 0;
  if (Math.abs(a.length - b.length) > max) return max + 1;
  const prev2 = new Array(b.length + 1);
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let rowMin = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      let v = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) v = Math.min(v, prev2[j - 2] + 1);
      cur[j] = v;
      if (v < rowMin) rowMin = v;
    }
    if (rowMin > max) return max + 1;
    for (let j = 0; j <= b.length; j++) prev2[j] = prev[j];
    prev = cur;
  }
  return prev[b.length];
}

function words(text) {
  return normalize(text).split(' ').filter((w) => w.length > 1 && !STOP.has(w));
}
function stems(text) {
  return words(text).map(stem);
}
function bodyText(article) {
  const s = article.sections ?? {};
  return [s.explanation, ...(s.whenApplies ?? []), ...(s.exceptions ?? []), ...(s.steps ?? []), ...(s.documentsToKeep ?? []), ...(s.ifDenied ?? [])].filter(Boolean).join(' ');
}

/**
 * Cria o índice. `articles` deve conter apenas o que pode ser exibido.
 * @param {Array} articles
 * @param {Array} categories
 * @param {{groups?: string[][]}} searchData  grupos de expressões equivalentes
 */
export function buildIndex(articles, categories = [], searchData = {}) {
  const catTitle = new Map(categories.map((c) => [c.id, c.title]));
  const vocab = new Map(); // radical -> Map(posição do artigo -> {w, strong})
  const entries = articles.map((article, idx) => {
    const add = (text, weight, strong) => {
      for (const st of stems(text)) {
        let post = vocab.get(st);
        if (!post) vocab.set(st, (post = new Map()));
        const cur = post.get(idx);
        if (!cur) post.set(idx, { w: weight, strong });
        else {
          cur.w = Math.max(cur.w, weight);
          cur.strong = cur.strong || strong;
        }
      }
    };
    add(article.title, W.title, true);
    for (const k of article.keywords ?? []) add(k, W.keywords, true);
    for (const k of article.synonyms ?? []) add(k, W.synonyms, true);
    add(article.summary, W.summary, true);
    add(article.quickAnswer, W.quick, true);
    add(catTitle.get(article.category) ?? '', W.category, false);
    add(bodyText(article), W.body, false);
    return {
      article,
      phrases: [article.title, ...(article.keywords ?? []), ...(article.synonyms ?? [])].map((t) => stems(t).join(' ')),
    };
  });

  const phrases = [];
  (searchData.groups ?? []).forEach((group, gid) => {
    for (const text of group) {
      const st = stems(text);
      if (st.length) phrases.push({ gid, stems: st });
    }
  });
  phrases.sort((a, b) => b.stems.length - a.stems.length);

  return { entries, vocab, phrases, cache: new Map(), n: entries.length };
}

const idfOf = (index, post) => Math.log(1 + (index.n - post.size + 0.5) / (post.size + 0.5));

/** Radicais do vocabulário parecidos com `st`, com a força do parentesco. */
function candidates(index, st, partial = false) {
  const key = partial ? '~' + st : st;
  const hit = index.cache.get(key);
  if (hit) return hit;
  const out = [];
  const maxD = st.length >= 10 ? 2 : st.length >= 6 ? 1 : 0;
  for (const v of index.vocab.keys()) {
    let sc = 0;
    if (v === st) sc = 1;
    else if (st.length >= 3 && v.startsWith(st) && (st.length >= 0.5 * v.length || partial)) sc = 0.65; // palavra pela metade
    else if (v.length >= 4 && st.startsWith(v)) sc = 0.6; // cobr → cobranc
    else if (maxD) {
      const d = distance(st, v, maxD);
      if (d <= maxD) sc = d === 1 ? 0.7 : 0.5; // erro de digitação
    }
    if (sc) out.push([v, sc]);
  }
  index.cache.set(key, out);
  return out;
}

const sameStem = (a, b) => a === b || (a.length >= 5 && b.length >= 5 && distance(a, b, 1) <= 1);

/** Pontuação, por artigo, de um radical digitado: Map(idx -> {val, strong}) e a "massa" (raridade) da palavra. */
function scoreStem(index, st, partial = false) {
  const per = new Map();
  let mass = 0;
  let bestSc = 0;
  for (const [v, sc] of candidates(index, st, partial)) {
    const post = index.vocab.get(v);
    const idf = idfOf(index, post);
    if (sc > bestSc || (sc === bestSc && idf > mass)) {
      bestSc = sc;
      mass = idf;
    }
    for (const [idx, p] of post) {
      const val = sc * p.w * idf;
      const cur = per.get(idx);
      if (!cur || val > cur.val) per.set(idx, { val, strong: p.strong });
    }
  }
  if (!per.size) mass = Math.log(1 + (index.n + 0.5) / 0.5); // palavra desconhecida: pesa como a mais rara
  return { per, mass };
}

/** Artigos que têm todas as palavras da expressão (exatas, em campos de descrição). */
function scorePhrase(index, phraseStems) {
  let acc = null;
  for (const st of phraseStems) {
    const post = index.vocab.get(st);
    if (!post) return new Map();
    const idf = idfOf(index, post);
    const next = new Map();
    for (const [idx, p] of post) {
      if (!p.strong) continue;
      if (acc === null) next.set(idx, p.w * idf);
      else if (acc.has(idx)) next.set(idx, acc.get(idx) + p.w * idf);
    }
    acc = next;
    if (!acc.size) return acc;
  }
  return acc ?? new Map();
}

/**
 * Busca. Devolve [{article, score}] ordenado por relevância e depois por título.
 * Lista vazia quando o site não tem o assunto procurado.
 */
export function search(index, query, { category = null } = {}) {
  const all = normalize(query).split(' ').filter((w) => w.length > 0);
  let toks = all.filter((w) => w.length > 1 && !STOP.has(w));
  if (!toks.length) toks = all.filter((w) => w.length > 1);
  if (!toks.length) return [];
  const qs = toks.map(stem);

  // 1) unidades da busca: palavras soltas ou expressões que existem nos grupos de equivalência
  const units = [];
  for (let i = 0; i < qs.length; ) {
    let len = 0;
    const alts = [];
    for (const ph of index.phrases) {
      const L = ph.stems.length;
      if (L > qs.length - i || (len && L < len)) continue;
      if (ph.stems.every((s, k) => sameStem(qs[i + k], s))) {
        if (!len) len = L;
        alts.push(ph);
      }
    }
    if (len) {
      const gids = new Set(alts.map((p) => p.gid));
      const span = qs.slice(i, i + len);
      const others = index.phrases.filter((p) => gids.has(p.gid) && p.stems.join(' ') !== span.join(' '));
      units.push({ span, alts: others.map((p) => p.stems) });
      i += len;
    } else {
      units.push({ span: [qs[i]], alts: [] });
      i += 1;
    }
  }

  // 2) pontuação por unidade (a última palavra digitada pode estar pela metade)
  const last = true;
  const scored = units.map((u) => {
    const parts = u.span.map((st) => scoreStem(index, st, last && u === units[units.length - 1] && st === u.span[u.span.length - 1]));
    const mass = parts.reduce((m, p) => m + p.mass, 0);
    const per = new Map();
    for (const p of parts) {
      for (const [idx, v] of p.per) {
        const cur = per.get(idx) ?? { val: 0, strong: false };
        per.set(idx, { val: cur.val + v.val, strong: cur.strong || v.strong });
      }
    }
    for (const alt of u.alts) {
      for (const [idx, val] of scorePhrase(index, alt)) {
        const v = val * GROUP_FACTOR;
        const cur = per.get(idx);
        if (!cur || v > cur.val) per.set(idx, { val: v, strong: true });
      }
    }
    return { per, mass };
  });
  const totalMass = scored.reduce((m, u) => m + u.mass, 0);
  const normQuery = qs.join(' ');

  // 3) junta por artigo
  const results = [];
  index.entries.forEach((entry, idx) => {
    if (category && entry.article.category !== category) return;
    let score = 0;
    let matched = 0;
    let strong = false;
    for (const u of scored) {
      const v = u.per.get(idx);
      if (!v) continue;
      score += v.val;
      matched += u.mass;
      strong = strong || v.strong;
    }
    if (!strong || matched / totalMass < MIN_COVERAGE) return;
    if (entry.phrases.some((p) => p === normQuery || (normQuery.length >= 5 && p.includes(normQuery)))) score += 3;
    results.push({ article: entry.article, score });
  });
  results.sort((a, b) => b.score - a.score || a.article.title.localeCompare(b.article.title, 'pt-BR'));
  // descarta o que é muito menos relevante que o melhor resultado
  const top = results[0]?.score ?? 0;
  return results.filter((r) => r.score >= top * MIN_RELATIVE);
}
