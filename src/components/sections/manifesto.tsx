"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { homeContent } from "@/content/home";
import { SectionLabel } from "@/components/ui/section-label";

export function Manifesto() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.from("[data-manifesto-line]", { yPercent: 115, rotate: 1.5, stagger: .08, duration: 1.15, ease: "power4.out", scrollTrigger: { trigger: root.current, start: "top 70%" } });
    gsap.to("[data-manifesto-copy]", { xPercent: 6, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 1 } });
    gsap.from("[data-metric]", { scaleY: 0, transformOrigin: "top", stagger: .12, ease: "none", scrollTrigger: { trigger: "[data-metrics]", start: "top 78%", end: "top 42%", scrub: .8 } });
  }, { scope: root });
  const lines = ["Technology should feel clear,", "useful and distinctly human.", "We make complexity disappear", "without making the work anonymous."];
  return <section ref={root} id="principle" className="overflow-hidden bg-background py-28 md:py-44">
    <div className="container-shell"><SectionLabel index="01" label="Agency principle"/>
      <div className="mt-16 grid gap-14 lg:grid-cols-[.3fr_1.7fr]"><p className="max-w-xs text-sm leading-relaxed text-black/52">A digital partner for organisations that need more than a polished surface.</p><div data-manifesto-copy>{lines.map(line=><div key={line} className="reveal-line"><p data-manifesto-line className="text-balance text-[clamp(3.2rem,7.1vw,8rem)] font-medium leading-[.9] tracking-[-.068em]">{line}</p></div>)}</div></div>
      <div data-metrics className="mt-24 grid border-t hairline md:grid-cols-3">{homeContent.metrics.map((metric,index)=><div data-metric className="border-b hairline py-8 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0" key={metric.value}><div className="flex items-center justify-between"><span className="index-number">0{index+1}</span><span className="index-number text-black/40">{metric.value}</span></div><p className="mt-20 max-w-xs text-xl tracking-[-.025em]">{metric.label}</p></div>)}</div>
    </div>
  </section>;
}
