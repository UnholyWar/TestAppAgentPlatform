# TestAppAgentPlatform

Node.js durum sayfası. Ana sayfa uygulama durumunu gösterir. `/health` uç noktası HTTP 200 ve `{"status":"ok"}` döndürür.

Yerel çalıştırma

```sh
node server.js
```

Docker ile çalıştırma

```sh
docker build -t test-app-agent-platform .
docker run --rm -p 3000:3000 test-app-agent-platform
```

Durum sayfasını http://localhost:3000 adresinde açabilirsiniz.
