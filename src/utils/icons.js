import { svg } from './dom.js';

// Ícones lineares próprios (traço 1.8), desenhados para este projeto. Sem dependência externa.
const P = {
  'shopping-bag': ['M6 7h12l1 13H5L6 7z', 'M9 7a3 3 0 0 1 6 0'],
  briefcase: ['M4 8h16v11H4z', 'M9 8V6h6v2', 'M4 13h16'],
  'heart-pulse': ['M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10z', 'M7 12h3l1.5-3 2 5 1.5-2H17'],
  home: ['M4 11l8-7 8 7', 'M6 10v10h12V10', 'M10 20v-5h4v5'],
  'shield-phone': ['M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z', 'M10 9h4v6h-4z'],
  'book-open': ['M12 6c-2-1.5-5-2-8-2v13c3 0 6 .5 8 2 2-1.5 5-2 8-2V4c-3 0-6 .5-8 2z', 'M12 6v13'],
  landmark: ['M3 9l9-5 9 5', 'M5 9v9', 'M10 9v9', 'M14 9v9', 'M19 9v9', 'M3 20h18'],
  search: ['M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14z', 'M20 20l-4-4'],
  compass: ['M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z', 'M15.5 8.5l-2 5-5 2 2-5 5-2z'],
  arrow: ['M5 12h14', 'M13 6l6 6-6 6'],
  menu: ['M4 7h16', 'M4 12h16', 'M4 17h16'],
  close: ['M6 6l12 12', 'M18 6L6 18'],
  list: ['M8 7h12', 'M8 12h12', 'M8 17h12', 'M4 7h.01', 'M4 12h.01', 'M4 17h.01'],
  file: ['M7 3h7l4 4v14H7z', 'M14 3v4h4', 'M10 12h5', 'M10 16h5'],
  external: ['M14 4h6v6', 'M20 4l-9 9', 'M18 14v6H4V6h6'],
  info: ['M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z', 'M12 11v5', 'M12 8h.01'],
  alert: ['M12 4l9 16H3L12 4z', 'M12 10v4', 'M12 17h.01'],
  check: ['M5 12l5 5 9-10'],
  back: ['M19 12H5', 'M11 6l-6 6 6 6'],
  refresh: ['M20 11a8 8 0 1 0-2 5.5', 'M20 5v6h-6'],
};

export function icon(name, { size = 24, label = null } = {}) {
  const paths = P[name] ?? P.file;
  const el = svg(
    'svg',
    {
      viewBox: '0 0 24 24', width: size, height: size, fill: 'none', stroke: 'currentColor',
      'stroke-width': 1.8, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', class: 'icon',
      ...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': 'true', focusable: 'false' }),
    },
    ...paths.map((d) => svg('path', { d })),
  );
  return el;
}
