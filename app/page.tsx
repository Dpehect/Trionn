"use client";

import { useRef } from "react";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Scene } from "@/components/canvas/Scene";
import {
  GarmentHandle,
} from "@/components/canvas/Garment";
import { Overlay } from "@/components/dom/Overlay";

export default function HomePage() {
  const garmentRef = useRef<GarmentHandle | null>(null);

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-aura-paper text-aura-ink">
        <Scene garmentRef={garmentRef} />
        <Overlay garmentRef={garmentRef} />
      </div>
    </SmoothScroll>
  );
}
