"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight, Bot, Boxes, CloudCog, Code2, Layers3, Palette,
  Smartphone, Wrench, CheckCircle2, Activity, Gauge, Database,
  ShieldCheck, Workflow, Sparkles, BarChart3, Clock3, Users2, Target, Check, ArrowRight
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Service = {
  title: string;
  short: string;
  family: "Product" | "Experience" | "Intelligence" | "Platform";
  copy: string;
  tags: string[];
  deliverables: string[];
  color: string;
  icon: typeof Code2;
  metric: string;
  metricLabel: string;
  outcome: string;
  timeline: string;
  team: string;
  previewTitle: string;
  previewSubtitle: string;
  preview: "software" | "web" | "mobile" | "ai" | "saas" | "design" | "cloud" | "scale";
};

const services: Service[] = [
  { title:"Custom Software Development", short:"Software", family:"Product", copy:"Reliable business-critical systems shaped around your workflows, users and growth model.", tags:["Next.js","TypeScript","APIs"], deliverables:["Domain architecture","Operational workflows","Release pipeline"], color:"#5577ff", icon:Code2, metric:"38%", metricLabel:"less manual work", outcome:"A unified operational platform replacing fragmented tools.", timeline:"10–18 weeks", team:"Tech lead + 2–4 engineers", previewTitle:"Operations platform", previewSubtitle:"Business workflow orchestration", preview:"software" },
  { title:"Web Applications", short:"Web apps", family:"Experience", copy:"Fast, accessible and scalable applications with product-grade interaction and engineering quality.", tags:["App Router","Design systems","Performance"], deliverables:["Responsive product UI","Design system","Performance budget"], color:"#9d66ff", icon:Layers3, metric:"1.2s", metricLabel:"interactive load", outcome:"A responsive product surface built for daily use and measurable conversion.", timeline:"8–14 weeks", team:"Product designer + frontend team", previewTitle:"Revenue dashboard", previewSubtitle:"Responsive web application", preview:"web" },
  { title:"Mobile Applications", short:"Mobile", family:"Experience", copy:"Native-feeling mobile products designed for focused journeys, retention and maintainable delivery.", tags:["iOS","Android","Cross-platform"], deliverables:["Journey architecture","Mobile UI system","Store-ready builds"], color:"#ff765e", icon:Smartphone, metric:"4.8★", metricLabel:"target experience", outcome:"A focused mobile journey with faster onboarding and stronger retention.", timeline:"10–16 weeks", team:"Mobile lead + product designer", previewTitle:"Mobile journey", previewSubtitle:"Onboarding and retention flow", preview:"mobile" },
  { title:"AI Automation and Agents", short:"AI systems", family:"Intelligence", copy:"Practical AI agents and automations that remove operational friction and make teams measurably faster.", tags:["LLMs","Agents","Workflows"], deliverables:["Agent orchestration","Human approval logic","Observability layer"], color:"#c6ee58", icon:Bot, metric:"248", metricLabel:"actions automated", outcome:"Connected agents that classify, draft, sync and escalate with human control.", timeline:"6–12 weeks", team:"AI engineer + integration lead", previewTitle:"Agent workflow", previewSubtitle:"Human-controlled automation", preview:"ai" },
  { title:"SaaS Product Development", short:"SaaS", family:"Product", copy:"From product strategy to architecture, billing-ready platforms and continuous product evolution.", tags:["MVP","Multi-tenant","Scale"], deliverables:["Product foundation","Multi-tenant model","Billing and analytics"], color:"#d8c0ff", icon:Boxes, metric:"12 wk", metricLabel:"to validated MVP", outcome:"A multi-tenant foundation ready for billing, analytics and continuous releases.", timeline:"10–20 weeks", team:"Product lead + full-stack squad", previewTitle:"SaaS workspace", previewSubtitle:"Usage, billing and activation", preview:"saas" },
  { title:"UI/UX and Product Design", short:"Design", family:"Experience", copy:"Research-led interfaces and design systems that make complex software feel clear and distinctive.", tags:["UX strategy","Prototyping","Systems"], deliverables:["Product flows","Interactive prototype","Design system"], color:"#ff9d86", icon:Palette, metric:"42%", metricLabel:"faster task flow", outcome:"A coherent design system that reduces ambiguity across product and engineering.", timeline:"4–10 weeks", team:"Product designer + strategist", previewTitle:"Design system", previewSubtitle:"Components, tokens and flows", preview:"design" },
  { title:"Cloud and API Integrations", short:"Cloud", family:"Platform", copy:"Secure integrations, cloud architecture and data flows that connect the systems your business depends on.", tags:["Cloud","REST","Webhooks"], deliverables:["Integration architecture","Retry and audit flows","Operational dashboards"], color:"#8ddbea", icon:CloudCog, metric:"99.95%", metricLabel:"availability target", outcome:"Reliable data exchange with clear observability, retries and ownership.", timeline:"6–14 weeks", team:"Cloud engineer + backend lead", previewTitle:"Integration map", previewSubtitle:"APIs, webhooks and data sync", preview:"cloud" },
  { title:"Maintenance and Scaling", short:"Scale", family:"Platform", copy:"Ongoing product engineering, performance work and technical stewardship after launch.", tags:["Observability","Refactoring","Growth"], deliverables:["Performance baseline","Reliability roadmap","Release governance"], color:"#e2ef91", icon:Wrench, metric:"-31%", metricLabel:"incident recovery", outcome:"A healthier product with measurable performance, stability and release confidence.", timeline:"Monthly partnership", team:"Senior engineering pod", previewTitle:"Platform health", previewSubtitle:"Performance and reliability", preview:"scale" },
];

