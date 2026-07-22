"use client";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
export function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <motion.div className={cn(className)} initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-8%" }} transition={{ duration: .75, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}
