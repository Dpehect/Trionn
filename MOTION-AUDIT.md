# Softbridge Cinematic Motion Audit

## Problems found in the previous refined build
- The visual system was polished, but most sections only used one-time fade/y reveals.
- There was no global page-transition choreography.
- The hero lacked a meaningful exit sequence.
- Sections were visually disconnected instead of feeling like scenes in one film.
- No pinned narrative sequence existed.
- Service and market sections remained largely static after entering the viewport.
- Case studies revealed as normal cards rather than cinematic frames.

## Motion system added
- Branded loading sequence with percentage counter and split-panel exit.
- Three-panel route transition system.
- Lenis-driven smooth scrolling with GSAP ScrollTrigger.
- Global section clip transitions.
- Fine-pointer cinematic cursor with contextual expansion.
- Hero entrance and scroll-exit choreography.
- Scrubbed kinetic typography.
- Scroll-controlled marquee.
- Pinned art-direction scene with progressive content reveal.
- Sticky interactive service stage.
- Masked and scaled case-study reveals.
- Animated Finland market rows and location interactions.
- Scrubbed process timeline.
- Directional trust-section reveals.
- Final CTA mask expansion and split-title reveal.

## Performance constraints
- No Three.js, WebGL or continuous canvas rendering.
- Animations use transform, opacity and clip-path.
- Reduced-motion users receive a static and fully usable experience.
- Fine-pointer cursor is disabled on touch devices.
- Pinned scenes are limited to one major narrative section.
