import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo-json-ld";
import { SeoPageShell } from "@/components/seo-page-shell";
import styles from "@/app/seo-pages.module.css";
import {
  absoluteUrl,
  COMPANY,
  insights,
  SITE_URL,
} from "@/lib/seo-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return insights.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const insight = insights.find((item) => item.slug === slug);
  if (!insight) return {};

  const url = `/insights/${insight.slug}`;
  return {
    title: insight.title,
    description: insight.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: insight.title,
      description: insight.description,
      publishedTime: insight.date,
      authors: [COMPANY.name],
    },
  };
}

export default async function InsightPage({ params }: PageProps) {
  const { slug } = await params;
  const insight = insights.find((item) => item.slug === slug);
  if (!insight) notFound();

  const pageUrl = absoluteUrl(`/insights/${insight.slug}`);
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: insight.title,
        description: insight.description,
        datePublished: insight.date,
        dateModified: insight.date,
        mainEntityOfPage: pageUrl,
        author: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-FI",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Insights",
            item: absoluteUrl("/insights/how-to-choose-software-development-company-finland"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: insight.title,
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
        eyebrow={`Insight · ${insight.readTime}`}
        title={insight.title}
        description={insight.description}
      >
        <section className={styles.section}>
          <article className={`${styles.sectionInner} ${styles.article}`}>
            <div className={styles.breadcrumbs}>
              <Link href="/">Home</Link><span>/</span><span>Insights</span>
            </div>
            <p className={styles.articleMeta}>
              Published {insight.date} · {insight.readTime} read
            </p>
            {insight.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
          </article>
        </section>
        <section className={styles.cta}>
          <h2>Need a software partner in Finland?</h2>
          <a href={`mailto:${COMPANY.email}`}>Talk to SoftBridge Solutions</a>
        </section>
      </SeoPageShell>
    </>
  );
}
