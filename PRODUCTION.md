# Production release checklist

1. Replace demo brand content in `src/config/site.ts` and `src/content/homepage.json`.
2. Connect `src/services/catalog.ts` to Shopify, Medusa or your commerce backend.
3. Replace checkout placeholders with hosted payment elements.
4. Configure environment variables from `.env.example`.
5. Replace local SVG studies with optimized AVIF/WebP campaign and product assets.
6. Connect analytics and error monitoring adapters.
7. Run `npm run typecheck`, `npm run lint` and `npm run build`.
8. Verify the `/api/health` endpoint after deployment.
