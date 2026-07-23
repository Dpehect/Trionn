"use client";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { SignpostModel } from "@/components/canvas/signpost-model";
export function HeroCanvas(){return <Canvas dpr={[1,1.6]} gl={{alpha:true,antialias:true,powerPreference:"high-performance"}} camera={{position:[0,0,8.05],fov:28}} onCreated={({gl})=>{gl.outputColorSpace="srgb";gl.toneMappingExposure=1.12}}><PerspectiveCamera makeDefault position={[0,0,8.05]} fov={28}/><ambientLight intensity={1.8}/><directionalLight position={[4,7,6]} intensity={3.6}/><directionalLight position={[-5,2,4]} intensity={1.35}/><Suspense fallback={null}><SignpostModel/><Environment preset="studio" environmentIntensity={.65}/></Suspense></Canvas>}
