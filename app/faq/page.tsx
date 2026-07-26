import type { Metadata } from "next";
import { JsonLd } from "@/components/seo-json-ld";
import { SeoPageShell } from "@/components/seo-page-shell";
import styles from "@/app/seo-pages.module.css";
import { services, SITE_URL } from "@/lib/seo-data";

export const metadata: Metadata = {
  title: "Software Development Finland FAQ",
  description:
    "Answers about custom software, AI development, SaaS, web applications and working with SoftBridge Solutions in Finland.",
  alternates: { canonical: "/faq" },
};

const questions = [
  {
    question: "Is SoftBridge Solutions a software company serving Finland?",
    answer:
      "Yes. SoftBridge Solutions is a Finland-focused software and AI product development company serving organizations in Finland, the Nordics and Europe.",
  },
  {
    question: "What software development services do you provide?",
    answer:
      "We provide custom software development, AI engineering, SaaS product development, web applications, mobile products, cloud applications and modernization support.",
  },
  {
    question: "Do you work with startups and enterprise organizations?",
    answer:
      "Yes. We adapt discovery, architecture and delivery practices to the risk, speed and governance needs of startups, SMEs and enterprise teams.",
  },
  {
    question: "Can you work with an existing internal development team?",
    answer:
      "Yes. We can operate as a focused product squad, an engineering partner or a specialist extension of an existing team.",
  },
  {
    question: "Do you guarantee first-place Google rankings?",
    answer:
      "No responsible provider can guarantee a specific organic ranking. We build technically strong, useful and crawlable websites, while rankings also depend on authority, competition, reputation, links and time.",
  },
];

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          url: `${SITE_URL}/faq`,
          mainEntity: questions.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />
      <SeoPageShell
        eyebrow="FAQ"
        title="Software development in Finland — common questions."
        description="Clear answers about services, delivery, AI implementation and working with SoftBridge Solutions."
      >
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <div className={styles.faq}>
              {questions.map((item) => (
                <article className={styles.faqItem} key={item.question}>
                  <h2>{item.question}</h2>
                  <p>{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.sectionInner}>
            <h2>Explore services</h2>
            <div className={styles.pills}>
              {services.map((service) => (
                <a className={styles.pill} href={`/services/${service.slug}`} key={service.slug}>
                  {service.shortName}
                </a>
              ))}
            </div>
          </div>
        </section>
      </SeoPageShell>
    </>
  );
}
