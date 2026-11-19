const http = require('node:http');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');

const port = Number(process.env.PORT ?? 3000);
const page = readFileSync(join(__dirname, 'assets/index.html'), 'utf8');
const logo = readFileSync(join(__dirname, 'assets/logo.jpg'));

http.createServer((request, response) => {
  const path = request.url.split('?', 1)[0];
  let status = 200;
  let type = 'text/plain; charset=utf-8';
  let body = 'Sayfa bulunamadı.';

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    status = 405;
    body = 'Yönteme izin verilmedi.';
    response.setHeader('Allow', 'GET, HEAD');
  } else if (path === '/') {
    type = 'text/html; charset=utf-8';
    body = page;
  } else if (path === '/assets/logo.jpg') {
    type = 'image/jpeg';
    body = logo;
  } else if (path === '/health') {
    type = 'application/json; charset=utf-8';
    body = JSON.stringify({ status: 'ok' });
  } else {
    status = 404;
  }

  response.writeHead(status, { 'Content-Type': type });
  response.end(request.method === 'HEAD' ? undefined : body);
}).listen(port, '0.0.0.0');
