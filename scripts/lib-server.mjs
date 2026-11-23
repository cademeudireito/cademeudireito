import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml; charset=utf-8', '.png': 'image/png', '.woff2': 'font/woff2',
};

async function exists(p) {
  try { return (await stat(p)).isFile(); } catch { return false; }
}

/** Servidor estático simples. `virtual(url)` pode devolver {body,type} para URLs geradas. */
export function serve({ root, port, virtual = null, fallbackHtml, basePath = '' }) {
  const server = http.createServer(async (req, res) => {
    try {
      const url = new URL(req.url, 'http://localhost');
      let pathname = decodeURIComponent(url.pathname);
      if (basePath && (pathname === basePath || pathname.startsWith(basePath + '/'))) pathname = pathname.slice(basePath.length) || '/';
      const v = virtual && (await virtual(pathname));
      if (v) { res.writeHead(200, { 'Content-Type': v.type }); return res.end(v.body); }
      const safe = path.normalize(pathname).replace(/^(\.\.[/\\])+/, '');
      let file = path.join(root, safe);
      if (!file.startsWith(root)) { res.writeHead(403); return res.end('Forbidden'); }
      if (!(await exists(file)) && (await exists(path.join(file, 'index.html')))) file = path.join(file, 'index.html');
      let status = 200;
      if (!(await exists(file))) {
        if (path.extname(pathname)) { res.writeHead(404); return res.end('Not found'); }
        file = await fallbackHtml(pathname);
        if (file.status) status = file.status;
        file = file.path;
      }
      const body = await readFile(file);
      res.writeHead(status, { 'Content-Type': TYPES[path.extname(file)] ?? 'application/octet-stream', 'Cache-Control': 'no-cache' });
      res.end(body);
    } catch (err) {
      res.writeHead(500); res.end(String(err));
    }
  });
  server.listen(port, () => console.log(`Servindo ${root} em http://localhost:${port}`));
  return server;
}
