"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { capabilities } from "@/lib/data";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const tones = ["bg-[#e7e2f5]", "bg-[#f3eadc]", "bg-[#d8ebde]"];

export function CapabilityCards() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo("[data-cap-card]", { y: 70, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 75%" } });
  }, { scope: root });

  return (
    <section ref={root} className="section-space bg-cream">
      <div className="container-site">
        <div className="grid gap-8 md:grid-cols-[.75fr_1.25fr] md:items-end">
          <p className="eyebrow text-forest/50">Three capabilities</p>
          <h2 className="heading-xl max-w-[11ch]">Senior capability, organised around the product.</h2>
        </div>
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {capabilities.map((item, index) => (
            <article key={item.title} data-cap-card className={`capability-card rounded-stage flex min-h-[500px] flex-col justify-between border border-forest/10 p-6 md:p-8 ${tones[index]}`}>
              <div>
                <div className="flex items-center justify-between border-b border-forest/15 pb-5"><span className="eyebrow text-forest/45">{item.number}</span><span className="size-3 rounded-full bg-lime ring-4 ring-white/60" /></div>
                <h3 className="display-lg mt-8 text-[clamp(3.25rem,5vw,6rem)]">{item.title}</h3>
                <p className="body-lg mt-6 max-w-sm">{item.subtitle}</p>
              </div>
              <div>
                <p className="text-forest/67">{item.body}</p>
                <p className="mt-5 border-t border-forest/15 pt-5 text-sm text-forest/50">{item.detail}</p>
                <Link href="/services" className="magnetic-button button-dark mt-7">Explore {item.title.toLowerCase()} <ArrowUpRight size={15} /></Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
