"use client";

import { ContactShadows, Environment, Float, Html, RoundedBox } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const signs = [
  { label: "SOFTWARE", color: "#5577ff", y: 1.95, x: -0.05, z: 0.02, rot: -0.18, width: 2.55, direction: 1 },
  { label: "AI SYSTEMS", color: "#9d66ff", y: 1.25, x: 0.15, z: 0.15, rot: 0.14, width: 2.35, direction: -1 },
  { label: "DIGITAL PRODUCTS", color: "#ff765e", y: 0.54, x: -0.18, z: 0.02, rot: -0.1, width: 2.95, direction: 1 },
  { label: "MOBILE + WEB", color: "#c6ee58", y: -0.18, x: 0.18, z: 0.13, rot: 0.12, width: 2.65, direction: -1 },
];

function Sign({ sign }: { sign: (typeof signs)[number] }) {
  const arrowX = sign.direction * (sign.width / 2 + 0.14);
  const boltX = Math.min(sign.width / 2.5, 1);
  return (
    <group position={[sign.x, sign.y, sign.z]} rotation={[0, sign.rot, 0]}>
      <RoundedBox args={[sign.width, 0.58, 0.22]} radius={0.14} smoothness={8} castShadow receiveShadow>
        <meshPhysicalMaterial color={sign.color} roughness={0.2} metalness={0.05} clearcoat={1} clearcoatRoughness={0.12} envMapIntensity={1.4} />
      </RoundedBox>
      <mesh position={[arrowX, 0, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
        <boxGeometry args={[0.44, 0.44, 0.21]} />
        <meshPhysicalMaterial color={sign.color} roughness={0.2} clearcoat={1} clearcoatRoughness={0.12} />
      </mesh>
      <Html transform center position={[0, 0, 0.122]} distanceFactor={6.2} style={{ pointerEvents: "none" }}>
        <span className="sign-label">{sign.label}</span>
      </Html>
      <Html transform center rotation={[0, Math.PI, 0]} position={[0, 0, -0.122]} distanceFactor={6.2} style={{ pointerEvents: "none" }}>
        <span className="sign-label">{sign.label}</span>
      </Html>
      {[-boltX, boltX].map((x) => (
        <group key={x}>
          <mesh position={[x, 0, 0.132]} rotation={[Math.PI / 2, 0, 0]} castShadow><cylinderGeometry args={[0.055, 0.055, 0.026, 24]} /><meshStandardMaterial color="#34312c" metalness={0.9} roughness={0.16} /></mesh>
          <mesh position={[x, 0, -0.132]} rotation={[Math.PI / 2, 0, 0]} castShadow><cylinderGeometry args={[0.055, 0.055, 0.026, 24]} /><meshStandardMaterial color="#34312c" metalness={0.9} roughness={0.16} /></mesh>
        </group>
      ))}
    </group>
  );
}

function SceneObject() {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  useFrame((state, delta) => {
    if (!group.current) return;
    const targetY = pointer.x * 0.24 + state.clock.elapsedTime * 0.055;
    const targetX = pointer.y * -0.08;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetY, 3.4, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetX, 3.4, delta);
  });

  const collarYs = useMemo(() => signs.map((sign) => sign.y), []);

  return (
    <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.18}>
      <group ref={group} rotation={[0.02, -0.24, -0.02]} position={[0.2, -0.2, 0]}>
        <mesh position={[0, -1.3, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.13, 0.17, 5.85, 48]} />
          <meshPhysicalMaterial color="#cfc9be" metalness={0.82} roughness={0.2} clearcoat={0.38} envMapIntensity={1.25} />
        </mesh>
        {collarYs.map((y) => (
          <mesh key={y} position={[0, y, 0]} castShadow>
            <cylinderGeometry args={[0.22, 0.22, 0.16, 40]} />
            <meshStandardMaterial color="#918b80" metalness={0.88} roughness={0.2} />
          </mesh>
        ))}
        <mesh position={[0, -4.16, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.76, 0.94, 0.32, 64]} />
          <meshPhysicalMaterial color="#c9c3b8" metalness={0.5} roughness={0.32} clearcoat={0.28} />
        </mesh>
        <mesh position={[0, -4.02, 0]} castShadow><torusGeometry args={[0.49, 0.05, 20, 56]} /><meshStandardMaterial color="#6c675f" metalness={0.85} roughness={0.16} /></mesh>
        {signs.map((sign) => <Sign key={sign.label} sign={sign} />)}
      </group>
    </Float>
  );
}

export function SignpostScene() {
  return (
    <Canvas dpr={[1, 1.55]} camera={{ position: [0, 0.1, 7.5], fov: 33 }} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }} shadows>
      <ambientLight intensity={1.25} />
      <directionalLight position={[4, 7, 6]} intensity={3.7} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <directionalLight position={[-4, 2, 5]} intensity={1.8} color="#9fb6ff" />
      <pointLight position={[1, -1, 4]} intensity={1.35} color="#ffb19d" />
      <Environment preset="city" />
      <SceneObject />
      <ContactShadows position={[0, -4.32, 0]} opacity={0.3} scale={6.5} blur={2.7} far={5.5} />
    </Canvas>
  );
}
