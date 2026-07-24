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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timeline = gsap.timeline({ defaults: { ease: "power4.out" } });
    timeline
      .fromTo("[data-hero-kicker]", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65 })
      .fromTo("[data-hero-line]", { yPercent: 118 }, { yPercent: 0, duration: 1, stagger: 0.08 }, "-=0.3")
      .fromTo("[data-hero-copy]", { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.55")
      .fromTo("[data-hero-actions]", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.45")
      .fromTo("[data-hero-visual]", { scale: 0.94, opacity: 0, y: 45 }, { scale: 1, opacity: 1, y: 0, duration: 1 }, "-=0.8");

    gsap.to("[data-hero-visual]", {
      yPercent: 8,
      rotate: 1.5,
      ease: "none",
      scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
    });
  }, { scope: root });

  return (
    <section ref={root} className="relative min-h-[100svh] overflow-hidden bg-lavender pt-28 text-forest md:pt-32">
      <div className="absolute -right-24 top-12 size-72 rounded-full bg-lime/70 blur-3xl" aria-hidden="true" />
      <div className="container-site relative z-10 grid min-h-[calc(100svh-7rem)] items-center gap-12 pb-10 lg:grid-cols-[.82fr_1.18fr] lg:gap-16">
        <div className="max-w-3xl">
          <p data-hero-kicker className="eyebrow mb-7 text-forest/55">Helsinki strategy · Türkiye delivery</p>
          <h1 className="display-xl max-w-[8.2ch] text-forest">
            <span className="word-mask block"><span data-hero-line>Software that</span></span>
            <span className="word-mask block"><span data-hero-line className="highlight-lime">works better.</span></span>
          </h1>
          <p data-hero-copy className="body-lg mt-8 max-w-xl text-forest/70">
            One integrated senior team for product, experience, AI and platform delivery. One backlog. Clarity before code.
          </p>
          <div data-hero-actions className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="magnetic-button button-lime">Start a project <ArrowUpRight size={16} /></Link>
            <Link href="/work" className="magnetic-button border border-forest/35 bg-white/45 text-forest">See selected work</Link>
          </div>
          <div className="mt-12 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-forest/50">
            <ArrowDownRight size={14} /> Scroll to follow the system
          </div>
        </div>

        <div data-hero-visual className="relative min-h-[520px] overflow-hidden rounded-stage border border-forest/10 bg-white/50 stage-shadow md:min-h-[650px]">
          <Image src="/art/hero-collaboration.svg" alt="Two senior product practitioners collaborating around a software interface" fill priority className="object-cover" />
          <div className="absolute bottom-5 left-5 right-5 grid gap-3 sm:grid-cols-3">
            {["One team", "One backlog", "Visible decisions"].map((item) => (
              <div key={item} className="rounded-2xl border border-forest/10 bg-white/90 px-4 py-3 text-sm font-bold backdrop-blur">{item}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
