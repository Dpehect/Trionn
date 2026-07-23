"use client";

import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowDownRight, ArrowRight, Sparkles } from "lucide-react";
import { StudioCockpit } from "@/components/hero/studio-cockpit";
import { useRef } from "react";
import { Magnetic } from "@/components/motion/magnetic";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const timeline = gsap.timeline({ defaults: { ease: "power4.out" } });
      timeline
        .from("[data-hero-kicker]", { y: 22, opacity: 0, duration: 0.7 })
        .from("[data-hero-word]", { yPercent: 120, rotate: 2.5, duration: 1.05, stagger: 0.08 }, "-=0.35")
        .from("[data-hero-copy]", { y: 24, opacity: 0, duration: 0.75, stagger: 0.08 }, "-=0.52")
        .from("[data-trust-item]", { scale: 0.85, opacity: 0, duration: 0.55, stagger: 0.05 }, "-=0.45")
        .from("[data-hero-canvas]", { scale: 0.78, opacity: 0, rotate: -5, duration: 1.35 }, "-=1.1")
        .from("[data-capability-control]", { scale: 0.78, opacity: 0, duration: 0.62, stagger: 0.07 }, "-=0.7");

      gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1.1 },
      })
        .to("[data-hero-copy-column]", { yPercent: -12, opacity: 0.35 }, 0)
        .to("[data-hero-canvas]", { yPercent: 12, rotation: 4, scale: 0.92 }, 0)
        .to("[data-hero-orb]", { yPercent: 30, stagger: 0.06 }, 0);
    });
    return () => mm.revert();
  }, { scope: root });

  return (
    <section ref={root} className="creative-hero">
      <div className="hero-noise" />
      <div className="hero-grid" />
      <div data-hero-orb className="hero-orb hero-orb--blue" />
      <div data-hero-orb className="hero-orb hero-orb--coral" />
      <div data-hero-orb className="hero-orb hero-orb--lime" />

      <div className="hero-layout">
        <div data-hero-copy-column className="hero-copy-column">
          <div data-hero-kicker className="hero-kicker">
            <span><Sparkles size={14} /> Independent software studio</span>
            <span>Finland / Europe</span>
          </div>

          <h1 className="hero-title" aria-label="Software that feels ahead of its time">
            <span className="hero-title-line"><span data-hero-word>Software that feels</span></span>
            <span className="hero-title-line hero-title-line--accent"><span data-hero-word>ahead of its time.</span></span>
          </h1>

          <div className="hero-bottom-copy">
            <div>
              <p data-hero-copy>
                We design and engineer digital products, AI systems and scalable software for ambitious teams across Finland and Europe.
              </p>
              <div className="hero-trust" aria-label="Studio facts">
                <span data-trust-item><strong>6+</strong> years building</span>
                <span data-trust-item><strong>EU</strong> delivery model</span>
                <span data-trust-item><strong>Q3</strong> slots open</span>
              </div>
            </div>
            <div data-hero-copy className="hero-actions">
              <Magnetic strength={0.16}><Link href="/projects" className="hero-button hero-button--primary">View our work <ArrowDownRight size={17} /></Link></Magnetic>
              <Magnetic strength={0.13}><Link href="#services" className="hero-button hero-button--secondary">Explore services <ArrowRight size={16} /></Link></Magnetic>
            </div>
          </div>
        </div>

        <div data-hero-canvas className="hero-object-wrap studio-cockpit-wrap" aria-label="Interactive software studio cockpit">
          <div className="hero-object-badge"><span /> Live product experience</div>
          <StudioCockpit />
        </div>
      </div>

      <div className="hero-scroll-cue"><span>Scroll to explore</span><ArrowDownRight size={15} /></div>
      <div className="hero-ticker" aria-hidden="true"><div>PRODUCT ENGINEERING • AI AUTOMATION • MOBILE • WEB EXPERIENCES • PRODUCT DESIGN • PRODUCT ENGINEERING • AI AUTOMATION • MOBILE • WEB EXPERIENCES • PRODUCT DESIGN •</div></div>
    </section>
  );
}
