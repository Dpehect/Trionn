"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

export function RevealTitle({ children, className="" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!ref.current) return;
    const split = new SplitType(ref.current, { types: "lines,words" });
    const ctx = gsap.context(() => {
      gsap.from(split.words, {
        yPercent: 120, opacity: 0, stagger: .025, duration: 1,
        ease: "power4.out", scrollTrigger: { trigger: ref.current, start: "top 85%" }
      });
    }, ref);
    return () => { ctx.revert(); split.revert(); };
  }, []);
  return <h2 ref={ref} className={className}>{children}</h2>;
}
