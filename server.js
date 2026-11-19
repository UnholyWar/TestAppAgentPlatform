const http = require('node:http');

const port = Number(process.env.PORT ?? 3000);
const page = `<!doctype html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>TestAppAgentPlatform</title>
  <style>
    body { margin: 0; min-height: 100vh; display: grid; place-items: center;
      background: #eef3f5; color: #182933; font: 1rem system-ui, sans-serif; }
    main { margin: 1rem; padding: clamp(1rem, 5vw, 3rem);
      background: #fff; border-radius: 1rem; box-shadow: 0 12px 36px #18293314; }
    h1 { margin-top: 0; overflow-wrap: anywhere; }
    p { color: #176343; }
  </style>
</head>
<body><main><h1>TestAppAgentPlatform</h1><p>Uygulama çalışıyor.</p></main></body>
</html>`;

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
  } else if (path === '/health') {
    type = 'application/json';
    body = JSON.stringify({ status: 'ok' });
  } else {
    status = 404;
  }

  response.writeHead(status, { 'Content-Type': `${type}; charset=utf-8` });
  response.end(request.method === 'HEAD' ? undefined : body);
}).listen(port, '0.0.0.0');
