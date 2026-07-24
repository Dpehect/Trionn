"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function CinematicCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!matchMedia("(pointer:fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const moveDot = gsap.quickTo(dot.current, "x", { duration: .15, ease: "power3" });
    const moveDotY = gsap.quickTo(dot.current, "y", { duration: .15, ease: "power3" });
    const moveRing = gsap.quickTo(ring.current, "x", { duration: .55, ease: "power3" });
    const moveRingY = gsap.quickTo(ring.current, "y", { duration: .55, ease: "power3" });
    const onMove = (event: MouseEvent) => { moveDot(event.clientX); moveDotY(event.clientY); moveRing(event.clientX); moveRingY(event.clientY); };
    const onOver = (event: MouseEvent) => {
      const interactive = (event.target as HTMLElement).closest("a,button,[data-cursor]");
      gsap.to(ring.current, { scale: interactive ? 1.8 : 1, opacity: interactive ? .65 : .32, duration: .35 });
    };
    addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    return () => { removeEventListener("mousemove", onMove); document.removeEventListener("mouseover", onOver); };
  }, []);
  return <><div ref={ring} className="pointer-events-none fixed left-0 top-0 z-[160] hidden size-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-current opacity-30 mix-blend-difference md:block"/><div ref={dot} className="pointer-events-none fixed left-0 top-0 z-[161] hidden size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference md:block"/></>;
}
