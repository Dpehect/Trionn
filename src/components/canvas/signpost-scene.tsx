"use client";

import { ContactShadows, Environment, Float, Html, RoundedBox } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

const panels = [
  {
    label: "SOFTWARE",
    icon: "</>",
    color: "#5577ff",
    y: 1.72,
    x: 0.48,
    width: 2.62,
    direction: 1,
    rotation: -0.06,
    serviceIndex: 0,
  },
  {
    label: "AI SYSTEMS",
    icon: "✦",
    color: "#9d66ff",
    y: 0.88,
    x: -0.46,
    width: 2.48,
    direction: -1,
    rotation: 0.055,
    serviceIndex: 3,
  },
  {
    label: "DIGITAL PRODUCTS",
    icon: "▣",
    color: "#ff765e",
    y: 0.02,
    x: 0.54,
    width: 2.92,
    direction: 1,
    rotation: -0.045,
    serviceIndex: 4,
  },
  {
    label: "MOBILE + WEB",
    icon: "▯",
    color: "#c6ee58",
    y: -0.84,
    x: -0.44,
    width: 2.62,
    direction: -1,
    rotation: 0.04,
    serviceIndex: 2,
  },
] as const;

type Panel = (typeof panels)[number];

function selectService(index: number) {
  window.dispatchEvent(new CustomEvent("softbridge:select-service", { detail: { index } }));
  document.querySelector("#services")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Bolt({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position} rotation={[Math.PI / 2, 0, 0]} castShadow>
      <cylinderGeometry args={[0.045, 0.045, 0.03, 24]} />
      <meshStandardMaterial color="#393732" metalness={0.95} roughness={0.15} />
    </mesh>
  );
}

function WayfindingPanel({ panel }: { panel: Panel }) {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const arrowX = panel.direction * (panel.width / 2 + 0.18);
  const labelOffset = panel.direction === 1 ? -0.12 : 0.12;
  const iconX = panel.direction === 1 ? -panel.width * 0.31 : panel.width * 0.31;

  useFrame((_, delta) => {
    if (!group.current) return;
    const hoverLift = hovered ? 0.09 : 0;
    const hoverDepth = hovered ? 0.16 : 0;
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, panel.y + hoverLift, 8, delta);
    group.current.position.z = THREE.MathUtils.damp(group.current.position.z, hoverDepth, 8, delta);
    group.current.rotation.z = THREE.MathUtils.damp(
      group.current.rotation.z,
      panel.rotation + (hovered ? panel.direction * 0.018 : 0),
      8,
      delta,
    );
  });

  return (
    <group
      ref={group}
      position={[panel.x, panel.y, 0]}
      rotation={[0, 0, panel.rotation]}
      onPointerEnter={(event) => {
        event.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerLeave={() => {
        setHovered(false);
        document.body.style.cursor = "";
      }}
      onClick={(event) => {
        event.stopPropagation();
        selectService(panel.serviceIndex);
      }}
    >
      {/* Metallic outer shell gives the panel a manufactured, Blender-like edge. */}
      <RoundedBox args={[panel.width + 0.13, 0.66, 0.24]} radius={0.17} smoothness={10} castShadow>
        <meshPhysicalMaterial
          color="#b8b2a8"
          metalness={0.86}
          roughness={0.2}
          clearcoat={0.45}
          envMapIntensity={1.45}
        />
      </RoundedBox>

      <RoundedBox position={[0, 0, 0.075]} args={[panel.width, 0.55, 0.18]} radius={0.145} smoothness={10} castShadow receiveShadow>
        <meshPhysicalMaterial
          color={panel.color}
          metalness={0.04}
          roughness={0.18}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={1.6}
        />
      </RoundedBox>

      {/* Directional arrow end. */}
      <mesh position={[arrowX, 0, 0.04]} rotation={[0, 0, Math.PI / 4]} castShadow>
        <boxGeometry args={[0.43, 0.43, 0.2]} />
        <meshPhysicalMaterial color={panel.color} roughness={0.18} clearcoat={1} clearcoatRoughness={0.1} />
      </mesh>
      <mesh position={[arrowX, 0, -0.075]} rotation={[0, 0, Math.PI / 4]} castShadow>
        <boxGeometry args={[0.5, 0.5, 0.09]} />
        <meshStandardMaterial color="#aaa49a" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Icon badge. */}
      <mesh position={[iconX, 0, 0.185]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.045, 48]} />
        <meshPhysicalMaterial color={panel.color} metalness={0.05} roughness={0.2} clearcoat={1} />
      </mesh>
      <mesh position={[iconX, 0, 0.213]}>
        <ringGeometry args={[0.192, 0.202, 48]} />
        <meshBasicMaterial color="rgba(255,255,255,.72)" transparent opacity={0.75} />
      </mesh>

      {/* DOM is used once per visible front face; no duplicate rear labels. */}
      <Html transform center position={[iconX, 0, 0.25]} distanceFactor={7.1} style={{ pointerEvents: "none" }}>
        <span className="wayfinding-icon">{panel.icon}</span>
      </Html>
      <Html transform center position={[labelOffset, 0, 0.245]} distanceFactor={7.1} style={{ pointerEvents: "none" }}>
        <span className="wayfinding-label">{panel.label}</span>
      </Html>

      {/* Mounting collar and detail bolts. */}
      <mesh position={[-panel.x, 0, -0.04]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.235, 0.235, 0.22, 40]} />
        <meshStandardMaterial color="#8d887f" metalness={0.92} roughness={0.18} />
      </mesh>
      <Bolt position={[-panel.x - 0.11, 0.13, 0.13]} />
      <Bolt position={[-panel.x + 0.11, -0.13, 0.13]} />
    </group>
  );
}

