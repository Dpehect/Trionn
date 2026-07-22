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
  MeshStandardMaterial,
} from "three";
import { useGarmentStore } from "@/store/useGarmentStore";

export interface GarmentHandle {
  group: Group;
  material: MeshStandardMaterial;
}

const GARMENT_COLORS = {
  black: "#171717",
  cream: "#d8cfbd",
  olive: "#596149",
} as const;

interface GarmentProps {
  pointerParallaxStrength?: number;
}

export const Garment = forwardRef<GarmentHandle, GarmentProps>(
  function Garment(
    {
      pointerParallaxStrength = 0.1,
    },
    forwardedRef,
  ) {
    const groupRef = useRef<Group>(null);
    const floatRef = useRef<Group>(null);

    const color = useGarmentStore((state) => state.color);
    const hotspotsVisible = useGarmentStore(
      (state) => state.hotspotsVisible,
    );

    const fabricMaterial = useMemo(
      () =>
        new MeshStandardMaterial({
          color: GARMENT_COLORS.black,
          roughness: 0.7,
          metalness: 0.1,
          envMapIntensity: 1.05,
        }),
      [],
    );

    const ribMaterial = useMemo(
      () =>
        new MeshStandardMaterial({
          color: "#0e0e0e",
          roughness: 0.82,
          metalness: 0.02,
          envMapIntensity: 0.65,
        }),
      [],
    );

    useImperativeHandle(
      forwardedRef,
      () => {
        if (!groupRef.current) {
          throw new Error("Garment scene is not mounted.");
        }

        return {
          group: groupRef.current,
          material: fabricMaterial,
        };
      },
      [fabricMaterial],
    );

    useEffect(() => {
      const nextColor = new Color(GARMENT_COLORS[color]);

      gsap.to(fabricMaterial.color, {
        r: nextColor.r,
        g: nextColor.g,
        b: nextColor.b,
        duration: 0.65,
        ease: "power3.out",
      });

      gsap.to(ribMaterial.color, {
        r: nextColor.r * 0.72,
        g: nextColor.g * 0.72,
        b: nextColor.b * 0.72,
        duration: 0.65,
        ease: "power3.out",
      });
    }, [color, fabricMaterial, ribMaterial]);

    useEffect(() => {
      return () => {
        fabricMaterial.dispose();
        ribMaterial.dispose();
      };
    }, [fabricMaterial, ribMaterial]);

    useFrame((state, delta) => {
      const group = groupRef.current;
      const floating = floatRef.current;

      if (!group || !floating) {
        return;
      }

      const targetX = state.pointer.y * pointerParallaxStrength;
      const targetZ = -state.pointer.x * pointerParallaxStrength;

      group.rotation.x +=
        (targetX - group.rotation.x) *
        Math.min(1, delta * 2.8);

      group.rotation.z +=
        (targetZ - group.rotation.z) *
        Math.min(1, delta * 2.8);

      floating.position.y =
        Math.sin(state.clock.elapsedTime * 0.65) * 0.015;
    });

    return (
      <group
        ref={groupRef}
        position={[0, -0.2, 0]}
        scale={0.92}
      >
        <group ref={floatRef}>
          {/* Torso */}
          <RoundedBox
            args={[1.62, 2.05, 0.48]}
            radius={0.3}
            smoothness={12}
            castShadow
            receiveShadow
          >
            <primitive object={fabricMaterial} attach="material" />
          </RoundedBox>

          {/* Shoulder shaping */}
          <RoundedBox
            args={[1.88, 0.46, 0.5]}
            radius={0.22}
            smoothness={10}
            position={[0, 0.74, 0]}
            castShadow
          >
            <primitive object={fabricMaterial} attach="material" />
          </RoundedBox>

          {/* Sleeves */}
          <RoundedBox
            args={[0.47, 1.72, 0.42]}
            radius={0.2}
            smoothness={10}
            position={[-1.03, -0.03, 0.02]}
            rotation={[0, 0, -0.17]}
            castShadow
          >
            <primitive object={fabricMaterial} attach="material" />
          </RoundedBox>

          <RoundedBox
            args={[0.47, 1.72, 0.42]}
            radius={0.2}
            smoothness={10}
            position={[1.03, -0.03, 0.02]}
            rotation={[0, 0, 0.17]}
            castShadow
          >
            <primitive object={fabricMaterial} attach="material" />
          </RoundedBox>

          {/* Hood shell */}
          <mesh
            position={[0, 1.06, -0.08]}
            rotation={[0.14, 0, 0]}
            castShadow
          >
            <sphereGeometry
              args={[
                0.73,
                64,
                64,
                0,
                Math.PI * 2,
                0,
                Math.PI * 0.76,
              ]}
            />
            <primitive object={fabricMaterial} attach="material" />
          </mesh>

          {/* Hood opening */}
          <mesh
            position={[0, 1.08, 0.43]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <torusGeometry args={[0.39, 0.055, 24, 64]} />
            <primitive object={ribMaterial} attach="material" />
          </mesh>

          {/* Waist rib */}
          <RoundedBox
            args={[1.55, 0.2, 0.5]}
            radius={0.08}
            smoothness={8}
            position={[0, -1.03, 0]}
            castShadow
          >
            <primitive object={ribMaterial} attach="material" />
          </RoundedBox>

          {/* Cuffs */}
          <RoundedBox
            args={[0.42, 0.2, 0.4]}
            radius={0.08}
            smoothness={8}
            position={[-1.17, -0.82, 0.02]}
            rotation={[0, 0, -0.17]}
            castShadow
          >
            <primitive object={ribMaterial} attach="material" />
          </RoundedBox>

          <RoundedBox
            args={[0.42, 0.2, 0.4]}
            radius={0.08}
            smoothness={8}
            position={[1.17, -0.82, 0.02]}
            rotation={[0, 0, 0.17]}
            castShadow
          >
            <primitive object={ribMaterial} attach="material" />
          </RoundedBox>

          {/* Kangaroo pocket */}
          <RoundedBox
            args={[0.96, 0.42, 0.14]}
            radius={0.16}
            smoothness={10}
            position={[0, -0.52, 0.31]}
            castShadow
          >
            <primitive object={fabricMaterial} attach="material" />
          </RoundedBox>

          {/* Center zipper */}
          <mesh position={[0, 0.08, 0.255]} castShadow>
            <boxGeometry args={[0.022, 1.7, 0.02]} />
            <meshStandardMaterial
              color="#8a8882"
              roughness={0.3}
              metalness={0.65}
            />
          </mesh>

          <mesh position={[0, -0.38, 0.285]} castShadow>
            <boxGeometry args={[0.12, 0.11, 0.055]} />
            <meshStandardMaterial
              color="#9d9a93"
              roughness={0.28}
              metalness={0.7}
            />
          </mesh>
        </group>

        {hotspotsVisible ? (
          <>
            <Html
              position={[0.2, 0.5, 0.48]}
              center
              transform
              distanceFactor={4}
            >
              <button className="hotspot-label pointer-events-auto">
                Zipper
              </button>
            </Html>

            <Html
              position={[-0.72, 0.74, 0.38]}
              center
              transform
              distanceFactor={4}
            >
              <button className="hotspot-label pointer-events-auto">
                Chest
              </button>
            </Html>

            <Html
              position={[0.62, -0.48, 0.42]}
              center
              transform
              distanceFactor={4}
            >
              <button className="hotspot-label pointer-events-auto">
                Pocket
              </button>
            </Html>
          </>
        ) : null}
      </group>
    );
  },
);
