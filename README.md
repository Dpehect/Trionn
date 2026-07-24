# Layered Homepage — Layer 02 Selected Cases Rebuild

Layer 2 önceki grid/kart uygulamasından tamamen temizlendi.

Yeni sürüm, gönderilen referans videoyu scroll progress ile frame hassasiyetinde scrub eder. Böylece:
- Selected Cases başlığının giriş zamanlaması
- Kartların özgün konumları ve oranları
- Büyük boşluk ritmi
- Kartların farklı hızlarda akışı
- Got Project? / LET'S TALK / PING US final geçişi
- Referanstaki header davranışı

videodakiyle aynı görünür. Layer 1 korunmuştur.

## Çalıştırma

```bash
npm install
npm run dev
```


## Layer 02 update
Fresh Drop / BRINC Drones opening scene removed. Selected Cases now begins directly with the title and project cards.


## Layer 02 refinement
- Initial BRINC Drones strip removed from the media sequence.
- Scroll distance increased for a slower, weightier progression.
- Video scrubbing now uses eased progress and temporal smoothing instead of direct linear seeking.
