"use client";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
export function TransitionOverlay(){const pathname=usePathname();return <AnimatePresence mode="wait"><motion.div key={pathname} aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[90] h-1 origin-left bg-[var(--accent)]" initial={{scaleX:0}} animate={{scaleX:[0,1,0],transformOrigin:["left","left","right"]}} transition={{duration:.75,ease:[.76,0,.24,1]}}/></AnimatePresence>}
