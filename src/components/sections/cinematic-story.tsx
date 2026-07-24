"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SectionLabel } from "@/components/ui/section-label";

const principles = [
  ["01", "Reduce noise", "Remove every layer that does not improve meaning, usability or conversion."],
  ["02", "Create tension", "Use scale, rhythm and contrast to make the experience memorable without making it difficult."],
  ["03", "Engineer restraint", "Motion, content and code work as one system—fast, accessible and maintainable."],
];

export function CinematicStory() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "+=150%", pin: true, scrub: 1 } })
      .fromTo("[data-story-field]", { clipPath: "inset(14% 18% 14% 18%)", scale: .9 }, { clipPath: "inset(0% 0% 0% 0%)", scale: 1, ease: "none" }, 0)
      .fromTo("[data-story-title]", { yPercent: 35, opacity: .25 }, { yPercent: -12, opacity: 1, ease: "none" }, 0)
      .fromTo("[data-story-copy]", { y: 80, opacity: 0 }, { y: 0, opacity: 1, ease: "none" }, .22)
      .from("[data-principle]", { xPercent: 18, opacity: 0, stagger: .08, ease: "none" }, .35);
  }, { scope: root });

  return <section ref={root} className="relative min-h-screen overflow-hidden bg-foreground text-background">
    <div data-story-field className="absolute inset-0 bg-foreground will-change-transform">
      <div className="absolute inset-0 opacity-[.13] [background:linear-gradient(90deg,transparent_0,transparent_24.8%,white_25%,transparent_25.2%,transparent_49.8%,white_50%,transparent_50.2%,transparent_74.8%,white_75%,transparent_75.2%)]"/>
    </div>
    <div className="container-shell relative z-10 flex min-h-screen flex-col justify-center py-20">
      <SectionLabel index="03" label="Art direction" invert/>
      <div className="mt-12 grid gap-12 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
        <h2 data-story-title data-kinetic-title className="text-balance text-[clamp(4rem,9vw,10rem)] font-medium leading-[.78] tracking-[-.075em] will-change-transform">Quiet is powerful when every detail is deliberate.</h2>
        <p data-story-copy className="max-w-lg text-lg leading-relaxed text-white/60 lg:justify-self-end">Our visual language takes cues from Finnish architecture and editorial design: honest materials, decisive typography, measured movement and space that gives ideas room to breathe.</p>
      </div>
      <div className="mt-16 border-t border-white/20 md:mt-24">
        {principles.map(([number,title,body])=><article data-principle key={number} className="grid gap-5 border-b border-white/20 py-6 md:grid-cols-[100px_.75fr_1fr] md:items-start md:py-8"><span className="index-number text-signal">{number}</span><h3 className="text-3xl font-medium tracking-[-.04em] md:text-5xl">{title}</h3><p className="max-w-xl text-base leading-relaxed text-white/55 md:text-lg">{body}</p></article>)}
      </div>
    </div>
  </section>;
}
