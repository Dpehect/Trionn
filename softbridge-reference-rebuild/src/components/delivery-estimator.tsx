"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";

export function DeliveryEstimator() {
  const [ambiguity, setAmbiguity] = useState(45);
  const [complexity, setComplexity] = useState(55);
  const [integration, setIntegration] = useState(35);

  const estimate = useMemo(() => {
    const score = ambiguity * 0.35 + complexity * 0.4 + integration * 0.25;
    const weeks = Math.max(4, Math.round(5 + score / 7));
    const team = score > 70 ? "5–6" : score > 42 ? "4–5" : "3–4";
    const start = ambiguity > 62 ? "Framing first" : "Focused delivery";
    return { weeks, team, start };
  }, [ambiguity, complexity, integration]);

  const controls = [
    { label: "Product ambiguity", value: ambiguity, setValue: setAmbiguity, low: "Clear", high: "Uncertain" },
    { label: "System complexity", value: complexity, setValue: setComplexity, low: "Contained", high: "Distributed" },
    { label: "Integration load", value: integration, setValue: setIntegration, low: "Few", high: "Many" },
  ];

  return (
    <section className="section-space bg-white">
      <div className="container-site">
        <div className="text-center">
          <p className="eyebrow text-forest/50">Shape the first engagement</p>
          <h2 className="heading-xl mx-auto mt-6 max-w-[12ch]">Estimate a sensible starting shape.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-forest/65">This is a directional planning tool, not a quote. It helps identify whether uncertainty should be framed before a delivery team is committed.</p>
        </div>

        <div className="mt-14 grid gap-5 rounded-stage bg-cream p-5 md:p-8 lg:grid-cols-[1.2fr_.8fr]">
          <div className="rounded-[2rem] bg-white p-6 md:p-9">
            <div className="grid gap-8">
              {controls.map((control) => (
                <label key={control.label} className="grid gap-4">
                  <div className="flex items-center justify-between gap-6">
                    <span className="font-bold">{control.label}</span>
                    <span className="eyebrow text-forest/45">{control.value}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={control.value}
                    onChange={(event) => control.setValue(Number(event.target.value))}
                    className="w-full accent-forest"
                  />
                  <div className="flex justify-between text-xs text-forest/45"><span>{control.low}</span><span>{control.high}</span></div>
                </label>
              ))}
            </div>
          </div>

          <motion.div
            layout
            className="rounded-[2rem] bg-forest p-6 text-white md:p-9"
          >
            <p className="eyebrow text-white/45">Directional engagement</p>
            <motion.p key={estimate.weeks} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-8 text-[clamp(4rem,8vw,8rem)] font-black leading-none tracking-[-0.07em] text-lime">
              {estimate.weeks}
            </motion.p>
            <p className="heading-md mt-1">weeks</p>
            <dl className="mt-10 border-t border-white/20">
              <div className="flex justify-between gap-4 border-b border-white/20 py-4"><dt className="text-white/50">Team</dt><dd className="font-bold">{estimate.team} senior people</dd></div>
              <div className="flex justify-between gap-4 border-b border-white/20 py-4"><dt className="text-white/50">Start</dt><dd className="font-bold">{estimate.start}</dd></div>
              <div className="flex justify-between gap-4 py-4"><dt className="text-white/50">Cadence</dt><dd className="font-bold">Weekly evidence</dd></div>
            </dl>
            <a href="/contact" className="magnetic-button button-lime mt-7 w-full">Discuss the actual constraints</a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
