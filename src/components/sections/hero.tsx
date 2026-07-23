"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { Magnetic } from "@/components/motion/magnetic";
import { Button } from "@/components/ui/button";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from("[data-hero-line]", {
      yPercent: 110,
      opacity: 0,
      duration: 1.1,
      stagger: 0.08,
      ease: "power4.out",
    });
    gsap.from("[data-hero-meta]", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      delay: 0.55,
      stagger: 0.08,
      ease: "power3.out",
    });
  }, { scope: root });

  return (
    <section ref={root} className="relative flex min-h-screen items-end overflow-hidden px-5 pb-10 pt-28 md:px-8 md:pb-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(85,105,255,.18),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(179,84,255,.15),transparent_28%),radial-gradient(circle_at_60%_80%,rgba(255,109,94,.14),transparent_32%)]" />
      <div className="relative z-10 grid w-full gap-10 lg:grid-cols-[1fr_340px] lg:items-end">
        <div>
          <p data-hero-meta className="mb-5 text-xs uppercase tracking-[0.22em] text-white/50">Software studio / Finland</p>
          <div className="overflow-hidden"><h1 data-hero-line className="text-[clamp(3.4rem,8vw,8.5rem)] font-semibold leading-[0.9] tracking-[-0.055em]">We build digital</h1></div>
          <div className="overflow-hidden"><h1 data-hero-line className="text-[clamp(3.4rem,8vw,8.5rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-gradient">products that move</h1></div>
          <div className="overflow-hidden"><h1 data-hero-line className="text-[clamp(3.4rem,8vw,8.5rem)] font-semibold leading-[0.9] tracking-[-0.055em]">business forward.</h1></div>
        </div>
        <div className="space-y-6 pb-2">
          <p data-hero-meta className="max-w-sm text-base leading-relaxed text-white/60">Custom software, AI automation, SaaS products and high-performance digital experiences for ambitious companies across Finland and Europe.</p>
          <div data-hero-meta className="flex gap-3">
            <Magnetic><Button>Explore our work</Button></Magnetic>
            <Magnetic><Button variant="ghost">Our services</Button></Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
