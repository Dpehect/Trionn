export function StructuredData() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ATELIER/X",
    url: base,
    description: "Independent digital experience studio.",
    sameAs: [],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
