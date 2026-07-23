"use client";

import { ContactShadows, Environment, Float, RoundedBox } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Ribbon({
  color,
  points,
  phase,
  radius = 0.055,
}: {
  color: string;
  points: [number, number, number][];
  phase: number;
  radius?: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(points.map((point) => new THREE.Vector3(...point)));
    return new THREE.TubeGeometry(curve, 84, radius, 10, false);
  }, [points, radius]);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime + phase;
    mesh.current.rotation.z = Math.sin(t * 0.32) * 0.06;
    mesh.current.position.y = Math.sin(t * 0.55) * 0.045;
    const material = mesh.current.material as THREE.MeshStandardMaterial;
    material.emissiveIntensity = 0.32 + Math.sin(t * 1.15) * 0.12;
  });

  return (
    <mesh ref={mesh} geometry={geometry} castShadow>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.32}
        metalness={0.16}
        roughness={0.28}
      />
    </mesh>
  );
}

function FoldingPanel({
  position,
  rotation,
  color,
  delay,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  delay: number;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime + delay;
    ref.current.rotation.y = THREE.MathUtils.damp(
      ref.current.rotation.y,
      rotation[1] + Math.sin(t * 0.45) * 0.12,
      3.2,
      delta,
    );
    ref.current.rotation.x = THREE.MathUtils.damp(
      ref.current.rotation.x,
      rotation[0] + Math.cos(t * 0.36) * 0.055,
      3.2,
      delta,
    );
    ref.current.position.z = THREE.MathUtils.damp(
      ref.current.position.z,
      position[2] + Math.sin(t * 0.7) * 0.08,
      3.5,
      delta,
    );
  });

  return (
    <group ref={ref} position={position} rotation={rotation}>
      <RoundedBox args={[1.26, 0.76, 0.1]} radius={0.14} smoothness={10} castShadow>
        <meshPhysicalMaterial
          color="#fffdf8"
          transparent
          opacity={0.83}
          transmission={0.16}
          thickness={0.45}
          roughness={0.12}
          clearcoat={1}
          clearcoatRoughness={0.05}
        />
      </RoundedBox>
      <RoundedBox position={[0, 0, 0.07]} args={[0.98, 0.48, 0.025]} radius={0.1} smoothness={8}>
        <meshPhysicalMaterial color={color} emissive={color} emissiveIntensity={0.1} roughness={0.18} clearcoat={1} />
      </RoundedBox>
      <mesh position={[-0.34, 0.11, 0.1]}>
        <boxGeometry args={[0.18, 0.18, 0.04]} />
        <meshStandardMaterial color="#fffdf8" roughness={0.22} />
      </mesh>
      <mesh position={[0.1, 0.1, 0.1]}>
        <boxGeometry args={[0.48, 0.055, 0.04]} />
        <meshStandardMaterial color="#fffdf8" roughness={0.22} />
      </mesh>
      <mesh position={[0.02, -0.08, 0.1]}>
        <boxGeometry args={[0.62, 0.035, 0.04]} />
        <meshStandardMaterial color="#fffdf8" roughness={0.22} />
      </mesh>
    </group>
  );
}

function DataShard({ position, color, phase }: { position: [number, number, number]; color: string; phase: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime + phase;
    ref.current.rotation.x = t * 0.24;
    ref.current.rotation.y = t * 0.33;
    ref.current.position.y = position[1] + Math.sin(t * 0.85) * 0.1;
  });
  return (
    <mesh ref={ref} position={position} castShadow>
      <octahedronGeometry args={[0.12, 0]} />
      <meshPhysicalMaterial color={color} emissive={color} emissiveIntensity={0.32} roughness={0.12} clearcoat={1} />
    </mesh>
  );
}

