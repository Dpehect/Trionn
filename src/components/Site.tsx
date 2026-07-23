"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Check, Clock3, ShieldCheck } from "lucide-react";
import { capabilities, cases, faq } from "@/content/site";

gsap.registerPlugin(ScrollTrigger);

function MagneticLink({ href, children, primary = false }: { href: string; children: React.ReactNode; primary?: boolean }) {
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 20 });
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 20 });
  return (
    <motion.a
      href={href}
      className={primary ? "button button--primary" : "button button--secondary"}
      style={{ x, y }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * 0.12);
        y.set((event.clientY - rect.top - rect.height / 2) * 0.12);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}<ArrowUpRight size={16} />
    </motion.a>
  );
}

function DeliveryOS() {
  const [tab, setTab] = useState<"Scope" | "Build" | "Validate" | "Release">("Build");
  const content = {
    Scope: ["Outcome defined", "14 requirements validated", "2 assumptions open"],
    Build: ["Identity workflow in review", "CRM synchronisation ready", "Admin controls building"],
    Validate: ["6 users interviewed", "Accessibility audit scheduled", "Performance budget passing"],
    Release: ["Candidate 07 deployed", "0 critical blockers", "Rollback path verified"]
  }[tab];
  return (
    <div className="delivery-os" aria-label="Example delivery operating system">
      <div className="delivery-os__top"><div><span className="status-dot" />Softbridge Delivery OS</div><small>Release 07 · On track</small></div>
      <div className="delivery-os__tabs" role="tablist">
        {(["Scope", "Build", "Validate", "Release"] as const).map((item) => <button role="tab" aria-selected={tab === item} key={item} onClick={() => setTab(item)}>{item}</button>)}
      </div>
      <div className="delivery-os__objective"><small>Current objective</small><strong>Reduce customer onboarding from four days to under thirty minutes.</strong></div>
      <AnimatePresence mode="wait">
        <motion.div key={tab} className="delivery-os__list" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: .22 }}>
          {content.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p><Check size={15} /></div>)}
        </motion.div>
      </AnimatePresence>
      <div className="delivery-os__footer"><span><strong>87%</strong> release confidence</span><span><strong>0</strong> critical blockers</span></div>
    </div>
  );
}

