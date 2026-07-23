"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Points, PointMaterial } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import type { Group, Points as ThreePoints } from "three";

function Network() {
  const root = useRef<Group>(null);
  const points = useRef<ThreePoints>(null);
  const positions = useMemo(() => {
    const values = new Float32Array(75 * 3);
    for (let index = 0; index < 75; index += 1) {
      const radius = 1.4 + (index % 9) * 0.08;
      const angle = index * 2.399;
      values[index * 3] = Math.cos(angle) * radius;
      values[index * 3 + 1] = Math.sin(angle * 0.73) * 1.35;
      values[index * 3 + 2] = Math.sin(angle) * radius * 0.72;
    }
    return values;
  }, []);

  const bridgeLines = useMemo(
    () => [
      [[-2.2, -0.45, 0], [-0.9, 0.65, 0.25], [0.1, -0.2, 0.65], [1.1, 0.75, 0.15], [2.2, -0.35, 0]],
      [[-2.05, 0.35, -0.45], [-0.7, -0.55, 0.3], [0.45, 0.55, -0.2], [1.95, 0.2, 0.4]],
      [[-1.5, -1.05, 0.2], [-0.2, 0.05, -0.55], [0.9, -0.6, 0.35], [1.65, 1.05, -0.1]],
    ] as [number, number, number][][],
    [],
  );

  useFrame((state, delta) => {
    if (!root.current) return;
    root.current.rotation.y += delta * 0.055;
    root.current.rotation.x += (state.pointer.y * 0.08 - root.current.rotation.x) * 0.025;
    root.current.rotation.z += (state.pointer.x * -0.05 - root.current.rotation.z) * 0.025;
    if (points.current) points.current.rotation.y -= delta * 0.025;
  });

  return (
    <Float speed={0.9} rotationIntensity={0.08} floatIntensity={0.22}>
      <group ref={root}>
        <Points ref={points} positions={positions} stride={3} frustumCulled>
          <PointMaterial transparent color="#b7ff4a" size={0.035} sizeAttenuation depthWrite={false} opacity={0.72} />
        </Points>
        {bridgeLines.map((line, index) => (
          <Line key={index} points={line} color="#b7ff4a" lineWidth={index === 0 ? 1.3 : 0.65} transparent opacity={index === 0 ? 0.75 : 0.3} />
        ))}
        <mesh rotation={[0.45, 0.25, 0]}>
          <icosahedronGeometry args={[1.85, 1]} />
          <meshBasicMaterial color="#b7ff4a" wireframe transparent opacity={0.055} />
        </mesh>
      </group>
    </Float>
  );
}

export function NetworkCanvas() {
  return (
    <Canvas
      dpr={[1, 1.4]}
      camera={{ position: [0, 0, 6], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>
        <Network />
      </Suspense>
    </Canvas>
  );
}
