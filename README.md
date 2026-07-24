# SoftBridge Solutions Finland — 8 Layer Overlap Fix

## Fixed
- Layers 4–8 previously had no opaque background.
- Previous layer headings therefore remained visible and overlapped.
- Added a distinct opaque background to all eight layers.
- Added stacking isolation, paint containment and backface protection.
- Existing GSAP and ScrollTrigger timings were not changed.

## Run
```bash
npm install
npm run build
npm run dev
```
