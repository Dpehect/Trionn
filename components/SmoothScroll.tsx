"use client";

import {
  type PropsWithChildren,
  useEffect,
  useRef,
} from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothScroll({ children }: PropsWithChildren) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.2,
    });

    lenisRef.current = lenis;

    const handleScroll = () => {
      ScrollTrigger.update();
    };

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };

    lenis.on("scroll", handleScroll);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      lenis.off("scroll", handleScroll);
      gsap.ticker.remove(ticker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return children;
}
