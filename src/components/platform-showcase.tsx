"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function PlatformShowcase() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 75%" } })
      .fromTo("[data-platform-shell]", { clipPath: "inset(16% 12% 18% 12% round 3rem)", y: 80 }, { clipPath: "inset(0% 0% 0% 0% round 3rem)", y: 0, duration: 1.2, ease: "power4.out" })
      .fromTo("[data-platform-copy]", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75 }, "-=0.6");

    gsap.to("[data-platform-image]", {
      yPercent: -7,
      ease: "none",
      scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
    });
  }, { scope: root });

  return (
    <section ref={root} className="section-space bg-cream">
      <div className="container-site">
        <div data-platform-shell className="rounded-stage overflow-hidden bg-[#2d0b59] p-4 text-white md:p-8 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <div data-platform-copy className="p-3 md:p-5">
              <p className="eyebrow text-white/50">Platform engineering</p>
              <h2 className="heading-xl mt-6 max-w-[9ch]">Built to run. Built to transfer.</h2>
              <p className="body-lg mt-7 max-w-xl text-white/65">Architecture, integrations, observability and delivery systems that internal teams can understand and own.</p>
              <div className="mt-9 grid gap-3 text-sm text-white/75">
                <span>→ Clear architecture decisions</span>
                <span>→ Performance and reliability budgets</span>
                <span>→ Production observability</span>
                <span>→ Deliberate ownership transfer</span>
              </div>
              <Link href="/services" className="magnetic-button button-lime mt-9">Explore platform delivery</Link>
            </div>
            <div className="relative min-h-[470px] overflow-hidden rounded-[2rem] md:min-h-[620px]">
              <Image data-platform-image src="/art/platform-ui.svg" alt="Abstract software platform interface" fill className="object-cover will-change-transform" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
