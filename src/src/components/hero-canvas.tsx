"use client";
import dynamic from "next/dynamic";
const Scene = dynamic(() => import("./hero-scene").then(m => m.HeroScene), { ssr: false });
export function HeroCanvas(){ return <div className="absolute inset-0 z-0"><Scene/></div>; }
