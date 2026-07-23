# Softbridge Production Rebuild 2026

Ground-up Next.js 15 rebuild implementing the new positioning, conversion flow, R3F hero, GSAP/Flip/Observer/SplitText motion architecture, Framer Motion UI transitions, semantic evidence labels, SEO entity data and mobile degradation.

## Production notes
- Procedural R3F geometry is the production-safe fallback until authored Blender GLBs are supplied.
- Blender asset specifications live in `public/models/README.md`.
- Replace representative proof with verified client data before publishing claims.
- Add the legal entity registration number only after verification.
- Configure the contact API transport and Cal.com URL in environment settings.

## Performance budget
- Hero WebGL is client-only and capped at DPR 1.5.
- Decorative scene disappears under reduced motion.
- Blender GLB target: under 900KB compressed.
- Do not mount off-screen 3D case studies until IntersectionObserver reports proximity.
