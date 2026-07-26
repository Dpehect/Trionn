"use client";

import { useMemo, useState } from "react";
import styles from "./intro-audience-section.module.css";

type AudienceKey =
  | "anyone"
  | "recruiters"
  | "designers"
  | "managers"
  | "engineers";

type AudienceItem = {
  key: AudienceKey;
  label: string;
  copy: string;
};

const audiences: AudienceItem[] = [
  {
    key: "anyone",
    label: "For anyone",
    copy:
      "We're SoftBridge Solutions — a Finland-focused digital product team blending strategy, design, software engineering and practical AI into experiences that feel clear, useful and genuinely human.",
  },
  {
    key: "recruiters",
    label: "Recruiters",
    copy:
      "We're a multidisciplinary product and engineering team working across brand, product and technology. We care about craft, speed, ownership and shipping work people actually value.",
  },
  {
    key: "designers",
    label: "Product Designers",
    copy:
      "We work inside the messy middle — researching, sketching, prototyping and pairing closely to turn ambiguity into something real. We share early, iterate fast and protect the quality of every interaction.",
  },
  {
    key: "managers",
    label: "Product Managers",
    copy:
      "We connect design and engineering to outcomes — scoping tightly, prototyping to reduce risk and shipping in focused increments. We think in tradeoffs and care about measurable impact as much as pixels.",
  },
  {
    key: "engineers",
    label: "Engineers",
    copy:
      'We are highly technical without losing the human perspective. We move fluently across product thinking, frontend systems, cloud architecture, APIs, AI workflows and the details that make software reliable.',
  },
];

function AnimatedWords({ copy }: { copy: string }) {
  const words = useMemo(() => copy.trim().split(/\s+/), [copy]);

  return (
    <>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className={styles.word}
          style={{ "--word-index": index } as React.CSSProperties}
        >
          {word}
        </span>
      ))}
    </>
  );
}

export function IntroAudienceSection() {
  const [activeKey, setActiveKey] = useState<AudienceKey>("anyone");
  const [pointerInside, setPointerInside] = useState(false);

  const activeAudience =
    audiences.find((item) => item.key === activeKey) ?? audiences[0];

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const localX = event.clientX - rect.left;
    const localY = event.clientY - rect.top;

    event.currentTarget.style.setProperty("--spot-x", `${localX}px`);
    event.currentTarget.style.setProperty("--spot-y", `${localY}px`);
    event.currentTarget.style.setProperty("--cursor-x", `${event.clientX}px`);
    event.currentTarget.style.setProperty("--cursor-y", `${event.clientY}px`);
  };

  return (
    <section id="about" className={styles.section}>
      <div className={styles.shell}>
        <aside className={styles.sidebar}>
          <p className={styles.sectionIndex}>03 / ABOUT</p>
          <h2 className={styles.title}>Intro</h2>

          <nav className={styles.navigation} aria-label="Intro audiences">
            {audiences.map((item) => {
              const selected = item.key === activeKey;

              return (
                <button
                  key={item.key}
                  type="button"
                  className={[
                    styles.navButton,
                    selected ? styles.navButtonActive : "",
                  ].join(" ")}
                  aria-pressed={selected}
                  onClick={() => setActiveKey(item.key)}
                >
                  <span className={styles.navLine} aria-hidden="true" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        <div className={styles.cardWrap}>
          <article className={styles.card}>
            <div className={styles.dotGrid} aria-hidden="true" />
            <div className={styles.fold} aria-hidden="true" />

            <div
              key={activeKey}
              className={styles.textStage}
              onPointerEnter={() => setPointerInside(true)}
              onPointerMove={onPointerMove}
              onPointerLeave={() => {
                setPointerInside(false);
              }}
            >
              <p className={`${styles.copy} ${styles.copyDim}`}>
                <AnimatedWords copy={activeAudience.copy} />
              </p>

              <p
                aria-hidden="true"
                className={[
                  styles.copy,
                  styles.copyBright,
                  pointerInside ? styles.copyBrightVisible : "",
                ].join(" ")}
              >
                {activeAudience.copy}
              </p>

            </div>

            <footer className={styles.cardFooter}>
              <span>{activeAudience.label}</span>
              <span>SOFTBRIDGE SOLUTIONS · FINLAND</span>
            </footer>
          </article>
        </div>
      </div>
    </section>
  );
}
