"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const words = [
  { text: "Trionn", className: "accent accent--violet" },
  { text: "is", className: "" },
  { text: "a", className: "" },
  { text: "digital", className: "" },
  { text: "product", className: "" },
  { text: "studio", className: "" },
  { text: "that", className: "" },
  { text: "turns", className: "" },
  { text: "ambitious", className: "" },
  { text: "ideas", className: "" },
  { text: "into", className: "" },
  { text: "distinctive", className: "" },
  { text: "brands,", className: "accent accent--pink" },
  { text: "high-performing", className: "" },
  { text: "websites", className: "accent accent--blue" },
  { text: "and", className: "" },
  { text: "scalable", className: "" },
  { text: "digital", className: "" },
  { text: "systems.", className: "accent accent--orange" },
  { text: "Through", className: "" },
  { text: "strategy,", className: "" },
  { text: "design", className: "" },
  { text: "and", className: "" },
  { text: "precise", className: "" },
  { text: "engineering,", className: "accent accent--green" },
  { text: "every", className: "" },
  { text: "experience", className: "" },
  { text: "is", className: "" },
  { text: "built", className: "" },
  { text: "to", className: "" },
  { text: "move", className: "" },
  { text: "with", className: "" },
  { text: "clarity,", className: "" },
  { text: "purpose", className: "" },
  { text: "and", className: "" },
  { text: "performance.", className: "" },
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
        opacity: 0.22,
        y: 18,
      });

      const master = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.25,
          invalidateOnRefresh: true,
        },
      });

      master
        .to(
          wordElements,
          {
            opacity: 1,
            y: 0,
            duration: 0.48,
            stagger: {
              each: 0.018,
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
            textShadow: "0 0 22px color-mix(in srgb, var(--accent-color) 28%, transparent)",
            duration: 0.32,
            stagger: 0.1,
            ease: "power2.out",
          },
          0.12,
        )
        .to(
          ".brand-statement__inner",
          {
            yPercent: -8,
            scale: 0.985,
            duration: 0.28,
            ease: "power1.inOut",
          },
          0.72,
        )
        .fromTo(
          ".brand-work",
          {
            yPercent: 120,
            opacity: 0,
          },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.28,
            ease: "power3.out",
          },
          0.72,
        )
        .to(
          ".brand-work__line",
          {
            scaleX: 1,
            duration: 0.18,
            ease: "power2.out",
          },
          0.81,
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
    <section ref={root} className="brand-statement" aria-label="About Trionn">
      <div className="brand-statement__sticky">
        <div className="brand-statement__noise" aria-hidden="true" />

        <div className="brand-statement__eyebrow">
          <span>03 / ABOUT TRIONN</span>
          <span>Independent digital product studio</span>
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

        <div className="brand-work" aria-hidden="true">
          <span className="brand-work__label">Selected projects</span>
          <h2>Work</h2>
          <span className="brand-work__line" />
        </div>

        <div className="brand-statement__index" aria-hidden="true">
          <span>TRI / 03</span>
          <span>Scroll to reveal</span>
        </div>
      </div>
    </section>
  );
}
