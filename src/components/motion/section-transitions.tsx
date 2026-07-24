"use client";

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SectionTransitions() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("main > section").forEach((section) => {
        const next = section.nextElementSibling as HTMLElement | null;
        if (!next) return;
        gsap.fromTo(next, { clipPath: "inset(7% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", ease: "none", scrollTrigger: { trigger: next, start: "top 96%", end: "top 68%", scrub: .7 } });
      });
      gsap.utils.toArray<HTMLElement>("[data-kinetic-title]").forEach((title) => {
        gsap.fromTo(title, { xPercent: -7 }, { xPercent: 5, ease: "none", scrollTrigger: { trigger: title, start: "top bottom", end: "bottom top", scrub: 1 } });
      });
    });
    return () => ctx.revert();
  }, []);
  return null;
}
