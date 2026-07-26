"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMemo, useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Segment = { text: string; className?: string };

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

type CharacterItem = { char: string; className: string; segmentIndex: number; charIndex: number };

export function BrandStatementSection() {
  const root = useRef<HTMLElement>(null);
  const characters = useMemo<CharacterItem[]>(() => {
    const result: CharacterItem[] = [];
    segments.forEach((segment, segmentIndex) => {
      Array.from(segment.text).forEach((char, charIndex) => {
        result.push({ char, className: segment.className ?? "", segmentIndex, charIndex });
      });
    });
    return result;
  }, []);

  useGSAP(() => {
    const section = root.current;
    if (!section) return;
    const chars = gsap.utils.toArray<HTMLElement>(".brand-char", section);
    const accentChars = gsap.utils.toArray<HTMLElement>(".brand-char.accent", section);
    gsap.set(chars, { opacity: 0.12, y: 13, rotateX: -18, transformOrigin: "50% 100%" });
    gsap.set(accentChars, { color: "currentColor", textShadow: "none" });

    const revealTimeline = gsap.timeline({
      scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: 1.15, invalidateOnRefresh: true },
    });

    revealTimeline
      .to(chars, { opacity: 1, y: 0, rotateX: 0, duration: 0.9, stagger: { each: 0.0048, from: "start" }, ease: "power2.out" }, 0)
      .to(accentChars, { color: "var(--accent-color)", textShadow: "0 0 22px color-mix(in srgb, var(--accent-color) 25%, transparent)", duration: 0.28, stagger: 0.018, ease: "power2.out" }, 0.14)
      .fromTo(".brand-statement__signature", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.16, ease: "power2.out" }, 0.82);

    gsap.fromTo(".brand-statement__eyebrow", { opacity: 0, x: -16 }, {
      opacity: 1, x: 0, ease: "power2.out",
      scrollTrigger: { trigger: section, start: "top 78%", end: "top 36%", scrub: 1 },
    });

    gsap.to(".brand-aurora--one", { xPercent: 10, yPercent: -7, rotate: 10, ease: "none", scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: 1.5 } });
    gsap.to(".brand-aurora--two", { xPercent: -10, yPercent: 9, rotate: -9, ease: "none", scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: 1.7 } });
    gsap.to(".brand-aurora--three", { xPercent: 6, yPercent: 5, scale: 1.06, ease: "none", scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: 1.6 } });
  }, { scope: root });

  return (
    <section ref={root} className="brand-statement brand-statement--colorful" aria-label="About SoftBridge Solutions Finland office">
      <div className="brand-statement__sticky">
        <div className="brand-aurora brand-aurora--one" aria-hidden="true" />
        <div className="brand-aurora brand-aurora--two" aria-hidden="true" />
        <div className="brand-aurora brand-aurora--three" aria-hidden="true" />
        <div className="brand-statement__noise" aria-hidden="true" />
        <div className="brand-statement__eyebrow"><span>03 / SOFTBRIDGE SOLUTIONS</span><span>Finland Office / Serving Europe</span></div>
        <div className="brand-statement__inner">
          <p className="brand-statement__copy" aria-label={segments.map((item) => item.text).join("")}>
            {characters.map((item, index) => (
              <span className={`brand-char ${item.className}`} key={`${item.segmentIndex}-${item.charIndex}-${index}`} aria-hidden="true">
                {item.char === " " ? "\u00A0" : item.char}
              </span>
            ))}
          </p>
        </div>
        <div className="brand-statement__signature" aria-hidden="true"><span>FINLAND OFFICE</span><strong>SOFTBRIDGE SOLUTIONS</strong></div>
        <div className="brand-statement__index" aria-hidden="true"><span>EUROPEAN SOFTWARE PARTNER</span><span>AI • CLOUD • WEB • MOBILE</span></div>
      </div>
    </section>
  );
}
