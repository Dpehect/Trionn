import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo-json-ld";
import { SeoPageShell } from "@/components/seo-page-shell";
import styles from "@/app/seo-pages.module.css";
import {
  absoluteUrl,
  COMPANY,
  locations,
  services,
  SITE_URL,
} from "@/lib/seo-data";

type PageProps = {
  params: Promise<{ city: string }>;
};

export function generateStaticParams() {
  return locations.map((location) => ({ city: location.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const location = locations.find((item) => item.slug === city);
  if (!location) return {};

  const url = `/locations/${location.slug}`;
  return {
    title: location.title,
    description: location.description,
    keywords: [
      `software company ${location.city}`,
      `software development ${location.city}`,
      `AI development ${location.city}`,
      `custom software ${location.city}`,
      `app developers ${location.city}`,
    ],
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: location.title,
      description: location.description,
    },
  };
}

export default async function LocationPage({ params }: PageProps) {
  const { city } = await params;
  const location = locations.find((item) => item.slug === city);
  if (!location) notFound();

  const pageUrl = absoluteUrl(`/locations/${location.slug}`);
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        name: location.title,
        description: location.description,
        url: pageUrl,
        about: { "@id": `${SITE_URL}/#organization` },
        spatialCoverage: {
          "@type": "City",
          name: location.city,
          containedInPlace: { "@type": "Country", name: "Finland" },
        },
        inLanguage: "en-FI",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Finland locations",
            item: absoluteUrl("/locations/helsinki"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: location.city,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={graph} />
      <SeoPageShell
        eyebrow={`${location.city} · Finland`}
        title={`Software development in ${location.city}`}
        description={location.intro}
      >
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <div className={styles.breadcrumbs}>
              <Link href="/">Home</Link><span>/</span><span>Finland</span><span>/</span>
              <span>{location.city}</span>
            </div>
            <h2>Software, AI and product capabilities for {location.city} companies.</h2>
            <div className={styles.grid}>
              {services.slice(0, 6).map((service) => (
                <article className={styles.card} key={service.slug}>
                  <h3>
                    <Link href={`/services/${service.slug}`}>{service.shortName}</Link>
                  </h3>
                  <p>{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.sectionInner}>
            <h2>A Finland-focused delivery model.</h2>
            <p>
              We work with Finnish and European organizations through clear
              product discovery, transparent delivery, frequent working
              releases and engineering decisions designed for long-term
              maintainability.
            </p>
          </div>
        </section>
        <section className={styles.cta}>
          <h2>Discuss a software project in {location.city}.</h2>
          <a href={`mailto:${COMPANY.email}`}>Contact SoftBridge Solutions</a>
        </section>
      </SeoPageShell>
    </>
  );
}