function Beacon() {
  return (
    <group position={[0, 2.58, 0]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.21, 0.25, 0.34, 40]} />
        <meshStandardMaterial color="#aaa59c" metalness={0.92} roughness={0.17} />
      </mesh>
      <mesh position={[0, 0.23, 0]}>
        <sphereGeometry args={[0.16, 32, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial color="#7aa0ff" transmission={0.72} thickness={0.18} roughness={0.08} emissive="#5577ff" emissiveIntensity={0.7} />
      </mesh>
      <mesh position={[0, 0.08, 0]}>
        <torusGeometry args={[0.19, 0.025, 16, 48]} />
        <meshStandardMaterial color="#5577ff" emissive="#5577ff" emissiveIntensity={1.1} />
      </mesh>
      <pointLight position={[0, 0.3, 0.18]} color="#5577ff" intensity={1.4} distance={2.2} />
    </group>
  );
}

function StatusModule() {
  return (
    <group position={[0, -2.02, 0.17]}>
      <RoundedBox args={[0.25, 0.72, 0.12]} radius={0.08} smoothness={8}>
        <meshStandardMaterial color="#2d2d2b" metalness={0.55} roughness={0.27} />
      </RoundedBox>
      {[-0.18, 0, 0.18].map((y, index) => (
        <mesh key={y} position={[0, y, 0.075]}>
          <sphereGeometry args={[0.035, 20, 16]} />
          <meshStandardMaterial
            color={index === 0 ? "#c6ee58" : "#758161"}
            emissive={index === 0 ? "#c6ee58" : "#000000"}
            emissiveIntensity={index === 0 ? 1.5 : 0}
          />
        </mesh>
      ))}
    </group>
  );
}

function WayfindingObject() {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame((state, delta) => {
    if (!group.current) return;
    const idle = Math.sin(state.clock.elapsedTime * 0.65) * 0.018;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, pointer.x * 0.075 + idle, 4.5, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, pointer.y * -0.025, 4.5, delta);
  });

  return (
    <Float speed={0.85} rotationIntensity={0.025} floatIntensity={0.09}>
      <group ref={group} position={[0, -0.08, 0]} rotation={[0.01, 0, -0.01]}>
        <mesh position={[0, -0.35, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.13, 0.16, 5.5, 56]} />
          <meshPhysicalMaterial color="#c7c2ba" metalness={0.9} roughness={0.2} clearcoat={0.3} envMapIntensity={1.45} />
        </mesh>

        {/* Segmented collars make the pole feel engineered rather than generic. */}
        {[2.25, 1.3, 0.43, -0.43, -1.3].map((y) => (
          <group key={y} position={[0, y, 0]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.205, 0.205, 0.16, 40]} />
              <meshStandardMaterial color="#8d887f" metalness={0.94} roughness={0.17} />
            </mesh>
            <mesh position={[0, 0.085, 0]}>
              <torusGeometry args={[0.19, 0.018, 12, 44]} />
              <meshStandardMaterial color="#5f5c56" metalness={0.95} roughness={0.14} />
            </mesh>
          </group>
        ))}

        <Beacon />
        <StatusModule />

        <mesh position={[0, -3.12, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.5, 0.64, 0.22, 64]} />
          <meshPhysicalMaterial color="#b9b4ab" metalness={0.68} roughness={0.27} clearcoat={0.25} />
        </mesh>
        <mesh position={[0, -3.01, 0]} castShadow>
          <torusGeometry args={[0.36, 0.035, 18, 56]} />
          <meshStandardMaterial color="#68645d" metalness={0.9} roughness={0.16} />
        </mesh>

        {panels.map((panel) => (
          <WayfindingPanel key={panel.label} panel={panel} />
        ))}
      </group>
    </Float>
  );
}

export function SignpostScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.05, 7.35], fov: 32 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      shadows
    >
      <ambientLight intensity={1.3} />
      <directionalLight position={[4.5, 7, 6]} intensity={3.8} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <directionalLight position={[-4, 2.5, 4]} intensity={1.5} color="#aabaff" />
      <pointLight position={[2, -1, 4]} intensity={1.2} color="#ffb49f" />
      <Environment preset="city" />
      <WayfindingObject />
      <ContactShadows position={[0, -3.28, 0]} opacity={0.32} scale={5.5} blur={2.6} far={5} />
    </Canvas>
  );
}
