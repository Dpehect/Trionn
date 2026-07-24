"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        aria-hidden="true"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
        className="pointer-events-none fixed inset-0 z-[110] origin-top bg-forest"
      />
      <motion.div
        aria-hidden="true"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.72, delay: 0.08, ease: [0.76, 0, 0.24, 1] }}
        className="pointer-events-none fixed inset-0 z-[109] origin-top bg-lime"
      />
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
