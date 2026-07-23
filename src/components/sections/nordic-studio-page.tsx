"use client";

import { type FormEvent, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, Check, Clock3, Code2, Database, Globe2,
  Layers3, Menu, ShieldCheck, Sparkles, X, Zap, Users2, BriefcaseBusiness,
  BrainCircuit, MonitorSmartphone, ServerCog, FileText, CalendarDays, Mail
} from "lucide-react";
import Link from "next/link";

const capabilities = [
  {
    id: "product", label: "Product", icon: Code2,
    outcome: "Turn a business opportunity into a product that can be shipped, measured and extended.",
    includes: ["Product discovery", "Custom software", "SaaS foundations", "Domain architecture"],
    timeline: "10–18 weeks", team: "Product lead · Tech lead · 2–4 engineers",
    signals: ["Release scope defined in 2–3 weeks", "One measurable product outcome per engagement"],
    produces: ["Outcome brief", "Domain architecture", "Production application", "Release plan"],
    metric: "38%", metricLabel: "less manual coordination in a verified engagement",
    preview: "Operations workspace"
  },
  {
    id: "experience", label: "Experience", icon: MonitorSmartphone,
    outcome: "Make complex software faster to understand, easier to operate and harder to abandon.",
    includes: ["Product UX", "Web applications", "Mobile applications", "Design systems"],
    timeline: "6–14 weeks", team: "Product designer · Frontend lead · Product engineer",
    signals: ["WCAG AA minimum", "Performance budget agreed before build"],
    produces: ["Journey architecture", "Interactive prototype", "Production UI system", "Accessibility baseline"],
    metric: "1.2s", metricLabel: "representative performance target",
    preview: "Product experience system"
  },
  {
    id: "intelligence", label: "Intelligence", icon: BrainCircuit,
    outcome: "Automate high-friction work without removing human control.",
    includes: ["AI workflow automation", "Retrieval systems", "Human-in-the-loop agents", "Evaluation"],
    timeline: "6–12 weeks", team: "AI engineer · Integration lead · Product engineer",
    signals: ["Every automated action is traceable", "Human approval retained for material decisions"],
    produces: ["Workflow map", "Agent orchestration", "Evaluation framework", "Escalation logic"],
    metric: "100%", metricLabel: "traceable material actions",
    preview: "AI operations control"
  },
  {
    id: "platform", label: "Platform", icon: ServerCog,
    outcome: "Build a technical foundation that stays reliable as usage, integrations and complexity grow.",
    includes: ["Cloud architecture", "API integrations", "Performance engineering", "Scaling"],
    timeline: "8–16 weeks or ongoing", team: "Tech lead · Platform engineer · QA",
    signals: ["99.95% availability target where required", "Observable releases and defined recovery paths"],
    produces: ["Integration architecture", "Reliability baseline", "Deployment pipeline", "Scaling roadmap"],
    metric: "99.95%", metricLabel: "availability target where required",
    preview: "Platform health command"
  }
];

const work = [
  {
    type: "Verified client engagement", tone: "verified", title: "Operations platform for a European service business",
    industry: "B2B Operations", problem: "Customer onboarding depended on email, spreadsheets and repeated validation across four teams.",
    approach: "One operational product, connected CRM data and explicit approval states replaced fragmented handoffs.",
    outcomes: ["38% less manual coordination", "One operational source of truth", "Faster pipeline visibility"],
    disclosure: "Results supplied by the client and reviewed after release."
  },
  {
    type: "Anonymised client engagement", tone: "anonymised", title: "AI-assisted document operations",
    industry: "Professional Services", problem: "Specialists manually classified, checked and routed high-volume business documents.",
    approach: "A human-controlled AI workflow handled extraction, validation, escalation and audit logging.",
    outcomes: ["Material reduction in repetitive processing", "Audit trail for every AI action", "Human approval for exceptions"],
    disclosure: "Client identity and exact operational metrics are confidential."
  },
  {
    type: "Representative product study", tone: "study", title: "Northstar AI",
    industry: "AI Operations", problem: "Operational teams need automation without losing control over context, decisions or exceptions.",
    approach: "A command centre combines workflow orchestration, approval queues, analytics and observability.",
    outcomes: ["12 representative workflow patterns", "Human review in material actions", "One operational workspace"],
    disclosure: "Internal product study. Interface and metrics illustrate capability, not client results."
  },
  {
    type: "Representative commerce study", tone: "study", title: "Aurora Commerce",
    industry: "Commerce", problem: "Multi-market teams struggle with slow storefronts and fragmented editorial workflows.",
    approach: "A modular commerce system supports localised campaigns, fast discovery and scalable content operations.",
    outcomes: ["Performance-first architecture", "Reusable international campaigns", "Unified editorial workflow"],
    disclosure: "Representative study, not presented as verified commercial performance."
  }
];

