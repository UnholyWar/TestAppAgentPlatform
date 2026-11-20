# GMIA — Node.js Portfolyo Sitesi

Mevcut HTML, CSS ve JavaScript tasarımı değiştirilmeden Node.js ile sunulmaktadır. Express veya başka npm paketi gerektirmez.

## Gereksinim
Node.js 18 veya üzeri.

## Başlatma
```bash
npm start
```
Tarayıcı: http://localhost:3000

Geliştirme (Node.js 18+):
```bash
npm run dev
```

Farklı port:
```bash
PORT=8080 npm start
```
Windows PowerShell:
```powershell
$env:PORT=8080; npm start
```

## Görseller
Logo ve hero görselleri `assets/images/` klasöründe bulunur.

Proje kartı eklemek için aynı klasöre `proje-4.jpeg` veya `proje-yeni-kurulum.webp` gibi `proje-` ile başlayan bir görsel koyun. Node.js sunucusu kartları otomatik listeler. Özel proje başlığı ve açıklaması için `script.js` içindeki `projectDetails` alanını kullanabilirsiniz. Docker'da yeni dosyaların yayına çıkması için imajı yeniden derleyin.

İletişim bilgilerini `index.html` dosyasından düzenleyin.

## Not
Bu sürüm statik bir Node.js HTTP sunucusudur; veritabanı veya yönetim paneli içermez.
