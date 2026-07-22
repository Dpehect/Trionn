"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { ArrowLeft, ArrowRight, MousePointer2 } from "lucide-react";
import { ProductScreen } from "@/components/product/product-screen";
import { productModes } from "@/components/product/product-data";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

gsap.registerPlugin(Observer);

export function ObserverGuidedTour() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  const goTo = useCallback((next: number) => {
    const safe = (next + productModes.length) % productModes.length;
    if (safe === index) return;
    const root = rootRef.current;
    const current = root?.querySelector<HTMLElement>("[data-tour-copy]");
    if (!root || reduced || !current) {
      setIndex(safe);
      return;
    }
    const direction = safe > index || (index === productModes.length - 1 && safe === 0) ? 1 : -1;
    gsap.to(current, {
      xPercent: -18 * direction,
      opacity: 0,
      duration: 0.24,
      ease: "power2.in",
      onComplete: () => {
        setIndex(safe);
        requestAnimationFrame(() => {
          const nextCopy = root.querySelector<HTMLElement>("[data-tour-copy]");
          if (nextCopy) gsap.fromTo(nextCopy, { xPercent: 18 * direction, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.55, ease: "power3.out" });
          gsap.fromTo(root.querySelector(".tour-screen"), { scale: 0.975, opacity: 0.65 }, { scale: 1, opacity: 1, duration: 0.62, ease: "power3.out" });
        });
      },
    });
  }, [index, reduced]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return;
    const observer = Observer.create({
      target: root,
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      tolerance: 18,
      preventDefault: false,
      onDown: () => goTo(index + 1),
      onUp: () => goTo(index - 1),
      onLeft: () => goTo(index + 1),
      onRight: () => goTo(index - 1),
    });
    return () => observer.kill();
  }, [goTo, reduced]);

  const current = productModes[index];

  return (
    <section className="observer-tour section-shell" ref={rootRef}>
      <div className="section-index">05 / OBSERVER</div>
      <div className="tour-shell">
        <div className="tour-copy" data-tour-copy>
          <span className="tour-counter">{String(index + 1).padStart(2, "0")} / {String(productModes.length).padStart(2, "0")}</span>
          <p className="section-eyebrow">Gesture-controlled product tour</p>
          <h2>{current.title}</h2>
          <p>{current.copy}</p>
          <div className="tour-controls">
            <button type="button" aria-label="Previous product scene" onClick={() => goTo(index - 1)}><ArrowLeft size={18} /></button>
            <button type="button" aria-label="Next product scene" onClick={() => goTo(index + 1)}><ArrowRight size={18} /></button>
            <span><MousePointer2 size={15} /> Wheel, swipe or drag</span>
          </div>
        </div>
        <div className="tour-screen"><ProductScreen mode={current.id} compact /></div>
        <div className="tour-dots" aria-label="Product tour scenes">
          {productModes.map((mode, dotIndex) => <button key={mode.id} type="button" className={dotIndex === index ? "is-active" : ""} aria-label={`Open ${mode.label}`} onClick={() => goTo(dotIndex)} />)}
        </div>
      </div>
    </section>
  );
}
