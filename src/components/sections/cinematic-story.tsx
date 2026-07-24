"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SectionLabel } from "@/components/ui/section-label";

export function CinematicStory() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo("[data-story-frame]", { clipPath: "inset(18% 22% 18% 22% round 2rem)" }, {
      clipPath: "inset(0% 0% 0% 0% round 0rem)",
      ease: "none",
      scrollTrigger: { trigger: root.current, start: "top 80%", end: "bottom 45%", scrub: 1 }
    });
    gsap.to("[data-story-glow]", {
      xPercent: 28,
      yPercent: -18,
      rotate: 24,
      ease: "none",
      scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 1.2 }
    });
  }, { scope: root });

  return (
    <section ref={root} className="bg-[#0c1412] py-28 text-[#f4f5ef] md:py-44">
      <div className="container-shell">
        <SectionLabel index="03" label="A Nordic point of view" invert />
        <div className="mt-14 grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <h2 className="text-[clamp(3.4rem,8vw,8rem)] font-semibold leading-[.84] tracking-[-.07em]">Calm outside.<br />Rigorous inside.</h2>
          <p className="max-w-xl text-lg leading-relaxed text-white/62 lg:justify-self-end">Finnish design is not silence for its own sake. It is the discipline to remove distraction, expose what matters and engineer every remaining detail with care.</p>
        </div>
      </div>
      <div data-story-frame className="relative mt-20 min-h-[86svh] overflow-hidden bg-[#153c4f]">
        <div data-story-glow className="absolute -left-[12vw] top-[12%] h-[65vw] max-h-[900px] w-[65vw] max-w-[900px] rounded-full bg-[radial-gradient(circle_at_35%_35%,#dfffd9_0,#a6ff8f_22%,#45a28c_48%,transparent_72%)] blur-2xl" />
        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="container-shell relative flex min-h-[86svh] flex-col justify-between py-10">
          <div className="flex justify-between text-[10px] uppercase tracking-[.18em] text-white/65"><span>Helsinki / 60.1699° N</span><span>Digital systems with human scale</span></div>
          <p className="max-w-4xl text-[clamp(2.6rem,6vw,6.5rem)] font-medium leading-[.93] tracking-[-.055em]">We create expressive digital experiences that remain clear under pressure, useful in daily work and resilient as the business grows.</p>
        </div>
      </div>
    </section>
  );
}
