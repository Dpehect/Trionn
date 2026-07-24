# SoftBridge Solutions Finland — Layer Content Refresh

## Fixed
- Removed the newly added dashboard hero completely.
- Restored the original compact intro.
- Kept the original layered scroll experience and every GSAP timing value.
- Changed only the three layer texts and visual compositions.

## New layer content
1. AI Software Development
2. Scalable Enterprise Software Systems
3. Web and Mobile Digital Products

## Animation safety
The existing `.layer-card`, `.layer-copy` and `.layer-visual` hooks remain unchanged.
No ScrollTrigger start/end, scrub, ease or reveal logic was modified.

## Run
```bash
npm install
npm run build
npm run dev
```
