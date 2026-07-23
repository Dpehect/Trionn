"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useMemo, useRef, useState } from "react";
import { loaderTokens } from "@/lib/site-data";

const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/+*#<>[]{}";

function scramble(target: string, progress: number) {
  return target
    .split("")
    .map((character, index) => {
      if (character === " ") return " ";
      const threshold = index / Math.max(target.length - 1, 1);
      if (progress > threshold) return character;
      return glyphs[Math.floor(Math.random() * glyphs.length)];
    })
    .join("");
}

export function CinematicLoader({ onComplete }: { onComplete: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [tokenIndex, setTokenIndex] = useState(0);
  const label = useMemo(() => loaderTokens[tokenIndex], [tokenIndex]);
  const [scrambled, setScrambled] = useState(label);

  useEffect(() => {
    const duration = 2200;
    const started = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const value = Math.min((now - started) / duration, 1);
      const eased = 1 - Math.pow(1 - value, 3);
      setProgress(Math.round(eased * 100));
      setTokenIndex(Math.min(Math.floor(eased * loaderTokens.length), loaderTokens.length - 1));
      setScrambled(scramble(loaderTokens[Math.min(Math.floor(eased * loaderTokens.length), loaderTokens.length - 1)], eased));
      if (value < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  useGSAP(() => {
    if (progress !== 100 || !root.current) return;
    const timeline = gsap.timeline({ onComplete });
    timeline
      .to("[data-loader-copy]", { yPercent: -120, opacity: 0, duration: 0.55, ease: "power3.in" })
      .to(root.current, { clipPath: "inset(0 0 100% 0)", duration: 0.9, ease: "power4.inOut" }, "-=0.05");
  }, { scope: root, dependencies: [progress, onComplete] });

  return (
    <div ref={root} className="loader" aria-live="polite" aria-label={`Loading ${progress}%`}>
      <div className="loader__grain" />
      <div className="loader__topline" data-loader-copy>
        <span>PORTFOLIO / 2026</span>
        <span>{String(progress).padStart(3, "0")}%</span>
      </div>
      <div className="loader__center" data-loader-copy>
        <p className="loader__code">{scrambled}</p>
        <div className="loader__bar"><span style={{ transform: `scaleX(${progress / 100})` }} /></div>
      </div>
      <div className="loader__footer" data-loader-copy>
        <span>CREATIVE DEVELOPMENT</span>
        <span>ISTANBUL / TR</span>
      </div>
    </div>
  );
}
