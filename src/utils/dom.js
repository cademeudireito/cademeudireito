// Helpers de DOM. Todo texto entra por textContent: conteúdo JSON nunca vira HTML (docs/07 §7).

const SVG_NS = 'http://www.w3.org/2000/svg';

/** h('div', {class:'x', 'aria-label':'y', onClick: fn}, 'texto', outroNo) */
export function h(tag, attrs = {}, ...children) {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs ?? {})) {
    if (value === undefined || value === null || value === false) continue;
    if (key === 'class') el.className = value;
    else if (key === 'text') el.textContent = value;
    else if (key.startsWith('on') && typeof value === 'function')
      el.addEventListener(key.slice(2).toLowerCase(), value);
    else if (value === true) el.setAttribute(key, '');
    else el.setAttribute(key, String(value));
  }
  append(el, children);
  return el;
}

export function append(el, children) {
  for (const child of children.flat(Infinity)) {
    if (child === null || child === undefined || child === false) continue;
    el.append(child instanceof Node ? child : document.createTextNode(String(child)));
  }
  return el;
}

export function svg(tag, attrs = {}, ...children) {
  const el = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, String(v));
  for (const c of children.flat()) if (c) el.append(c);
  return el;
}

/** Cria SVG a partir de string ESTÁTICA e confiável (nunca de dados). */
export function svgFromTrustedString(markup) {
  const doc = new DOMParser().parseFromString(markup, 'image/svg+xml');
  return document.importNode(doc.documentElement, true);
}

/** Link interno (real <a>, interceptado pelo roteador). */
export function link(href, attrs, ...children) {
  return h('a', { href, ...attrs }, ...children);
}

/** Link externo: avisa que sai do site e abre em nova aba com rel seguro. */
export function externalLink(href, label, attrs = {}) {
  return h(
    'a',
    { href, target: '_blank', rel: 'noopener noreferrer', class: 'ext-link', ...attrs },
    label,
    h('span', { class: 'sr-only', text: ' (abre em nova aba, site externo)' }),
  );
}
