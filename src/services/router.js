// Roteador leve com History API. Links são <a href> reais; recarregar rota direta funciona
// porque o build gera um index.html por rota (e 404.html como fallback).

import { withBase, stripBase } from '../utils/base.js';

let routes = [];
let notFound = null;
let onRender = null;

export function defineRoutes(list, fallback, renderCallback) {
  routes = list.map(([pattern, handler]) => {
    const keys = [];
    const re = new RegExp(
      '^' + pattern.replace(/:([a-z]+)/g, (_, k) => (keys.push(k), '([a-z0-9-]+)')) + '/?$',
    );
    return { re, keys, handler };
  });
  notFound = fallback;
  onRender = renderCallback;
}

export function match(pathname) {
  for (const r of routes) {
    const m = r.re.exec(pathname);
    if (m) return { handler: r.handler, params: Object.fromEntries(r.keys.map((k, i) => [k, m[i + 1]])) };
  }
  return { handler: notFound, params: {} };
}

export async function render() {
  const { handler, params } = match(stripBase(location.pathname));
  const query = new URLSearchParams(location.search);
  await onRender(handler, { params, query });
}

export function navigate(url, { replace = false } = {}) {
  const target = new URL(withBase(url), location.origin);
  if (target.origin !== location.origin) {
    location.href = target.href;
    return;
  }
  const same = target.pathname === location.pathname && target.search === location.search;
  if (replace || same) history.replaceState({}, '', target.pathname + target.search + target.hash);
  else history.pushState({}, '', target.pathname + target.search + target.hash);
  render();
}

export function startRouter() {
  window.addEventListener('popstate', render);
  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest?.('a[href]');
    if (!a || a.target === '_blank' || a.hasAttribute('download') || a.origin !== location.origin) return;
    if (a.getAttribute('href').startsWith('#')) return;
    e.preventDefault();
    navigate(a.pathname + a.search + a.hash);
  });
  render();
}
