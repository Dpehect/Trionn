"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useReducedMotionPreference } from "@/hooks/use-reduced-motion";
import { detectQuality } from "@/lib/device-quality";
import { useExperienceStore } from "@/store/experience-store";

export function ExperienceProvider({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotionPreference();
  const setReducedMotion = useExperienceStore((state) => state.setReducedMotion);
  const setQuality = useExperienceStore((state) => state.setQuality);
  const setHydrated = useExperienceStore((state) => state.setHydrated);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    setReducedMotion(reduced);
    setQuality(detectQuality());
    setHydrated(true);

    if (reduced) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.9,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      gsap.ticker.remove(tick);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [reduced, setHydrated, setQuality, setReducedMotion]);

  return children;
}
