"use client";

import { outcomes } from "@/lib/data";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function OutcomesStage() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    gsap.fromTo("[data-outcome]",
      { scale: 0.88, y: 70, opacity: 0, rotate: 2 },
      {
        scale: 1,
        y: 0,
        opacity: 1,
        rotate: 0,
        duration: 0.95,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 72%" },
      }
    );
  }, { scope: root });

  return (
    <section ref={root} className="relative overflow-hidden bg-cream py-16 md:py-28">
      <div className="absolute inset-x-0 top-0 h-[45%] bg-[url('/art/hero-collaboration.svg')] bg-cover bg-center opacity-90" />
      <div className="absolute inset-x-0 top-0 h-[45%] bg-forest/30" />
      <div className="container-site relative z-10 pt-12 md:pt-24">
        <p className="eyebrow text-white">What changes when delivery is integrated</p>
        <h2 className="heading-xl mt-6 max-w-[12ch] text-white">Software becomes easier to decide, ship and own.</h2>

        <div className="mt-16 grid gap-4 md:grid-cols-2">
          {outcomes.map((item) => (
            <article key={item.title} data-outcome className={`rounded-stage min-h-[320px] p-6 md:min-h-[390px] md:p-9 ${item.className}`}>
              <div className="flex items-center justify-between border-b border-current/20 pb-5">
                <span className="eyebrow opacity-60">{item.tag}</span>
                <span className="text-3xl">↘</span>
              </div>
              <div className="mt-8 flex min-h-[220px] flex-col justify-end md:min-h-[280px]">
                <h3 className="display-lg text-[clamp(3rem,6vw,6.5rem)]">{item.title}</h3>
                <p className="body-lg mt-5 max-w-xl opacity-72">{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
