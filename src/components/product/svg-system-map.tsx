"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ArrowRight } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

gsap.registerPlugin(MorphSVGPlugin, MotionPathPlugin);

const paths = {
  signal: "M30,150 C110,35 205,35 285,150 C365,265 465,265 550,150 C635,35 725,35 810,150",
  system: "M30,150 C105,150 105,55 190,55 C280,55 280,245 370,245 C460,245 460,55 550,55 C640,55 640,150 810,150",
  launch: "M30,230 C125,230 120,75 225,75 C335,75 325,205 430,205 C535,205 525,85 630,85 C720,85 745,150 810,150",
} as const;

type MapMode = keyof typeof paths;

export function SvgSystemMap() {
  const rootRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const [mode, setMode] = useState<MapMode>("signal");
  const reduced = useReducedMotion();

  useEffect(() => {
    const path = pathRef.current;
    const dot = dotRef.current;
    if (!path || !dot || reduced) return;

    gsap.to(path, { morphSVG: paths[mode], duration: 1.05, ease: "expo.inOut" });
    gsap.killTweensOf(dot);
    gsap.set(dot, { xPercent: -50, yPercent: -50 });
    gsap.to(dot, {
      duration: 3.6,
      repeat: -1,
      ease: "none",
      motionPath: { path, align: path, alignOrigin: [0.5, 0.5], autoRotate: false },
    });
  }, [mode, reduced]);

  return (
    <section className="svg-section section-shell" id="systems">
      <div className="section-index">07 / SVG SYSTEM</div>
      <div className="svg-layout" ref={rootRef}>
        <div className="svg-copy">
          <p className="section-eyebrow">MorphSVG + MotionPath</p>
          <h2>See how product context moves through the organization.</h2>
          <p>The same system changes shape as evidence becomes interface logic and interface logic becomes launch readiness.</p>
          <div className="svg-mode-list">
            {(Object.keys(paths) as MapMode[]).map((item, index) => (
              <button type="button" key={item} className={mode === item ? "is-active" : ""} onClick={() => setMode(item)}>
                <span>{String(index + 1).padStart(2, "0")}</span><b>{item}</b><ArrowRight size={16} />
              </button>
            ))}
          </div>
        </div>

        <div className="svg-map-panel">
          <div className="svg-map-meta"><span>CONTEXT FLOW / {mode.toUpperCase()}</span><span>LIVE SYSTEM</span></div>
          <svg viewBox="0 0 840 300" role="img" aria-label="Animated product context path">
            <defs>
              <linearGradient id="flow-gradient" x1="0" x2="1">
                <stop offset="0" stopColor="currentColor" stopOpacity="0.25" />
                <stop offset="0.55" stopColor="currentColor" />
                <stop offset="1" stopColor="currentColor" stopOpacity="0.25" />
              </linearGradient>
              <filter id="soft-glow"><feGaussianBlur stdDeviation="5" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            </defs>
            <g className="svg-grid" aria-hidden>
              {Array.from({ length: 9 }).map((_, index) => <line key={`v-${index}`} x1={index * 105} x2={index * 105} y1="0" y2="300" />)}
              {Array.from({ length: 5 }).map((_, index) => <line key={`h-${index}`} x1="0" x2="840" y1={index * 75} y2={index * 75} />)}
            </g>
            <path className="flow-shadow" d={paths.signal} />
            <path ref={pathRef} id="product-flow-path" className="flow-path" d={paths.signal} stroke="url(#flow-gradient)" />
            <circle ref={dotRef} className="flow-dot" r="8" cx="0" cy="0" filter="url(#soft-glow)" />
            <g className="flow-labels">
              <text x="30" y="280">EVIDENCE</text><text x="365" y="280">SYSTEM</text><text x="735" y="280">RELEASE</text>
            </g>
          </svg>
          <div className="svg-map-stats"><div><strong>18</strong><span>Signals</span></div><div><strong>42</strong><span>States</span></div><div><strong>07</strong><span>Gates</span></div></div>
        </div>
      </div>
    </section>
  );
}
