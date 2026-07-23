"use client";

import dynamic from "next/dynamic";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { SectionLabel } from "@/components/ui/section-label";

gsap.registerPlugin(ScrollTrigger);

const NetworkCanvas = dynamic(() => import("@/components/three/network-canvas").then((module) => module.NetworkCanvas), {
  ssr: false,
  loading: () => <div className="size-full animate-pulse rounded-full bg-accent/5" />,
});

const metrics = [
  ["06+", "Years building digital products"],
  ["02", "Connected delivery locations"],
  ["08", "Core software capabilities"],
  ["24/7", "Distributed collaboration"],
];

export function StudioSection() {
  const section = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const words = gsap.utils.toArray<HTMLElement>("[data-manifesto-word]");
      gsap.fromTo(
        words,
        { color: "rgba(244,244,241,0.14)" },
        {
          color: "rgba(244,244,241,1)",
          stagger: 0.045,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-manifesto]",
            start: "top 75%",
            end: "bottom 45%",
            scrub: 1,
          },
        },
      );

      gsap.from("[data-metric]", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-metrics]", start: "top 82%" },
      });
    },
    { scope: section },
  );

  const manifesto = "A SOFTWARE PARTNER FOR AMBITIOUS COMPANIES IN FINLAND AND BEYOND.".split(" ");

  return (
    <section ref={section} id="studio" className="relative border-t border-white/10 py-28 sm:py-40">
      <div className="site-container">
        <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionLabel index="01">Studio / Finland</SectionLabel>
            <p className="mt-8 max-w-sm text-sm leading-7 text-muted">
              Softbridge Solutions Finland combines Nordic product thinking with an experienced distributed engineering team. We turn complex operations into software people can understand, trust and scale.
            </p>
            <div className="relative mt-12 aspect-square max-w-[31rem] overflow-hidden rounded-full border border-white/10 bg-[radial-gradient(circle_at_center,rgba(183,255,74,.12),transparent_62%)]">
              <NetworkCanvas />
              <div className="pointer-events-none absolute inset-[13%] rounded-full border border-white/[0.06]" />
              <div className="pointer-events-none absolute inset-[28%] rounded-full border border-accent/10" />
            </div>
          </div>

          <div>
            <h2 data-manifesto className="max-w-[12ch] text-[clamp(3.15rem,7.2vw,8.2rem)] font-semibold uppercase leading-[0.86] tracking-[-0.075em]">
              {manifesto.map((word, index) => (
                <span key={`${word}-${index}`} data-manifesto-word className="mr-[0.2em] inline-block text-white/15">
                  {word}
                </span>
              ))}
            </h2>

            <div className="mt-20 grid gap-px border-y border-white/10 bg-white/10 sm:grid-cols-2" data-metrics>
              {metrics.map(([value, label]) => (
                <div key={label} data-metric className="bg-background px-1 py-7 sm:p-8">
                  <strong className="text-4xl font-medium tracking-[-0.06em] sm:text-5xl">{value}</strong>
                  <p className="mt-8 max-w-[18rem] font-mono text-[10px] uppercase leading-5 tracking-[0.17em] text-white/40">{label}</p>
                </div>
              ))}
            </div>

            <div className="mt-14 grid gap-8 border-b border-white/10 pb-14 sm:grid-cols-2">
              <p className="text-xl leading-8 tracking-[-0.035em] text-white/88">Strategy and engineering operate as one team, reducing handoffs and keeping business intent intact from discovery through production.</p>
              <p className="text-sm leading-7 text-muted">Our Finland presence supports close collaboration with Nordic companies, while our distributed model provides access to multidisciplinary product, design and engineering expertise.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
