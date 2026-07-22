"use client";
import { motion } from "framer-motion";

export function PageReveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity:0, y:20 }}
      animate={{ opacity:1, y:0 }}
      transition={{ duration:.8, ease:[0.16,1,0.3,1] }}
    >
      {children}
    </motion.div>
  );
}
