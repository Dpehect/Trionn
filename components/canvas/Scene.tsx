"use client";

import {
  type MutableRefObject,
  Suspense,
  useRef,
} from "react";
import {
  ContactShadows,
  Environment,
  Loader,
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

function SceneContents({
  garmentRef,
}: SceneProps) {
  const camera = useThree(
    (state) => state.camera as PerspectiveCamera,
  );

  const cameraRef = useRef<PerspectiveCamera | null>(camera);

  useGarmentAnimation({
    garmentRef,
    cameraRef,
  });

  return (
    <>
      <color attach="background" args={["#f3efe8"]} />

      <ambientLight intensity={1.1} />

      <directionalLight
        position={[4, 6, 5]}
        intensity={3.6}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />

      <directionalLight
        position={[-3, 2, 4]}
        intensity={1.4}
        color="#dce7ff"
      />

      <pointLight
        position={[0, -2, 3]}
        intensity={0.8}
        color="#f1d7c0"
      />

      <Suspense fallback={null}>
        <Environment preset="city" />
        <Garment ref={garmentRef} />
      </Suspense>

      <ContactShadows
        position={[0, -1.55, 0]}
        opacity={0.28}
        scale={6}
        blur={2.8}
        far={4}
      />
    </>
  );
}

export function Scene({
  garmentRef,
}: SceneProps) {
  return (
    <>
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
            alpha: false,
            powerPreference: "high-performance",
          }}
          style={{
            position: "fixed",
            inset: 0,
            width: "100vw",
            height: "100vh",
            pointerEvents: "none",
          }}
        >
          <SceneContents garmentRef={garmentRef} />
        </Canvas>
      </div>

      <Loader />
    </>
  );
}
