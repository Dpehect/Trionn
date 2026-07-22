"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useExperienceStore } from "@/store/experience-store";

const HeroScene = dynamic(
  () => import("@/components/hero-scene").then((module) => module.HeroScene),
  { ssr: false }
);

export function HeroExperience() {
  const root = useRef<HTMLElement>(null);
  const [engaged, setEngaged] = useState(false);
  const reducedMotion = useExperienceStore((state) => state.reducedMotion);
  const quality = useExperienceStore((state) => state.quality);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!root.current || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to("[data-hero-copy]", {
        yPercent: -18,
        opacity: 0.45,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to("[data-hero-meta]", {
        yPercent: 50,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "70% top",
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={root}
      className="relative flex min-h-[115vh] flex-col justify-between overflow-hidden pt-32"
      onPointerDown={() => setEngaged(true)}
      onPointerUp={() => setEngaged(false)}
      onPointerLeave={() => setEngaged(false)}
    >
      <div className="absolute inset-0 z-[var(--z-canvas)]">
        <HeroScene engaged={engaged} quality={quality} />
      </div>

      <div className="container-x relative z-[var(--z-content)]">
        <p className="eyebrow">Independent design & development studio</p>
      </div>

      <div className="container-x relative z-[var(--z-content)] pb-10">
        <div data-hero-copy>
          <h1 className="display-hero mix-blend-difference">
            WE MAKE
            <br />
            <span className="text-[var(--accent-primary)]">DIGITAL</span>
            <br />
            FEEL ALIVE.
          </h1>
        </div>

        <div
          data-hero-meta
          className="mt-8 grid gap-5 border-t hairline pt-5 text-xs uppercase tracking-[.16em] md:grid-cols-3"
        >
          <span>{engaged ? "Energy engaged" : "Press and hold"}</span>
          <span className="md:text-center">WebGL / Motion / Product</span>
          <span className="md:text-right">Scroll to enter ↓</span>
        </div>
      </div>
    </section>
  );
}
