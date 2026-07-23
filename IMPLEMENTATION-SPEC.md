# Softbridge 2026 — Production Implementation Specification

## Information architecture
1. Hero — entity, promise, proof, project entry point.
2. Delivery model — Helsinki strategy + Türkiye delivery as one operating model.
3. Expertise — Product, Experience, Intelligence, Platform.
4. Selected work — verified, anonymised and representative evidence labels.
5. How we work — principles, rituals, artifacts and delivery stages.
6. Trust — claims policy, senior ownership, confidentiality and commercial clarity.
7. Talent network — explicit empty permanent-role state.
8. Project brief — qualification form, local time and NDA signal.

## Motion ownership
- GSAP ScrollTrigger: section reveals, hero parallax and narrative scroll timelines.
- GSAP SplitText: hero and future case-study narrative text entrances.
- GSAP Flip: capability state transitions and shared-layout transforms.
- GSAP Observer: input direction and future pinned narrative control.
- Framer Motion: menu transition, CTA micro-interaction, Delivery OS state transitions.
- R3F: rendering and pointer-responsive motion only. Scroll values should enter scenes through damped uniforms, not direct React re-renders.
- Lenis: project dependency is retained. Enable globally only after device testing; synchronize RAF with GSAP ticker and call ScrollTrigger.update on scroll.

## SEO / GEO launch checklist
- Replace all illustrative metrics with verified claims or keep the representative label.
- Add verified legal entity, Business ID, VAT and registered municipality.
- Add real `sameAs` profiles to Organization JSON-LD.
- Add ProfessionalService and per-capability Service entities.
- Add JobPosting only when a genuine vacancy exists. Never expose JobPosting for network profiles.
- Add FAQPage for: who Softbridge is, delivery model, engagement size, AI governance, Helsinki/Türkiye collaboration.
- Add BreadcrumbList on Work, case study, Careers, Privacy and Legal routes.
- Generate dynamic OG images for home, capabilities and case studies.
- Validate canonical URLs against the production domain; never deploy `softbridge.fi` canonicals on a public Vercel preview intended for indexing.
- Create editorial pages targeting genuine questions, not keyword variants: product engineering partner Helsinki, AI workflow governance, senior software team delivery model.

## Performance strategy
- Procedural hero currently caps DPR at 1.5 and uses a client-only dynamic import.
- Final GLB must remain below 900KB compressed and use Meshopt/Draco plus KTX2.
- Load hero model after the critical text and CTA. Keep a CSS composition as the immediate fallback.
- Do not mount capability or case-study Canvas instances until within 800px of the viewport.
- Pause frameloops when document visibility changes or a scene is off-screen.
- Use one Canvas with scene-state changes where multiple 3D sections are visible on one route.
- Never render text inside WebGL when semantic HTML can overlay it.
- Profile GPU time on an integrated Intel/Apple GPU and a mid-range Android device.
- Target: JS route budget below 250KB gzip excluding deferred Three.js, LCP below 1.8s, CLS below .05.

## Mobile adaptation
- 3D remains one hero scene, reduced to DPR 1 and lower particle count in the final device-quality hook.
- Reduced-motion users receive the CSS two-hub composition.
- Capability visuals become a single static form, while all information remains semantic HTML.
- Work uses vertical cards; no pinned horizontal scroll on narrow screens.
- All tap targets are at least 44px and focus rings remain visible.
