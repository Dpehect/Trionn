"use client";

import { Environment, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { SignpostModel } from "@/components/canvas/signpost-model";

export function HeroCanvas() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      shadows
      camera={{ position: [0, 0.1, 7.5], fov: 34 }}
      onCreated={({ gl }) => {
        gl.outputColorSpace = "srgb";
        gl.toneMappingExposure = 1.1;
      }}
    >
      <PerspectiveCamera makeDefault position={[0, 0.1, 7.5]} fov={34} />
      <ambientLight intensity={1.55} />
      <directionalLight position={[4, 6, 5]} intensity={3.2} castShadow />
      <directionalLight position={[-4, 1, 3]} intensity={1.2} />
      <Suspense fallback={null}>
        <SignpostModel />
        <Environment preset="studio" environmentIntensity={0.5} />
      </Suspense>
    </Canvas>
  );
}
