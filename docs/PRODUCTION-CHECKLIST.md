# Production checklist

## Identity and content
- Replace all conceptual case studies with authorised work or clearly label them as concepts.
- Confirm the legal company name, Finnish business ID, address and VAT details.
- Confirm the actual domain and update `src/lib/site.ts` and `.env`.
- Have native Finnish copy reviewed before enabling a Finnish locale.

## Contact delivery
- Verify a sending domain in Resend.
- Set `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL` in Vercel.
- Submit success, validation, spam and delivery-failure test cases.
- Replace in-memory rate limiting with a durable store for multi-region/high-volume production.

## Legal and privacy
- Obtain legal review of privacy, cookie and terms pages.
- Document retention, processors, transfer safeguards and data-subject workflow.
- Connect analytics only behind the existing consent event.

## Quality
- Run `npm ci`, `npm run typecheck`, `npm run lint`, and `npm run build`.
- Test keyboard navigation, VoiceOver/NVDA, 200% zoom and reduced motion.
- Test Safari iOS, Safari macOS, Chrome, Firefox and Edge.
- Run Lighthouse on representative mobile hardware and optimise final media.

## Deployment
- Connect the GitHub repository to Vercel.
- Add environment variables to Preview and Production scopes.
- Configure the custom domain, redirects and email DNS records.
- Submit sitemap to Google Search Console and Bing Webmaster Tools.
- Enable uptime and error monitoring.
