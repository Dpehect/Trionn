"use client";

import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { usePointerMotion } from "@/hooks/use-pointer-motion";

export function SignpostModel() {
  const group = useRef<THREE.Group>(null);
  const pointer = usePointerMotion();
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.72, 2), []);

  useFrame((state, delta) => {
    if (!group.current) return;
    const targetX = pointer.current.y * 0.11;
    const targetY = pointer.current.x * 0.17 + state.clock.elapsedTime * 0.035;
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetX, 3.2, delta);
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetY, 3.2, delta);
  });

  return (
    <Float speed={0.8} rotationIntensity={0.08} floatIntensity={0.18}>
      <group ref={group} rotation={[0.12, -0.35, 0.08]}>
        <mesh geometry={geometry} scale={1.03}>
          <meshPhysicalMaterial
            color="#ffffff"
            transparent
            opacity={0.045}
            roughness={0.12}
            metalness={0.15}
            transmission={0.92}
            thickness={0.65}
            ior={1.32}
            clearcoat={1}
            clearcoatRoughness={0.18}
            side={THREE.DoubleSide}
          />
        </mesh>
        <lineSegments scale={1.035}>
          <edgesGeometry args={[geometry, 18]} />
          <lineBasicMaterial color="#ffffff" transparent opacity={0.32} />
        </lineSegments>
        <mesh rotation={[Math.PI / 2, 0.2, 0]} scale={[1.45, 1.45, 1.45]}>
          <torusGeometry args={[1.05, 0.008, 8, 160]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.16} />
        </mesh>
        <mesh rotation={[0.25, Math.PI / 2, -0.4]} scale={[1.72, 1.72, 1.72]}>
          <torusGeometry args={[1.05, 0.006, 8, 160]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
        </mesh>
        <points geometry={geometry} scale={1.045}>
          <pointsMaterial color="#ffffff" size={0.018} transparent opacity={0.5} sizeAttenuation />
        </points>
      </group>
    </Float>
  );
}
