# Softbridge Quiet Studio Rebuild

A production-oriented Next.js 15 single-page studio website focused on Nordic clarity, senior delivery and evidence-led conversion.

## Run

```bash
npm install
npm run dev
npm run build
```

## 3D decision

No Three.js scene is included. The two-hub delivery model is a business concept, not a visual spectacle. Typography, structured UI and restrained motion communicate it more credibly and with lower performance cost. R3F should only be introduced later if a real interactive product or architectural model becomes part of the sales story.

## Motion ownership

- GSAP + ScrollTrigger: initial hero sequence and section reveals.
- Framer Motion: capability state transitions, Delivery OS state changes and magnetic CTA movement.
- Lenis: smooth scrolling, synchronized with ScrollTrigger.

## SEO/GEO

Includes Organization, ProfessionalService, Service, FAQPage and BreadcrumbList JSON-LD; canonical metadata; Open Graph; robots; sitemap; Helsinki/Finland/Europe entity language; and direct FAQ answers designed for search and AI retrieval.

## Important production note

The contact API validates requests and returns success but does not yet deliver email. Connect it to Resend, Postmark, SendGrid or a CRM webhook before launch. Replace availability and experience figures only with verifiable values.
