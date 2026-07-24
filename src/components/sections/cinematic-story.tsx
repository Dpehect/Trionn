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
    gsap.from("[data-principle]", {
      y: 70,
      opacity: 0,
      stagger: .14,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: root.current, start: "top 72%" }
    });
  }, { scope: root });

  return (
    <section ref={root} className="bg-foreground py-28 text-background md:py-44">
      <div className="container-shell">
        <SectionLabel index="03" label="Art direction" invert />
        <div className="mt-16 grid gap-12 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <h2 className="text-balance text-[clamp(4rem,9vw,10rem)] font-medium leading-[.78] tracking-[-.075em]">Quiet is powerful when every detail is deliberate.</h2>
          <p className="max-w-lg text-lg leading-relaxed text-white/60 lg:justify-self-end">Our visual language takes cues from Finnish architecture and editorial design: honest materials, decisive typography, measured movement and space that gives ideas room to breathe.</p>
        </div>
        <div className="mt-28 border-t border-white/20">
          {principles.map(([number, title, body]) => (
            <article data-principle key={number} className="grid gap-5 border-b border-white/20 py-8 md:grid-cols-[100px_.75fr_1fr] md:items-start md:py-12">
              <span className="index-number text-signal">{number}</span>
              <h3 className="text-3xl font-medium tracking-[-.04em] md:text-5xl">{title}</h3>
              <p className="max-w-xl text-base leading-relaxed text-white/55 md:text-lg">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
