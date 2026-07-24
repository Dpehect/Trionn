# Design and technical specification

## Information architecture
Home → Services → Work → Case study → Approach → Careers → Contact. Privacy and Accessibility remain globally linked.

## 3D decision
No 3D is used. The core story is organisational clarity, senior delivery and trustworthy evidence. A 3D scene would add visual novelty without improving comprehension, while increasing transfer, CPU and accessibility cost.

## Motion responsibilities
GSAP + ScrollTrigger + SplitText: editorial headline reveals, scroll entrances, page panel transitions, future pinned narrative sequences. Framer Motion: mobile navigation, filter state and component-level layout transitions. Lenis: desktop wheel smoothing only. Reduced-motion preferences bypass non-essential motion.

## Component architecture
Server Components own page content and metadata. Client Components are limited to navigation, filters, contact submission and animation boundaries. Shared data lives in `src/lib/data.ts`.

## Mobile behaviour
Single-column reading order, no horizontal scroll, no hover-dependent information, native controls, smaller motion distances, responsive optical type sizes, fixed header with full-screen menu.

## SEO / GEO
Entity-first copy consistently defines Softbridge as an independent product engineering studio in Helsinki with senior delivery in Türkiye. Organization and ProfessionalService JSON-LD include Helsinki, Finland, Nordic and European service areas. Add Service, FAQPage and BreadcrumbList JSON-LD to pages when final content is approved.
