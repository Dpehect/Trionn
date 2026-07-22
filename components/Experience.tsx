"use client";

import { useRef } from "react";
import { Scene } from "@/components/canvas/Scene";
import { Overlay } from "@/components/dom/Overlay";
import { SmoothScroll } from "@/components/SmoothScroll";
import type { GarmentHandle } from "@/components/canvas/Garment";

export function Experience() {
  const garmentRef = useRef<GarmentHandle>(null);

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-aura-paper text-aura-ink">
        <Scene garmentRef={garmentRef} />
        <Overlay garmentRef={garmentRef} />
      </div>
    </SmoothScroll>
  );
}
