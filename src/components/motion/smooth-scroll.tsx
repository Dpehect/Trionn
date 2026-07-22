"use client";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const frame = useRef<number | null>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    const raf = (time: number) => { lenis.raf(time); frame.current = requestAnimationFrame(raf); };
    frame.current = requestAnimationFrame(raf);
    return () => { if (frame.current) cancelAnimationFrame(frame.current); lenis.destroy(); };
  }, []);
  return children;
}
