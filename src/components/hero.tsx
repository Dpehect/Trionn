"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const timeline = gsap.timeline({ defaults: { ease: "power4.out" } });
    timeline
      .fromTo("[data-hero-kicker]", { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 })
      .fromTo("[data-hero-line]", { yPercent: 115 }, { yPercent: 0, duration: 1.05, stagger: 0.09 }, "-=0.4")
      .fromTo("[data-hero-copy]", { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.65")
      .fromTo("[data-hero-actions]", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65 }, "-=0.55");

    gsap.to("[data-hero-art]", {
      yPercent: 12,
      scale: 1.08,
      ease: "none",
      scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
    });

    gsap.to("[data-bridge-mark]", {
      rotate: 18,
      xPercent: 11,
      ease: "none",
      scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1 },
    });

    gsap.to("[data-hero-content]", {
      yPercent: -12,
      opacity: 0.12,
      ease: "none",
      scrollTrigger: { trigger: root.current, start: "45% top", end: "bottom top", scrub: true },
    });
  }, { scope: root });

  return (
    <section ref={root} className="relative min-h-[100svh] overflow-hidden bg-forest text-white noise">
      <div data-hero-art className="absolute inset-0 scale-[1.02]">
        <Image src="/art/hero-office.svg" alt="Softbridge product operating system interface" fill priority className="object-cover" />
      </div>
      <div className="hero-vignette absolute inset-0" />
      <div data-bridge-mark className="bridge-mark -left-[21vw] top-[18%] md:-left-[13vw] md:top-[8%]" aria-hidden="true" />

      <div data-hero-content className="container-site relative z-10 flex min-h-[100svh] flex-col justify-end pb-8 pt-32 md:pb-12">
        <div className="mx-auto w-full max-w-[1220px] text-center">
          <p data-hero-kicker className="eyebrow mx-auto mb-6 w-fit rounded-full bg-white/88 px-4 py-2 text-forest backdrop-blur">
            Helsinki strategy · Türkiye delivery
          </p>

          <h1 className="display-xl text-lime">
            <span className="word-mask block"><span data-hero-line>Software that</span></span>
            <span className="word-mask block"><span data-hero-line>works better.</span></span>
          </h1>

          <p data-hero-copy className="body-lg mx-auto mt-7 max-w-2xl text-white/82">
            One integrated senior team for product, experience, AI and platform delivery. One backlog. Clarity before code.
          </p>

          <div data-hero-actions className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/services" className="magnetic-button button-lime">Explore our capabilities <ArrowUpRight size={16} /></Link>
            <Link href="/studio" className="magnetic-button border border-white/50 bg-white/10 text-white backdrop-blur">Understand the model</Link>
          </div>
        </div>

        <div className="mt-12 flex items-end justify-between border-t border-white/25 pt-5 text-xs text-white/65">
          <span>Independent product engineering studio</span>
          <span className="flex items-center gap-2"><ArrowDownRight size={14} /> Scroll to follow the system</span>
        </div>
      </div>
    </section>
  );
}
