"use client";

import dynamic from "next/dynamic";

const HeroCanvas = dynamic(
  () => import("@/components/canvas/hero-canvas").then((module) => module.HeroCanvas),
  { ssr: false },
);

export function HeroStage() {
  return (
    <div className="hero-stage" aria-label="Interactive three-dimensional signpost">
      <HeroCanvas />
      <p className="hero-stage__hint">DRAG TO ROTATE</p>
    </div>
  );
}
