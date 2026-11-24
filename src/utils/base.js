// Prefixo de caminho (ex.: "/cademeudireito" no GitHub Pages de projeto). Vem do <meta name="base-path">
// que o build escreve em cada página; vazio quando o site é servido na raiz.
const meta = typeof document !== 'undefined' ? document.querySelector('meta[name="base-path"]') : null;
export const BASE = (meta?.content ?? '').replace(/\/+$/, '');

const hasBase = (p) => BASE !== '' && (p === BASE || p.startsWith(BASE + '/'));

/** Acrescenta o prefixo a caminhos internos absolutos ("/enciclopedia/"). */
export function withBase(p) {
  return typeof p === 'string' && p.startsWith('/') && !p.startsWith('//') && !hasBase(p) ? BASE + p : p;
}

/** Remove o prefixo de um pathname, para casar com as rotas. */
export function stripBase(p) {
  return hasBase(p) ? p.slice(BASE.length) || '/' : p;
}
