"use client";

import {
  ContactShadows,
  Environment,
  Float,
  Html,
  MeshTransmissionMaterial,
  RoundedBox,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

type Capability = {
  label: string;
  short: string;
  color: string;
  angle: number;
  radius: number;
  speed: number;
  serviceIndex: number;
  symbol: string;
};

const capabilities: Capability[] = [
  { label: "Software systems", short: "Software", color: "#5577ff", angle: 0.25, radius: 2.08, speed: 0.16, serviceIndex: 0, symbol: "</>" },
  { label: "AI automation", short: "AI", color: "#9d66ff", angle: 1.85, radius: 1.82, speed: -0.2, serviceIndex: 3, symbol: "✦" },
  { label: "Digital products", short: "Products", color: "#ff765e", angle: 3.45, radius: 2.18, speed: 0.13, serviceIndex: 4, symbol: "▣" },
  { label: "Mobile + web", short: "Mobile", color: "#c6ee58", angle: 5.05, radius: 1.94, speed: -0.17, serviceIndex: 2, symbol: "▯" },
];

function selectService(index: number) {
  window.dispatchEvent(new CustomEvent("softbridge:select-service", { detail: { index } }));
  document.querySelector("#services")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function OrbitalRing({ radius, tube, rotation, color, speed }: { radius: number; tube: number; rotation: [number, number, number]; color: string; speed: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.z += delta * speed;
  });
  return (
    <mesh ref={ref} rotation={rotation}>
      <torusGeometry args={[radius, tube, 20, 120]} />
      <meshPhysicalMaterial color={color} metalness={0.72} roughness={0.18} clearcoat={0.7} envMapIntensity={1.5} />
    </mesh>
  );
}

function CapabilityModule({ capability, index }: { capability: Capability; index: number }) {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState(false);

  const activate = () => {
    setSelected(true);
    selectService(capability.serviceIndex);
    window.setTimeout(() => setSelected(false), 1400);
  };

  useFrame((state, delta) => {
    if (!group.current) return;
    const time = state.clock.elapsedTime;
    const angle = capability.angle + time * capability.speed;
    const targetX = Math.cos(angle) * capability.radius;
    const targetY = Math.sin(angle) * capability.radius * 0.58;
    const isEngaged = hovered || selected;
    const targetZ = Math.sin(angle * 1.35) * 0.36 + (isEngaged ? 0.42 : 0);

    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, targetX, 5.5, delta);
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, targetY, 5.5, delta);
    group.current.position.z = THREE.MathUtils.damp(group.current.position.z, targetZ, 5.5, delta);
    group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, -angle * 0.12, 5, delta);
    const targetScale = isEngaged ? 1.14 : 1;
    group.current.scale.setScalar(THREE.MathUtils.damp(group.current.scale.x, targetScale, 8, delta));
  });

  return (
    <group
      ref={group}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "";
      }}
      onPointerDown={(event) => {
        event.stopPropagation();
      }}
      onClick={(event) => {
        event.stopPropagation();
        activate();
      }}
    >
      <RoundedBox args={[1.3, 0.52, 0.24]} radius={0.16} smoothness={8} castShadow>
        <meshPhysicalMaterial
          color="#f7f3ec"
          metalness={0.16}
          roughness={0.22}
          clearcoat={1}
          clearcoatRoughness={0.08}
          envMapIntensity={1.25}
        />
      </RoundedBox>
      <RoundedBox position={[-0.43, 0, 0.14]} args={[0.34, 0.34, 0.08]} radius={0.1} smoothness={8}>
        <meshPhysicalMaterial color={capability.color} roughness={0.17} clearcoat={1} emissive={capability.color} emissiveIntensity={hovered ? 0.35 : 0.08} />
      </RoundedBox>
      <Html
        transform
        center
        position={[-0.43, 0, 0.205]}
        distanceFactor={7.5}
        style={{ pointerEvents: "none", width: "28px", height: "28px" }}
      >
        <span className="kinetic-module-symbol">{capability.symbol}</span>
      </Html>
      <Html
        transform
        center
        position={[0.2, 0, 0.205]}
        distanceFactor={7.5}
        style={{ pointerEvents: "none", width: "62px" }}
      >
        <span className="kinetic-module-label" title={capability.short}>{capability.short}</span>
      </Html>
      <mesh position={[0.62, 0, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.045, 0.045, 0.28, 24]} />
        <meshStandardMaterial color={capability.color} emissive={capability.color} emissiveIntensity={0.7} />
      </mesh>
      <pointLight color={capability.color} intensity={hovered || selected ? 1.45 : 0.35} distance={1.6} />
      <Html
        transform
        center
        position={[0, 0, 0.28]}
        distanceFactor={7.5}
        zIndexRange={[30, 10]}
        style={{ pointerEvents: "auto", width: "138px", height: "58px" }}
      >
        <button
          type="button"
          className={`kinetic-module-hitbox ${hovered || selected ? "is-active" : ""}`}
          aria-label={`Open ${capability.label} service`}
          onPointerEnter={() => { setHovered(true); document.body.style.cursor = "pointer"; }}
          onPointerLeave={() => { setHovered(false); document.body.style.cursor = ""; }}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
          onClick={(event) => { event.stopPropagation(); activate(); }}
        >
          <span>{capability.short}</span>
          <small>Explore service</small>
        </button>
      </Html>

      <Html
        center
        position={[0, -0.48, 0]}
        distanceFactor={8}
        style={{ pointerEvents: "none", width: "104px" }}
      >
        <span className={`kinetic-module-meta ${hovered ? "is-visible" : ""}`} title={`0${index + 1} · ${capability.label}`}>
          0{index + 1} · {capability.label}
        </span>
      </Html>
    </group>
  );
}

