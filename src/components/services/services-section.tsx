"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { services } from "@/data/services";
import { SectionLabel } from "@/components/ui/section-label";

export function ServicesSection() {
  const [active, setActive] = useState(0);
  const activeService = services[active];
  const ActiveIcon = activeService.icon;

  return (
    <section id="services" className="relative border-t border-white/10 py-28 sm:py-40">
      <div className="site-container">
        <div className="grid gap-16 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionLabel index="02">Capabilities</SectionLabel>
            <h2 className="mt-8 max-w-[9ch] text-[clamp(3.2rem,6vw,6.8rem)] font-semibold uppercase leading-[0.86] tracking-[-0.07em]">Built for real business movement.</h2>
            <p className="mt-8 max-w-md text-sm leading-7 text-muted">We assemble focused teams around the product, combining software architecture, interface design, AI and cloud delivery without unnecessary agency layers.</p>

            <div className="relative mt-12 hidden aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/10 bg-surface lg:block">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, scale: 0.92, rotate: -3 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 1.05, rotate: 2 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 p-8"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_35%,rgba(183,255,74,.22),transparent_32%),linear-gradient(135deg,transparent,rgba(255,255,255,.04))]" />
                  <ActiveIcon className="absolute right-8 top-8 size-28 text-accent/20" strokeWidth={0.75} />
                  <span className="relative font-mono text-xs tracking-[0.2em] text-accent">{activeService.id}</span>
                  <p className="absolute bottom-8 left-8 max-w-[14ch] text-4xl font-medium leading-[0.95] tracking-[-0.06em]">{activeService.title}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="border-t border-white/10">
            {services.map((service, index) => {
              const isActive = active === index;
              return (
                <article
                  key={service.id}
                  onMouseEnter={() => setActive(index)}
                  className="group border-b border-white/10"
                >
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    data-cursor="link"
                    className="grid w-full gap-5 py-7 text-left sm:grid-cols-[3rem_1fr_auto] sm:items-start sm:py-9"
                    aria-expanded={isActive}
                  >
                    <span className="font-mono text-[10px] tracking-[0.18em] text-white/35">{service.id}</span>
                    <span className="text-2xl font-medium tracking-[-0.045em] transition-transform duration-500 group-hover:translate-x-2 sm:text-4xl">{service.title}</span>
                    <ArrowUpRight className={`size-5 transition-all duration-500 ${isActive ? "rotate-45 text-accent" : "text-white/35 group-hover:text-accent"}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-7 pb-9 sm:ml-[3rem] sm:grid-cols-[1fr_auto]">
                          <p className="max-w-xl text-sm leading-7 text-muted">{service.summary}</p>
                          <ul className="flex flex-wrap gap-2 sm:max-w-xs sm:justify-end">
                            {service.capabilities.map((capability) => (
                              <li key={capability} className="rounded-full border border-white/10 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-white/48">{capability}</li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
