"use client";

import Link from "next/link";
import type { CaseStudy } from "@/data/cases";
import { ArcCarouselSection } from "./arc-carousel-section";
import styles from "./case-study-page.module.css";

export function CaseStudyPage({ study }: { study: CaseStudy }) {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <Link className={styles.back} href="/">
            Back to home
          </Link>

          <p className={styles.kicker}>{study.kicker}</p>
          <h1>{study.title}</h1>
          <p className={styles.intro}>{study.intro}</p>

          <div className={styles.tags}>
            {study.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>

        <div className={styles.heroMedia}>
          <img
            src={study.hero}
            alt={`${study.title} case study`}
            draggable={false}
          />
        </div>
      </header>

      <section className={styles.summary}>
        <p>Case study</p>
        <h2>{study.title}</h2>
        <p>{study.intro}</p>
      </section>

      <ArcCarouselSection currentSlug={study.slug} />
    </main>
  );
}
