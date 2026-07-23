'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, MeshTransmissionMaterial, Sparkles } from '@react-three/drei';
import { Suspense, useMemo, useRef } from 'react';
import * as THREE from 'three';

function CoreSystem() {
  const group = useRef<THREE.Group>(null);
  const left = useRef<THREE.Mesh>(null);
  const right = useRef<THREE.Mesh>(null);
  const ribbon = useRef<THREE.Mesh>(null);
  const curve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-2.2, 0, 0),
    new THREE.Vector3(-1, .7, .15),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(1, -.7, -.15),
    new THREE.Vector3(2.2, 0, 0),
  ]), []);

  useFrame((state, delta) => {
    if (!group.current || !left.current || !right.current || !ribbon.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, state.pointer.x * .12, .035);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -state.pointer.y * .08, .035);
    left.current.position.x = -1.18 + Math.sin(t * .35) * .08;
    right.current.position.x = 1.18 - Math.sin(t * .35) * .08;
    ribbon.current.rotation.z += delta * .035;
  });

  return (
    <group ref={group}>
      <Float speed={1.1} rotationIntensity={.12} floatIntensity={.2}>
        <mesh ref={left} position={[-1.18, 0, 0]} castShadow>
          <icosahedronGeometry args={[1.15, 3]} />
          <MeshTransmissionMaterial thickness={.8} roughness={.22} transmission={.94} ior={1.24} chromaticAberration={.025} color="#9d8cff" />
        </mesh>
        <mesh ref={right} position={[1.18, 0, 0]} castShadow>
          <dodecahedronGeometry args={[1.08, 1]} />
          <meshStandardMaterial color="#d7ef6e" roughness={.28} metalness={.08} />
        </mesh>
        <mesh ref={ribbon}>
          <tubeGeometry args={[curve, 96, .055, 10, false]} />
          <meshBasicMaterial color="#f5f2e9" transparent opacity={.82} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <torusKnotGeometry args={[.5, .12, 128, 20, 2, 3]} />
          <meshStandardMaterial color="#efeaff" roughness={.18} metalness={.56} />
        </mesh>
      </Float>
      <Sparkles count={42} scale={[6, 3.2, 2.4]} size={1.3} speed={.18} opacity={.45} color="#efeaff" />
    </group>
  );
}

export function IntegratedSystemScene() {
  return (
    <div className="system-scene" aria-label="Two delivery hubs joining into one integrated product system">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 7], fov: 34 }} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
        <ambientLight intensity={1.4} />
        <directionalLight position={[4, 5, 5]} intensity={3.2} color="#ffffff" />
        <directionalLight position={[-4, -2, 3]} intensity={1.5} color="#866cff" />
        <Suspense fallback={null}>
          <CoreSystem />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
      <div className="system-scene__labels" aria-hidden="true"><span>Helsinki</span><span>One system</span><span>Türkiye</span></div>
    </div>
  );
}
