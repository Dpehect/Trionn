"use client";

import { faqs } from "@/lib/data";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section-space bg-white">
      <div className="container-site grid gap-12 lg:grid-cols-[.72fr_1.28fr]">
        <div>
          <p className="eyebrow text-forest/50">FAQ</p>
          <h2 className="heading-xl mt-6 max-w-[9ch]">Clear answers before the first call.</h2>
        </div>
        <div className="border-t border-forest/20">
          {faqs.map((item, index) => {
            const active = open === index;
            return (
              <div key={item.q} className="border-b border-forest/20">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  onClick={() => setOpen(active ? null : index)}
                  aria-expanded={active}
                >
                  <span className="text-lg font-bold md:text-xl">{item.q}</span>
                  <motion.span animate={{ rotate: active ? 45 : 0 }} className="grid size-9 shrink-0 place-items-center rounded-full border border-forest/20"><Plus size={17} /></motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {active && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }} className="overflow-hidden">
                      <p className="max-w-2xl pb-7 text-forest/65">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
