"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useExperienceStore } from "@/store/experience-store";

const steps = ["TYPE", "MOTION", "WEBGL", "READY"];

export function Preloader() {
  const reducedMotion = useExperienceStore((state) => state.reducedMotion);
  const hydrated = useExperienceStore((state) => state.hydrated);
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  const firstVisit = useMemo(() => {
    if (typeof window === "undefined") return true;
    return sessionStorage.getItem("atelier-loaded") !== "true";
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    const total = reducedMotion ? 350 : firstVisit ? 1750 : 700;
    const started = performance.now();
    let frame = 0;

    const update = (time: number) => {
      const value = Math.min(1, (time - started) / total);
      setProgress(Math.round(value * 100));

      if (value >= 1) {
        sessionStorage.setItem("atelier-loaded", "true");
        window.setTimeout(() => setVisible(false), reducedMotion ? 50 : 220);
        return;
      }

      frame = requestAnimationFrame(update);
    };

    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [firstVisit, hydrated, reducedMotion]);

  const activeStep = Math.min(steps.length - 1, Math.floor(progress / 26));

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-[var(--accent-primary)] p-[var(--space-page)] text-[var(--text-inverse)]"
          exit={
            reducedMotion
              ? { opacity: 0 }
              : { clipPath: "inset(0 0 100% 0)" }
          }
          transition={{ duration: reducedMotion ? 0.2 : 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-center justify-between border-b border-black/20 pb-5">
            <strong className="text-2xl tracking-[-.06em]">ATELIER/X</strong>
            <span className="text-xs uppercase tracking-[.18em]">{progress}%</span>
          </div>

          <div>
            <motion.div
              key={steps[activeStep]}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="display-xl"
            >
              {steps[activeStep]}
            </motion.div>
          </div>

          <div className="grid gap-4 border-t border-black/20 pt-5 text-xs uppercase tracking-[.18em] md:grid-cols-2">
            <span>Preparing the experience</span>
            <div className="h-1 overflow-hidden bg-black/15">
              <div className="h-full bg-black transition-[width] duration-100" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
