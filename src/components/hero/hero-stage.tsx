"use client";
import dynamic from "next/dynamic";
const HeroCanvas=dynamic(()=>import("@/components/canvas/hero-canvas").then(m=>m.HeroCanvas),{ssr:false});
export function HeroStage(){return <div className="hero-stage hiro-stage" aria-label="Interactive three-dimensional street sign installation"><HeroCanvas/></div>}
