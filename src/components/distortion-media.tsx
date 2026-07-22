"use client";
import { motion } from "framer-motion";

export function DistortionMedia({accent,title}:{accent:string;title:string}){
  return <motion.div
    whileHover={{scale:.985,filter:"saturate(1.2) contrast(1.05)"}}
    transition={{duration:.6,ease:[.16,1,.3,1]}}
    className="relative aspect-video overflow-hidden rounded-[var(--radius-lg)] border hairline"
    style={{background:`radial-gradient(circle at 45% 40%,${accent},#111 62%)`}}
  >
    <div className="absolute inset-0 opacity-30 mix-blend-overlay [background-image:repeating-linear-gradient(90deg,transparent_0,transparent_2px,rgba(255,255,255,.15)_3px)]"/>
    <p className="eyebrow absolute bottom-6 left-6">{title}</p>
  </motion.div>;
}
