"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { features } from "@/config/phase";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function RouteReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useLayoutEffect(() => {
    if (!features.flipMotion || reduced || !ref.current) return;
    gsap.fromTo(ref.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" });
  }, [reduced]);
  return <div ref={ref}>{children}</div>;
}
