# AURA 3D Fashion Showcase

Production-oriented immersive apparel showcase built with:

- Next.js App Router
- TypeScript
- Tailwind CSS
- Three.js
- React Three Fiber
- Drei
- GSAP + ScrollTrigger
- @studio-freight/lenis
- Zustand

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Architecture

- `components/SmoothScroll.tsx`: Lenis and GSAP ticker synchronization.
- `hooks/useGarmentAnimation.ts`: master ScrollTrigger timeline.
- `components/canvas/Scene.tsx`: fixed R3F Canvas, lighting and environment.
- `components/canvas/Garment.tsx`: lightweight procedural hoodie fallback.
- `components/dom/Overlay.tsx`: editorial HTML interface and commerce controls.
- `store/useGarmentStore.ts`: shared color, size and hotspot state.

The garment is built from lightweight primitives so the project runs without an external GLTF asset. Replace the procedural fallback with `useGLTF()` when a licensed garment model is available.
