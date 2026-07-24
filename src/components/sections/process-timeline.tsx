"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processSteps } from "@/content/process";
gsap.registerPlugin(ScrollTrigger);

export function ProcessTimeline({ compact = false }: { compact?: boolean }) {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>("[data-process-step]").forEach((element) => {
      gsap.fromTo(element, { opacity: .3, y: 44 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 84%", end: "top 46%", scrub: .5 } });
    });
  }, { scope: root });
  const steps = compact ? processSteps.slice(0, 3) : processSteps;
  return (
    <section ref={root} id="process" className="bg-foreground py-28 text-background md:py-40">
      <div className="container-shell">
        <div className="grid gap-12 border-b border-white/20 pb-14 lg:grid-cols-[.55fr_1.45fr]">
          <p className="eyebrow text-white/45">Operating model</p>
          <h2 className="text-balance text-[clamp(3.4rem,7.5vw,8rem)] font-medium leading-[.84] tracking-[-.07em]">Rigorous enough for complex work. Clear enough to enjoy.</h2>
        </div>
        <div>
          {steps.map((step) => (
            <article data-process-step key={step.number} className="grid gap-7 border-b border-white/20 py-10 md:grid-cols-[.25fr_.75fr_1.2fr] md:py-14">
              <div><span className="index-number text-signal">{step.number}</span><span className="eyebrow mt-5 block text-white/35">{step.duration}</span></div>
              <h3 className="text-4xl font-medium tracking-[-.05em] md:text-6xl">{step.title}</h3>
              <div><p className="max-w-2xl text-lg leading-relaxed text-white/60">{step.summary}</p><p className="mt-7 text-xs uppercase leading-7 tracking-[.12em] text-white/42">{step.deliverables.join("  /  ")}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