export default function Site() {
  const root = useRef<HTMLDivElement>(null);
  const [activeCapability, setActiveCapability] = useState(0);
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat("en-FI", { timeZone: "Europe/Helsinki", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date()));
    update(); const id = window.setInterval(update, 30000); return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    const raf = (time: number) => lenis.raf(time);
    gsap.ticker.add(raf); gsap.ticker.lagSmoothing(0);
    lenis.on("scroll", ScrollTrigger.update);
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-line]", { yPercent: 105, opacity: 0, duration: 1, stagger: .08, ease: "power4.out" });
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => gsap.from(el, { y: 30, opacity: 0, duration: .75, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 84%" } }));
    }, root);
    return () => { ctx.revert(); gsap.ticker.remove(raf); lenis.destroy(); };
  }, []);

  async function submitBrief(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setFormState("sending");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error();
      setFormState("sent"); event.currentTarget.reset();
    } catch { setFormState("error"); }
  }

  const capability = capabilities[activeCapability];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", "@id": "https://softbridge.fi/#organization", name: "Softbridge", url: "https://softbridge.fi", email: "hello@softbridge.fi", areaServed: ["Finland", "Nordic countries", "European Union"], knowsAbout: ["Product engineering", "AI systems", "Software development", "Product design"] },
      { "@type": "ProfessionalService", "@id": "https://softbridge.fi/#service", name: "Softbridge product engineering studio", url: "https://softbridge.fi", areaServed: ["Helsinki", "Finland", "Europe"], description: "Senior product engineering and AI systems for ambitious European teams.", parentOrganization: { "@id": "https://softbridge.fi/#organization" } },
      ...capabilities.map((item) => ({ "@type": "Service", name: item.title, provider: { "@id": "https://softbridge.fi/#organization" }, areaServed: ["Finland", "Europe"], description: item.outcome })),
      { "@type": "FAQPage", mainEntity: faq.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://softbridge.fi" }] }
    ]
  };

  return <div ref={root}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <header className="site-header"><a className="brand" href="#top"><strong>Softbridge</strong><span>Product engineering studio</span></a><nav><a href="#delivery">Delivery</a><a href="#expertise">Expertise</a><a href="#work">Work</a><a href="#approach">Approach</a></nav><a className="header-cta" href="#contact">Start a project</a></header>
    <main>
      <section id="top" className="hero section-shell">
        <div className="hero__copy"><p className="eyebrow">Independent studio · Helsinki + Türkiye</p><h1><span><span data-hero-line>Senior teams for</span></span><span><span data-hero-line>software that has to work.</span></span></h1><p className="hero__lead">We design and build business-critical software, AI systems and digital products for ambitious teams in Finland and Europe.</p><div className="hero__actions"><MagneticLink href="#contact" primary>Start a project</MagneticLink><MagneticLink href="#work">See selected work</MagneticLink></div><div className="trust-row"><span><strong>6+</strong> years building</span><span><strong>Senior</strong> led by default</span><span><strong>4h+</strong> daily overlap</span><span><strong>2</strong> selected slots</span></div></div>
        <div className="hero__product"><DeliveryOS /></div>
      </section>

      <section id="delivery" className="section-shell delivery" data-reveal>
        <header className="section-heading"><p className="eyebrow">Delivery model / 02</p><h2>Finland meets Türkiye.<br/>One team, not two vendors.</h2><p>Client strategy remains close to Helsinki. Product design and engineering operate through one backlog, one roadmap and one definition of done.</p></header>
        <div className="hub-system"><article><small>Helsinki hub</small><h3>Client strategy</h3><p>Discovery, stakeholder alignment, product direction and Nordic market context.</p><strong>Helsinki · EET/EEST</strong></article><div className="hub-bridge"><span></span><p>Same working hours<br/>Shared delivery system</p></div><article><small>Türkiye hub</small><h3>Senior delivery</h3><p>Product design, full-stack engineering, AI systems, quality assurance and release.</p><strong>Türkiye · EET/EEST</strong></article></div>
        <div className="metric-grid"><div><strong>4h+</strong><span>guaranteed live collaboration</span></div><div><strong>100%</strong><span>senior-led engagements</span></div><div><strong>1</strong><span>shared backlog and release plan</span></div><div><strong>Lean</strong><span>team shape without account layers</span></div></div>
      </section>

      <section id="expertise" className="section-shell expertise" data-reveal>
        <header className="section-heading"><p className="eyebrow">Expertise / 03</p><h2>Four capabilities.<br/>One accountable team.</h2><p>Engagements are organised around the outcome the business needs, not a list of disconnected deliverables.</p></header>
        <div className="expertise-layout"><div className="expertise-nav" role="tablist">{capabilities.map((item, index) => <button key={item.key} role="tab" aria-selected={index === activeCapability} onClick={() => setActiveCapability(index)}><span>0{index + 1}</span>{item.label}</button>)}</div><AnimatePresence mode="wait"><motion.article key={capability.key} className="capability-panel" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .28 }}><p className="eyebrow">{capability.label}</p><h3>{capability.title}</h3><p className="capability-panel__outcome">{capability.outcome}</p><div className="capability-meta"><div><small>Typical engagement</small><strong>{capability.engagement}</strong></div><div><small>Team shape</small><strong>{capability.team}</strong></div></div><div className="capability-columns"><div><small>Includes</small>{capability.services.map((item) => <span key={item}>{item}</span>)}</div><div><small>Signals</small>{capability.signals.map((item) => <span key={item}><Check size={14}/>{item}</span>)}</div></div><a href="#contact">Discuss this capability <ArrowUpRight size={16}/></a></motion.article></AnimatePresence></div>
      </section>

      <section id="work" className="section-shell work" data-reveal><header className="section-heading"><p className="eyebrow">Selected work / 04</p><h2>Proof where we can show it.<br/>Clear labels where we cannot.</h2><p>Every study is labelled so verified delivery, confidential work and representative product thinking remain distinct.</p></header><div className="case-grid">{cases.map((item, index) => <article key={item.title} className="case-card"><div className="case-card__index">0{index + 1}</div><span className="case-label">{item.label}</span><h3>{item.title}</h3><div className="case-section"><small>Problem</small><p>{item.problem}</p></div><div className="case-section"><small>Approach</small><p>{item.approach}</p></div><div className="case-outcomes">{item.outcomes.map((outcome) => <span key={outcome}><Check size={14}/>{outcome}</span>)}</div><footer>{item.proof}</footer></article>)}</div></section>

      <section id="approach" className="section-shell approach" data-reveal><header className="section-heading"><p className="eyebrow">How we work / 05</p><h2>The process is visible.<br/>Responsibility stays close.</h2></header><div className="principle-grid">{[["Craft with purpose","Every decision supports an agreed user or business outcome.","Ritual: outcome review","Artifact: outcome brief"],["Work in the open","Decisions, risks and trade-offs remain visible to the people responsible.","Ritual: weekly decision review","Artifact: decision log"],["Protect deep work","Collaboration happens in focused windows; delivery time remains protected.","Ritual: structured collaboration windows","Artifact: async delivery update"]].map((p,i)=><article key={p[0]}><span>0{i+1}</span><h3>{p[0]}</h3><p>{p[1]}</p><small>{p[2]}</small><small>{p[3]}</small></article>)}</div><div className="timeline">{[["Discovery","Clarify the business problem and evidence."],["Shape","Define the smallest credible release."],["Build","Ship working increments behind quality checks."],["Validate","Test usability, reliability and assumptions."],["Release","Deploy, observe and establish ownership."]].map((t,i)=><div key={t[0]}><span>0{i+1}</span><strong>{t[0]}</strong><p>{t[1]}</p></div>)}</div></section>

      <section className="section-shell transparency" data-reveal><div><p className="eyebrow">Trust and transparency / 06</p><h2>No inflated team.<br/>No invented proof.</h2></div><div className="transparency-grid">{[["Claims are labelled","Verified results, anonymised work and representative studies are clearly distinguished."],["Senior-led by default","Clients work directly with the people shaping and building the product."],["Confidentiality built in","Sensitive conversations are NDA-ready and limited to the working team."],["Clear commercial scope","Scope, assumptions, exclusions and change rules are documented before delivery."]].map((x)=><article key={x[0]}><ShieldCheck size={20}/><h3>{x[0]}</h3><p>{x[1]}</p></article>)}</div><div className="company-note"><strong>Company disclosure</strong><p>Softbridge operates through the legal entity named in each proposal and services agreement. Registration, invoicing entity, jurisdiction and data-processing terms are disclosed before commercial commitment.</p></div></section>

      <section className="section-shell faq" data-reveal><header className="section-heading"><p className="eyebrow">Direct answers / 07</p><h2>Softbridge, clearly defined.</h2></header>{faq.map((item)=><details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</section>

      <section id="talent" className="section-shell talent" data-reveal><div><p className="eyebrow">Talent network / 08</p><h2>Small teams need unusually dependable people.</h2></div><div><h3>No permanent roles are open today.</h3><p>We only publish positions tied to a confirmed team need. Experienced product, design and engineering specialists may still join the network for future, confirmed engagements.</p><a href="mailto:talent@softbridge.fi">Join the talent network <ArrowUpRight size={16}/></a><small>No speculative unpaid assignments.</small></div></section>

      <section id="contact" className="section-shell contact" data-reveal><div className="contact-copy"><p className="eyebrow">Start a project / 09</p><h2>Bring us the part that cannot afford to stay unclear.</h2><p>Share the problem, intended outcome and current constraint. A senior member of the delivery team will respond within two business days.</p><div className="contact-facts"><span><Clock3 size={17}/>Helsinki · {time}</span><span><ShieldCheck size={17}/>NDA-ready conversations</span></div></div><form onSubmit={submitBrief}><label><span>Your name</span><input name="name" required minLength={2} placeholder="Aino Virtanen"/></label><label><span>Work email</span><input type="email" name="email" required placeholder="aino@company.com"/></label><label><span>Company or team</span><input name="company" required minLength={2} placeholder="Company name"/></label><label><span>Closest capability</span><select name="service" required defaultValue=""><option value="" disabled>Select one</option>{capabilities.map((item)=><option key={item.key}>{item.title}</option>)}<option>Not sure yet</option></select></label><label className="form-wide"><span>What needs to change?</span><textarea name="message" required minLength={20} maxLength={2000} rows={6} placeholder="Describe the problem, who experiences it, the intended outcome and important constraints."/><small>20–2,000 characters</small></label><button type="submit" disabled={formState === "sending"}>{formState === "sending" ? "Sending brief…" : "Send project brief"}<ArrowUpRight size={17}/></button>{formState === "sent" && <p className="form-status">Brief received. We will reply within two business days.</p>}{formState === "error" && <p className="form-status form-status--error">The brief could not be sent. Email hello@softbridge.fi directly.</p>}</form></section>
    </main>
    <footer className="site-footer"><div><strong>Softbridge</strong><p>Senior product engineering for ambitious European teams.</p></div><nav><a href="#work">Work</a><a href="#expertise">Expertise</a><a href="#approach">Approach</a><a href="#talent">Talent</a><a href="mailto:hello@softbridge.fi">Email</a></nav><div><span><i/>Selected project conversations open</span><p>© 2026 Softbridge</p></div></footer>
  </div>;
}
