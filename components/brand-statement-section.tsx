"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMemo, useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Segment = {
  text: string;
  className?: string;
};

const segments: Segment[] = [
  { text: "SoftBridge Solutions", className: "accent accent--violet" },
  { text: " helps companies transform ambitious ideas into modern digital products. From custom software and " },
  { text: "AI-powered", className: "accent accent--pink" },
  { text: " automation to enterprise platforms and intuitive user experiences, we build technology designed to scale across " },
  { text: "Europe.", className: "accent accent--blue" },
  { text: " Our " },
  { text: "Finland office", className: "accent accent--orange" },
  { text: " strengthens collaboration with Nordic partners while our " },
  { text: "global engineering", className: "accent accent--green" },
  { text: " team delivers reliable, high-quality software for startups, SMEs and enterprise organizations." },
];

type CharacterItem = {
  char: string;
  className: string;
  segmentIndex: number;
  charIndex: number;
  isSpace: boolean;
};

export function BrandStatementSection() {
  const root = useRef<HTMLElement>(null);

  const characters = useMemo<CharacterItem[]>(() => {
    const result: CharacterItem[] = [];

    segments.forEach((segment, segmentIndex) => {
      Array.from(segment.text).forEach((char, charIndex) => {
        result.push({
          char,
          className: segment.className ?? "",
          segmentIndex,
          charIndex,
          isSpace: char === " ",
        });
      });
    });

    return result;
  }, []);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;

      const chars = gsap.utils.toArray<HTMLElement>(".brand-char", section);

      // Initial state: dim unrevealed text
      gsap.set(chars, {
        color: "rgba(29, 35, 48, 0.12)",
      });

      const revealTimeline = gsap.timeline();

      // Smooth letter-by-letter scroll reveal
      revealTimeline.to(chars, {
        color: (_i, el) => {
          const isAccent = el.classList.contains("accent");
          if (isAccent) {
            if (el.classList.contains("accent--violet")) return "#7356e8";
            if (el.classList.contains("accent--pink")) return "#e44c9f";
            if (el.classList.contains("accent--blue")) return "#3769d9";
            if (el.classList.contains("accent--orange")) return "#e06f2f";
            if (el.classList.contains("accent--green")) return "#2c9e74";
          }
          return "#1d2330";
        },
        stagger: {
          each: 0.005,
          from: "start",
        },
        ease: "none",
      });

      // Pin section on screen so user scrolls THROUGH letter-by-letter reveal
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=500",
        pin: true,
        scrub: 0.2,
        animation: revealTimeline,
        anticipatePin: 1,
        refreshPriority: 1,
      });

      gsap.fromTo(
        ".brand-statement__signature",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top top+=100",
            end: "top top+=450",
            scrub: 0.3,
          },
        }
      );
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="brand-statement brand-statement--colorful"
      aria-label="About SoftBridge Solutions Finland office"
    >
      <div className="brand-statement__sticky">
        <div className="brand-aurora brand-aurora--one" aria-hidden="true" />
        <div className="brand-aurora brand-aurora--two" aria-hidden="true" />
        <div className="brand-aurora brand-aurora--three" aria-hidden="true" />
        <div className="brand-statement__noise" aria-hidden="true" />

        <div className="brand-statement__eyebrow">
          <span>03 / SOFTBRIDGE SOLUTIONS</span>
          <span>Finland Office / Serving Europe</span>
        </div>

        <div className="brand-statement__inner">
          <p className="brand-statement__copy" aria-label={segments.map((item) => item.text).join("")}>
            {characters.map((item, index) => (
              <span
                className={`brand-char ${item.className} ${item.isSpace ? "brand-space" : ""}`}
                key={`${item.segmentIndex}-${item.charIndex}-${index}`}
                aria-hidden="true"
              >
                {item.isSpace ? "\u00A0" : item.char}
              </span>
            ))}
          </p>
        </div>

        <div className="brand-statement__signature" aria-hidden="true">
          <span>FINLAND OFFICE</span>
          <strong>SOFTBRIDGE SOLUTIONS</strong>
        </div>

        <div className="brand-statement__index" aria-hidden="true">
          <span>EUROPEAN SOFTWARE PARTNER</span>
          <span>AI • CLOUD • WEB • MOBILE</span>
        </div>
      </div>
    </section>
  );
}
