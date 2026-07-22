"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { Bloom, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import { useRef } from "react";
import * as THREE from "three";

function Artifact(){
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * .16;
    ref.current.rotation.y += delta * .22;
    const mx = state.pointer.x * .25, my = state.pointer.y * .18;
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, mx + state.clock.elapsedTime*.12, .025);
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, -my, .025);
  });
  return <Float speed={1.4} rotationIntensity={.35} floatIntensity={.8}>
    <mesh ref={ref} scale={1.7}>
      <icosahedronGeometry args={[1,5]}/>
      <meshPhysicalMaterial color="#d8ff61" roughness={.18} metalness={.35} clearcoat={1} clearcoatRoughness={.12}/>
    </mesh>
  </Float>;
}

export function HeroScene(){
  return <Canvas dpr={[1,1.75]} camera={{position:[0,0,5], fov:42}} gl={{antialias:true, alpha:true}}>
    <ambientLight intensity={.8}/><directionalLight position={[3,4,5]} intensity={5}/>
    <Artifact/><Environment preset="studio"/>
    <EffectComposer><Bloom intensity={.55} luminanceThreshold={.55}/><Noise opacity={.025}/><Vignette eskil={false} offset={.2} darkness={.75}/></EffectComposer>
  </Canvas>;
}
