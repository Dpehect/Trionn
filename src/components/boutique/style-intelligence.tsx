"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Sparkles, WandSparkles } from "lucide-react";

import { styleEdits } from "@/data/style-edits";


export function StyleIntelligence() {
  const [active, setActive] = useState(0);
  const item = styleEdits[active];

  return (
    <section className="style-intelligence section-shell" id="style-intelligence">
      <div className="style-panel style-panel-dark">
        <div className="style-label"><Sparkles size={18} /> STYLE INTELLIGENCE</div>
        <h2>Ask the wardrobe, then open a complete edit.</h2>
        <p>Seçtiğin ihtiyaca göre ürünleri bağlayan bir stil yönü oluşturur.</p>
        <div className="style-prompt-list">{styleEdits.map((prompt, index) => <button type="button" className={active === index ? "is-active" : ""} onClick={() => setActive(index)} key={prompt.slug}><span>{prompt.question}</span><ArrowUpRight size={17} /></button>)}</div>
      </div>
      <div className="style-panel style-panel-accent" aria-live="polite">
        <div className="style-label"><WandSparkles size={18} /> CURATED ANSWER</div>
        <div className="style-pulse" aria-hidden><span /><span /><span /><i /></div>
        <AnimatePresence mode="wait">
          <motion.div key={item.slug} className="style-answer" initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -18, opacity: 0 }} transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}>
            <span>{item.question}</span>
            <h3>{item.title}</h3>
            <p>{item.answer}</p>
            <div className="style-meta">{item.meta.map((meta) => <span key={meta}>{meta}</span>)}</div>
            <Link className="button button-primary" href={`/style/${item.slug}`}>Stil sayfasını aç <ArrowUpRight size={17} /></Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
