"use client";

import { useState } from "react";
import { ArrowUpRight, Sparkles, Zap } from "lucide-react";

const prompts = [
  ["What is blocking the release?", "Two launch gates remain unresolved: data-retention approval and empty-state localization. Engineering owns both; the next review is Thursday."],
  ["Why did onboarding change?", "Onboarding moved from five steps to three after seven research signals showed setup fatigue before the first product outcome."],
  ["Which interface states are unowned?", "Four error states have no active owner. They affect invite acceptance, billing recovery and two import flows."],
] as const;

export function IntelligenceSection() {
  const [active, setActive] = useState(0);
  return (
    <section className="intelligence-section section-shell">
      <div className="intelligence-panel intelligence-panel-dark">
        <div className="intelligence-label"><Sparkles size={18} /> PRODUCT INTELLIGENCE</div>
        <h2>Ask the product, not five disconnected tools.</h2>
        <p>Trionn understands relationships between evidence, product decisions, interface states and launch readiness.</p>
        <div className="prompt-list">{prompts.map(([prompt], index) => <button type="button" className={index === active ? "is-active" : ""} onClick={() => setActive(index)} key={prompt}><span>{prompt}</span><ArrowUpRight size={17} /></button>)}</div>
      </div>
      <div className="intelligence-panel intelligence-panel-accent">
        <div className="intelligence-label"><Zap size={18} /> CONTEXTUAL ANSWER</div>
        <div className="answer-orbit" aria-hidden><span /><span /><i /></div>
        <span className="answer-query">{prompts[active][0]}</span>
        <p className="answer-copy">{prompts[active][1]}</p>
        <div className="answer-sources"><span>4 linked decisions</span><span>7 interface states</span><span>2 launch gates</span></div>
      </div>
    </section>
  );
}
