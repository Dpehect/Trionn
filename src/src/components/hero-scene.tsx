"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Float,
  MeshTransmissionMaterial,
  PerformanceMonitor,
  Sparkles,
} from "@react-three/drei";
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import type { QualityLevel } from "@/store/experience-store";

function Artifact({ engaged }: { engaged: boolean }) {
  const group = useRef<THREE.Group>(null);
  const material = useRef<any>(null);
  const { viewport } = useThree();

  useFrame((state, delta) => {
    if (!group.current) return;

    const energy = engaged ? 1 : 0;
    const targetScale = 1 + energy * 0.18;
    const targetRotation = state.clock.elapsedTime * (engaged ? 0.5 : 0.13);

    group.current.scale.setScalar(
      THREE.MathUtils.lerp(group.current.scale.x, targetScale, delta * 3)
    );
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      targetRotation + state.pointer.x * 0.55,
      delta * 2
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -state.pointer.y * 0.3,
      delta * 2
    );
    group.current.position.z = THREE.MathUtils.lerp(
      group.current.position.z,
      engaged ? 0.45 : 0,
      delta * 2.5
    );

    if (material.current) {
      material.current.distortion = THREE.MathUtils.lerp(
        material.current.distortion,
        engaged ? 0.92 : 0.28,
        delta * 2.8
      );
      material.current.temporalDistortion = engaged ? 0.5 : 0.16;
    }
  });

  const geometry = useMemo(() => new THREE.TorusKnotGeometry(1, 0.34, 260, 56, 2, 3), []);

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.65}>
      <group ref={group} scale={viewport.width < 6 ? 1.15 : 1.65}>
        <mesh geometry={geometry}>
          <MeshTransmissionMaterial
            ref={material}
            color="#d8ff61"
            thickness={0.9}
            roughness={0.06}
            transmission={1}
            ior={1.2}
            chromaticAberration={0.05}
            anisotropy={0.18}
            distortion={0.28}
            temporalDistortion={0.16}
          />
        </mesh>
      </group>
    </Float>
  );
}

function Scene({
  engaged,
  quality,
}: {
  engaged: boolean;
  quality: QualityLevel;
}) {
  const count = quality === "high" ? 120 : quality === "medium" ? 70 : 35;

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 5, 6]} intensity={5} />
      <Artifact engaged={engaged} />
      <Sparkles
        count={count}
        scale={7}
        size={quality === "low" ? 1 : 1.7}
        speed={engaged ? 0.55 : 0.15}
        opacity={0.45}
      />
      <Environment preset="studio" />
      {quality !== "low" && (
        <EffectComposer multisampling={0}>
          <Bloom intensity={engaged ? 1.4 : 0.75} luminanceThreshold={0.5} />
          <ChromaticAberration
            offset={new THREE.Vector2(engaged ? 0.0014 : 0.0006, engaged ? 0.0014 : 0.0006)}
          />
          <Noise opacity={0.018} />
          <Vignette eskil={false} offset={0.2} darkness={0.8} />
        </EffectComposer>
      )}
    </>
  );
}

export function HeroScene({
  engaged,
  quality,
}: {
  engaged: boolean;
  quality: QualityLevel;
}) {
  const [dpr, setDpr] = useState(quality === "high" ? 1.6 : quality === "medium" ? 1.25 : 1);

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0, 5], fov: 42 }}
      gl={{ antialias: quality !== "low", alpha: true, powerPreference: "high-performance" }}
      fallback={<div className="grid h-full place-items-center text-[var(--text-secondary)]">3D unavailable</div>}
    >
      <PerformanceMonitor
        onIncline={() => setDpr((value) => Math.min(value + 0.15, 1.8))}
        onDecline={() => setDpr((value) => Math.max(value - 0.2, 1))}
      >
        <Suspense fallback={null}>
          <Scene engaged={engaged} quality={quality} />
        </Suspense>
      </PerformanceMonitor>
    </Canvas>
  );
}
