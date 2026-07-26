import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo-json-ld";
import { SeoPageShell } from "@/components/seo-page-shell";
import styles from "@/app/seo-pages.module.css";
import { COMPANY, services, SITE_URL } from "@/lib/seo-data";

export const metadata: Metadata = {
  title: "About SoftBridge Solutions | Finland Software Company",
  description:
    "Learn about SoftBridge Solutions, a Finland-focused software and AI product development company serving the Nordics and Europe.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          url: `${SITE_URL}/about`,
          name: "About SoftBridge Solutions",
          description: COMPANY.description,
          about: { "@id": `${SITE_URL}/#organization` },
          inLanguage: "en-FI",
        }}
      />
      <SeoPageShell
        eyebrow="About"
        title="A software and AI partner focused on useful products."
        description="SoftBridge Solutions combines product thinking, design and engineering to help organizations build reliable software for Finland, the Nordics and Europe."
      >
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <h2>What we do</h2>
            <p>
              We work across discovery, UX, architecture and production
              engineering. Our role is to reduce ambiguity, expose tradeoffs
              and turn the right scope into maintainable software.
            </p>
            <div className={styles.grid}>
              {services.slice(0, 4).map((service) => (
                <article className={styles.card} key={service.slug}>
                  <h3><Link href={`/services/${service.slug}`}>{service.shortName}</Link></h3>
                  <p>{service.summary}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.sectionInner}>
            <h2>How we work</h2>
            <div className={styles.grid}>
              {[
                ["Clarify", "Define the user, business outcome, risk and smallest useful scope."],
                ["Prototype", "Test critical workflows and technical assumptions before overbuilding."],
                ["Build", "Deliver maintainable software in visible, reviewable increments."],
                ["Improve", "Use real product signals to prioritize the next investment."],
              ].map(([title, copy]) => (
                <article className={styles.card} key={title}>
                  <h3>{title}</h3><p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </SeoPageShell>
    </>
  );
}
