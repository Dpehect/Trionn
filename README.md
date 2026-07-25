# SoftBridge Solutions Finland — Selected Case Links Fixed

## Fixed
- Replaced plain anchor elements with Next.js `Link`.
- Enabled route prefetching and normal scroll behavior.
- Raised the link above all animated and visual layers.
- Disabled pointer events on images, metadata and decorative overlays.
- Added keyboard focus styling.
- Updated schema URLs to real `/cases/[slug]` paths.
- Rewrote the Next.js 15 dynamic route with `dynamicParams = false`.
- Added a clear route-level not-found screen.

## Expected routes
- /cases/ai-software-development-finland
- /cases/enterprise-saas-platform
- /cases/healthcare-software-nordics
- /cases/logistics-software-europe
- /cases/manufacturing-ai-solutions
- /cases/cloud-application-development
- /cases/mobile-app-development-finland
- /cases/retail-ai-automation
- /cases/digital-transformation-platform

## Run
```bash
npm install
npm run build
npm run dev
```
