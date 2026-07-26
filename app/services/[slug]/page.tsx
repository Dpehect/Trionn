import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo-json-ld";
import { SeoPageShell } from "@/components/seo-page-shell";
import styles from "@/app/seo-pages.module.css";
import {
  absoluteUrl,
  COMPANY,
  services,
  SITE_URL,
} from "@/lib/seo-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return {};

  const url = `/services/${service.slug}`;

  return {
    title: service.title,
    description: service.description,
    keywords: service.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: service.title,
      description: service.description,
    },
    twitter: {
      card: "summary_large_image",
      title: service.title,
      description: service.description,
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();

  const pageUrl = absoluteUrl(`/services/${service.slug}`);
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: service.name,
        description: service.description,
        url: pageUrl,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: [
          { "@type": "Country", name: "Finland" },
          { "@type": "AdministrativeArea", name: "Nordic countries" },
          { "@type": "Continent", name: "Europe" },
        ],
        serviceType: service.shortName,
        audience: {
          "@type": "BusinessAudience",
          audienceType: "Startups, SMEs and enterprise organizations",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: service.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: absoluteUrl("/services/software-development-finland"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: service.name,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  const related = services.filter((item) => item.slug !== service.slug).slice(0, 4);

  return (
    <>
      <JsonLd data={graph} />
      <SeoPageShell
        eyebrow="Software services · Finland"
        title={service.name}
        description={service.summary}
      >
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <div className={styles.breadcrumbs}>
              <Link href="/">Home</Link><span>/</span><span>Services</span><span>/</span>
              <span>{service.shortName}</span>
            </div>
            <h2>Capabilities designed around useful outcomes.</h2>
            <div className={styles.grid}>
              {service.capabilities.map((capability) => (
                <article className={styles.card} key={capability}>
                  <h3>{capability}</h3>
                  <p>
                    Delivered with clear scope, maintainable engineering and a
                    production-focused product process.
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.sectionInner}>
            <h2>What the engagement is built to improve.</h2>
            <div className={styles.pills}>
              {service.outcomes.map((outcome) => (
                <span className={styles.pill} key={outcome}>{outcome}</span>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <h2>Frequently asked questions</h2>
            <div className={styles.faq}>
              {service.faq.map((item) => (
                <article className={styles.faqItem} key={item.question}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.sectionInner}>
            <h2>Related software services</h2>
            <div className={styles.grid}>
              {related.map((item) => (
                <article className={styles.card} key={item.slug}>
                  <h3><Link href={`/services/${item.slug}`}>{item.name}</Link></h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.cta}>
          <h2>Build the right product, clearly.</h2>
          <a href={`mailto:${COMPANY.email}`}>Start a conversation</a>
        </section>
      </SeoPageShell>
    </>
  );
}
