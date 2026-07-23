"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowDownRight, Sparkles } from "lucide-react";
import { useRef } from "react";
import { Magnetic } from "@/components/motion/magnetic";

const SignpostScene = dynamic(
  () => import("@/components/canvas/signpost-scene").then((module) => module.SignpostScene),
  { ssr: false, loading: () => <div className="hero-object-fallback" /> },
);

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const timeline = gsap.timeline({ defaults: { ease: "power4.out" } });
      timeline
        .from("[data-hero-kicker]", { y: 22, opacity: 0, duration: 0.7 })
        .from("[data-hero-word]", { yPercent: 115, rotate: 2, duration: 1.05, stagger: 0.07 }, "-=0.35")
        .from("[data-hero-copy]", { y: 24, opacity: 0, duration: 0.8, stagger: 0.08 }, "-=0.55")
        .from("[data-hero-canvas]", { scale: 0.84, opacity: 0, rotate: -4, duration: 1.2 }, "-=1");

      gsap.to("[data-hero-canvas]", {
        yPercent: 8,
        rotation: 2,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1.2 },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="creative-hero">
      <div className="hero-noise" />
      <div className="hero-grid" />
      <div className="hero-orb hero-orb--blue" />
      <div className="hero-orb hero-orb--coral" />
      <div className="hero-orb hero-orb--lime" />

      <div className="hero-layout">
        <div className="hero-copy-column">
          <div data-hero-kicker className="hero-kicker">
            <span><Sparkles size={14} /> Software studio</span>
            <span>Finland / Europe</span>
          </div>

          <h1 className="hero-title" aria-label="Software that feels ahead of its time">
            <span className="hero-title-line"><span data-hero-word>Software that feels</span></span>
            <span className="hero-title-line hero-title-line--accent"><span data-hero-word>ahead of its time.</span></span>
          </h1>

          <div className="hero-bottom-copy">
            <p data-hero-copy>
              We design and engineer digital products, AI systems and scalable software for ambitious teams across Finland and Europe.
            </p>
            <div data-hero-copy className="hero-actions">
              <Magnetic strength={0.16}>
                <Link href="/projects" className="hero-button hero-button--primary">View our work <ArrowDownRight size={17} /></Link>
              </Magnetic>
              <Magnetic strength={0.13}>
                <Link href="#services" className="hero-button hero-button--secondary">Explore services</Link>
              </Magnetic>
            </div>
          </div>
        </div>

        <div data-hero-canvas className="hero-object-wrap" aria-label="Interactive colorful software direction signpost">
          <div className="hero-object-badge">Interactive object / Drag with cursor</div>
          <SignpostScene />
        </div>
      </div>

      <div className="hero-ticker" aria-hidden="true">
        <div>PRODUCT ENGINEERING • AI AUTOMATION • MOBILE • WEB EXPERIENCES • PRODUCT DESIGN •</div>
      </div>
    </section>
  );
}
