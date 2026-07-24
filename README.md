# SoftBridge Solutions Finland — Original Layer Animation Restored

## Fixed
- Removed the extra hold spacer that made the four cards feel like separate vertical sections.
- Restored the original sticky overlapping layer behaviour.
- Restored original clip reveal timing:
  - start: top bottom
  - end: top top
  - scrub: true
- Restored original copy timing:
  - start: top 76%
  - end: top 30%
  - scrub: 0.9
- Transparent background images and subtle parallax remain.
- Image cards stay hidden; images are used only as atmospheric full-layer backgrounds.

## Run
```bash
npm install
npm run build
npm run dev
```