function Core() {
  const outer = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  const particles = useMemo(() => {
    const values: Array<[number, number, number, number]> = [];
    for (let index = 0; index < 28; index += 1) {
      const angle = (index / 28) * Math.PI * 2;
      const radius = 1.12 + (index % 4) * 0.09;
      values.push([Math.cos(angle) * radius, Math.sin(angle) * radius * 0.68, ((index % 5) - 2) * 0.12, 0.025 + (index % 3) * 0.01]);
    }
    return values;
  }, []);

  useFrame((state, delta) => {
    if (!outer.current || !inner.current) return;
    const t = state.clock.elapsedTime;
    outer.current.rotation.y = THREE.MathUtils.damp(outer.current.rotation.y, pointer.x * 0.2 + Math.sin(t * 0.22) * 0.08, 3.2, delta);
    outer.current.rotation.x = THREE.MathUtils.damp(outer.current.rotation.x, pointer.y * -0.1, 3.2, delta);
    inner.current.rotation.x += delta * 0.14;
    inner.current.rotation.y -= delta * 0.18;
  });

  return (
    <group ref={outer}>
      <mesh castShadow>
        <icosahedronGeometry args={[0.93, 5]} />
        <MeshTransmissionMaterial
          color="#d9d5ff"
          thickness={0.55}
          roughness={0.08}
          transmission={1}
          chromaticAberration={0.08}
          anisotropy={0.18}
          distortion={0.16}
          distortionScale={0.18}
          temporalDistortion={0.08}
          ior={1.18}
          samples={6}
          resolution={512}
        />
      </mesh>

      <mesh ref={inner} scale={0.57}>
        <icosahedronGeometry args={[1, 2]} />
        <meshPhysicalMaterial color="#5577ff" metalness={0.28} roughness={0.12} clearcoat={1} emissive="#735cff" emissiveIntensity={0.35} />
      </mesh>

      <OrbitalRing radius={1.24} tube={0.025} rotation={[0.65, 0.2, 0.08]} color="#5577ff" speed={0.22} />
      <OrbitalRing radius={1.47} tube={0.018} rotation={[-0.4, 0.5, 0.28]} color="#ff765e" speed={-0.18} />
      <OrbitalRing radius={1.68} tube={0.015} rotation={[0.2, -0.55, -0.36]} color="#9d66ff" speed={0.14} />

      {particles.map(([x, y, z, size], index) => (
        <mesh key={`${x}-${index}`} position={[x, y, z]}>
          <sphereGeometry args={[size, 14, 10]} />
          <meshStandardMaterial color={index % 4 === 0 ? "#c6ee58" : index % 3 === 0 ? "#ff765e" : "#5577ff"} emissiveIntensity={0.7} emissive={index % 4 === 0 ? "#c6ee58" : "#5577ff"} />
        </mesh>
      ))}

      <pointLight color="#735cff" intensity={2.2} distance={5} />
    </group>
  );
}

function KineticReactor() {
  const scene = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  useFrame((_, delta) => {
    if (!scene.current) return;
    scene.current.rotation.y = THREE.MathUtils.damp(scene.current.rotation.y, pointer.x * 0.08, 3, delta);
    scene.current.rotation.x = THREE.MathUtils.damp(scene.current.rotation.x, pointer.y * -0.035, 3, delta);
  });

  return (
    <Float speed={0.8} rotationIntensity={0.03} floatIntensity={0.12}>
      <group ref={scene} position={[0, 0.05, 0]}>
        <Core />
        {capabilities.map((capability, index) => (
          <CapabilityModule key={capability.label} capability={capability} index={index} />
        ))}
      </group>
    </Float>
  );
}

export function KineticCoreScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      style={{ pointerEvents: "auto", cursor: "grab" }}
      camera={{ position: [0, 0.1, 6.4], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      shadows
    >
      <ambientLight intensity={1.15} />
      <directionalLight position={[4, 6, 5]} intensity={3.4} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <directionalLight position={[-4, 1.5, 3]} intensity={1.2} color="#b9c4ff" />
      <pointLight position={[2.8, -1.6, 3]} intensity={1.1} color="#ffb4a1" />
      <Environment preset="city" />
      <KineticReactor />
      <ContactShadows position={[0, -2.25, 0]} opacity={0.2} scale={5} blur={2.8} far={4.5} />
    </Canvas>
  );
}
