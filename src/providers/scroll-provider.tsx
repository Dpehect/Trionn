"use client";

import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { create } from "zustand";
import type { ScrollState } from "@/types/animation";

gsap.registerPlugin(ScrollTrigger);

interface ScrollStore extends ScrollState {
  setScroll: (next: ScrollState) => void;
}

export const useScrollStore = create<ScrollStore>((set) => ({
  progress: 0,
  velocity: 0,
  direction: 1,
  setScroll: (next) => set(next),
}));

const ScrollContext = createContext<Lenis | null>(null);

export function useLenisInstance() {
  return useContext(ScrollContext);
}

export function ScrollProvider({ children }: { children: ReactNode }) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const setScroll = useScrollStore((state) => state.setScroll);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.88,
      touchMultiplier: 1.1,
      syncTouch: false,
    });

    setLenisInstance(lenis);

    lenis.on("scroll", ({ progress, velocity, direction }) => {
      setScroll({
        progress,
        velocity,
        direction: direction >= 0 ? 1 : -1,
      });
      ScrollTrigger.update();
    });

    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, [setScroll]);

  return <ScrollContext.Provider value={lenisInstance}>{children}</ScrollContext.Provider>;
}
