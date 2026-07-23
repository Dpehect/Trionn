"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { easings } from "@/lib/animation";

export function SiteLoader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem("sb-loader-seen")) {
      setVisible(false);
      return;
    }
    let frame = 0;
    const started = performance.now();
    const tick = (now: number) => {
      const value = Math.min((now - started) / 1650, 1);
      setProgress(Math.round((1 - Math.pow(1 - value, 3)) * 100));
      if (value < 1) frame = requestAnimationFrame(tick);
      else {
        sessionStorage.setItem("sb-loader-seen", "1");
        window.setTimeout(() => setVisible(false), 180);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[120] grid bg-black text-white"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 1, ease: easings.editorial }}
        >
          <div className="site-container flex h-full flex-col justify-between py-7 sm:py-10">
            <div className="flex justify-between text-[10px] uppercase tracking-[0.2em] text-white/45">
              <span>Softbridge Solutions</span><span>Finland / 2026</span>
            </div>
            <div>
              <p className="text-[clamp(3.2rem,12vw,11rem)] font-semibold leading-none tracking-[-0.08em]">{String(progress).padStart(3, "0")}</p>
              <div className="mt-4 h-px bg-white/15"><motion.div className="h-full origin-left bg-accent" animate={{ scaleX: progress / 100 }} /></div>
            </div>
            <div className="flex justify-between text-[10px] uppercase tracking-[0.2em] text-white/45">
              <span>Engineering digital momentum</span><span>Loading experience</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
