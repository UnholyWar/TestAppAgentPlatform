# TestAppAgentPlatform

Node.js ile sunulan tek sayfalık Gündoğdu Mekanik Tesisat tanıtım sayfası. `/health` uç noktası HTTP 200 ve `{"status":"ok"}` döndürür.

Yerel çalıştırma

```sh
node server.js
```

Docker ile çalıştırma

```sh
docker build -t test-app-agent-platform .
docker run --rm -p 3000:3000 test-app-agent-platform
```

Tanıtım sayfasını http://localhost:3000 adresinde açabilirsiniz.
