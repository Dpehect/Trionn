"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
export function ScrollReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!ref.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => gsap.fromTo(ref.current, { y: 80, clipPath: "inset(18% 0 0 0)" }, { y: 0, clipPath: "inset(0% 0 0 0)", duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 82%", once: true } }), ref);
    return () => ctx.revert();
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
}
