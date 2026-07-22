"use client";

import { flushSync } from "react-dom";
import { useRef } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { CustomEase } from "gsap/CustomEase";
import { ProductScreen } from "@/components/product/product-screen";
import { productModes } from "@/components/product/product-data";
import { useProductStore, type ProductMode } from "@/store/use-product-store";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

gsap.registerPlugin(Flip, CustomEase);
CustomEase.create("trionnFlip", "M0,0 C0.16,1 0.3,1 1,1");

export function FlipProductLab() {
  const rootRef = useRef<HTMLDivElement>(null);
  const activeMode = useProductStore((state) => state.activeMode);
  const setActiveMode = useProductStore((state) => state.setActiveMode);
  const reduced = useReducedMotion();
  const active = productModes.find((item) => item.id === activeMode) ?? productModes[0];

  const changeMode = (nextMode: ProductMode) => {
    if (nextMode === activeMode) return;
    const root = rootRef.current;
    if (!root || reduced) {
      setActiveMode(nextMode);
      return;
    }

    const cards = root.querySelectorAll<HTMLElement>("[data-flip-card]");
    const labels = root.querySelectorAll<HTMLElement>("[data-flip-copy]");
    const state = Flip.getState(cards, { props: "borderRadius,backgroundColor" });

    gsap.to(labels, { yPercent: -45, opacity: 0, duration: 0.22, ease: "power2.in", overwrite: true });
    flushSync(() => setActiveMode(nextMode));

    Flip.from(state, {
      duration: 0.95,
      ease: "trionnFlip",
      absolute: true,
      stagger: 0.035,
      prune: true,
      onComplete: () => gsap.fromTo(labels, { yPercent: 55, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.48, ease: "power3.out", stagger: 0.03 }),
    });
  };

  return (
    <section className="flip-lab section-shell" id="product" ref={rootRef}>
      <div className="section-index">03 / FLIP LAB</div>
      <div className="flip-lab-head">
        <div>
          <p className="section-eyebrow">Live product architecture</p>
          <h2 data-flip-copy>{active.title}</h2>
        </div>
        <p data-flip-copy>{active.copy}</p>
      </div>

      <div className="flip-lab-layout">
        <div className="mode-tabs" role="tablist" aria-label="Product modes">
          {productModes.map((mode) => (
            <button
              key={mode.id}
              type="button"
              role="tab"
              aria-selected={activeMode === mode.id}
              className={activeMode === mode.id ? "is-active" : ""}
              onClick={() => changeMode(mode.id)}
            >
              <span>{mode.label}</span>
              <b>{mode.eyebrow}</b>
            </button>
          ))}
        </div>
        <div className="flip-stage">
          <ProductScreen mode={activeMode} />
          <div className="flip-caption"><span>DOM layout transformed with GSAP Flip</span><span>NO CANVAS / NO WEBGL</span></div>
        </div>
      </div>
    </section>
  );
}
