"use client";

import {
  type MutableRefObject,
  Suspense,
  useRef,
} from "react";
import {
  Environment,
  ContactShadows,
} from "@react-three/drei";
import {
  Canvas,
  useThree,
} from "@react-three/fiber";
import type { PerspectiveCamera } from "three";
import {
  Garment,
  type GarmentHandle,
} from "@/components/canvas/Garment";
import { useGarmentAnimation } from "@/hooks/useGarmentAnimation";

interface SceneProps {
  garmentRef: MutableRefObject<GarmentHandle | null>;
}

function SceneContent({
  garmentRef,
}: SceneProps) {
  const cameraRef = useRef<PerspectiveCamera | null>(null);
  const camera = useThree(
    (state) => state.camera as PerspectiveCamera,
  );

  cameraRef.current = camera;

  useGarmentAnimation({
    garmentRef,
    cameraRef,
  });

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[3.5, 5, 4]}
        intensity={3.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <Suspense fallback={null}>
        <Environment preset="city" />
        <Garment ref={garmentRef} />
      </Suspense>

      <ContactShadows
        position={[0, -1.65, 0]}
        opacity={0.32}
        scale={8}
        blur={2.8}
        far={4.5}
      />
    </>
  );
}

export function Scene({
  garmentRef,
}: SceneProps) {
  return (
    <div className="canvas-shell" aria-hidden>
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{
          position: [0, 0, 5],
          fov: 34,
          near: 0.1,
          far: 100,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <SceneContent garmentRef={garmentRef} />
      </Canvas>
    </div>
  );
}
