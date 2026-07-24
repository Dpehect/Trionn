"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const words = [
  { text: "SoftBridge", className: "accent accent--violet" },
  { text: "Solutions", className: "accent accent--violet" },
  { text: "helps", className: "" },
  { text: "companies", className: "" },
  { text: "transform", className: "" },
  { text: "ambitious", className: "" },
  { text: "ideas", className: "" },
  { text: "into", className: "" },
  { text: "modern", className: "" },
  { text: "digital", className: "" },
  { text: "products.", className: "" },
  { text: "From", className: "" },
  { text: "custom", className: "" },
  { text: "software", className: "" },
  { text: "and", className: "" },
  { text: "AI-powered", className: "accent accent--pink" },
  { text: "automation", className: "" },
  { text: "to", className: "" },
  { text: "enterprise", className: "" },
  { text: "platforms", className: "" },
  { text: "and", className: "" },
  { text: "intuitive", className: "" },
  { text: "user", className: "" },
  { text: "experiences,", className: "" },
  { text: "we", className: "" },
  { text: "build", className: "" },
  { text: "technology", className: "" },
  { text: "designed", className: "" },
  { text: "to", className: "" },
  { text: "scale", className: "" },
  { text: "across", className: "" },
  { text: "Europe.", className: "accent accent--blue" },
  { text: "Our", className: "" },
  { text: "Finland", className: "accent accent--orange" },
  { text: "office", className: "accent accent--orange" },
  { text: "strengthens", className: "" },
  { text: "collaboration", className: "" },
  { text: "with", className: "" },
  { text: "Nordic", className: "" },
  { text: "partners", className: "" },
  { text: "while", className: "" },
  { text: "our", className: "" },
  { text: "global", className: "accent accent--green" },
  { text: "engineering", className: "accent accent--green" },
  { text: "team", className: "" },
  { text: "delivers", className: "" },
  { text: "reliable,", className: "" },
  { text: "high-quality", className: "" },
  { text: "software", className: "" },
  { text: "for", className: "" },
  { text: "startups,", className: "" },
  { text: "SMEs", className: "" },
  { text: "and", className: "" },
  { text: "enterprise", className: "" },
  { text: "organizations.", className: "" },
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
        opacity: 0.18,
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
            duration: 0.72,
            stagger: {
              each: 0.011,
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
              "0 0 24px color-mix(in srgb, var(--accent-color) 26%, transparent)",
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
            scale: 0.992,
            duration: 0.24,
            ease: "power1.inOut",
          },
          0.76,
        )
        .fromTo(
          ".brand-statement__signature",
          {
            y: 22,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.24,
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

      gsap.to(".brand-aurora--one", {
        xPercent: 10,
        yPercent: -8,
        rotate: 12,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });

      gsap.to(".brand-aurora--two", {
        xPercent: -12,
        yPercent: 10,
        rotate: -10,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.8,
        },
      });

      gsap.to(".brand-aurora--three", {
        xPercent: 7,
        yPercent: 6,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.6,
        },
      });
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
