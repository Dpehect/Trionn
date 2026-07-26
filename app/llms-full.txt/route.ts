import {
  COMPANY,
  insights,
  locations,
  services,
} from "@/lib/seo-data";

export const dynamic = "force-static";

export function GET() {
  const body = `# ${COMPANY.name} — complete company and service context

## Company
${COMPANY.description}

## Geographic focus
SoftBridge Solutions serves organizations in Finland, the Nordic countries and Europe. The company provides remote and collaborative software product delivery without claiming a physical office address that has not been independently verified.

## Services
${services
  .map(
    (service) => `### ${service.name}
${service.summary}

Capabilities:
${service.capabilities.map((item) => `- ${item}`).join("\n")}

Typical outcomes:
${service.outcomes.map((item) => `- ${item}`).join("\n")}

Questions:
${service.faq
  .map((item) => `- ${item.question}\n  ${item.answer}`)
  .join("\n")}
`,
  )
  .join("\n")}

## Finland location relevance
${locations.map((item) => `- ${item.city}: ${item.intro}`).join("\n")}

## Published insights
${insights
  .map(
    (insight) =>
      `### ${insight.title}\n${insight.description}\n${insight.sections
        .map(
          (section) =>
            `#### ${section.heading}\n${section.paragraphs.join("\n\n")}`,
        )
        .join("\n")}`,
  )
  .join("\n\n")}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
