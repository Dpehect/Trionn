"use client";

import {
  ContactShadows,
  Environment,
  Float,
  Html,
  RoundedBox,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

type Module = {
  label: string;
  eyebrow: string;
  color: string;
  position: [number, number, number];
  rotation: [number, number, number];
  serviceIndex: number;
  symbol: string;
};

const modules: Module[] = [
  { label: "Software", eyebrow: "Systems", color: "#5577ff", position: [-1.58, 0.78, 0.35], rotation: [0.02, 0.18, -0.08], serviceIndex: 0, symbol: "</>" },
  { label: "AI", eyebrow: "Automation", color: "#9867ff", position: [1.58, 0.72, 0.18], rotation: [-0.03, -0.2, 0.07], serviceIndex: 3, symbol: "✦" },
  { label: "Products", eyebrow: "SaaS", color: "#ff765e", position: [-1.45, -0.92, 0.08], rotation: [-0.04, 0.16, 0.06], serviceIndex: 4, symbol: "▣" },
  { label: "Mobile", eyebrow: "Apps + Web", color: "#c6ee58", position: [1.48, -0.9, 0.3], rotation: [0.03, -0.18, -0.06], serviceIndex: 2, symbol: "▯" },
];

function selectService(index: number) {
  window.dispatchEvent(new CustomEvent("softbridge:select-service", { detail: { index } }));
  document.querySelector("#services")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function DataRibbon({ color, phase, y }: { color: string; phase: number; y: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime + phase;
    ref.current.position.x = Math.sin(t * 0.55) * 0.13;
    ref.current.rotation.z = Math.sin(t * 0.42) * 0.08;
    const material = ref.current.material as THREE.MeshStandardMaterial;
    material.emissiveIntensity = 0.28 + Math.sin(t * 1.2) * 0.08;
  });
  return (
    <mesh ref={ref} position={[0, y, -0.1]}>
      <boxGeometry args={[2.15, 0.035, 0.06]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} roughness={0.3} />
    </mesh>
  );
}

function CapabilityCard({ item, index }: { item: Module; index: number }) {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState(false);

  const activate = () => {
    setSelected(true);
    selectService(item.serviceIndex);
    window.setTimeout(() => setSelected(false), 1200);
  };

  useFrame((state, delta) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime + index * 0.8;
    const engaged = hovered || selected;
    ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, item.position[1] + Math.sin(t * 0.75) * 0.055 + (engaged ? 0.08 : 0), 5, delta);
    ref.current.position.z = THREE.MathUtils.damp(ref.current.position.z, item.position[2] + (engaged ? 0.34 : 0), 6, delta);
    const target = engaged ? 1.08 : 1;
    ref.current.scale.setScalar(THREE.MathUtils.damp(ref.current.scale.x, target, 7, delta));
  });

  return (
    <group ref={ref} position={item.position} rotation={item.rotation}>
      <RoundedBox args={[1.42, 0.82, 0.18]} radius={0.16} smoothness={8} castShadow>
        <meshPhysicalMaterial color="#fbf7f0" metalness={0.08} roughness={0.2} clearcoat={1} clearcoatRoughness={0.08} />
      </RoundedBox>
      <RoundedBox position={[-0.48, 0.12, 0.12]} args={[0.32, 0.32, 0.06]} radius={0.09} smoothness={7}>
        <meshPhysicalMaterial color={item.color} emissive={item.color} emissiveIntensity={hovered ? 0.35 : 0.08} roughness={0.18} clearcoat={1} />
      </RoundedBox>
      <Html transform center position={[-0.48, 0.12, 0.175]} distanceFactor={7.2} style={{ pointerEvents: "none", width: 28, height: 28 }}>
        <span className="loom-symbol">{item.symbol}</span>
      </Html>
      <Html transform center position={[0.2, 0.12, 0.175]} distanceFactor={7.2} style={{ pointerEvents: "none", width: 76 }}>
        <strong className="loom-label">{item.label}</strong>
      </Html>
      <Html transform center position={[0.05, -0.23, 0.175]} distanceFactor={7.2} style={{ pointerEvents: "none", width: 112 }}>
        <span className="loom-eyebrow">{item.eyebrow}</span>
      </Html>
      <mesh position={[0, -0.39, 0.08]}>
        <boxGeometry args={[0.86, 0.028, 0.035]} />
        <meshStandardMaterial color={item.color} emissive={item.color} emissiveIntensity={hovered ? 0.75 : 0.25} />
      </mesh>
      <pointLight color={item.color} intensity={hovered || selected ? 1.25 : 0.2} distance={1.5} />
      <Html center position={[0, 0, 0.26]} distanceFactor={7.2} zIndexRange={[40, 10]} style={{ width: 150, height: 88, pointerEvents: "auto" }}>
        <button
          type="button"
          className={`loom-hitbox ${hovered || selected ? "is-active" : ""}`}
          aria-label={`Explore ${item.label} services`}
          onPointerEnter={() => { setHovered(true); document.body.style.cursor = "pointer"; }}
          onPointerLeave={() => { setHovered(false); document.body.style.cursor = ""; }}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
          onClick={(event) => { event.stopPropagation(); activate(); }}
        >
          <span>{item.label}</span>
          <small>Open capability</small>
        </button>
      </Html>
    </group>
  );
}