function ServicePreviewVisual({ type, color }: { type: Service["preview"]; color: string }) {
  if (type === "software") return <div className="capability-ui capability-ui--software">
    <div className="capability-window__bar"><span/><span/><span/><b>operations.ts</b></div>
    <div className="capability-code"><span>01</span><code>const workflow = createSystem&#40;&#123;</code><span>02</span><code className="is-accent">  source: &quot;CRM&quot;,</code><span>03</span><code>  automate: true,</code><span>04</span><code>  audit: &quot;complete&quot;</code><span>05</span><code>&#125;&#41;;</code></div>
    <div className="capability-status"><CheckCircle2 size={15}/><span>Deployment healthy</span><strong>v2.4.1</strong></div>
  </div>;

  if (type === "web") return <div className="capability-ui capability-ui--web">
    <div className="web-shell"><aside><span className="is-active"/><span/><span/><span/></aside><main><header><b>Revenue overview</b><span>Live</span></header><div className="web-metrics"><div><small>MRR</small><strong>€84.2k</strong><em>+18%</em></div><div><small>Conversion</small><strong>7.4%</strong><em>+1.2</em></div></div><div className="web-chart"><i/><i/><i/><i/><i/><i/><i/></div><div className="web-table"><span>Enterprise plan</span><b>42 seats</b><em>Active</em></div></main></div>
  </div>;

  if (type === "mobile") return <div className="capability-ui capability-ui--mobile"><div className="phone phone--back"><div className="phone-notch"/><div className="mobile-card"><small>Weekly progress</small><strong>82%</strong><div className="progress"><i/></div></div><div className="mobile-list"><span/><span/><span/></div></div><div className="phone phone--front"><div className="phone-notch"/><small>Good morning</small><h4>Your next best action</h4><button type="button">Continue journey</button><div className="mobile-nav"><i/><i className="is-active"/><i/></div></div></div>;

  if (type === "ai") return <div className="capability-ui capability-ui--ai"><div className="ai-hub"><Sparkles size={20}/><strong>Orchestrator</strong><small>12 active runs</small></div>{["Inbox","Triage","CRM","Proposal","Approval"].map((label, index)=><div key={label} className={`ai-node ai-node--${index+1}`}><span>{label}</span><i/></div>)}<svg viewBox="0 0 420 270" preserveAspectRatio="none" aria-hidden="true"><path d="M210 135 C150 80 112 68 60 62 M210 135 C272 78 315 75 363 62 M210 135 C155 165 120 198 77 214 M210 135 C267 164 306 196 352 212"/></svg></div>;

  if (type === "saas") return <div className="capability-ui capability-ui--saas"><div className="saas-top"><div><small>Workspace health</small><strong>92%</strong></div><span>Pro plan</span></div><div className="saas-grid"><div><Activity size={16}/><small>Active users</small><strong>2,841</strong></div><div><BarChart3 size={16}/><small>Expansion</small><strong>+24%</strong></div><div className="saas-wide"><small>Activation funnel</small><div><i style={{width:"92%"}}/><i style={{width:"76%"}}/><i style={{width:"61%"}}/></div></div></div></div>;

  if (type === "design") return <div className="capability-ui capability-ui--design"><div className="design-canvas"><div className="design-sidebar"><span/><span/><span/><span/></div><div className="design-frame"><header><i/><b>Checkout flow</b></header><div className="wire wire--1"/><div className="wire wire--2"/><div className="wire wire--3"/><button type="button">Primary action</button></div><div className="design-tokens"><span style={{background:color}}/><span/><span/><b>24 components</b></div></div></div>;

  if (type === "cloud") return <div className="capability-ui capability-ui--cloud"><div className="cloud-node cloud-node--main"><Database size={18}/><strong>Core API</strong><small>12ms</small></div>{["ERP","CRM","Billing","Analytics"].map((label,index)=><div key={label} className={`cloud-node cloud-node--${index+1}`}><span>{label}</span><i/></div>)}<svg viewBox="0 0 420 270" preserveAspectRatio="none" aria-hidden="true"><path d="M210 135 L68 62 M210 135 L354 62 M210 135 L70 214 M210 135 L350 214"/></svg><div className="cloud-log"><ShieldCheck size={14}/><span>All integrations operational</span></div></div>;

  return <div className="capability-ui capability-ui--scale"><div className="scale-head"><div><small>Platform status</small><strong>All systems healthy</strong></div><span>Live</span></div><div className="scale-chart"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div><div className="scale-metrics"><div><Gauge size={15}/><span>p95 latency</span><strong>186ms</strong></div><div><Activity size={15}/><span>Error rate</span><strong>0.04%</strong></div><div><Workflow size={15}/><span>Deployments</span><strong>18/wk</strong></div></div></div>;
}

