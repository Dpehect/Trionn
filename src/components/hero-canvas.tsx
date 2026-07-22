"use client";

import dynamic from "next/dynamic";

const Scene = dynamic(
  () => import("./hero-scene").then((module) => module.HeroScene),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(216,255,97,.12),transparent_60%)]" />
    ),
  }
);

export function HeroCanvas() {
  return (
    <div className="absolute inset-0 z-0">
      <Scene engaged={false} quality="medium" />
    </div>
  );
}
