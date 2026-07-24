"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function IntroLoader() {
  const root = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setHidden(true);
      return;
    }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: () => setHidden(true) });
      tl.set(document.body, { overflow: "hidden" })
        .fromTo("[data-loader-number]", { textContent: 0 }, { textContent: 100, duration: 1.35, snap: { textContent: 1 }, ease: "power2.inOut" })
        .to("[data-loader-line]", { scaleX: 1, duration: 1.2, ease: "power3.inOut" }, 0)
        .to("[data-loader-panel='top']", { yPercent: -100, duration: 1.1, ease: "power4.inOut" }, "+=.12")
        .to("[data-loader-panel='bottom']", { yPercent: 100, duration: 1.1, ease: "power4.inOut" }, "<")
        .set(document.body, { overflow: "" });
    }, root);
    return () => ctx.revert();
  }, []);

  if (hidden) return null;
  return (
    <div ref={root} className="fixed inset-0 z-[200] pointer-events-none" aria-hidden="true">
      <div data-loader-panel="top" className="absolute inset-x-0 top-0 h-1/2 bg-foreground text-background">
        <div className="container-shell flex h-full items-end justify-between border-b border-white/20 pb-6">
          <span className="eyebrow text-white/45">Softbridge / Finland</span>
          <span className="font-mono text-5xl tracking-[-.08em] md:text-8xl"><span data-loader-number>0</span>%</span>
        </div>
      </div>
      <div data-loader-panel="bottom" className="absolute inset-x-0 bottom-0 h-1/2 bg-foreground">
        <div className="container-shell h-full pt-6">
          <div className="h-px origin-left scale-x-0 bg-signal" data-loader-line />
          <div className="mt-6 flex justify-between text-[10px] uppercase tracking-[.18em] text-white/35">
            <span>Strategy</span><span>Design</span><span>Engineering</span>
          </div>
        </div>
      </div>
    </div>
  );
}
