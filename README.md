# Softbridge Solutions Finland

A production-oriented, cinematic agency website built with Next.js App Router, React, TypeScript, Tailwind CSS, GSAP and Lenis. The visual direction combines Nordic clarity with editorial motion without copying the Zentry reference.

## Included phases

- **01–04:** strategy foundation, architecture, design system, navigation and site shell
- **05–08:** cinematic storytelling, services, dynamic case studies and Finland market positioning
- **09–11:** agency process, trust system and full inner-page architecture
- **12–14:** qualified lead form, API delivery, SEO, accessibility, privacy controls, security and deployment readiness

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

## Email configuration

Copy `.env.example` to `.env.local`. The contact route sends through the Resend REST API when all required variables are set. In development, a valid submission is logged when email variables are absent. Production deliberately returns a clear configuration error instead of pretending the message was delivered.

## Important launch work

This package uses conceptual portfolio content and pre-launch legal drafts. Replace or verify all claims, company registration details, project metrics, domain details and legal text before public launch. See `docs/PRODUCTION-CHECKLIST.md`.
