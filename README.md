# Softbridge Solutions Finland — Professional Final

Complete Phase 1–14 Next.js 15 software studio website.

## Included
- Light multi-colour art direction and responsive typography
- GSAP + ScrollTrigger + Lenis motion foundation
- R3F/Drei signpost hero with adaptive rendering
- About/trust, sticky services and horizontal case-study experience
- Dynamic project archive and detail routes
- Careers index and JobPosting detail routes
- React Hook Form + Zod project inquiry flow
- Creative footer, local Helsinki time and availability state
- Organization and JobPosting structured data
- sitemap, robots, manifest, canonical/Open Graph/Twitter metadata
- custom 404/error/loading states and Playwright smoke coverage

## Run
```bash
npm install
npm run dev
```

## Validate
```bash
npm run check
npm run test:e2e
```

Set `NEXT_PUBLIC_SITE_URL` in Vercel before production deployment. The contact endpoint validates submissions and is ready to connect to Resend, HubSpot or another CRM.
