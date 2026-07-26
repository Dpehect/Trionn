import { LayeredHomepage } from "@/components/layered-homepage";
import { JsonLd } from "@/components/seo-json-ld";
import {
  absoluteUrl,
  COMPANY,
  locations,
  services,
  SITE_URL,
} from "@/lib/seo-data";

export default function HomePage() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": `${SITE_URL}/#organization`,
        name: COMPANY.name,
        legalName: COMPANY.legalName,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: COMPANY.logo,
        },
        description: COMPANY.description,
        email: COMPANY.email,
        foundingDate: COMPANY.foundingDate,
        areaServed: [
          { "@type": "Country", name: "Finland" },
          { "@type": "AdministrativeArea", name: "Nordic countries" },
          { "@type": "Continent", name: "Europe" },
        ],
        knowsAbout: [
          "Software development",
          "Artificial intelligence",
          "Custom software",
          "SaaS product development",
          "Web application development",
          "Mobile application development",
          "Cloud application development",
          "Digital product design",
        ],
        sameAs: COMPANY.socialProfiles,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: COMPANY.email,
          availableLanguage: ["English"],
          areaServed: ["FI", "SE", "NO", "DK", "EU"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: COMPANY.name,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-FI",
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: "Software Company Finland | SoftBridge Solutions",
        description: COMPANY.description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-FI",
      },
      {
        "@type": "ItemList",
        name: "Software development services in Finland",
        itemListElement: services.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: absoluteUrl(`/services/${service.slug}`),
          name: service.name,
        })),
      },
      {
        "@type": "ItemList",
        name: "Software development locations in Finland",
        itemListElement: locations.map((location, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: absoluteUrl(`/locations/${location.slug}`),
          name: `Software development in ${location.city}`,
        })),
      },
    ],
  };

  return (
    <>
      <JsonLd data={graph} />
      <LayeredHomepage />
    </>
  );
}
