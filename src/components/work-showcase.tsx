"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cases } from "@/lib/data";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function WorkShowcase() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    gsap.utils.toArray<HTMLElement>("[data-case]").forEach((card) => {
      const media = card.querySelector("[data-case-media]");
      gsap.fromTo(card,
        { y: 70, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 82%" } }
      );
      if (media) {
        gsap.fromTo(media,
          { scale: 1.12 },
          { scale: 1, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true } }
        );
      }
    });
  }, { scope: root });

  return (
    <section ref={root} className="section-space bg-lavender">
      <div className="container-site">
        <div className="grid gap-8 md:grid-cols-[.75fr_1.25fr] md:items-end">
          <div>
            <p className="eyebrow text-forest/50">Selected work</p>
            <Link href="/work" className="link-line mt-7">View the disclosure standard ↗</Link>
          </div>
          <h2 className="heading-xl max-w-[12ch]">Proof, with the right level of disclosure.</h2>
        </div>

        <div className="mt-14 grid gap-5">
          {cases.map((item, index) => (
            <article key={item.slug} data-case className={`rounded-stage grid overflow-hidden ${item.color} lg:grid-cols-[1.05fr_.95fr] ${index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <div className="relative min-h-[410px] overflow-hidden lg:min-h-[600px]">
                <Image data-case-media src={item.art} alt="" fill className="object-cover will-change-transform" />
              </div>
              <div className="flex flex-col justify-between p-6 md:p-10">
                <div>
                  <div className="flex items-center justify-between border-b border-forest/20 pb-5">
                    <span className="eyebrow text-forest/55">{item.label}</span>
                    <span className="eyebrow text-forest/55">{item.sector}</span>
                  </div>
                  <h3 className="heading-lg mt-8">{item.title}</h3>
                  <p className="body-lg mt-6 text-forest/68">{item.summary}</p>
                </div>
                <div className="mt-12">
                  <p className="border-t border-forest/20 pt-5 text-sm font-semibold">{item.result}</p>
                  <Link href="/work" className="magnetic-button button-dark mt-7">Read the case <ArrowUpRight size={15} /></Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
