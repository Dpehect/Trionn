"use client";

import { useMemo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./brand-statement-section.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Tone = "violet" | "pink" | "blue" | "orange" | "green";

type Segment = {
  text: string;
  tone?: Tone;
};

const segments: Segment[] = [
  { text: "SoftBridge Solutions", tone: "violet" },
  { text: " turns ambitious ideas into " },
  { text: "intelligent digital products.", tone: "pink" },
  { text: " We combine strategy, design and engineering to build " },
  { text: "AI systems,", tone: "blue" },
  { text: " scalable software and seamless experiences for companies across " },
  { text: "Finland,", tone: "orange" },
  { text: " the Nordics and Europe. Every product is shaped for clarity, performance and " },
  { text: "long-term growth.", tone: "green" },
];

const toneMap: Record<Tone, string> = {
  violet: "#7257ff",
  pink: "#e84aa5",
  blue: "#2f6fe4",
  orange: "#ed7436",
  green: "#1f9c72",
};

type Letter = {
  value: string;
  finalColor: string;
  key: string;
};

export function BrandStatementSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const letters = useMemo<Letter[]>(() => {
    const result: Letter[] = [];

    segments.forEach((segment, segmentIndex) => {
      const finalColor = segment.tone ? toneMap[segment.tone] : "#14202b";

      Array.from(segment.text).forEach((value, letterIndex) => {
        result.push({
          value,
          finalColor,
          key: `${segmentIndex}-${letterIndex}`,
        });
      });
    });

    return result;
  }, []);

  const scrollRunway = Math.max(1800, Math.min(2700, letters.length * 5.2));

  useGSAP(
    () => {
      const section = sectionRef.current;
      const copy = copyRef.current;
      const footer = footerRef.current;

      if (!section || !copy || !footer) return;

      const characters = gsap.utils.toArray<HTMLElement>(
        "[data-section-three-letter]",
        copy,
      );

      gsap.set(characters, {
        opacity: 0.12,
        y: 12,
        color: "rgba(20, 32, 43, 0.14)",
      });

      gsap.set(footer, {
        opacity: 0,
        y: 14,
      });

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(
          characters,
          {
            opacity: 1,
            y: 0,
            color: (_index, element) =>
              element.dataset.finalColor ?? "#14202b",
            duration: 0.96,
            stagger: {
              amount: 0.95,
              from: "start",
            },
          },
          0,
        )
        .to(
          footer,
          {
            opacity: 1,
            y: 0,
            duration: 0.05,
            ease: "power2.out",
          },
          0.95,
        );

      ScrollTrigger.refresh();

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      style={{ minHeight: `calc(100svh + ${scrollRunway}px)` }}
      aria-label="SoftBridge Solutions company statement"
    >
      <div className={styles.sticky}>
        <div className={styles.glowOne} aria-hidden="true" />
        <div className={styles.glowTwo} aria-hidden="true" />
        <div className={styles.glowThree} aria-hidden="true" />
        <div className={styles.grid} aria-hidden="true" />

        <header className={styles.header}>
          <span>03 / SOFTBRIDGE SOLUTIONS</span>
          <span>FINLAND · NORDICS · EUROPE</span>
        </header>

        <div className={styles.content}>
          <p
            ref={copyRef}
            className={styles.copy}
            aria-label={segments.map((segment) => segment.text).join("")}
          >
            {letters.map((letter) => (
              <span
                key={letter.key}
                data-section-three-letter
                data-final-color={letter.finalColor}
                className={
                  letter.value === " " ? styles.space : styles.letter
                }
                aria-hidden="true"
              >
                {letter.value === " " ? "\u00A0" : letter.value}
              </span>
            ))}
          </p>
        </div>

        <footer ref={footerRef} className={styles.footer}>
          <span>AI · SOFTWARE · CLOUD · DIGITAL PRODUCTS</span>
          <strong>SOFTBRIDGE SOLUTIONS</strong>
        </footer>
      </div>
    </section>
  );
}
