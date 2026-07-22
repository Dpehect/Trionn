"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import { cn } from "@/lib/utils";
export function TextReveal({ children, className }: { children: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (!ref.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const split = new SplitType(ref.current, { types: "lines,words" });
    const ctx = gsap.context(() => gsap.from(split.words ?? [], { yPercent: 115, opacity: 0, duration: .9, stagger: .035, ease: "power4.out" }), ref);
    return () => { ctx.revert(); split.revert(); };
  }, []);
  return <h1 ref={ref} className={cn(className)}>{children}</h1>;
}
