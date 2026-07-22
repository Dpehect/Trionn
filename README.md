# TRIONN — Phase 14: Final Awwwards Polish

**Enabled scope:** Final motion timing, composition, route reveal, QA and production packaging.

This is a standalone cumulative snapshot. `src/config/phase.ts` exposes the experience intended for phase 14.

# TRIONN — Awwwards-Level Product Experience

A production-oriented Next.js product showcase built around meaningful motion rather than 3D spectacle.

## Technology stack

- Next.js App Router, React, TypeScript, Tailwind CSS
- shadcn-style primitives, Radix UI, Lucide React
- GSAP, @gsap/react, Flip, ScrollTrigger, Observer, Draggable, InertiaPlugin
- SplitText, MorphSVGPlugin, MotionPathPlugin, CustomEase, ScrollToPlugin
- Lenis smooth scrolling and Motion route transitions
- Zustand product state
- React Hook Form + Zod validation
- Vaul request-access drawer
- Sonner feedback
- Embla Carousel

## Explicitly excluded

- Three.js
- React Three Fiber
- WebGL
- 3D models
- Persistent canvas rendering

## Run

```bash
npm install
npm run dev
```

## Validate

```bash
npm run typecheck
npm run lint
npm run build
```

## Phase snapshots

Every phase folder is standalone. The source architecture stays stable while `src/config/phase.ts` enables the scope intended for that phase. Open `phase-14-final-awwwards-polish` for the complete experience.
