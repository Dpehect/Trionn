"use client";

import { Html, RoundedBox } from "@react-three/drei";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";
import { usePointerMotion } from "@/hooks/use-pointer-motion";

const METAL = new THREE.MeshStandardMaterial({ color: "#76736d", metalness: 0.82, roughness: 0.3 });
const DARK_METAL = new THREE.MeshStandardMaterial({ color: "#252525", metalness: 0.68, roughness: 0.38 });

type DirectionSignProps = {
  color: string;
  label: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  align?: "left" | "right";
};

function DirectionSign({ color, label, position, rotation = [0, 0, 0], align = "left" }: DirectionSignProps) {
  return (
    <group position={position} rotation={rotation}>
      <RoundedBox args={[2.25, 0.63, 0.12]} radius={0.08} smoothness={5}>
        <meshStandardMaterial color={color} roughness={0.48} />
      </RoundedBox>
      <mesh position={[align === "left" ? -1.23 : 1.23, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.46, 0.46, 0.12]} />
        <meshStandardMaterial color={color} roughness={0.48} />
      </mesh>
      <Html position={[0, 0, 0.075]} transform center distanceFactor={5.8} style={{ pointerEvents: "none" }}>
        <span className="sign-label">{label.split("\n").map((line) => <span key={line}>{line}</span>)}</span>
      </Html>
    </group>
  );
}

function TrafficLight() {
  const colors = ["#9f3026", "#463c19", "#183c27"];
  return (
    <group position={[0.12, 0.08, 0.34]} rotation={[0, -0.14, 0]}>
      <RoundedBox args={[0.62, 1.62, 0.55]} radius={0.22} smoothness={5} material={DARK_METAL} />
      {colors.map((color, index) => (
        <group key={color} position={[0, 0.5 - index * 0.5, 0.32]}>
          <mesh>
            <cylinderGeometry args={[0.205, 0.205, 0.08, 32]} />
            <meshStandardMaterial color="#121212" roughness={0.48} />
          </mesh>
          <mesh position={[0, 0, 0.055]} rotation={[Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.15, 32]} />
            <meshStandardMaterial color={color} emissive={index === 0 ? color : "#000000"} emissiveIntensity={index === 0 ? 0.55 : 0} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function SignpostModel() {
  const group = useRef<THREE.Group>(null);
  const pointer = usePointerMotion();
  const [dragging, setDragging] = useState(false);
  const dragX = useRef(0);

  useFrame((state, delta) => {
    if (!group.current) return;
    const targetY = pointer.current.x * 0.15 + dragX.current;
    const targetX = pointer.current.y * 0.045 - 0.04;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetY, 4.5, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetX, 4.5, delta);
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.025;
  });

  const onPointerMove = (event: ThreeEvent<PointerEvent>) => {
    if (!dragging) return;
    dragX.current += event.movementX * 0.0035;
  };

  return (
    <group
      ref={group}
      rotation={[-0.05, -0.18, -0.055]}
      scale={1.08}
      onPointerDown={(event) => {
        event.stopPropagation();
        setDragging(true);
        document.body.style.cursor = "grabbing";
      }}
      onPointerUp={() => {
        setDragging(false);
        document.body.style.cursor = "grab";
      }}
      onPointerOut={() => {
        setDragging(false);
        document.body.style.cursor = "default";
      }}
      onPointerMove={onPointerMove}
    >
      <mesh position={[0, -1.1, 0]} material={METAL}>
        <cylinderGeometry args={[0.115, 0.14, 5.65, 32]} />
      </mesh>
      <mesh position={[0, 1.78, 0]} material={METAL}>
        <sphereGeometry args={[0.18, 28, 28]} />
      </mesh>
      <mesh position={[0, 1.42, 0]} material={DARK_METAL}>
        <torusGeometry args={[0.18, 0.045, 16, 40]} />
      </mesh>

      <DirectionSign color="#efc83d" label={"SELECTED\nWORK"} position={[-1.08, 1.05, 0.06]} rotation={[0.02, 0.12, 0]} align="left" />
      <DirectionSign color="#72a3c5" label={"AVAILABLE\n2026"} position={[1.08, 0.44, -0.02]} rotation={[-0.01, -0.15, 0]} align="right" />
      <DirectionSign color="#db5a3f" label={"ABOUT\nPROFILE"} position={[-0.88, -0.34, -0.13]} rotation={[0.02, 0.22, 0]} align="left" />

      <TrafficLight />
      <mesh position={[0, -2.72, 0]} material={DARK_METAL}>
        <cylinderGeometry args={[0.36, 0.46, 0.18, 32]} />
      </mesh>
    </group>
  );
}
