"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  CalendarDays,
  Bot,
  Braces,
  Check,
  CloudCog,
  Code2,
  Database,
  Gauge,
  LayoutDashboard,
  Mail,
  Play,
  Rocket,
  Send,
  ShieldCheck,
  Smartphone,
  UserRound,
  Workflow,
  Sparkles,
  WandSparkles,
} from "lucide-react";

const modes = [
  {
    id: "build",
    label: "Build",
    serviceIndex: 0,
    color: "#5577ff",
    tint: "#edf1ff",
    title: "Product engineering",
    description: "A production-ready workspace for shaping, building and validating a new digital product.",
    status: "Sprint 06 / Shipping",
    score: "94",
    metric: "Build health",
    icon: Code2,
    steps: ["Product scope", "System architecture", "Interface build", "Release checks"],
    preview: "editor",
  },
  {
    id: "automate",
    label: "Automate",
    serviceIndex: 3,
    color: "#9b63ff",
    tint: "#f3ecff",
    title: "AI operations studio",
    description: "Design agents, connect business tools and monitor real automations from one clear system.",
    status: "8 agents / 24 workflows",
    score: "68h",
    metric: "Saved weekly",
    icon: Bot,
    steps: ["Map workflow", "Connect context", "Deploy agents", "Review outcomes"],
    preview: "agents",
  },
  {
    id: "launch",
    label: "Launch",
    serviceIndex: 4,
    color: "#ff725d",
    tint: "#fff0eb",
    title: "SaaS launch control",
    description: "Coordinate product readiness, onboarding, billing and growth signals before launch day.",
    status: "Launch window / 12 days",
    score: "87%",
    metric: "Readiness",
    icon: Rocket,
    steps: ["Validate demand", "Prepare onboarding", "Enable billing", "Launch & learn"],
    preview: "launch",
  },
  {
    id: "scale",
    label: "Scale",
    serviceIndex: 7,
    color: "#77a935",
    tint: "#f0f7df",
    title: "Reliability command",
    description: "Track performance, infrastructure and release quality as the product and user base grow.",
    status: "All systems healthy",
    score: "99.98%",
    metric: "Uptime",
    icon: Gauge,
    steps: ["Observe systems", "Find bottlenecks", "Improve capacity", "Ship safely"],
    preview: "scale",
  },
] as const;

type Mode = (typeof modes)[number];

