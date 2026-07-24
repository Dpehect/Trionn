"use client";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";

export function FinlandStatement() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(root.current, { clipPath: "inset(18% 4% 18% 4%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: root.current, start: "top 88%", end: "top 38%", scrub: 1 } });
    gsap.from("[data-statement-line]", { yPercent: 120, stagger: .1, duration: 1.2, ease: "power4.out", scrollTrigger: { trigger: root.current, start: "top 55%" } });
  }, { scope: root });
  return <section ref={root} id="finland" className="overflow-hidden bg-signal py-20 text-foreground md:py-28"><div className="container-shell"><div className="grid gap-12 border-b border-black/25 pb-10 md:grid-cols-[1fr_auto] md:items-start"><p className="eyebrow">Finland-focused / globally capable</p><p className="index-number">60.1699° N / 24.9384° E</p></div><div className="grid gap-12 py-16 lg:grid-cols-[1.35fr_.65fr] lg:items-end"><div><div className="reveal-line"><h2 data-statement-line className="text-balance text-[clamp(4rem,10vw,11rem)] font-medium leading-[.76] tracking-[-.08em]">LOCAL CONTEXT.</h2></div><div className="reveal-line"><h2 data-statement-line className="text-balance text-[clamp(4rem,10vw,11rem)] font-medium leading-[.76] tracking-[-.08em]">WORLD-CLASS EXECUTION.</h2></div></div><div className="lg:pb-5"><p className="max-w-md text-lg leading-relaxed">Built for companies that value Finnish clarity, dependable delivery and digital work with a distinct point of view.</p><Link href="/contact" className="group mt-8 inline-flex items-center gap-3 border-b border-black pb-2 text-sm font-semibold">Discuss a project <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"/></Link></div></div></div></section>;
}
