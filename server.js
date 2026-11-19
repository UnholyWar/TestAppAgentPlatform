const http = require('node:http');

const port = Number(process.env.PORT ?? 3000);
const page = `<!doctype html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>UnholyWar | Geliştirici Portfolyosu</title>
  <meta name="description" content="UnholyWar’ın geliştirici portfolyosu ve açık kaynak projeleri.">
  <style>
    :root { color-scheme: dark; background: #121411; color: #f5f4ec;
      font: 1rem/1.6 system-ui, sans-serif; }
    * { box-sizing: border-box; }
    body { margin: 0; }
    .wrap { width: min(100% - 2.5rem, 65rem); margin-inline: auto; }
    a { color: inherit; text-underline-offset: .25em; }
    a:focus-visible { outline: 2px solid #d9f27b; outline-offset: 4px; }
    header, footer { border-block-end: 1px solid #353a30; }
    .bar { display: flex; align-items: center; justify-content: space-between;
      gap: 1rem; flex-wrap: wrap; padding-block: 1.15rem; }
    .brand, nav a { text-decoration: none; }
    .brand { font-weight: 750; }
    nav { display: flex; flex-wrap: wrap; gap: clamp(.75rem, 3vw, 1.75rem); }
    nav a:hover, .text-link { color: #d9f27b; }
    .hero { padding-block: clamp(4rem, 11vw, 8rem); }
    h1, h2, h3, p { margin: 0; }
    h1, h2 { line-height: 1.04; letter-spacing: -.06em; }
    h1 { font-size: clamp(2.8rem, 9vw, 7rem); overflow-wrap: anywhere; }
    h1 span { display: block; color: #d9f27b; }
    h2 { font-size: clamp(2rem, 5vw, 3.65rem); }
    .intro { max-width: 42ch; margin-block: 1.5rem 2rem; color: #c2c7b9; }
    .button { display: inline-block; background: #d9f27b; color: #121411;
      padding: .7rem 1.15rem; border-radius: .25rem; font-weight: 700; text-decoration: none; }
    .button:hover { background: #efffb8; }
    section + section { border-block-start: 1px solid #353a30; }
    .section { padding-block: clamp(2rem, 6vw, 4rem); }
    .project { display: grid; grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
      margin-top: 1.5rem; border: 1px solid #353a30; border-radius: .5rem; overflow: hidden;
      background: #1d211b; }
    .project-content { padding: clamp(1.25rem, 4vw, 2.5rem); }
    .project h3 { font-size: clamp(1.3rem, 4vw, 2rem); overflow-wrap: anywhere; }
    .project p { color: #c2c7b9; margin-block: .55rem 1.25rem; }
    .pattern { background-color: #d9f27b; background-image:
      repeating-linear-gradient(135deg, transparent 0 16px, #141810 17px 18px, transparent 19px 25px); }
    footer { border-block-start: 1px solid #353a30; border-block-end: 0; color: #c2c7b9; }
    @media (max-width: 36rem) {
      .project { grid-template-columns: 1fr; }
      .pattern { min-height: 4rem; grid-row: 1; }
    }
  </style>
</head>
<body>
  <header>
    <div class="bar wrap">
      <a class="brand" href="/">UnholyWar</a>
      <nav aria-label="Ana gezinme">
        <a href="#projeler">Projeler</a>
        <a href="https://github.com/UnholyWar">GitHub</a>
      </nav>
    </div>
  </header>
  <main class="wrap">
    <section class="hero" aria-labelledby="baslik">
      <h1 id="baslik">UnholyWar <span>Geliştirici portfolyosu</span></h1>
      <p class="intro">Web projelerim ve kaynak kodları.</p>
      <a class="button" href="#projeler">Projeleri keşfet</a>
    </section>
    <section class="section" id="projeler" aria-labelledby="projeler-baslik">
      <h2 id="projeler-baslik">Projeler</h2>
      <article class="project">
        <div class="project-content">
          <h3>TestAppAgentPlatform</h3>
          <p>Node.js ile sunulan ve Docker üzerinde çalışan bu tek sayfalık portfolyo.</p>
          <a class="text-link" href="https://github.com/UnholyWar/TestAppAgentPlatform">Kaynak kodu incele</a>
        </div>
        <div class="pattern" aria-hidden="true"></div>
      </article>
    </section>
  </main>
  <footer><div class="bar wrap"><span>UnholyWar</span><a href="https://github.com/UnholyWar">GitHub profili</a></div></footer>
</body>
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
