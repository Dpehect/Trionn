"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const words = [
  { text: "SoftBridge", className: "accent accent--violet" },
  { text: "Solutions", className: "accent accent--violet" },
  { text: "is", className: "" },
  { text: "a", className: "" },
  { text: "Finland-based", className: "accent accent--blue" },
  { text: "software", className: "" },
  { text: "and", className: "" },
  { text: "AI", className: "accent accent--pink" },
  { text: "engineering", className: "accent accent--green" },
  { text: "company", className: "" },
  { text: "building", className: "" },
  { text: "modern", className: "" },
  { text: "digital", className: "" },
  { text: "products", className: "" },
  { text: "for", className: "" },
  { text: "ambitious", className: "" },
  { text: "businesses", className: "" },
  { text: "across", className: "" },
  { text: "Europe.", className: "accent accent--orange" },
  { text: "We", className: "" },
  { text: "combine", className: "" },
  { text: "strategy,", className: "" },
  { text: "product", className: "" },
  { text: "design,", className: "" },
  { text: "full-stack", className: "" },
  { text: "development", className: "" },
  { text: "and", className: "" },
  { text: "artificial", className: "" },
  { text: "intelligence", className: "accent accent--pink" },
  { text: "to", className: "" },
  { text: "create", className: "" },
  { text: "fast,", className: "" },
  { text: "scalable", className: "accent accent--blue" },
  { text: "and", className: "" },
  { text: "reliable", className: "" },
  { text: "digital", className: "" },
  { text: "experiences.", className: "" },
  { text: "From", className: "" },
  { text: "startup", className: "" },
  { text: "MVPs", className: "" },
  { text: "to", className: "" },
  { text: "enterprise", className: "" },
  { text: "platforms,", className: "" },
  { text: "every", className: "" },
  { text: "solution", className: "" },
  { text: "is", className: "" },
  { text: "engineered", className: "" },
  { text: "for", className: "" },
  { text: "long-term", className: "" },
  { text: "growth,", className: "accent accent--green" },
  { text: "measurable", className: "" },
  { text: "business", className: "" },
  { text: "impact", className: "" },
  { text: "and", className: "" },
  { text: "exceptional", className: "" },
  { text: "user", className: "" },
  { text: "experience.", className: "" },
] as const;

export function BrandStatementSection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;

      const wordElements = gsap.utils.toArray<HTMLElement>(".brand-word", section);
      const accentElements = gsap.utils.toArray<HTMLElement>(".brand-word.accent", section);

      gsap.set(wordElements, {
        opacity: 0.2,
        y: 16,
      });

      const master = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.3,
          invalidateOnRefresh: true,
        },
      });

      master
        .to(
          wordElements,
          {
            opacity: 1,
            y: 0,
            duration: 0.68,
            stagger: {
              each: 0.012,
              from: "start",
            },
            ease: "power2.out",
          },
          0,
        )
        .to(
          accentElements,
          {
            color: "var(--accent-color)",
            textShadow:
              "0 0 22px color-mix(in srgb, var(--accent-color) 26%, transparent)",
            duration: 0.34,
            stagger: 0.08,
            ease: "power2.out",
          },
          0.1,
        )
        .to(
          ".brand-statement__inner",
          {
            yPercent: -3,
            scale: 0.99,
            duration: 0.24,
            ease: "power1.inOut",
          },
          0.76,
        )
        .fromTo(
          ".brand-statement__signature",
          {
            y: 24,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.22,
            ease: "power3.out",
          },
          0.76,
        );

      gsap.fromTo(
        ".brand-statement__eyebrow",
        { opacity: 0, x: -18 },
        {
          opacity: 1,
          x: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            end: "top 34%",
            scrub: 1,
          },
        },
      );
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="brand-statement"
      aria-label="About SoftBridge Solutions Finland"
    >
      <div className="brand-statement__sticky">
        <div className="brand-statement__noise" aria-hidden="true" />

        <div className="brand-statement__eyebrow">
          <span>03 / SOFTBRIDGE SOLUTIONS</span>
          <span>Finland Studio / European Digital Partner</span>
        </div>

        <div className="brand-statement__inner">
          <p className="brand-statement__copy">
            {words.map((word, index) => (
              <span
                className={`brand-word ${word.className}`}
                key={`${word.text}-${index}`}
              >
                {word.text}
              </span>
            ))}
          </p>
        </div>

        <div className="brand-statement__signature" aria-hidden="true">
          <span>FINLAND STUDIO</span>
          <strong>SOFTBRIDGE SOLUTIONS</strong>
        </div>

        <div className="brand-statement__index" aria-hidden="true">
          <span>FIN / 03</span>
          <span>EU DIGITAL PARTNER</span>
        </div>
      </div>
    </section>
  );
}
