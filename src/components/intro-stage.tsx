"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function IntroStage() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo("[data-intro-visual]", { clipPath: "inset(10% 10% 10% 10% round 2rem)", y: 60 }, {
      clipPath: "inset(0% 0% 0% 0% round 2.5rem)", y: 0, duration: 1.15, ease: "power4.out",
      scrollTrigger: { trigger: root.current, start: "top 72%" },
    });
    gsap.fromTo("[data-intro-copy]", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 68%" } });
  }, { scope: root });

  return (
    <section ref={root} className="section-space bg-mint">
      <div className="container-site grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
        <div data-intro-visual className="relative min-h-[520px] overflow-hidden rounded-stage border border-forest/10 bg-white stage-shadow md:min-h-[680px]">
          <Image src="/art/studio-people.svg" alt="Two senior specialists collaborating in one shared delivery model" fill className="object-cover" />
        </div>
        <div data-intro-copy className="lg:pl-8">
          <p className="eyebrow text-forest/50">One operating model</p>
          <h2 className="heading-xl mt-6 max-w-[10ch]">One team, without the hand-off.</h2>
          <p className="body-lg mt-7 max-w-xl text-forest/70">Helsinki keeps strategy and product decisions close. Türkiye extends senior design, software and AI delivery. Context stays with the same team from framing to production.</p>
          <div className="mt-10 grid gap-3">
            {["Client strategy stays close", "Senior delivery stays accountable", "One backlog keeps trade-offs visible"].map((item) => (
              <div key={item} className="rounded-2xl border border-forest/15 bg-white/65 px-5 py-4 font-bold">{item}</div>
            ))}
          </div>
          <Link href="/studio" className="link-line mt-8">See how the studio works ↗</Link>
        </div>
      </div>
    </section>
  );
}
