"use client";

import { useMemo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./brand-statement-section.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Segment = {
  text: string;
  tone?: "violet" | "pink" | "blue" | "orange" | "green";
};

const segments: Segment[] = [
  { text: "SoftBridge Solutions", tone: "violet" },
  {
    text:
      " helps companies transform ambitious ideas into modern digital products. From custom software and ",
  },
  { text: "AI-powered", tone: "pink" },
  {
    text:
      " automation to enterprise platforms and intuitive user experiences, we build technology designed to scale across ",
  },
  { text: "Europe.", tone: "blue" },
  { text: " Our " },
  { text: "Finland office", tone: "orange" },
  {
    text:
      " strengthens collaboration with Nordic partners while our ",
  },
  { text: "global engineering", tone: "green" },
  {
    text:
      " team delivers reliable, high-quality software for startups, SMEs and enterprise organizations.",
  },
];

const toneColors = {
  violet: "#7356e8",
  pink: "#e44c9f",
  blue: "#3769d9",
  orange: "#e06f2f",
  green: "#2c9e74",
} as const;

type Character = {
  char: string;
  color: string;
  key: string;
};

export function BrandStatementSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const signatureRef = useRef<HTMLDivElement>(null);

  const characters = useMemo<Character[]>(() => {
    const output: Character[] = [];

    segments.forEach((segment, segmentIndex) => {
      const color = segment.tone
        ? toneColors[segment.tone]
        : "#1d2330";

      Array.from(segment.text).forEach((char, charIndex) => {
        output.push({
          char,
          color,
          key: `${segmentIndex}-${charIndex}`,
        });
      });
    });

    return output;
  }, []);

  const scrollDistance = Math.round(
    Math.max(1750, Math.min(2450, characters.length * 5.4)),
  );

  useGSAP(
    () => {
      const section = sectionRef.current;
      const copy = copyRef.current;
      const signature = signatureRef.current;

      if (!section || !copy || !signature) return;

      const chars = gsap.utils.toArray<HTMLElement>(
        "[data-brand-char]",
        copy,
      );

      gsap.set(chars, {
        opacity: 0.14,
        y: 9,
        color: "rgba(29, 35, 48, 0.18)",
      });

      gsap.set(signature, {
        opacity: 0,
        y: 12,
      });

      const timeline = gsap.timeline({
        defaults: {
          ease: "none",
        },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.15,
          invalidateOnRefresh: true,
          fastScrollEnd: false,
        },
      });

      timeline
        .to(
          chars,
          {
            opacity: 1,
            y: 0,
            color: (_index, element) =>
              element.getAttribute("data-final-color") ?? "#1d2330",
            duration: 0.96,
            stagger: {
              amount: 0.94,
              from: "start",
            },
          },
          0,
        )
        .to(
          signature,
          {
            opacity: 1,
            y: 0,
            duration: 0.06,
            ease: "power2.out",
          },
          0.94,
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
      style={{
        minHeight: `calc(550px + ${scrollDistance}px)`,
      }}
      aria-label="About SoftBridge Solutions Finland office"
    >
      <div className={styles.sticky}>
        <div className={`${styles.aurora} ${styles.auroraOne}`} aria-hidden="true" />
        <div className={`${styles.aurora} ${styles.auroraTwo}`} aria-hidden="true" />
        <div className={`${styles.aurora} ${styles.auroraThree}`} aria-hidden="true" />
        <div className={styles.noise} aria-hidden="true" />

        <div className={styles.eyebrow}>
          <span>03 / SOFTBRIDGE SOLUTIONS</span>
          <span>Finland Office / Serving Europe</span>
        </div>

        <div className={styles.inner}>
          <p
            ref={copyRef}
            className={styles.copy}
            aria-label={segments.map((segment) => segment.text).join("")}
          >
            {characters.map((item) => (
              <span
                key={item.key}
                data-brand-char
                data-final-color={item.color}
                className={item.char === " " ? styles.space : styles.character}
                aria-hidden="true"
              >
                {item.char === " " ? "\u00A0" : item.char}
              </span>
            ))}
          </p>
        </div>

        <div ref={signatureRef} className={styles.signature}>
          <span>FINLAND OFFICE</span>
          <strong>SOFTBRIDGE SOLUTIONS</strong>
        </div>

        <div className={styles.index} aria-hidden="true">
          <span>EUROPEAN SOFTWARE PARTNER</span>
          <span>AI · CLOUD · WEB · MOBILE</span>
        </div>
      </div>
    </section>
  );
}
