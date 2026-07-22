"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { WebGLFabricField } from "@/components/boutique/webgl-fabric-field";
import { products } from "@/data/catalog";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useProductStore } from "@/store/use-product-store";

gsap.registerPlugin(ScrollTrigger, SplitText);

export function BoutiqueHero() {
  const rootRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const setActiveProduct = useProductStore((state) => state.setActiveProduct);
  const heroProduct = products[12];

  useGSAP(() => {
    const root = rootRef.current;
    if (!root || reduced) return;
    const heading = root.querySelector("h1");
    if (!heading) return;
    const split = SplitText.create(heading, { type: "lines,words", linesClass: "hero-split-line" });
    const timeline = gsap.timeline({ defaults: { ease: "power4.out" } });
    timeline
      .from(split.lines, { yPercent: 120, opacity: 0, duration: 1.05, stagger: 0.1 })
      .from("[data-hero-small]", { y: 22, opacity: 0, duration: 0.7, stagger: 0.06 }, "-=0.72")
      .from("[data-hero-product]", { y: 80, rotate: 4, scale: 0.9, opacity: 0, duration: 1.1 }, "-=0.82");

    gsap.to("[data-hero-product]", {
      yPercent: 12,
      rotate: -2,
      ease: "none",
      scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 1 },
    });
    gsap.to("[data-hero-word]", {
      xPercent: -14,
      ease: "none",
      scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 1.3 },
    });
    return () => split.revert();
  }, { scope: rootRef, dependencies: [reduced] });

  return (
    <section className="boutique-hero" ref={rootRef}>
      <WebGLFabricField />
      <div className="boutique-hero-noise" aria-hidden />
      <div className="boutique-hero-top" data-hero-small><span>TRIONN / PRIVATE EDIT</span><span>ISTANBUL — 2026</span></div>
      <div className="boutique-hero-copy">
        <p data-hero-small>Independent clothing and footwear objects.</p>
        <h1><span>Wear the</span><br /><em data-hero-word>next form.</em></h1>
        <div className="boutique-hero-actions" data-hero-small><Link className="button button-primary" href="/shop">Yeni koleksiyon <ArrowUpRight size={17} /></Link><a className="button button-secondary" href="#edit">Editi keşfet <ArrowDownRight size={17} /></a></div>
      </div>
      <motion.button className="hero-feature-product" type="button" data-hero-product onClick={() => setActiveProduct(heroProduct)} whileHover={{ scale: 1.025 }} whileTap={{ scale: 0.985 }} aria-label={`${heroProduct.name} ürününü aç`}>
        <div className="hero-feature-image"><Image src={heroProduct.image} alt={heroProduct.name} fill priority sizes="(max-width: 700px) 48vw, 30vw" /></div>
        <div className="hero-feature-caption"><span>FEATURE / 01</span><strong>{heroProduct.name}</strong><i>{heroProduct.collection}</i></div>
      </motion.button>
      <div className="boutique-hero-bottom" data-hero-small><span>SMALL-RUN PRODUCTION</span><span>FREE SHIPPING OVER ₺5.000</span><a href="#edit">SCROLL TO SHOP ↓</a></div>
    </section>
  );
}
