# Hirotos-inspired portfolio — Complete build (Phases 1–14)

Production-oriented Next.js portfolio with cinematic transitions, an interactive React Three Fiber signpost, horizontal project index, case studies, responsive layouts, SEO metadata and automated tests.

## Run

```bash
npm install
npm run dev
```

## Validate

```bash
npm run typecheck
npm run lint
npm run test
npm run build
npm run test:e2e
```

## Deployment

1. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL`.
2. Push the project to GitHub.
3. Import the repository into Vercel.
4. Add the same environment variable in Vercel.
5. Deploy.

## Phase coverage

- 1–3: foundation, design system, cinematic loader
- 4–6: hero layout, procedural 3D signpost, pointer interaction
- 7–9: route transitions, horizontal projects index, card interactions
- 10–12: case studies, About/Contact, responsive adaptation
- 13–14: SEO, sitemap/robots/manifest, system states, tests, performance and Vercel hardening

Replace demo project content and visual assets with your own licensed material before publishing.
