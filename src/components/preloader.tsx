"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function Preloader() {
  const [open, setOpen] = useState(true);
  useEffect(() => { const id = setTimeout(() => setOpen(false), 1450); return () => clearTimeout(id); }, []);
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[100] bg-[var(--acid)] text-black grid place-items-center"
          exit={{ y: "-100%" }} transition={{ duration: .9, ease: [0.76,0,0.24,1] }}>
          <motion.div initial={{ opacity:0, scale:.9 }} animate={{ opacity:1, scale:1 }} className="text-center">
            <p className="text-xs uppercase tracking-[.3em]">Loading experience</p>
            <div className="mt-3 text-7xl md:text-9xl font-black tracking-[-.08em]">A/X</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
