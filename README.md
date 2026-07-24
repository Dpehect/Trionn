# Trionn — Professional Orbit Runtime Fix

Düzeltilen kritik hata:

- `ScrollTrigger.create()` kurulurken `onRefresh` callback'i henüz initialize edilmemiş
  `orbitTrigger` değişkenine erişiyordu.
- Bu durum tarayıcıda `ReferenceError` oluşturarak Vercel üzerinde
  “Application error: a client-side exception has occurred” ekranına neden oluyordu.
- `onRefresh` artık callback'in kendi `self.progress` değerini kullanıyor.
- Tasarım ve animasyon ayarları değiştirilmedi.

## Çalıştırma

```bash
npm install
npm run dev
```

## Vercel

Bu ZIP içindeki proje dosyalarını mevcut repoya ekleyip yeniden deploy et.
