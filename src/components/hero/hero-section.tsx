"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight } from "lucide-react";
import { Magnetic } from "@/components/cursor/magnetic";
import { SectionLabel } from "@/components/ui/section-label";

gsap.registerPlugin(ScrollTrigger);
const HeroCanvas = dynamic(() => import("@/components/three/hero-canvas").then((module) => module.HeroCanvas), { ssr: false });

const lines = ["WE BUILD", "DIGITAL SYSTEMS", "THAT MOVE", "BUSINESSES FORWARD."];

export function HeroSection() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    const words = gsap.utils.toArray<HTMLElement>("[data-hero-line]");
    gsap.fromTo(words, { yPercent: 120, rotate: 2 }, { yPercent: 0, rotate: 0, duration: 1.15, stagger: 0.09, ease: "power4.out", delay: 1.9 });
    gsap.fromTo("[data-hero-meta]", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, delay: 2.45 });
    gsap.to("[data-hero-title]", {
      yPercent: 14,
      scale: 0.96,
      ease: "none",
      scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
    });
  }, { scope: root });

  return (
    <section ref={root} className="relative min-h-[100svh] overflow-hidden border-b border-white/[0.08]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_42%,rgba(183,255,74,0.15),transparent_28%),linear-gradient(to_bottom,transparent,rgba(0,0,0,.4))]" />
      <div className="absolute inset-y-0 right-0 w-full opacity-70 lg:w-[58%]"><HeroCanvas /></div>
      <div className="site-grid absolute inset-0 opacity-50" />
      <div className="site-container relative z-10 flex min-h-[100svh] flex-col justify-between pb-7 pt-32 sm:pb-10 sm:pt-36">
        <div data-hero-meta><SectionLabel index="FIN / 001">Software studio for ambitious companies</SectionLabel></div>
        <div data-hero-title className="relative z-10 max-w-[1500px]">
          {lines.map((line) => (
            <div key={line} className="overflow-hidden">
              <div data-hero-line className="text-[clamp(3.8rem,10.8vw,11.8rem)] font-semibold uppercase leading-[0.78] tracking-[-0.085em]">{line}</div>
            </div>
          ))}
        </div>
        <div className="grid gap-7 border-t border-white/10 pt-5 md:grid-cols-[1fr_1fr_auto] md:items-end">
          <p data-hero-meta className="max-w-md text-sm leading-6 text-white/58">Softbridge Solutions Finland creates intelligent products, scalable software and expressive digital experiences for Nordic businesses.</p>
          <p data-hero-meta className="font-mono text-[10px] uppercase leading-5 tracking-[0.18em] text-white/40">Helsinki / Finland<br />Product engineering<br />AI / Motion / WebGL</p>
          <Magnetic data-cursor="link" className="justify-self-start md:justify-self-end">
            <a href="#studio" data-cursor="link" className="inline-flex items-center gap-4 rounded-full bg-accent px-6 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-black transition-transform hover:scale-[1.03]">Explore the studio <ArrowDownRight className="size-4" /></a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
