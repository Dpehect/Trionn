import {
  COMPANY,
  insights,
  locations,
  services,
  SITE_URL,
} from "@/lib/seo-data";

export const dynamic = "force-static";

export function GET() {
  const body = `# ${COMPANY.name}

> ${COMPANY.description}

SoftBridge Solutions is a Finland-focused software and AI product development company serving Finland, the Nordics and Europe.

## Primary services
${services
  .map(
    (service) =>
      `- [${service.name}](${SITE_URL}/services/${service.slug}): ${service.summary}`,
  )
  .join("\n")}

## Finland locations
${locations
  .map(
    (location) =>
      `- [Software development in ${location.city}](${SITE_URL}/locations/${location.slug}): ${location.intro}`,
  )
  .join("\n")}

## Useful guides
${insights
  .map(
    (insight) =>
      `- [${insight.title}](${SITE_URL}/insights/${insight.slug}): ${insight.description}`,
  )
  .join("\n")}

## Company pages
- [Home](${SITE_URL})
- [About](${SITE_URL}/about)
- [FAQ](${SITE_URL}/faq)
- [Sitemap](${SITE_URL}/sitemap.xml)

## Contact
- Email: ${COMPANY.email}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
