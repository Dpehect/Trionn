# Softbridge Creative Foundation

Phase 1 foundation for the Softbridge Solutions Finland creative agency website.

## Included
- Next.js 15 App Router + TypeScript strict mode
- Tailwind CSS v4 design tokens
- shadcn-compatible `cn()` utility and Button primitive
- Lenis + GSAP ticker + ScrollTrigger synchronization
- Framer Motion global provider
- Zustand scroll velocity/progress store
- Magnetic interaction primitive
- Custom cursor
- Initial animated hero and section architecture

## Run
```bash
npm install
npm run dev
```

## Validate
```bash
npm run typecheck
npm run build
```


## Vercel dependency reset

If this package replaces an older repository version, delete the stale lockfile and reinstall once before pushing:

```bash
rm -rf node_modules .next package-lock.json
npm install
npm run build
```

React and React DOM are intentionally pinned to the same version. Playwright is included as a development dependency because `playwright.config.ts` is type-checked by Next.js production builds.
