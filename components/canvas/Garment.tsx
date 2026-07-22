"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { Html, RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import {
  Color,
  Group,
  Mesh,
  MeshStandardMaterial,
} from "three";
import { useGarmentStore } from "@/store/useGarmentStore";

export interface GarmentHandle {
  group: Group;
  material: MeshStandardMaterial;
}

interface GarmentProps {
  pointerParallaxStrength?: number;
}

const colorMap = {
  black: "#131313",
  cream: "#d7cdbb",
  olive: "#596148",
} as const;

export const Garment = forwardRef<GarmentHandle, GarmentProps>(
  function Garment(
    {
      pointerParallaxStrength = 0.16,
    },
    forwardedRef,
  ) {
    const groupRef = useRef<Group>(null);
    const bodyRef = useRef<Group>(null);
    const material = useMemo(
      () =>
        new MeshStandardMaterial({
          color: colorMap.black,
          roughness: 0.68,
          metalness: 0.02,
          envMapIntensity: 0.72,
        }),
      [],
    );

    const color = useGarmentStore((state) => state.color);
    const hotspotsVisible = useGarmentStore(
      (state) => state.hotspotsVisible,
    );

    useImperativeHandle(
      forwardedRef,
      () => {
        if (!groupRef.current) {
          throw new Error("Garment ref requested before scene initialization.");
        }

        return {
          group: groupRef.current,
          material,
        };
      },
      [material],
    );

    useEffect(() => {
      const target = new Color(colorMap[color]);

      gsap.to(material.color, {
        r: target.r,
        g: target.g,
        b: target.b,
        duration: 0.75,
        ease: "power3.out",
      });
    }, [color, material]);

    useEffect(() => {
      return () => material.dispose();
    }, [material]);

    useFrame((state, delta) => {
      const group = groupRef.current;
      const body = bodyRef.current;

      if (!group || !body) {
        return;
      }

      const targetRotationX =
        state.pointer.y * pointerParallaxStrength;
      const targetRotationZ =
        -state.pointer.x * pointerParallaxStrength;

      group.rotation.x +=
        (targetRotationX - group.rotation.x) *
        Math.min(1, delta * 3.6);

      group.rotation.z +=
        (targetRotationZ - group.rotation.z) *
        Math.min(1, delta * 3.6);

      body.position.y =
        Math.sin(state.clock.elapsedTime * 0.75) * 0.015;
    });

    return (
      <group
        ref={groupRef}
        position={[0, -0.5, 0]}
        rotation={[0, 0, 0]}
      >
        <group ref={bodyRef}>
          <RoundedBox
            args={[1.65, 2.05, 0.56]}
            radius={0.22}
            smoothness={8}
            castShadow
            receiveShadow
          >
            <primitive object={material} attach="material" />
          </RoundedBox>

          <RoundedBox
            args={[0.56, 1.75, 0.46]}
            radius={0.18}
            smoothness={8}
            position={[-1.03, -0.05, 0]}
            rotation={[0, 0, -0.18]}
            castShadow
          >
            <primitive object={material} attach="material" />
          </RoundedBox>

          <RoundedBox
            args={[0.56, 1.75, 0.46]}
            radius={0.18}
            smoothness={8}
            position={[1.03, -0.05, 0]}
            rotation={[0, 0, 0.18]}
            castShadow
          >
            <primitive object={material} attach="material" />
          </RoundedBox>

          <mesh
            position={[0, 1.16, -0.03]}
            rotation={[Math.PI * 0.08, 0, 0]}
            castShadow
          >
            <torusGeometry
              args={[
                0.52,
                0.24,
                32,
                64,
                Math.PI * 1.9,
              ]}
            />
            <primitive object={material} attach="material" />
          </mesh>

          <RoundedBox
            args={[0.9, 0.48, 0.16]}
            radius={0.14}
            smoothness={8}
            position={[0, -0.5, 0.34]}
            castShadow
          >
            <primitive object={material} attach="material" />
          </RoundedBox>

          <mesh position={[0, 0.22, 0.305]} castShadow>
            <boxGeometry args={[0.032, 1.45, 0.025]} />
            <meshStandardMaterial
              color="#8c8c88"
              roughness={0.35}
              metalness={0.55}
            />
          </mesh>

          <mesh position={[0, -0.5, 0.38]} castShadow>
            <boxGeometry args={[0.16, 0.12, 0.08]} />
            <meshStandardMaterial
              color="#8c8c88"
              roughness={0.35}
              metalness={0.55}
            />
          </mesh>
        </group>

        {hotspotsVisible ? (
          <>
            <Html
              position={[0.12, 0.5, 0.54]}
              center
              transform
              distanceFactor={4}
            >
              <span className="hotspot-label">Zipper</span>
            </Html>

            <Html
              position={[1.3, 0.1, 0.15]}
              center
              transform
              distanceFactor={4}
            >
              <span className="hotspot-label">Sleeve</span>
            </Html>

            <Html
              position={[0.55, -0.52, 0.52]}
              center
              transform
              distanceFactor={4}
            >
              <span className="hotspot-label">Pocket</span>
            </Html>
          </>
        ) : null}
      </group>
    );
  },
);
