"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const rowOne = [
  { label: "AI Software Development Finland", tone: "orange" },
  { label: "Custom Software Development" },
  { label: "Enterprise AI Solutions" },
  { label: "Web Application Development" },
  { label: "Cloud Application Development" },
  { label: "AI Agents for Business" },
  { label: "AI Software Development Finland", tone: "orange" },
  { label: "Custom Software Development" },
  { label: "Enterprise AI Solutions" },
  { label: "Web Application Development" },
  { label: "Cloud Application Development" },
  { label: "AI Agents for Business" },
];

const rowTwo = [
  { label: "Software Company in Finland", tone: "blue" },
  { label: "Nordic Digital Product Partner" },
  { label: "SaaS Product Development" },
  { label: "Mobile App Development" },
  { label: "Next.js Development Services" },
  { label: "React Development Company" },
  { label: "Software Company in Finland", tone: "blue" },
  { label: "Nordic Digital Product Partner" },
  { label: "SaaS Product Development" },
  { label: "Mobile App Development" },
  { label: "Next.js Development Services" },
  { label: "React Development Company" },
];

const rowThree = [
  { label: "Manufacturing AI Solutions" },
  { label: "Logistics Software Development" },
  { label: "Healthcare Software Solutions" },
  { label: "Retail AI & Automation", tone: "lime" },
  { label: "Education Technology Platforms" },
  { label: "Digital Transformation Europe" },
  { label: "Manufacturing AI Solutions" },
  { label: "Logistics Software Development" },
  { label: "Healthcare Software Solutions" },
  { label: "Retail AI & Automation", tone: "lime" },
  { label: "Education Technology Platforms" },
  { label: "Digital Transformation Europe" },
];

function PillRow({
  items,
  className,
}: {
  items: { label: string; tone?: string }[];
  className: string;
}) {
  return (
    <div className={`capability-row ${className}`}>
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

      gsap.fromTo(
        ".capability-section__header",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            end: "top 42%",
            scrub: 1,
          },
        },
      );

      gsap.fromTo(
        ".capability-row",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 76%",
            end: "top 30%",
            scrub: 1.05,
          },
        },
      );

      const rows = gsap.utils.toArray<HTMLElement>(".capability-row");

      rows.forEach((row, index) => {
        const track = row.querySelector<HTMLElement>(".capability-row__track");
        if (!track) return;

        const direction = index % 2 === 0 ? -1 : 1;
        const distance = Math.max(track.scrollWidth / 2, 600);

        const tween = gsap.fromTo(
          track,
          { x: direction === -1 ? 0 : -distance },
          {
            x: direction === -1 ? -distance : 0,
            duration: 24 + index * 4,
            ease: "none",
            repeat: -1,
          },
        );

        row.addEventListener("mouseenter", () => tween.timeScale(0.35));
        row.addEventListener("mouseleave", () => tween.timeScale(1));
      });

      gsap.to(".capability-aurora--one", {
        xPercent: 8,
        yPercent: -6,
        rotate: 10,
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".capability-aurora--two", {
        xPercent: -9,
        yPercent: 8,
        rotate: -8,
        duration: 15,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="industries"
      className="capability-section"
      aria-labelledby="capability-title"
    >
      <div className="capability-section__sticky">
        <div className="capability-aurora capability-aurora--one" aria-hidden="true" />
        <div className="capability-aurora capability-aurora--two" aria-hidden="true" />

        <header className="capability-section__header">
          <div>
            <span>04 / SOFTWARE, AI & DIGITAL PRODUCTS</span>
            <h2 id="capability-title">
              Technology capabilities for Finland, the Nordics and Europe.
            </h2>
          </div>

          <p>
            SoftBridge Solutions supports companies with AI engineering,
            custom software, cloud platforms, web applications, mobile
            products and scalable digital systems.
          </p>
        </header>

        <div className="capability-section__rows">
          <PillRow items={rowOne} className="capability-row--one" />
          <PillRow items={rowTwo} className="capability-row--two" />
          <PillRow items={rowThree} className="capability-row--three" />
        </div>

        <div className="capability-section__footer">
          <span>SOFTBRIDGE SOLUTIONS / FINLAND OFFICE</span>
          <span>AI · WEB · MOBILE · CLOUD · SAAS · AUTOMATION</span>
        </div>
      </div>
    </section>
  );
}
