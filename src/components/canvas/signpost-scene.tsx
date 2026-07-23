"use client";

import { Float, Html, RoundedBox } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const signs = [
  { label: "SOFTWARE", color: "#5577ff", y: 1.9, x: -0.05, z: 0.04, rot: -0.16, width: 2.45 },
  { label: "AI SYSTEMS", color: "#9d66ff", y: 1.25, x: 0.2, z: 0.16, rot: 0.12, width: 2.3 },
  { label: "DIGITAL PRODUCTS", color: "#ff765e", y: 0.58, x: -0.18, z: 0.02, rot: -0.08, width: 2.9 },
  { label: "MOBILE + WEB", color: "#c6ee58", y: -0.1, x: 0.15, z: 0.12, rot: 0.1, width: 2.55 },
];

function SceneObject() {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame((state, delta) => {
    if (!group.current) return;
    const targetY = pointer.x * 0.22 + state.clock.elapsedTime * 0.08;
    const targetX = pointer.y * -0.1;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetY, 4, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetX, 4, delta);
  });

  const boltPositions = useMemo(() => [-1.15, 1.15], []);

  return (
    <Float speed={1.4} rotationIntensity={0.12} floatIntensity={0.25}>
      <group ref={group} rotation={[0.02, -0.22, -0.025]} position={[0.25, -0.25, 0]}>
        <mesh position={[0, -1.35, -0.05]} castShadow>
          <cylinderGeometry args={[0.12, 0.15, 5.7, 32]} />
          <meshStandardMaterial color="#d6d2c9" metalness={0.72} roughness={0.24} />
        </mesh>
        <mesh position={[0, -3.95, 0]} castShadow>
          <cylinderGeometry args={[0.72, 0.88, 0.26, 48]} />
          <meshStandardMaterial color="#d0cbc1" metalness={0.45} roughness={0.34} />
        </mesh>
        {signs.map((sign) => (
          <group key={sign.label} position={[sign.x, sign.y, sign.z]} rotation={[0, sign.rot, 0]}>
            <RoundedBox args={[sign.width, 0.54, 0.18]} radius={0.16} smoothness={5} castShadow>
              <meshPhysicalMaterial
                color={sign.color}
                roughness={0.24}
                metalness={0.08}
                clearcoat={0.9}
                clearcoatRoughness={0.15}
              />
            </RoundedBox>
            <mesh position={[sign.width / 2 + 0.16, 0, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
              <boxGeometry args={[0.42, 0.42, 0.17]} />
              <meshPhysicalMaterial color={sign.color} roughness={0.24} clearcoat={0.9} />
            </mesh>
            <Html transform center position={[-0.04, 0, 0.105]} distanceFactor={6.2} style={{ pointerEvents: "none" }}>
              <span style={{ display: "block", whiteSpace: "nowrap", color: "#171613", fontSize: "12px", fontWeight: 800, letterSpacing: "0.13em" }}>
                {sign.label}
              </span>
            </Html>
            {boltPositions.map((x) => (
              <mesh key={x} position={[x * Math.min(sign.width / 2.4, 1), 0, 0.112]}>
                <sphereGeometry args={[0.045, 18, 18]} />
                <meshStandardMaterial color="#33312d" metalness={0.8} roughness={0.2} />
              </mesh>
            ))}
          </group>
        ))}
      </group>
    </Float>
  );
}

export function SignpostScene() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0.1, 7.4], fov: 34 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      shadows
    >
      <ambientLight intensity={1.8} />
      <directionalLight position={[4, 6, 6]} intensity={4.2} castShadow />
      <directionalLight position={[-4, 2, 4]} intensity={2.1} color="#9fb6ff" />
      <pointLight position={[0, -2, 4]} intensity={1.5} color="#ffaf97" />
      <SceneObject />
    </Canvas>
  );
}
