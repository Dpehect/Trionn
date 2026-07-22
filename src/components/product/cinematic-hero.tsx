"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { ArrowDownRight, ArrowUpRight, Asterisk } from "lucide-react";
import { ProductScreen } from "@/components/product/product-screen";
import { useProductStore } from "@/store/use-product-store";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { phaseFeatures } from "@/config/phase";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, CustomEase, SplitText);
CustomEase.create("trionnReveal", "M0,0 C0.17,0.84 0.44,1 1,1");

export function CinematicHero() {
  const rootRef = useRef<HTMLElement>(null);
  const setRequestOpen = useProductStore((state) => state.setRequestOpen);
  const reduced = useReducedMotion();

  useGSAP(() => {
    const root = rootRef.current;
    if (!root || reduced || !phaseFeatures.gsapCore) return;
    const heading = root.querySelector("h1");
    if (!heading) return;

    const split = phaseFeatures.splitTypography
      ? SplitText.create(heading, { type: "lines,words", linesClass: "split-line" })
      : null;
    const headlineTargets = split?.lines ?? heading;
    const timeline = gsap.timeline({ defaults: { ease: "trionnReveal" } });
    timeline
      .from(headlineTargets, { yPercent: phaseFeatures.splitTypography ? 115 : 18, opacity: 0, duration: 1.15, stagger: 0.09 })
      .from("[data-hero-kicker]", { y: 18, opacity: 0, duration: 0.65 }, "-=0.75")
      .from("[data-hero-actions]", { y: 24, opacity: 0, duration: 0.7 }, "-=0.5")
      .from("[data-hero-screen]", { y: 80, scale: 0.94, rotate: -1.8, opacity: 0, duration: 1.25 }, "-=0.85")
      .from("[data-hero-meta]", { opacity: 0, duration: 0.6 }, "-=0.45");

    gsap.to("[data-hero-orbit]", {
      rotate: 35,
      yPercent: -12,
      ease: "none",
      scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 1.2 },
    });

    gsap.to("[data-hero-screen]", {
      yPercent: 9,
      scale: 0.985,
      ease: "none",
      scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 1 },
    });

    return () => split?.revert();
  }, { scope: rootRef, dependencies: [reduced] });

  const scrollToProduct = () => {
    const target = document.querySelector("#product");
    if (!target || reduced || !phaseFeatures.splitTypography) {
      target?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
      return;
    }
    gsap.to(window, { duration: 1.15, scrollTo: { y: target, offsetY: 72 }, ease: "power3.inOut" });
  };

  return (
    <section className="product-hero" ref={rootRef}>
      <div className="hero-orbit" data-hero-orbit aria-hidden><span /><span /><span /><i /></div>
      <div className="hero-grid-overlay" aria-hidden />

      <div className="hero-meta" data-hero-meta>
        <span>AI-NATIVE PRODUCT OPERATING SYSTEM</span>
        <span>PRIVATE BETA / 2026</span>
      </div>

      <div className="hero-copy">
        <p className="hero-kicker" data-hero-kicker><Asterisk size={17} /> From first signal to final release.</p>
        <h1>Build what<br /><em>moves next.</em></h1>
        <div className="hero-support" data-hero-actions>
          <p>Trionn gives product teams one cinematic, operational space for direction, interface systems and launch readiness.</p>
          <div className="hero-actions">
            <button className="button button-primary" type="button" onClick={scrollToProduct}>Explore product <ArrowDownRight size={17} /></button>
            <button className="button button-secondary" type="button" onClick={() => setRequestOpen(true)}>Request access <ArrowUpRight size={17} /></button>
          </div>
        </div>
      </div>

      <div className="hero-product" data-hero-screen><ProductScreen mode="signal" /></div>

      <div className="hero-footnote" data-hero-meta>
        <span>Built for product, design and engineering teams.</span>
        <button type="button" onClick={scrollToProduct}>Scroll to enter <ArrowDownRight size={15} /></button>
      </div>
    </section>
  );
}
