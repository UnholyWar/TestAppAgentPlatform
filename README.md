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
`assets/images/` klasörüne `logo.png`, `hero-1.jpg` ... `hero-3.jpg`, `proje-1.jpg` ... `proje-6.jpg` ekleyin. Görselleri eklemezseniz sitenin görsel alanları boş/yer tutucu görünebilir.

İletişim bilgilerini `index.html`, proje isimlerini ve görsel yollarını `script.js` dosyasından düzenleyin.

## Not
Bu sürüm statik bir Node.js HTTP sunucusudur; veritabanı veya yönetim paneli içermez.