function openService(index: number) {
  window.dispatchEvent(new CustomEvent("softbridge:select-service", { detail: { index } }));
  document.querySelector("#services")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function BuildPreview({ mode }: { mode: Mode }) {
  return (
    <div className="cockpit-product" style={{ "--cockpit-accent": mode.color } as React.CSSProperties}>
      <div className="cockpit-product__rail">
        <div className="cockpit-product__brand"><Sparkles size={15} /></div>
        {[LayoutDashboard, Braces, Database, CloudCog].map((Icon, index) => (
          <span key={index} className={index === 1 ? "is-active" : ""}><Icon size={14} /></span>
        ))}
      </div>
      <div className="cockpit-product__main">
        <div className="cockpit-product__toolbar">
          <div><i /><i /><i /></div>
          <span>softbridge/product-core</span>
          <button type="button" aria-label="Run product preview"><Play size={12} fill="currentColor" /> Run</button>
        </div>
        <div className="cockpit-editor">
          <div className="cockpit-editor__lines">{[1,2,3,4,5,6,7,8].map(n => <span key={n}>{n}</span>)}</div>
          <pre><code><b>export</b> <em>async function</em> launchProduct() {'{'}{"\n"}  <strong>const</strong> strategy = <i>await</i> validate();{"\n"}  <strong>const</strong> system = build(strategy);{"\n"}  <strong>return</strong> ship(system, {'{'} quality: <u>true</u> {'}'});{"\n"}{'}'}</code></pre>
          <div className="cockpit-editor__panel">
            <span>Release confidence</span>
            <strong>94%</strong>
            <div><i style={{ width: "94%" }} /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AgentPreview({ mode }: { mode: Mode }) {
  const [selected, setSelected] = useState("hub");
  const modules = [
    { id: "inbox", title: "Inbox", subtitle: "5 new requests", meta: "3 high priority", icon: Mail, x: "4%", y: "13%" },
    { id: "triage", title: "Triage Agent", subtitle: "GPT-4o routing", meta: "92% confidence", icon: Bot, x: "37%", y: "5%" },
    { id: "crm", title: "CRM Sync", subtitle: "14 records updated", meta: "2m ago", icon: Database, x: "72%", y: "14%" },
    { id: "knowledge", title: "Knowledge Base", subtitle: "128 indexed docs", meta: "Fresh context", icon: BookOpen, x: "3%", y: "42%" },
    { id: "client", title: "Client Record", subtitle: "Acme Corporation", meta: "Proposal stage", icon: UserRound, x: "73%", y: "43%" },
    { id: "proposal", title: "Proposal Draft", subtitle: "AI generated v1", meta: "92% quality", icon: WandSparkles, x: "21%", y: "68%" },
    { id: "approval", title: "Approval", subtitle: "Human review", meta: "Approved", icon: ShieldCheck, x: "57%", y: "68%" },
    { id: "calendar", title: "Calendar", subtitle: "Discovery call", meta: "10:00 AM", icon: CalendarDays, x: "4%", y: "78%" },
    { id: "analytics", title: "Analytics", subtitle: "98% completion", meta: "+12% this week", icon: BarChart3, x: "77%", y: "77%" },
  ];
  const active = selected === "hub" ? { title: "Orchestration Hub", subtitle: "12 active workflows", meta: "248 actions completed" } : modules.find(module => module.id === selected)!;

  return (
    <div className="cockpit-agents" style={{ "--cockpit-accent": mode.color } as React.CSSProperties}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M17 22 C31 18 34 17 46 25" />
        <path d="M50 17 C50 22 50 23 50 28" />
        <path d="M80 23 C68 20 63 20 55 27" />
        <path d="M17 49 C30 49 36 47 44 43" />
        <path d="M80 50 C68 50 64 47 56 43" />
        <path d="M29 74 C37 67 42 61 46 55" />
        <path d="M65 74 C59 66 56 61 53 55" />
        <path d="M15 84 C30 82 34 75 39 67" />
        <path d="M84 84 C71 80 66 73 61 66" />
      </svg>

      <button type="button" className={`cockpit-orchestration-hub ${selected === "hub" ? "is-selected" : ""}`} onClick={() => setSelected("hub")}>
        <span className="cockpit-orchestration-hub__icon"><Workflow size={20} /></span>
        <strong>Orchestration Hub</strong>
        <small>AI workflow control</small>
        <div><span><b>12</b> active</span><span><b>248</b> completed</span><span><b>98%</b> success</span></div>
      </button>

      {modules.map(({ id, title, subtitle, meta, icon: Icon, x, y }, index) => (
        <motion.button
          key={id}
          type="button"
          className={`cockpit-agent-node cockpit-agent-node--rich ${selected === id ? "is-selected" : ""}`}
          style={{ left: x, top: y }}
          onClick={() => setSelected(id)}
          animate={{ y: [0, index % 2 ? 3 : -3, 0] }}
          transition={{ duration: 3.2 + index * .16, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="cockpit-agent-node__icon"><Icon size={14} /></span>
          <span className="cockpit-agent-node__copy"><strong>{title}</strong><small>{subtitle}</small></span>
          <i />
          <em>{meta}</em>
        </motion.button>
      ))}

      <div className="cockpit-agent-detail" aria-live="polite">
        <div><span>Selected node</span><strong>{active.title}</strong><small>{active.subtitle}</small></div>
        <em>{active.meta}</em>
      </div>

      <div className="cockpit-agent-log">
        <span><i /> Workflow completed<small>All steps executed successfully</small></span>
        <div><b>12</b><small>steps</small></div>
        <div><b>248</b><small>actions</small></div>
        <div><b>3</b><small>approvals</small></div>
        <strong>1.8s</strong>
      </div>
    </div>
  );
}

function LaunchPreview({ mode }: { mode: Mode }) {
  return (
    <div className="cockpit-launch" style={{ "--cockpit-accent": mode.color } as React.CSSProperties}>
      <div className="cockpit-launch__phone">
        <div className="cockpit-phone__bar"><span>9:41</span><i /></div>
        <div className="cockpit-phone__hero"><Sparkles size={18} /><strong>Your workspace is ready.</strong><p>Invite your team and launch the first workflow.</p></div>
        <div className="cockpit-phone__cards"><span /><span /><span /></div>
      </div>
      <div className="cockpit-launch__dashboard">
        <header><div><i /><i /><i /></div><span>Launch room</span></header>
        <div className="cockpit-launch__chart"><span>Activation</span><strong>72.4%</strong><svg viewBox="0 0 220 80"><path d="M0 65 C30 68 44 52 66 55 S105 32 130 40 S168 10 220 18" /></svg></div>
        <div className="cockpit-launch__checks">{["Onboarding", "Billing", "Analytics"].map((item, index) => <span key={item}><i className={index < 2 ? "done" : ""}>{index < 2 && <Check size={10} />}</i>{item}</span>)}</div>
      </div>
    </div>
  );
}

function ScalePreview({ mode }: { mode: Mode }) {
  return (
    <div className="cockpit-scale" style={{ "--cockpit-accent": mode.color } as React.CSSProperties}>
      <div className="cockpit-scale__map">
        {["eu-north", "eu-west", "us-east"].map((region, index) => <div key={region} style={{ left: `${15 + index * 31}%`, top: `${22 + (index % 2) * 28}%` }}><i /><span>{region}</span><strong>{index === 0 ? "18ms" : index === 1 ? "31ms" : "82ms"}</strong></div>)}
        <svg viewBox="0 0 100 62" preserveAspectRatio="none"><path d="M20 29 C35 5 49 49 51 54"/><path d="M51 54 C66 38 67 19 82 27"/></svg>
      </div>
      <div className="cockpit-scale__stats"><span><Activity size={13}/> Requests<strong>2.4M</strong></span><span><Gauge size={13}/> P95 latency<strong>84ms</strong></span><span><CloudCog size={13}/> Incidents<strong>0</strong></span></div>
    </div>
  );
}

function ProductPreview({ mode }: { mode: Mode }) {
  if (mode.preview === "agents") return <AgentPreview mode={mode} />;
  if (mode.preview === "launch") return <LaunchPreview mode={mode} />;
  if (mode.preview === "scale") return <ScalePreview mode={mode} />;
  return <BuildPreview mode={mode} />;
}

export function StudioCockpit() {
  const [activeId, setActiveId] = useState<Mode["id"]>("build");
  const active = useMemo(() => modes.find(mode => mode.id === activeId) ?? modes[0], [activeId]);
  const ActiveIcon = active.icon;

  return (
    <div className="studio-cockpit" style={{ "--cockpit-accent": active.color, "--cockpit-tint": active.tint } as React.CSSProperties}>
      <div className="studio-cockpit__topbar">
        <div className="studio-cockpit__identity"><span><Sparkles size={14} /></span><div><strong>Softbridge Studio OS</strong><small>Interactive product cockpit</small></div></div>
        <div className="studio-cockpit__live"><i /> Live prototype</div>
      </div>

      <div className="studio-cockpit__tabs" role="tablist" aria-label="Studio capabilities">
        {modes.map(mode => {
          const Icon = mode.icon;
          const selected = mode.id === active.id;
          return <button key={mode.id} type="button" role="tab" aria-selected={selected} className={selected ? "is-active" : ""} onClick={() => setActiveId(mode.id)}>
            <Icon size={15}/><span>{mode.label}</span>{selected && <motion.i layoutId="cockpit-tab" />}
          </button>;
        })}
      </div>

      <div className="studio-cockpit__content">
        <div className="studio-cockpit__summary">
          <div className="studio-cockpit__summary-head"><span><ActiveIcon size={18} /></span><small>{active.status}</small></div>
          <AnimatePresence mode="wait">
            <motion.div key={active.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .28 }}>
              <p className="studio-cockpit__eyebrow">Selected capability</p>
              <h3>{active.title}</h3>
              <p>{active.description}</p>
              <div className="studio-cockpit__metric"><strong>{active.score}</strong><span>{active.metric}</span></div>
            </motion.div>
          </AnimatePresence>
          <button type="button" className="studio-cockpit__cta" onClick={() => openService(active.serviceIndex)}>Open capability <ArrowUpRight size={15}/></button>
        </div>

        <div className="studio-cockpit__preview">
          <AnimatePresence mode="wait">
            <motion.div key={active.id} initial={{ opacity: 0, scale: .97, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .985, y: -5 }} transition={{ duration: .36, ease: [.22,1,.36,1] }}>
              <ProductPreview mode={active} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="studio-cockpit__workflow">
        {active.steps.map((step, index) => <div key={step}><span>{String(index + 1).padStart(2, "0")}</span><p>{step}</p><i className={index < 3 ? "is-complete" : ""}>{index < 3 && <Check size={10}/>}</i></div>)}
      </div>
    </div>
  );
}
