TRIONN — SELECTED CASES FIX

1. ZIP'i aç.
2. components/layered-homepage.tsx dosyasını projendeki aynı dosyanın üzerine yaz.
3. app/globals.css dosyasını projendeki aynı dosyanın üzerine yaz.
4. public/media/selected-cases-scroll-optimized.mp4 dosyasının mevcut olduğundan emin ol.
5. npm run dev ile kontrol et.

Yapılan düzeltmeler:
- Layer 2 yalnızca “Selected Cases” başlığıyla açılır.
- HOBRO, capabilities deck, Projects, Agency, Contact ve kategori filtreli giriş atlanır.
- Videonun istenmeyen ilk kısmı VIDEO_START_RATIO ile geçilir.
- Scroll scrub daha ağır ve daha stabil hale getirilir.
- Her scroll olayında yeni tween üretmek yerine tek requestAnimationFrame döngüsü kullanılır.
