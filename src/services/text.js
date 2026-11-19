// Utilitários de texto puros (funcionam no navegador e no Node).

const STOPWORDS = new Set([
  'a', 'o', 'as', 'os', 'um', 'uma', 'de', 'da', 'do', 'das', 'dos', 'em', 'no', 'na', 'nos', 'nas',
  'e', 'ou', 'que', 'se', 'por', 'para', 'pra', 'com', 'sem', 'meu', 'minha', 'meus', 'minhas',
  'eu', 'me', 'mim', 'foi', 'ser', 'estou', 'esta', 'esse', 'essa', 'isso', 'ao', 'aos', 'ja', 'nao', 'nem', 'mas',
]);

/** Minúsculas, sem acentos, espaços normalizados. */
export function normalize(text) {
  return String(text ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Quebra em termos úteis para busca (sem stopwords, exceto se só houver stopwords). */
export function tokenize(text) {
  const all = normalize(text).split(' ').filter(Boolean);
  const useful = all.filter((t) => !STOPWORDS.has(t) && t.length > 1);
  return useful.length ? useful : all;
}

/** Formata data ISO (aaaa-mm-dd) como dd/mm/aaaa. */
export function formatDate(iso) {
  if (!iso) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  return m ? `${m[3]}/${m[2]}/${m[1]}` : null;
}
