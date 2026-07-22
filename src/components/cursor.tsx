"use client";
import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
export function Cursor(){
  const x = useSpring(useMotionValue(-100), {stiffness:500,damping:35});
  const y = useSpring(useMotionValue(-100), {stiffness:500,damping:35});
  useEffect(()=>{ const move=(e:PointerEvent)=>{x.set(e.clientX-10);y.set(e.clientY-10)}; addEventListener("pointermove",move); return()=>removeEventListener("pointermove",move)},[x,y]);
  return <motion.div style={{x,y}} className="pointer-events-none fixed left-0 top-0 z-[90] hidden md:block h-5 w-5 rounded-full border border-[var(--acid)] mix-blend-difference"/>;
}
