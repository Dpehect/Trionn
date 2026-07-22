"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import { features } from "@/config/phase";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function AnimatedTitle({ children }: { children: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (!features.splitTypography || reduced || !ref.current) return;
    const split = new SplitType(ref.current, { types: "chars" });
    gsap.fromTo(split.chars, { yPercent: 110, opacity: 0 }, {
      yPercent: 0, opacity: 1, duration: 0.72, ease: "power4.out", stagger: 0.018,
    });
    return () => split.revert();
  }, [children, reduced]);

  return <h1 ref={ref} className="stage-title" aria-live="polite">{children}</h1>;
}