function LivingInterface() {
  const root = useRef<THREE.Group>(null);
  const spine = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((state, delta) => {
    if (!root.current || !spine.current) return;
    const t = state.clock.elapsedTime;
    root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, pointer.x * 0.14, 3.8, delta);
    root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, pointer.y * -0.08, 3.8, delta);
    root.current.position.y = Math.sin(t * 0.55) * 0.055;
    spine.current.rotation.y = t * 0.16;
    spine.current.rotation.z = Math.sin(t * 0.42) * 0.08;
  });

  return (
    <group ref={root}>
      <mesh ref={spine} castShadow>
        <icosahedronGeometry args={[0.72, 2]} />
        <meshPhysicalMaterial
          color="#e7ddff"
          emissive="#7d5cff"
          emissiveIntensity={0.16}
          metalness={0.12}
          roughness={0.08}
          transmission={0.42}
          thickness={1.1}
          transparent
          opacity={0.9}
          clearcoat={1}
          clearcoatRoughness={0.02}
        />
      </mesh>

      <mesh scale={[0.55, 1.22, 0.55]} rotation={[0.18, 0.25, -0.12]}>
        <sphereGeometry args={[0.72, 64, 48]} />
        <meshBasicMaterial color="#5577ff" wireframe transparent opacity={0.2} />
      </mesh>

      <Ribbon color="#5577ff" phase={0} points={[[-1.7, 0.55, 0.1], [-0.78, 0.9, 0.42], [0.15, 0.55, 0.18], [1.52, 0.82, -0.05]]} />
      <Ribbon color="#ff765e" phase={1.2} points={[[-1.55, -0.2, -0.18], [-0.7, -0.58, 0.28], [0.3, -0.18, 0.38], [1.55, -0.62, 0.08]]} />
      <Ribbon color="#c6ee58" phase={2.4} points={[[-1.3, -1.0, 0.22], [-0.45, -0.62, -0.06], [0.62, -0.92, 0.36], [1.32, -0.32, -0.12]]} radius={0.045} />

      <FoldingPanel position={[-1.32, 1.05, -0.08]} rotation={[0.02, 0.28, -0.08]} color="#5577ff" delay={0} />
      <FoldingPanel position={[1.28, 0.82, 0.02]} rotation={[-0.02, -0.34, 0.07]} color="#9867ff" delay={1.1} />
      <FoldingPanel position={[-1.12, -0.86, 0.02]} rotation={[0.02, 0.22, 0.06]} color="#ff765e" delay={2.2} />
      <FoldingPanel position={[1.18, -0.92, -0.02]} rotation={[-0.02, -0.28, -0.05]} color="#c6ee58" delay={3.3} />

      <DataShard position={[-0.95, 0.1, 0.85]} color="#5577ff" phase={0} />
      <DataShard position={[0.95, 0.28, 0.72]} color="#9867ff" phase={1} />
      <DataShard position={[-0.35, -1.15, 0.55]} color="#ff765e" phase={2} />
      <DataShard position={[0.55, 1.15, 0.5]} color="#c6ee58" phase={3} />

      <pointLight color="#8d6cff" intensity={1.8} distance={4.5} position={[0, 0.2, 1.8]} />
    </group>
  );
}

export function LivingInterfaceScene() {
  return (
    <Canvas
      dpr={[1, 1.45]}
      camera={{ position: [0, 0, 6.2], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      shadows
    >
      <ambientLight intensity={1.15} />
      <directionalLight position={[4, 5, 5]} intensity={3.1} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <directionalLight position={[-4, 2, 3]} intensity={1.05} color="#cbd3ff" />
      <pointLight position={[2.2, -1.8, 2.5]} intensity={1.15} color="#ffb29e" />
      <Environment preset="city" />
      <Float speed={0.5} rotationIntensity={0.012} floatIntensity={0.06}>
        <LivingInterface />
      </Float>
      <ContactShadows position={[0, -1.78, 0]} opacity={0.2} scale={5} blur={2.8} far={4.5} />
    </Canvas>
  );
}
