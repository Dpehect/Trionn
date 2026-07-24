"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 2.35 });
    tl.from("[data-kicker]", { opacity: 0, y: 22, duration: .65 })
      .from("[data-hero-word]", { yPercent: 120, rotate: 2, duration: 1.25, stagger: .11 }, "-=.35")
      .from("[data-hero-stage]", { clipPath: "inset(100% 0 0 0)", rotate: 2.5, scale: .92, duration: 1.3 }, "-=1.05")
      .from("[data-hero-bottom]", { opacity: 0, y: 30, duration: .85, stagger: .08 }, "-=.65");
    gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1.1 } })
      .to("[data-hero-copy]", { yPercent: -15, scale: .94, opacity: .28, ease: "none" }, 0)
      .to("[data-hero-stage]", { yPercent: 32, rotate: -4, scale: 1.08, ease: "none" }, 0)
      .to("[data-hero-rule]", { scaleX: 0, transformOrigin: "right", ease: "none" }, 0);
  }, { scope: root });

  return <section ref={root} className="relative min-h-[115svh] overflow-hidden bg-paper pt-28 md:pt-32">
    <div className="container-shell flex min-h-[100svh] flex-col">
      <div data-kicker className="grid grid-cols-2 gap-6 border-b hairline pb-4 text-[10px] uppercase tracking-[.18em] text-black/52 md:grid-cols-4">
        <span>Softbridge Solutions</span><span>Finland-focused</span><span className="hidden md:block">Strategy / Design / Engineering</span><span className="text-right">Independent digital partner</span>
      </div>
      <div className="relative flex flex-1 items-center py-14 md:py-20">
        <div data-hero-copy className="relative z-10 w-full will-change-transform">
          <div className="reveal-line"><h1 data-hero-word className="display">DIGITAL</h1></div>
          <div className="reveal-line flex justify-end"><h1 data-hero-word className="display pr-[4vw]">SYSTEMS</h1></div>
          <div className="reveal-line"><h1 data-hero-word className="display pl-[9vw]">WITH INTENT.</h1></div>
        </div>
        <div data-hero-stage className="absolute right-[3%] top-[11%] hidden h-[72%] w-[29%] overflow-hidden border border-black/20 bg-[#d9ddd7] will-change-transform lg:block">
          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between border-b border-black/20 bg-[#d9ddd7]/90 px-4 py-3 text-[9px] uppercase tracking-[.16em]"><span>SB / 01</span><span>Digital direction</span></div>
          <div className="absolute inset-x-[8%] bottom-[8%] top-[17%] overflow-hidden bg-forest p-5 text-white">
            <div className="absolute inset-0 opacity-20 [background:repeating-linear-gradient(90deg,transparent_0,transparent_14%,white_14.2%,transparent_14.4%)]"/>
            <div className="relative flex h-full flex-col justify-between"><span className="index-number text-white/45">60.1699° N</span><div><div className="mb-5 h-px bg-white/30"/><p className="text-[clamp(1.8rem,3vw,3.6rem)] font-medium leading-[.92] tracking-[-.05em]">Clarity is not minimalism. It is precision.</p></div></div>
          </div>
        </div>
      </div>
      <div data-hero-rule className="h-px bg-black/20"/>
      <div className="grid gap-8 py-6 md:grid-cols-[1.15fr_.65fr_auto] md:items-end">
        <p data-hero-bottom className="max-w-2xl text-xl leading-[1.12] tracking-[-.035em] md:text-3xl">We design and engineer category-defining websites, digital products and AI-enabled systems for ambitious organisations in Finland and beyond.</p>
        <p data-hero-bottom className="max-w-xs text-sm leading-relaxed text-black/52">Every transition carries narrative weight. Every interaction moves the story forward.</p>
        <div data-hero-bottom className="flex gap-3 md:justify-end"><Link href="/work" className="group flex items-center gap-3 border-b border-black pb-2 text-sm font-semibold">Selected work <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"/></Link><a href="#principle" className="grid size-11 place-items-center border border-black/25 transition hover:bg-black hover:text-white" aria-label="Scroll"><ArrowDownRight size={17}/></a></div>
      </div>
    </div>
  </section>;
}
