# SoftBridge Case Carousel — Build Fix

Fixed:
- Removed the unreachable `study.hero` fallback.
- Every carousel card now uses its own `study.editorialHero`.
- Resolves Next.js/TypeScript error: Property 'hero' does not exist on type 'never'.

Preserved:
- case-only carousel content
- complete case images
- arc geometry
- drag, touch, momentum and infinite loop
- unified #164C4D detail-page background
- all existing sections and animations
