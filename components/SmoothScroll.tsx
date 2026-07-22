"use client";

import { type PropsWithChildren, useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothScroll({ children }: PropsWithChildren) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.15,
    });

    const handleScroll = () => {
      ScrollTrigger.update();
    };

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };

    lenis.on("scroll", handleScroll);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0, 0);

    const handleRefresh = () => {
      lenis.resize();
    };

    ScrollTrigger.addEventListener("refresh", handleRefresh);
    ScrollTrigger.refresh();

    return () => {
      lenis.off("scroll", handleScroll);
      gsap.ticker.remove(ticker);
      ScrollTrigger.removeEventListener("refresh", handleRefresh);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
