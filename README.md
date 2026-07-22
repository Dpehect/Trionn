# Trionn 3D Refactor Files

Replace the matching files in the repository root:

- `app/page.tsx`
- `app/globals.css`
- `components/SmoothScroll.tsx`
- `components/canvas/Scene.tsx`
- `components/canvas/Garment.tsx`
- `components/dom/Overlay.tsx`
- `hooks/useGarmentAnimation.ts`

This refactor adds:

- fixed Canvas and overlay stacking
- pointer-event isolation
- Lenis + GSAP ticker sync
- section-specific ScrollTrigger timelines
- hero rotation, detail close-up and variants reset
- hotspot visibility by section
- improved lighting and fabric material
- refined procedural hoodie geometry

Then run:

```bash
npm run build
```
