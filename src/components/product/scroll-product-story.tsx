"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ProductScreen } from "@/components/product/product-screen";
import { productModes } from "@/components/product/product-data";
import type { ProductMode } from "@/store/use-product-store";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

export function ScrollProductStory() {
  const rootRef = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<ProductMode>("signal");
  const reduced = useReducedMotion();

  useGSAP(() => {
    const root = rootRef.current;
    if (!root || reduced) return;
    const steps = gsap.utils.toArray<HTMLElement>("[data-story-step]", root);
    const progress = root.querySelector<HTMLElement>("[data-story-progress]");

    steps.forEach((step, index) => {
      ScrollTrigger.create({
        trigger: step,
        start: "top center",
        end: "bottom center",
        onEnter: () => setMode(productModes[index]?.id ?? "signal"),
        onEnterBack: () => setMode(productModes[index]?.id ?? "signal"),
      });
    });

    if (progress) {
      gsap.fromTo(progress, { scaleX: 0 }, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: true },
      });
    }

    gsap.fromTo("[data-story-screen]", { y: 40, rotate: -1.5 }, {
      y: -20,
      rotate: 0.8,
      ease: "none",
      scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 1 },
    });
  }, { scope: rootRef, dependencies: [reduced] });

  return (
    <section className="scroll-story" id="workflow" ref={rootRef}>
      <div className="story-progress"><span data-story-progress /></div>
      <div className="story-sticky">
        <div className="story-screen" data-story-screen><ProductScreen mode={mode} compact /></div>
        <div className="story-live-label"><i /> {mode.toUpperCase()} MODE / LIVE</div>
      </div>
      <div className="story-steps">
        {productModes.map((item, index) => (
          <article className="story-step" data-story-step key={item.id}>
            <span>{String(index + 1).padStart(2, "0")} / {item.eyebrow}</span>
            <h2>{item.title}</h2>
            <p>{item.copy}</p>
            <div className="story-metric"><strong>{item.progress}%</strong><span>{item.stat}</span></div>
          </article>
        ))}
      </div>
    </section>
  );
}
