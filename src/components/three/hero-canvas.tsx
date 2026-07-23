"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Group } from "three";

function BridgeObject() {
  const group = useRef<Group>(null);
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.12;
    group.current.rotation.x += (state.pointer.y * 0.15 - group.current.rotation.x) * 0.035;
    group.current.rotation.z += (state.pointer.x * -0.12 - group.current.rotation.z) * 0.035;
  });

  return (
    <Float speed={1.25} rotationIntensity={0.22} floatIntensity={0.38}>
      <group ref={group} rotation={[0.35, -0.65, 0.2]}>
        <mesh>
          <torusKnotGeometry args={[1.08, 0.28, 128, 18]} />
          <MeshTransmissionMaterial thickness={0.8} roughness={0.12} transmission={1} chromaticAberration={0.035} anisotropy={0.25} distortion={0.22} distortionScale={0.35} temporalDistortion={0.08} color="#b7ff4a" />
        </mesh>
        <mesh scale={1.45}>
          <icosahedronGeometry args={[1.4, 1]} />
          <meshBasicMaterial color="#b7ff4a" wireframe transparent opacity={0.12} />
        </mesh>
      </group>
    </Float>
  );
}

export function HeroCanvas() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5.2], fov: 38 }} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 5, 6]} intensity={2.2} />
        <pointLight position={[-4, -2, 3]} intensity={1.5} color="#9cff33" />
        <Suspense fallback={null}><BridgeObject /></Suspense>
      </Canvas>
    </div>
  );
}
