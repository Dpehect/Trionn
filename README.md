# ATELIER/X — Production Release

A full-stack cinematic digital studio platform.

## Stack
Next.js 16, React 19, TypeScript, Tailwind CSS, GSAP, Lenis, Framer Motion, React Three Fiber, Drei, Three.js, Supabase, Auth, Zod, React Hook Form, Vitest and Playwright.

## Local setup
```bash
npm install
cp .env.example .env.local
npm run dev
```

## Verification
```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
```

## Production
```bash
npm run release:check
```
