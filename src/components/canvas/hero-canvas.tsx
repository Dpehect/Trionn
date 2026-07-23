"use client";

import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { SignpostModel } from "@/components/canvas/signpost-model";

export function HeroCanvas() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 7], fov: 34 }}
      onCreated={({ gl }) => {
        gl.outputColorSpace = "srgb";
        gl.toneMappingExposure = 0.72;
      }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={34} />
      <ambientLight intensity={0.18} />
      <directionalLight position={[3, 4, 6]} intensity={1.7} color="#ffffff" />
      <pointLight position={[-3, -1, 4]} intensity={0.8} color="#ffffff" />
      <Suspense fallback={null}>
        <SignpostModel />
      </Suspense>
    </Canvas>
  );
}