const principles = [
  { n: "01", title: "Craft with purpose", copy: "Every design and engineering decision must support an agreed user or business outcome.", ritual: "Outcome review", artifact: "Outcome brief" },
  { n: "02", title: "Work in the open", copy: "Decisions, risks and trade-offs stay visible to everyone responsible for the product.", ritual: "Weekly decision review", artifact: "Decision log" },
  { n: "03", title: "Protect deep work", copy: "Collaboration happens in focused windows. The rest of the day is protected for delivery.", ritual: "Two structured collaboration windows", artifact: "Async delivery update" }
];

const timeline = [
  ["Discovery", "1–2 weeks", "Clarify the problem, users, constraints and evidence.", "Opportunity brief"],
  ["Shape", "1–2 weeks", "Define the smallest credible release and success measures.", "Validated scope"],
  ["Build", "4–12 weeks", "Ship working increments behind visible quality checks.", "Production releases"],
  ["Validate", "Continuous", "Test usability, reliability and business assumptions.", "Evidence and decisions"],
  ["Release", "Planned or ongoing", "Deploy, observe, document and establish ownership.", "Stewardship plan"]
];

function ProductMock() {
  const [tab, setTab] = useState("Build");
  const data: Record<string, { objective: string; items: string[]; metric: string }> = {
    Scope: { objective: "Reduce manual onboarding from four days to under 30 minutes.", items: ["Outcome model approved", "14 requirements validated", "2 risks awaiting decision"], metric: "92%" },
    Build: { objective: "Ship the operational core before expanding secondary workflows.", items: ["Identity verification · In review", "CRM synchronization · Ready", "Admin workflow · Building"], metric: "87%" },
    Validate: { objective: "Prove usability and reliability before release approval.", items: ["6 user sessions completed", "0 critical accessibility issues", "P95 API latency: 164ms"], metric: "94%" },
    Release: { objective: "Deploy with observable ownership and a reversible release path.", items: ["Release candidate deployed", "Rollback path verified", "Handover documentation ready"], metric: "96%" }
  };
  const current = data[tab];
  return <div className="nordic-os">
    <div className="nordic-os__top"><div><span className="nordic-live"/><strong>Softbridge Delivery OS</strong><small>Live engagement view</small></div><span>Release 07 · On track</span></div>
    <div className="nordic-os__tabs" role="tablist">{Object.keys(data).map(item => <button key={item} role="tab" aria-selected={tab===item} onClick={()=>setTab(item)} className={tab===item?"is-active":""}>{item}</button>)}</div>
    <AnimatePresence mode="wait"><motion.div key={tab} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-6}} transition={{duration:.22}} className="nordic-os__body">
      <div className="nordic-os__objective"><small>Current objective</small><h3>{current.objective}</h3><div><strong>{current.metric}</strong><span>release confidence</span></div></div>
      <div className="nordic-os__work"><div className="nordic-os__work-head"><span>Active work</span><small>Updated 8 minutes ago</small></div>{current.items.map((item,i)=><div className="nordic-os__row" key={item}><span>0{i+1}</span><strong>{item.split(" · ")[0]}</strong><em>{item.split(" · ")[1] || "Complete"}</em></div>)}</div>
      <div className="nordic-os__activity"><span><Check size={14}/> Decision log synced</span><span><Check size={14}/> Quality gates visible</span><span><Check size={14}/> Client review enabled</span></div>
    </motion.div></AnimatePresence>
  </div>
}

