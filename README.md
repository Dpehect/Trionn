# Softbridge Solutions — Finland

A production-oriented agency website built around editorial art direction, purposeful motion and a restrained Nordic visual system.

## Design position

This edition deliberately removes ornamental 3D, floating gradient objects, glassmorphism, excessive pills, generic AI imagery and demo-style effects. The experience relies on typography, layout rhythm, real interface compositions, strong case-study hierarchy and motion with a clear narrative function.

## Stack

- Next.js 16 App Router
- React 19 + TypeScript
- Tailwind CSS 4
- GSAP + ScrollTrigger
- Lenis smooth scrolling
- Motion for the full-screen navigation
- Route handlers for project enquiries

## Main routes

- `/`
- `/work` and `/work/[slug]`
- `/services` and `/services/[slug]`
- `/about`
- `/process`
- `/insights` and `/insights/[slug]`
- `/careers`
- `/contact`
- Legal and accessibility routes

## Run locally

```bash
npm install
npm run dev
```

Quality checks:

```bash
npm run typecheck
npm run lint
npm run build
```

## Contact delivery

Copy `.env.example` to `.env.local`. Add Resend credentials for production email delivery. Without them, development submissions use the documented fallback behavior.

## Pre-launch requirements

Replace conceptual case studies with approved client work, verify every company claim, review legal documents with qualified counsel, add final licensed imagery/video only where it improves the narrative, and run keyboard, screen-reader, responsive and reduced-motion tests.

## Cinematic Motion Revision
The current revision replaces the earlier mostly editorial scroll experience with a coordinated cinematic motion system. See `MOTION-AUDIT.md` for the audit and implementation map.
