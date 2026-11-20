'use strict';
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const port = Number(process.env.PORT) || 3000;
const mime = { '.pdf': 'application/pdf', '.json': 'application/json; charset=utf-8', '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.gif': 'image/gif' };
const imageDirectory = path.join(root, 'assets/images');
const imageName = /^[\p{L}\p{N}_ .-]+\.(png|jpe?g|webp|svg|ico|gif)$/iu;
const allowed = new Set(['/','/index.html','/style.css','/script.js','/assets/referanslar.json']);
const catalogueRoute = '/referans-katalogu.pdf';
const catalogueFile = 'Gündoğdu Mekanik — Referans Kataloğu.pdf';
const server = http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405); return res.end('Method Not Allowed'); }
  let urlPath;
  try { urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
  catch { res.writeHead(400); return res.end('Bad Request'); }
  if (urlPath === '/health') {
    res.writeHead(200, { 'Content-Type': mime['.json'] });
    return res.end(req.method === 'HEAD' ? undefined : '{"status":"ok"}');
  }
  if (urlPath === '/api/projects') {
    return fs.readdir(imageDirectory, { withFileTypes: true }, (err, entries) => {
      const headers = { 'Content-Type': mime['.json'], 'Cache-Control': 'no-store' };
      if (err) {
        res.writeHead(500, headers);
        return res.end(req.method === 'HEAD' ? undefined : '{"error":"Project images unavailable"}');
      }
      const names = entries.filter(entry => entry.isFile() && /^proje-.+/i.test(entry.name) && imageName.test(entry.name))
        .map(entry => entry.name)
        .sort((left, right) => left.localeCompare(right, 'tr', { numeric: true }));
      res.writeHead(200, headers);
      return res.end(req.method === 'HEAD' ? undefined : JSON.stringify(names));
    });
  }
  if (urlPath === '/') urlPath = '/index.html';
  const imagePrefix = '/assets/images/';
  const isImage = urlPath.startsWith(imagePrefix) && imageName.test(urlPath.slice(imagePrefix.length));
  const isCatalogue = urlPath === catalogueRoute;
  if (!allowed.has(urlPath) && !isImage && !isCatalogue) { res.writeHead(404); return res.end('Not Found'); }
  const filename = path.resolve(root, isCatalogue ? path.join('assets', catalogueFile) : '.' + urlPath);
  if (!filename.startsWith(root + path.sep)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.stat(filename, (err, stats) => {
    if (err || !stats.isFile()) { res.writeHead(404); return res.end('Not Found'); }
    const headers = {
      'Content-Type': mime[path.extname(filename).toLowerCase()] || 'application/octet-stream',
      'Content-Length': stats.size,
      'X-Content-Type-Options': 'nosniff'
    };
    if (isCatalogue) {
      headers['Content-Disposition'] = `attachment; filename="referans-katalogu.pdf"; filename*=UTF-8''${encodeURIComponent(catalogueFile)}`;
    }
    res.writeHead(200, headers);
    if (req.method === 'HEAD') return res.end();
    fs.createReadStream(filename).pipe(res);
  });
});
server.listen(port, '0.0.0.0', () => console.log(`GMIA site: http://localhost:${port}`));