export function ServicesExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [openMobile, setOpenMobile] = useState<number | null>(0);

  useEffect(() => {
    const handleSelection = (event: Event) => {
      const index = (event as CustomEvent<{ index?: number }>).detail?.index;
      if (typeof index !== "number" || index < 0 || index >= services.length) return;
      setActive(index);
      setOpenMobile(index);
    };
    window.addEventListener("softbridge:select-service", handleSelection);
    return () => window.removeEventListener("softbridge:select-service", handleSelection);
  }, []);

  useGSAP(() => {
    const items = gsap.utils.toArray<HTMLElement>("[data-service-item]");
    items.forEach((item, index) => ScrollTrigger.create({
      trigger: item,
      start: "top 60%",
      end: "bottom 40%",
      onEnter: () => setActive(index),
      onEnterBack: () => setActive(index),
    }));
    return () => ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.trigger && sectionRef.current?.contains(trigger.trigger as Node)) trigger.kill();
    });
  }, { scope: sectionRef });

  const current = services[active];
  const CurrentIcon = current.icon;

  return <section id="services" ref={sectionRef} className="services-experience capabilities-pro">
    <header className="services-experience__header capabilities-pro__header">
      <div>
        <p className="section-eyebrow">Capabilities / 03</p>
        <h2>Expertise organised around outcomes, not deliverables.</h2>
      </div>
      <div className="capabilities-pro__intro">
        <p>Senior product, design and engineering specialists assembled around the exact problem you need to solve.</p>
        <div className="capabilities-pro__pill-row">
          <span><Target size={14}/> Outcome-led</span>
          <span><Users2 size={14}/> Senior-only teams</span>
          <span><Clock3 size={14}/> Clear delivery windows</span>
        </div>
      </div>
    </header>

    <div className="capabilities-pro__spectrum" aria-label="Capability spectrum">
      {(["Product", "Experience", "Intelligence", "Platform"] as const).map((family) => {
        const count = services.filter((service) => service.family === family).length;
        const isActive = current.family === family;
        return <button key={family} type="button" className={isActive ? "is-active" : ""} onClick={() => {
          const index = services.findIndex((service) => service.family === family);
          if (index >= 0) setActive(index);
        }}>
          <span>{family}</span><strong>{String(count).padStart(2, "0")}</strong>
        </button>;
      })}
    </div>

    <div className="services-experience__desktop capabilities-pro__desktop">
      <aside className="service-preview service-preview--professional capability-detail" style={{"--service-color": current.color} as React.CSSProperties}>
        <div className="capability-detail__meta">
          <span>{String(active + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}</span>
          <span className="capability-detail__family">{current.family}</span>
          <CurrentIcon size={24}/>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={current.title} className="service-preview__content capability-detail__content" initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-12}} transition={{duration:.32,ease:[.22,1,.36,1]}}>
            <p className="section-eyebrow">{current.short}</p>
            <h3>{current.title}</h3>
            <p>{current.copy}</p>
            <div className="service-preview__tags">{current.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </motion.div>
        </AnimatePresence>

        <div className="capability-detail__commercial">
          <div><small>Typical engagement</small><strong>{current.timeline}</strong></div>
          <div><small>Core team</small><strong>{current.team}</strong></div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={`${current.preview}-visual`} className="service-preview__visual capability-detail__visual" initial={{opacity:0,scale:.975,y:12}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:.985,y:-8}} transition={{duration:.42,ease:[.22,1,.36,1]}}>
            <div className="service-preview__visual-head"><div><strong>{current.previewTitle}</strong><span>{current.previewSubtitle}</span></div><i>Live preview</i></div>
            <ServicePreviewVisual type={current.preview} color={current.color}/>
          </motion.div>
        </AnimatePresence>

        <div className="capability-detail__deliverables">
          <small>What the engagement produces</small>
          <ul>{current.deliverables.map((item) => <li key={item}><Check size={14}/><span>{item}</span></li>)}</ul>
        </div>

        <div className="service-preview__result capability-detail__result">
          <div><small>Typical business outcome</small><p>{current.outcome}</p></div>
          <div><strong>{current.metric}</strong><span>{current.metricLabel}</span></div>
        </div>
        <a href="/contact" className="service-preview__cta">Discuss this capability <ArrowUpRight size={17}/></a>
      </aside>

      <div className="service-list capability-catalog">
        <div className="capability-catalog__head"><span>Capability</span><span>Engagement</span><span>Signal</span></div>
        {services.map((service,index) => <button type="button" key={service.title} data-service-item className={active===index ? "is-active" : ""} onMouseEnter={() => setActive(index)} onClick={() => setActive(index)} aria-pressed={active===index}>
          <span className="capability-catalog__index">{String(index+1).padStart(2,"0")}</span>
          <div className="capability-catalog__main">
            <small>{service.family}</small>
            <h3>{service.title}</h3>
            <div className="capability-catalog__deliverables">{service.deliverables.slice(0,2).map((item) => <span key={item}>{item}</span>)}</div>
          </div>
          <div className="capability-catalog__engagement"><span>{service.timeline}</span><small>{service.team}</small></div>
          <strong>{service.metric}</strong>
          <ArrowRight size={19}/>
        </button>)}
      </div>
    </div>

    <div className="services-experience__mobile capabilities-mobile">{services.map((service,index) => {
      const Icon = service.icon;
      const isOpen = openMobile === index;
      return <article key={service.title} style={{"--service-color":service.color} as React.CSSProperties}>
        <button type="button" onClick={() => setOpenMobile(isOpen ? null : index)} aria-expanded={isOpen}>
          <span>{String(index+1).padStart(2,"0")}</span>
          <div><small>{service.family}</small><h3>{service.title}</h3></div>
          <Icon size={20}/>
        </button>
        <AnimatePresence initial={false}>{isOpen && <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} className="service-mobile-copy">
          <p>{service.copy}</p>
          <div className="capabilities-mobile__meta"><span><Clock3 size={13}/>{service.timeline}</span><span><Users2 size={13}/>{service.team}</span></div>
          <ServicePreviewVisual type={service.preview} color={service.color}/>
          <ul className="capabilities-mobile__deliverables">{service.deliverables.map((item) => <li key={item}><Check size={13}/>{item}</li>)}</ul>
          <div className="service-mobile-outcome"><strong>{service.metric}</strong><span>{service.metricLabel}</span></div>
          <div>{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        </motion.div>}</AnimatePresence>
      </article>;
    })}</div>
  </section>;
}

