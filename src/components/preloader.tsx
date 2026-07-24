"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";

export function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      setVisible(false);
      return;
    }

    const seen = window.sessionStorage.getItem("softbridge-loader");
    if (seen) {
      setVisible(false);
      return;
    }

    const timeline = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        window.sessionStorage.setItem("softbridge-loader", "1");
        setVisible(false);
      },
    });

    timeline
      .fromTo(
        "[data-loader-arc]",
        { rotate: -130, scale: 0.65, opacity: 0 },
        { rotate: 0, scale: 1, opacity: 1, duration: 0.75 },
      )
      .fromTo(
        "[data-loader-word]",
        { yPercent: 110 },
        { yPercent: 0, duration: 0.7 },
        "-=0.15",
      )
      .to(
        "[data-loader-arc]",
        { y: -24, scale: 0.88, duration: 0.5 },
        "+=0.2",
      )
      .to(
        "[data-loader]",
        { clipPath: "inset(0 0 100% 0)", duration: 0.9 },
        "-=0.15",
      );

    return () => {
      timeline.kill();
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      data-loader
      className="fixed inset-0 z-[300] grid place-items-center bg-forest text-lime"
      style={{ clipPath: "inset(0 0 0% 0)" }}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-8">
        <div
          data-loader-arc
          className="h-24 w-40 rounded-b-full border-b-[14px] border-l-[14px] border-r-[14px] border-lime"
        />
        <div className="overflow-hidden">
          <p
            data-loader-word
            className="text-5xl font-black tracking-[-0.07em] md:text-7xl"
          >
            Softbridge
          </p>
        </div>
      </div>
    </div>
  );
}
