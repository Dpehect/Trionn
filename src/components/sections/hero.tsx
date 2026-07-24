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
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.from("[data-kicker]", { opacity: 0, y: 18, duration: .7 })
      .from("[data-hero-word]", { yPercent: 115, duration: 1.15, stagger: .1 }, "-=.4")
      .from("[data-hero-bottom]", { opacity: 0, y: 24, duration: .8, stagger: .08 }, "-=.55");
    gsap.to("[data-hero-stage]", {
      yPercent: 11,
      ease: "none",
      scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1 }
    });
  }, { scope: root });

  return (
    <section ref={root} className="relative min-h-[100svh] overflow-hidden bg-paper pt-28 md:pt-32">
      <div className="container-shell flex min-h-[calc(100svh-7rem)] flex-col">
        <div data-kicker className="grid grid-cols-2 gap-6 border-b hairline pb-4 text-[10px] uppercase tracking-[.18em] text-black/52 md:grid-cols-4">
          <span>Softbridge Solutions</span>
          <span>Finland-focused</span>
          <span className="hidden md:block">Strategy / Design / Engineering</span>
          <span className="text-right">Independent digital partner</span>
        </div>

        <div className="relative flex flex-1 items-center py-14 md:py-20">
          <div className="relative z-10 w-full">
            <div className="reveal-line"><h1 data-hero-word className="display">DIGITAL</h1></div>
            <div className="reveal-line flex justify-end"><h1 data-hero-word className="display pr-[4vw]">SYSTEMS</h1></div>
            <div className="reveal-line"><h1 data-hero-word className="display pl-[9vw]">WITH INTENT.</h1></div>
          </div>

          <div data-hero-stage className="absolute right-[4%] top-[14%] hidden h-[68%] w-[27%] border border-black/20 bg-[#d9ddd7] lg:block">
            <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-black/20 px-4 py-3 text-[9px] uppercase tracking-[.16em]">
              <span>SB / 01</span><span>Digital direction</span>
            </div>
            <div className="absolute inset-x-[9%] bottom-[9%] top-[18%] bg-forest p-5 text-white">
              <div className="flex h-full flex-col justify-between">
                <span className="index-number text-white/45">60.1699° N</span>
                <div>
                  <div className="mb-5 h-px bg-white/30" />
                  <p className="text-[clamp(1.8rem,3vw,3.6rem)] font-medium leading-[.92] tracking-[-.05em]">Clarity is not minimalism. It is precision.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 border-t hairline py-6 md:grid-cols-[1.15fr_.65fr_auto] md:items-end">
          <p data-hero-bottom className="max-w-2xl text-xl leading-[1.12] tracking-[-.035em] md:text-3xl">We design and engineer category-defining websites, digital products and AI-enabled systems for ambitious organisations in Finland and beyond.</p>
          <p data-hero-bottom className="max-w-xs text-sm leading-relaxed text-black/52">No decorative technology. No generic agency theatre. Every interaction has a commercial or narrative purpose.</p>
          <div data-hero-bottom className="flex gap-3 md:justify-end">
            <Link href="/work" className="group flex items-center gap-3 border-b border-black pb-2 text-sm font-semibold">Selected work <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" /></Link>
            <a href="#principle" aria-label="Scroll to agency principle" className="grid size-11 place-items-center border border-black/25"><ArrowDownRight size={17} /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
