# Softbridge Solutions Finland — Phases 01–09

A production-oriented creative software studio website foundation built with Next.js 15, TypeScript, Tailwind CSS v4, Framer Motion, GSAP, Lenis and React Three Fiber.

## Included phases

- 01–03: architecture, design system and animation engine
- 04–06: loader, navigation, cursor, hero and lightweight 3D
- 07: dedicated procedural network/bridge WebGL scene with adaptive DPR
- 08: company introduction, scroll-scrub manifesto and trust metrics
- 09: interactive services system with animated previews and responsive accordions

## Animation notes

### Manifesto reveal
Each word starts muted. GSAP ScrollTrigger scrubs the color toward full white as the user progresses through the copy. The animation only changes color, avoiding layout and paint-heavy properties.

### Trust metrics
Metric cells use a short transform/opacity entrance. They execute once when the block enters the viewport.

### 3D network scene
The scene uses procedural points, lines and a low-detail wireframe shell. It has no textures or external models. Mouse input is interpolated in `useFrame`, while DPR is capped to keep GPU cost predictable.

### Services interaction
Framer Motion controls accordion height and preview transitions. Desktop users receive pointer previews; touch users get the same content through accessible buttons.

## Commands

```bash
npm install
npm run dev
npm run typecheck
npm run build
```

## Phase 10 — Case studies

`src/data/projects.ts` is the single content source for selected work. `CaseStudiesSection` renders an editorial responsive grid with lightweight CSS-generated art, hover reveal, GPU-only transforms and deep links to static case-study routes.

## Phase 11 — Horizontal orchestration

`HorizontalWork` uses a GSAP `matchMedia` context. Desktop pins the section and translates the track using `ScrollTrigger` scrub. Distance is calculated from `scrollWidth`, so it remains responsive. Mobile and reduced-motion users receive a normal vertical list instead of a pinned experience.

## Phase 12 — Detail and industry routes

- `/work/[slug]`: statically generated project cases with project-specific metadata.
- `/industries`: industry capability overview.

Project art is procedural CSS, so the foundation has no unlicensed imagery and no large media payload. Replace each `ProjectArt` with optimized `next/image` or video assets when final case-study media is approved.

## Phase 13 — Corporate conversion layer

- About, Careers, Contact and Privacy routes
- GDPR-ready privacy copy foundation
- React Hook Form + Zod project inquiry workflow
- Server-side validation route at `/api/contact`
- Creative marquee footer, Helsinki clock, availability signal and navigation
- Custom 404, error and loading states

## Phase 14 — SEO, quality and production readiness

- Dynamic sitemap and robots files
- Web manifest and canonical metadata foundation
- SoftwareCompany JSON-LD structured data
- Route-level metadata for corporate and case-study pages
- Responsive and reduced-motion fallbacks
- Lazy-loaded WebGL scenes and optimized procedural visuals

Set `NEXT_PUBLIC_SITE_URL` before production. Connect `/api/contact` to Resend, HubSpot or your CRM using a lazily initialized SDK.
