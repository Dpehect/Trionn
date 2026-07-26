import { insights, SITE_URL } from "@/lib/seo-data";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const items = insights
    .map(
      (insight) => `
    <item>
      <title>${escapeXml(insight.title)}</title>
      <link>${SITE_URL}/insights/${insight.slug}</link>
      <guid>${SITE_URL}/insights/${insight.slug}</guid>
      <description>${escapeXml(insight.description)}</description>
      <pubDate>${new Date(insight.date).toUTCString()}</pubDate>
    </item>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>SoftBridge Solutions Insights</title>
    <link>${SITE_URL}</link>
    <description>Software, AI and digital product insights for Finland and Europe.</description>
    <language>en-FI</language>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
