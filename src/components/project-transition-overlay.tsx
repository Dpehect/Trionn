"use client";
import { motion } from "framer-motion";

export function ProjectTransitionOverlay({active,accent}:{active:boolean;accent:string}){
  return <motion.div
    aria-hidden
    initial={false}
    animate={{clipPath:active?"inset(0 0 0% 0)":"inset(100% 0 0 0)"}}
    transition={{duration:.95,ease:[.76,0,.24,1]}}
    className="pointer-events-none fixed inset-0 z-[92]"
    style={{background:accent}}
  />;
}
