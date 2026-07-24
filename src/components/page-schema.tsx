import { site } from "@/lib/site";

type SchemaNode = Record<string, unknown>;

interface PageSchemaProps {
  type: "Service" | "WebPage";
  name: string;
  description: string;
  path: string;
  faq?: Array<{ q: string; a: string }>;
}

export function PageSchema({
  type,
  name,
  description,
  path,
  faq,
}: PageSchemaProps) {
  const graph: SchemaNode[] = [
    {
      "@type": type,
      "@id": `${site.url}${path}#entity`,
      name,
      description,
      url: `${site.url}${path}`,
      provider: { "@id": `${site.url}/#organization` },
      areaServed: [
        "Helsinki",
        "Finland",
        "Nordic countries",
        "Europe",
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Softbridge",
          item: site.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name,
          item: `${site.url}${path}`,
        },
      ],
    },
  ];

  if (faq?.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: faq.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: {
          "@type": "Answer",
          text: a,
        },
      })),
    });
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": graph,
        }),
      }}
    />
  );
}
