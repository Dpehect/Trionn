"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const rowOne = [
  { label: "AI Automation", tone: "orange" },
  { label: "Custom Software" },
  { label: "Cloud Platforms" },
  { label: "Enterprise Systems" },
  { label: "Product Strategy" },
  { label: "AI Automation", tone: "orange" },
  { label: "Custom Software" },
  { label: "Cloud Platforms" },
  { label: "Enterprise Systems" },
  { label: "Product Strategy" },
];

const rowTwo = [
  { label: "Healthcare" },
  { label: "SaaS" },
  { label: "Technology" },
  { label: "Real Estate", tone: "lime" },
  { label: "Automotive" },
  { label: "Manufacturing" },
  { label: "Healthcare" },
  { label: "SaaS" },
  { label: "Technology" },
  { label: "Real Estate", tone: "lime" },
  { label: "Automotive" },
  { label: "Manufacturing" },
];

const rowThree = [
  { label: "Web Applications" },
  { label: "Mobile Products" },
  { label: "UX Engineering" },
  { label: "Data & Analytics", tone: "violet" },
  { label: "Nordic Expansion" },
  { label: "Digital Transformation" },
  { label: "Web Applications" },
  { label: "Mobile Products" },
  { label: "UX Engineering" },
  { label: "Data & Analytics", tone: "violet" },
  { label: "Nordic Expansion" },
  { label: "Digital Transformation" },
];

function PillRow({
  items,
  className,
}: {
  items: { label: string; tone?: string }[];
  className: string;
}) {
  return (
    <div className={`capability-row ${className}`} aria-hidden="true">
      <div className="capability-row__track">
        {items.map((item, index) => (
          <span
            className={`capability-pill ${
              item.tone ? `capability-pill--${item.tone}` : ""
            }`}
            key={`${item.label}-${index}`}
          >
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function CapabilityMarqueeSection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.25,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .fromTo(
          ".capability-row--one .capability-row__track",
          { xPercent: -8 },
          { xPercent: -34, duration: 1, ease: "none" },
          0,
        )
        .fromTo(
          ".capability-row--two .capability-row__track",
          { xPercent: -38 },
          { xPercent: -10, duration: 1, ease: "none" },
          0,
        )
        .fromTo(
          ".capability-row--three .capability-row__track",
          { xPercent: -14 },
          { xPercent: -42, duration: 1, ease: "none" },
          0,
        );

      gsap.fromTo(
        ".capability-section__header",
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 38%",
            scrub: 1,
          },
        },
      );

      gsap.fromTo(
        ".capability-row",
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 74%",
            end: "top 24%",
            scrub: 1.15,
          },
        },
      );
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="industries"
      className="capability-section"
      aria-label="SoftBridge Solutions capabilities and industries"
    >
      <div className="capability-section__sticky">
        <header className="capability-section__header">
          <span>04 / CAPABILITIES & INDUSTRIES</span>
          <p>
            Technology, products and sector expertise for companies building
            across Finland and Europe.
          </p>
        </header>

        <div className="capability-section__rows">
          <PillRow items={rowOne} className="capability-row--one" />
          <PillRow items={rowTwo} className="capability-row--two" />
          <PillRow items={rowThree} className="capability-row--three" />
        </div>

        <div className="capability-section__footer" aria-hidden="true">
          <span>SOFTBRIDGE SOLUTIONS</span>
          <span>FINLAND OFFICE / EUROPEAN DELIVERY</span>
        </div>
      </div>
    </section>
  );
}
