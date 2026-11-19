const http = require('node:http');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');

const port = Number(process.env.PORT ?? 3000);
const page = readFileSync(join(__dirname, 'assets/index.html'), 'utf8');
const photo = readFileSync(join(__dirname, 'assets/kupa.jpg'));

http.createServer((request, response) => {
  const path = request.url.split('?', 1)[0];
  let status = 200;
  let type = 'text/plain';
  let body = 'Sayfa bulunamadı.';

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    status = 405;
    body = 'Yönteme izin verilmedi.';
    response.setHeader('Allow', 'GET, HEAD');
  } else if (path === '/') {
    type = 'text/html';
    body = page;
  } else if (path === '/assets/kupa.jpg') {
    type = 'image/jpeg';
    body = photo;
  } else if (path === '/health') {
    type = 'application/json';
    body = JSON.stringify({ status: 'ok' });
  } else {
    status = 404;
  }

  const contentType = type.startsWith('image/') ? type : `${type}; charset=utf-8`;
  response.writeHead(status, { 'Content-Type': contentType });
  response.end(request.method === 'HEAD' ? undefined : body);
}).listen(port, '0.0.0.0');
