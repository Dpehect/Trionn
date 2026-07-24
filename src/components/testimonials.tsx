"use client";

import { testimonials } from "@/lib/data";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const item = testimonials[index];
  const move = (direction: number) => setIndex((current) => (current + direction + testimonials.length) % testimonials.length);

  return (
    <section className="section-space bg-cream">
      <div className="container-site">
        <div className="rounded-stage border border-forest/15 bg-white p-6 md:p-10 lg:p-14">
          <div className="flex items-center justify-between border-b border-forest/15 pb-5">
            <p className="eyebrow text-forest/50">{String(index + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")} · What clients notice</p>
            <div className="flex gap-2">
              <button type="button" onClick={() => move(-1)} className="grid size-11 place-items-center rounded-full border border-forest/20" aria-label="Previous testimonial"><ArrowLeft size={17} /></button>
              <button type="button" onClick={() => move(1)} className="grid size-11 place-items-center rounded-full border border-forest/20" aria-label="Next testimonial"><ArrowRight size={17} /></button>
            </div>
          </div>

          <div className="min-h-[360px] py-10 md:min-h-[420px] md:py-16">
            <AnimatePresence mode="wait">
              <motion.figure
                key={index}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <blockquote className="heading-xl max-w-[16ch]">“{item.quote}”</blockquote>
                <figcaption className="mt-10 text-sm"><span className="font-bold">{item.name}</span><span className="ml-3 text-forest/50">{item.company}</span></figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
