"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { capabilities } from "@/lib/data";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const tones: Record<string, string> = {
  forest: "bg-forest text-white",
  ochre: "bg-ochre text-white",
  coral: "bg-coral text-white",
};

export function CapabilityCards() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    gsap.fromTo("[data-cap-card]",
      { y: 90, clipPath: "inset(18% 0 0 0 round 2.25rem)" },
      {
        y: 0,
        clipPath: "inset(0% 0 0 0 round 2.25rem)",
        duration: 1.05,
        stagger: 0.13,
        ease: "power4.out",
        scrollTrigger: { trigger: root.current, start: "top 72%" },
      }
    );
  }, { scope: root });

  return (
    <section ref={root} className="section-space bg-cream">
      <div className="container-site">
        <div className="grid gap-8 md:grid-cols-[.8fr_1.2fr] md:items-end">
          <p className="eyebrow text-forest/50">How we reduce product risk</p>
          <h2 className="heading-xl max-w-[12ch]">Three capabilities. One senior delivery system.</h2>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {capabilities.map((item) => (
            <article key={item.title} data-cap-card className={`rounded-stage flex min-h-[520px] flex-col justify-between overflow-hidden p-6 md:p-8 ${tones[item.tone]}`}>
              <div>
                <div className="flex items-center justify-between border-b border-white/25 pb-5">
                  <span className="eyebrow text-white/60">{item.number}</span>
                  <span className="size-3 rounded-full bg-lime" />
                </div>
                <h3 className="display-lg mt-8 text-[clamp(3.5rem,5.5vw,6.7rem)]">{item.title}</h3>
                <p className="body-lg mt-6 max-w-sm">{item.subtitle}</p>
              </div>
              <div>
                <p className="text-white/70">{item.body}</p>
                <p className="mt-5 border-t border-white/20 pt-5 text-sm text-white/55">{item.detail}</p>
                <Link href="/services" className="magnetic-button mt-7 bg-white text-forest">Explore {item.title.toLowerCase()} <ArrowUpRight size={15} /></Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
