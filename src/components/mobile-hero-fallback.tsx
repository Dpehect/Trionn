"use client";
import { motion } from "framer-motion";

export function MobileHeroFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_50%_40%,#d8ff61_0%,#25300f_24%,#090909_68%)]">
      <motion.div
        className="absolute left-1/2 top-1/2 h-[56vw] w-[56vw] -translate-x-1/2 -translate-y-1/2 rounded-[35%] border border-white/20"
        animate={{ rotate: 360, borderRadius: ["35%","50%","35%"] }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[36vw] w-[36vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent-primary)]/20 blur-2xl"
        animate={{ scale: [1,1.25,1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