export function NordicStudioPage() {
  const [activeCapability, setActiveCapability] = useState("product");
  const [formState, setFormState] = useState<"idle"|"sending"|"sent"|"error">("idle");

  const handleProjectBrief = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.currentTarget;
    setFormState("sending");

    const form = new FormData(target);
    const payload = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      company: String(form.get("company") || ""),
      service: String(form.get("service") || ""),
      budget: String(form.get("budget") || ""),
      timing: String(form.get("timing") || ""),
      message: String(form.get("message") || ""),
      confidential: form.get("confidential") === "on",
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Request failed");
      setFormState("sent");
      target.reset();
    } catch {
      setFormState("error");
    }
  };
  const [workFilter, setWorkFilter] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const capability = capabilities.find(c=>c.id===activeCapability) ?? capabilities[0];
  const CapabilityIcon = capability.icon;
  const visibleWork = useMemo(()=>workFilter==="All"?work:work.filter(w=>w.type.includes(workFilter)),[workFilter]);

  return <main className="nordic-site">
    <header className="nordic-header">
      <Link href="#top" className="nordic-brand"><span>S</span><div><strong>Softbridge</strong><small>Product Engineering Studio</small></div></Link>
      <nav>{[["Expertise","#expertise"],["Work","#work"],["Approach","#approach"],["Studio","#trust"],["Talent","#talent"]].map(([label,href])=><a key={href} href={href}>{label}</a>)}</nav>
      <a className="nordic-button nordic-button--dark" href="#contact">Start a project <ArrowUpRight size={16}/></a>
      <button className="nordic-menu" aria-label="Toggle menu" onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X/>:<Menu/>}</button>
      {menuOpen&&<div className="nordic-mobile-nav">{[["Expertise","#expertise"],["Work","#work"],["Approach","#approach"],["Studio","#trust"],["Talent","#talent"],["Start a project","#contact"]].map(([label,href])=><a key={href} href={href} onClick={()=>setMenuOpen(false)}>{label}<ArrowUpRight/></a>)}</div>}
    </header>

    <section id="top" className="nordic-hero">
      <div className="nordic-hero__copy">
        <p className="nordic-eyebrow"><span/> Independent product engineering studio · Helsinki + Türkiye</p>
        <h1>Senior teams for software that <em>has to work.</em></h1>
        <p className="nordic-lead">We design and build business-critical software, AI systems and digital products for ambitious teams across Finland and Europe.</p>
        <p className="nordic-sublead">Client strategy stays close in Helsinki. Senior product and engineering delivery happens as one integrated team.</p>
        <div className="nordic-actions"><a className="nordic-button nordic-button--dark" href="#contact">Start a project <ArrowUpRight size={17}/></a><a className="nordic-button nordic-button--light" href="#work">See selected work <ArrowRight size={17}/></a></div>
        <small className="nordic-response">Tell us what needs to change. We reply within two business days.</small>
      </div>
      <div className="nordic-hero__mock"><ProductMock/></div>
      <div className="nordic-trustbar">{[["6+","years building products"],["Senior","led by default"],["4+ hours","daily overlap"],["2","selected project slots"]].map(([a,b])=><div key={b}><strong>{a}</strong><span>{b}</span></div>)}</div>
    </section>

    <section className="nordic-section nordic-delivery" id="delivery">
      <div className="nordic-section-head"><p className="nordic-eyebrow">Delivery model / 02</p><h2>Finland meets Türkiye. <em>One team, not two vendors.</em></h2><p>Client strategy and commercial context stay close to Helsinki. Product design and engineering operate from the same backlog, roadmap and definition of done.</p></div>
      <div className="nordic-hubs">
        <article><span className="nordic-hub-icon"><Globe2/></span><small>Helsinki hub</small><h3>Client strategy</h3><ul><li>Discovery and business context</li><li>Stakeholder alignment</li><li>Product direction</li><li>Nordic market proximity</li></ul><footer>Helsinki · EET/EEST</footer></article>
        <div className="nordic-bridge"><span/><div><Zap size={16}/><strong>Same working hours</strong><small>Shared delivery system</small></div></div>
        <article><span className="nordic-hub-icon"><Users2/></span><small>Türkiye hub</small><h3>Senior delivery</h3><ul><li>Product design</li><li>Full-stack engineering</li><li>AI and integrations</li><li>Quality and continuous delivery</li></ul><footer>Türkiye · EET/EEST</footer></article>
      </div>
      <div className="nordic-advantages">{[["4+ hours","Guaranteed live overlap","Decisions, reviews and unblockers happen in the same working day."],["100%","Senior-led","Direct access to the people shaping and building the product."],["1 backlog","One operating model","Product, design and engineering share priorities and release plans."],["Lean","Commercial structure","More budget reaches senior delivery instead of account layers."]].map(([m,t,c],i)=><article key={t}><span>0{i+1}</span><strong>{m}</strong><h3>{t}</h3><p>{c}</p></article>)}</div>
    </section>

    <section className="nordic-section nordic-expertise" id="expertise">
      <div className="nordic-section-head"><p className="nordic-eyebrow">Expertise / 03</p><h2>Four capabilities. <em>One accountable product team.</em></h2><p>Engagements are organised around the outcome the business needs—not disconnected deliverables.</p></div>
      <div className="nordic-cap-tabs" role="tablist">{capabilities.map(c=>{const Icon=c.icon;return <button key={c.id} role="tab" aria-selected={activeCapability===c.id} className={activeCapability===c.id?"is-active":""} onClick={()=>setActiveCapability(c.id)}><Icon size={18}/><span>{c.label}</span></button>})}</div>
      <div className="nordic-cap-layout">
        <AnimatePresence mode="wait"><motion.article key={capability.id} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} className="nordic-cap-detail">
          <div className="nordic-cap-detail__top"><span>{capability.label}</span><CapabilityIcon size={26}/></div>
          <h3>{capability.outcome}</h3>
          <div className="nordic-cap-commercial"><div><small>Typical engagement</small><strong>{capability.timeline}</strong></div><div><small>Core team</small><strong>{capability.team}</strong></div></div>
          <div className="nordic-cap-columns"><div><small>Includes</small>{capability.includes.map(x=><span key={x}><Check size={14}/>{x}</span>)}</div><div><small>Signals</small>{capability.signals.map(x=><span key={x}><Check size={14}/>{x}</span>)}</div></div>
          <a href="#contact">Discuss {capability.label.toLowerCase()} engineering <ArrowUpRight size={17}/></a>
        </motion.article></AnimatePresence>
        <div className="nordic-cap-preview"><div className="nordic-preview-top"><span><i/> {capability.preview}</span><small>Production-style preview</small></div><div className={`nordic-preview nordic-preview--${capability.id}`}><div className="nordic-preview-sidebar"><span/><span/><span/><span/></div><div className="nordic-preview-main"><div className="nordic-preview-metrics"><article><small>Delivery health</small><strong>{capability.metric}</strong><span>{capability.metricLabel}</span></article><article><small>Active workstreams</small><strong>04</strong><span>all owners assigned</span></article></div><div className="nordic-preview-chart">{[42,66,53,82,74,91,68,96].map((h,i)=><i key={i} style={{height:`${h}%`}}/>)}</div><div className="nordic-preview-list">{capability.produces.map((p,i)=><div key={p}><span>0{i+1}</span><strong>{p}</strong><em>{i<2?"Ready":"In progress"}</em></div>)}</div></div></div></div>
      </div>
      <p className="nordic-disclaimer">Timelines and signals are representative planning ranges. Final scope, team and success measures are agreed during discovery.</p>
    </section>

    <section className="nordic-section nordic-work" id="work">
      <div className="nordic-section-head"><p className="nordic-eyebrow">Selected work / 04</p><h2>Proof where we can show it. <em>Clear labels where we cannot.</em></h2><p>Every study is labelled so verified delivery, anonymised work and representative product thinking are easy to distinguish.</p></div>
      <div className="nordic-filters">{["All","Verified client","Anonymised client","Representative"].map(f=><button key={f} className={workFilter===f?"is-active":""} onClick={()=>setWorkFilter(f)}>{f}</button>)}</div>
      <div className="nordic-work-grid">{visibleWork.map((item,i)=><article className={`nordic-case nordic-case--${item.tone}`} key={item.title}><div className="nordic-case__visual"><span>0{i+1}</span><div className="nordic-case-ui"><div/><div/><div/><div/></div></div><div className="nordic-case__body"><span className="nordic-label">{item.type}</span><small>{item.industry}</small><h3>{item.title}</h3><div><strong>Problem</strong><p>{item.problem}</p></div><div><strong>Approach</strong><p>{item.approach}</p></div><ul>{item.outcomes.map(x=><li key={x}><Check size={14}/>{x}</li>)}</ul><p className="nordic-case__disclosure"><ShieldCheck size={15}/>{item.disclosure}</p><a href="#contact">Discuss a similar problem <ArrowUpRight size={16}/></a></div></article>)}</div>
    </section>

    <section className="nordic-section nordic-approach" id="approach">
      <div className="nordic-section-head"><p className="nordic-eyebrow">How we work / 05</p><h2>The process is visible. <em>Responsibility stays close.</em></h2></div>
      <div className="nordic-principles">{principles.map(p=><article key={p.n}><span>{p.n}</span><h3>{p.title}</h3><p>{p.copy}</p><div><small>Ritual</small><strong>{p.ritual}</strong></div><div><small>Artifact</small><strong>{p.artifact}</strong></div></article>)}</div>
      <div className="nordic-timeline"><div className="nordic-timeline__head"><p className="nordic-eyebrow">What an engagement actually looks like</p><h3>From ambiguity to an operational product.</h3></div>{timeline.map((t,i)=><article key={t[0]}><span>0{i+1}</span><div><h4>{t[0]}</h4><small>{t[1]}</small></div><p>{t[2]}</p><strong>{t[3]}</strong></article>)}</div>
    </section>

    <section className="nordic-section nordic-trust" id="trust">
      <div className="nordic-section-head"><p className="nordic-eyebrow">Trust and transparency / 06</p><h2>No inflated team. No invented proof. <em>No hidden delivery layer.</em></h2></div>
      <div className="nordic-trust-cards">{[[ShieldCheck,"Claims are labelled","Verified results, targets and representative studies are clearly distinguished."],[Users2,"Senior-led by default","Clients work directly with the people responsible for delivery."],[FileText,"Confidentiality built in","Sensitive discussions are NDA-ready and access stays limited."],[BriefcaseBusiness,"Clear commercial scope","Scope, assumptions, exclusions and change rules are documented."]].map(([Icon,t,c])=>{const I=Icon as typeof ShieldCheck;return <article key={String(t)}><I/><h3>{String(t)}</h3><p>{String(c)}</p></article>})}</div>
      <div className="nordic-proof"><div><p className="nordic-eyebrow">Representative client contexts</p><h3>Trusted with complex product and operational problems.</h3><div className="nordic-contexts"><span>European service company</span><span>Nordic consumer product team</span><span>Education technology provider</span><span>B2B operations company</span></div></div><blockquote>“Softbridge brought structure to a complex product problem and stayed close to the outcome throughout delivery.”<footer>Representative quote format · publish only with client approval</footer></blockquote></div>
      <div className="nordic-legal"><div><small>Company information</small><h3>Commercial identity is disclosed before commitment.</h3><p>Registration, invoicing entity, jurisdiction and data-processing terms are included in each proposal and services agreement.</p></div><a href="/privacy">View legal details <ArrowUpRight size={16}/></a></div>
    </section>

    <section className="nordic-section nordic-talent" id="talent">
      <div className="nordic-section-head"><p className="nordic-eyebrow">Talent network / 07</p><h2>Small teams need <em>unusually dependable people.</em></h2><p>Open roles are listed separately from specialist profiles. Joining the network does not imply an active vacancy.</p></div>
      <div className="nordic-no-roles"><div><span><BriefcaseBusiness/></span><small>Open roles</small><h3>No permanent roles are open today.</h3><p>We only publish positions tied to a confirmed team need.</p></div><a href="mailto:hello@softbridge.fi?subject=Talent%20network">Join the talent network <ArrowUpRight size={17}/></a></div>
      <div className="nordic-network">{[[Code2,"Product engineering","React · Next.js · Node.js · PostgreSQL · Cloud"],[BrainCircuit,"AI systems","Python · TypeScript · RAG · Evaluation · Integrations"],[Layers3,"Product design","Product strategy · UX · Prototyping · Design systems"]].map(([Icon,title,stack])=>{const I=Icon as typeof Code2;return <article key={String(title)}><I/><small>Contract / engagement-based</small><h3>{String(title)}</h3><p>{String(stack)}</p><a href="mailto:hello@softbridge.fi?subject=Talent%20network">Submit profile <ArrowUpRight size={15}/></a></article>})}</div>
      <div className="nordic-process"><p className="nordic-eyebrow">Application process</p>{["Profile review","30-minute craft conversation","Relevant engagement discussion","Commercial and availability alignment"].map((x,i)=><span key={x}><b>0{i+1}</b>{x}</span>)}<small>No speculative unpaid assignments. Any practical evaluation is focused, time-boxed and agreed in advance.</small></div>
    </section>

    <section className="nordic-contact" id="contact">
      <div className="nordic-contact__intro"><p className="nordic-eyebrow">Start a project / 08</p><h2>Bring us the part that cannot afford to stay unclear.</h2><p>Share the problem, intended outcome and what is blocking progress. A senior team member replies within two business days.</p><div className="nordic-contact__meta"><span><Clock3/> Helsinki local time · EET/EEST</span><span><ShieldCheck/> NDA-ready conversations</span><span><Mail/> hello@softbridge.fi</span></div></div>
      <form className="nordic-form" onSubmit={handleProjectBrief}><label><span>Your name</span><input name="name" required placeholder="Aino Virtanen"/></label><label><span>Work email</span><input type="email" name="email" required placeholder="aino@company.com"/></label><label><span>Company or team</span><input name="company" required placeholder="Company name"/></label><label><span>What do you need help with?</span><select name="service" required defaultValue=""><option value="" disabled>Select the closest option</option><option>Product engineering</option><option>Product experience</option><option>AI systems</option><option>Platform engineering</option><option>Not sure yet</option></select></label><label><span>Indicative investment</span><select name="budget" required defaultValue=""><option value="" disabled>Select range</option><option>€20k–€40k</option><option>€40k–€80k</option><option>€80k–€150k</option><option>€150k+</option><option>Need help defining scope</option></select><small>Not a binding quote.</small></label><label><span>Preferred start</span><select name="timing" defaultValue=""><option value="" disabled>Select timing</option><option>Within 4 weeks</option><option>1–2 months</option><option>This quarter</option><option>Later this year</option></select></label><label className="nordic-form__wide"><span>What needs to change?</span><textarea name="message" required minLength={20} maxLength={2000} rows={6} placeholder="Describe the problem, who experiences it, the intended outcome and important constraints."/><small>20–2,000 characters</small></label><label className="nordic-check"><input type="checkbox" name="confidential"/><span>This project includes confidential information.</span></label><button className="nordic-button nordic-button--lime" type="submit" disabled={formState==="sending"}>{formState==="sending"?"Sending brief…":"Send project brief"} <ArrowUpRight size={17}/></button>{formState==="sent"&&<p className="nordic-form-status">Brief received. A senior team member will reply within two business days.</p>}{formState==="error"&&<p className="nordic-form-status nordic-form-status--error">The brief could not be sent. Try again or email hello@softbridge.fi.</p>}</form>
    </section>

    <footer className="nordic-footer"><div><p>Softbridge</p><h2>Senior product engineering for ambitious European teams.</h2></div><nav><a href="#work">Work</a><a href="#expertise">Expertise</a><a href="#approach">Approach</a><a href="#talent">Careers</a><a href="/privacy">Privacy</a></nav><div><span><i/> Selected project conversations open</span><a href="mailto:hello@softbridge.fi">hello@softbridge.fi</a></div><small>© 2026 Softbridge. Legal entity details are disclosed in commercial documentation.</small></footer>
  </main>
}
