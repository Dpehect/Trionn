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
import { Suspense, useRef, useState } from "react";
import * as THREE from "three";

function Artifact() {
  const group = useRef<THREE.Group>(null);
  const material = useRef<any>(null);
  const { viewport } = useThree();

  useFrame((state, delta) => {
    if (!group.current) return;

    const targetX = -state.pointer.y * 0.35;
    const targetY = state.pointer.x * 0.55 + state.clock.elapsedTime * 0.12;

    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.04);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetY, 0.04);
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.12;

    if (material.current) {
      material.current.distortion = THREE.MathUtils.lerp(
        material.current.distortion,
        0.35 + Math.abs(state.pointer.x) * 0.4,
        delta * 2
      );
    }
  });

  const scale = viewport.width < 6 ? 1.2 : 1.65;

  return (
    <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.7}>
      <group ref={group} scale={scale}>
        <mesh>
          <torusKnotGeometry args={[1, 0.32, 220, 48, 2, 3]} />
          <MeshTransmissionMaterial
            ref={material}
            color="#d8ff61"
            thickness={0.8}
            roughness={0.08}
            transmission={1}
            ior={1.22}
            chromaticAberration={0.04}
            anisotropy={0.15}
            distortion={0.35}
            temporalDistortion={0.2}
          />
        </mesh>
      </group>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 5, 6]} intensity={5} />
      <Artifact />
      <Sparkles count={80} scale={7} size={1.5} speed={0.15} opacity={0.4} />
      <Environment preset="studio" />
      <EffectComposer multisampling={0}>
        <Bloom intensity={0.8} luminanceThreshold={0.55} />
        <ChromaticAberration offset={new THREE.Vector2(0.0007, 0.0007)} />
        <Noise opacity={0.018} />
        <Vignette eskil={false} offset={0.2} darkness={0.8} />
      </EffectComposer>
    </>
  );
}

export function HeroScene() {
  const [dpr, setDpr] = useState(1.5);

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0, 5], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      fallback={<div className="grid h-full place-items-center text-[var(--muted)]">3D unavailable</div>}
    >
      <PerformanceMonitor
        onIncline={() => setDpr(1.75)}
        onDecline={() => setDpr(1)}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </PerformanceMonitor>
    </Canvas>
  );
}