function LoomCore() {
  const root = useRef<THREE.Group>(null);
  const slider = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame((state, delta) => {
    if (!root.current || !slider.current) return;
    const t = state.clock.elapsedTime;
    root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, pointer.x * 0.08, 3.5, delta);
    root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, pointer.y * -0.045, 3.5, delta);
    slider.current.position.y = Math.sin(t * 0.7) * 0.12;
    slider.current.rotation.y = Math.sin(t * 0.34) * 0.12;
  });

  return (
    <group ref={root}>
      <group ref={slider}>
        <RoundedBox args={[1.72, 2.22, 0.42]} radius={0.28} smoothness={10} castShadow>
          <meshPhysicalMaterial color="#ede8ff" metalness={0.16} roughness={0.2} clearcoat={1} clearcoatRoughness={0.06} transmission={0.12} transparent opacity={0.96} />
        </RoundedBox>
        <RoundedBox position={[0, 0.05, 0.25]} args={[1.36, 1.68, 0.1]} radius={0.2} smoothness={8}>
          <meshPhysicalMaterial color="#fffdf8" roughness={0.16} clearcoat={1} />
        </RoundedBox>
        <DataRibbon color="#5577ff" phase={0} y={0.55} />
        <DataRibbon color="#ff765e" phase={1.4} y={0.05} />
        <DataRibbon color="#c6ee58" phase={2.8} y={-0.45} />

        <mesh position={[-0.44, 0.56, 0.35]}>
          <sphereGeometry args={[0.12, 32, 24]} />
          <meshPhysicalMaterial color="#5577ff" emissive="#5577ff" emissiveIntensity={0.5} roughness={0.12} clearcoat={1} />
        </mesh>
        <mesh position={[0.24, 0.05, 0.35]} rotation={[0, 0, 0.45]}>
          <octahedronGeometry args={[0.16, 0]} />
          <meshPhysicalMaterial color="#ff765e" emissive="#ff765e" emissiveIntensity={0.35} roughness={0.16} clearcoat={1} />
        </mesh>
        <mesh position={[-0.18, -0.45, 0.35]}>
          <boxGeometry args={[0.24, 0.24, 0.12]} />
          <meshPhysicalMaterial color="#c6ee58" emissive="#c6ee58" emissiveIntensity={0.3} roughness={0.18} clearcoat={1} />
        </mesh>
      </group>

      {modules.map((item, index) => <CapabilityCard key={item.label} item={item} index={index} />)}

      <mesh position={[0, -1.72, -0.1]}>
        <cylinderGeometry args={[0.82, 1.08, 0.22, 64]} />
        <meshPhysicalMaterial color="#d5d0c8" metalness={0.82} roughness={0.2} clearcoat={0.6} />
      </mesh>
      <pointLight color="#9d66ff" intensity={1.5} distance={4} position={[0, 0.4, 1.4]} />
    </group>
  );
}

export function ProductLoomScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      style={{ pointerEvents: "auto" }}
      camera={{ position: [0, 0.05, 6.5], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      shadows
    >
      <ambientLight intensity={1.18} />
      <directionalLight position={[4, 6, 5]} intensity={3.1} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <directionalLight position={[-4, 1.5, 3]} intensity={1.15} color="#bcc7ff" />
      <pointLight position={[2.5, -1.4, 3]} intensity={1.1} color="#ffb4a1" />
      <Environment preset="city" />
      <Float speed={0.55} rotationIntensity={0.015} floatIntensity={0.08}>
        <LoomCore />
      </Float>
      <ContactShadows position={[0, -1.88, 0]} opacity={0.2} scale={5} blur={2.7} far={4.5} />
    </Canvas>
  );
}
