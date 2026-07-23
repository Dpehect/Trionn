import { Activity, Bot, CalendarDays, CheckCircle2, CreditCard, HeartPulse, PackageCheck, Search, ShieldCheck, ShoppingBag, Sparkles, TrendingUp, UserRound, WandSparkles } from "lucide-react";
import type { CaseStudy } from "@/data/case-studies";

export function ProductVisual({ project, compact = false }: { project: CaseStudy; compact?: boolean }) {
  return (
    <div className={`product-scene product-scene--${project.slug}${compact ? " product-scene--compact" : ""}`} style={{ "--scene-accent": project.accent } as React.CSSProperties}>
      <div className="product-scene__glow" />
      {project.slug === "northstar-ai" && <Northstar />}
      {project.slug === "aurora-commerce" && <Aurora />}
      {project.slug === "sisu-mobile" && <Sisu />}
      {project.slug === "helix-health" && <Helix />}
      <span className="product-scene__index">{project.number}</span>
    </div>
  );
}

function Shell({ children, title, icon }: { children: React.ReactNode; title: string; icon: React.ReactNode }) {
  return <div className="ui-shell"><div className="ui-shell__top"><div className="ui-shell__brand">{icon}<span>{title}</span></div><div className="ui-shell__actions"><i/><i/><i/></div></div>{children}</div>;
}

function Northstar() {
  return <Shell title="Northstar Command" icon={<Bot size={15}/>}> <div className="dashboard-grid"><aside><span className="nav-active"><Sparkles size={14}/> Overview</span><span><Activity size={14}/> Automations</span><span><CheckCircle2 size={14}/> Reviews</span><span><TrendingUp size={14}/> Insights</span></aside><main><div className="metric-row"><article><small>Tasks automated</small><strong>12,840</strong><em>+18.4%</em></article><article><small>Human review</small><strong>284</strong><em>2.2%</em></article><article><small>Hours saved</small><strong>1,920</strong><em>This month</em></article></div><div className="chart-card"><div className="chart-head"><span>Workflow volume</span><small>Last 30 days</small></div><div className="bars">{[34,52,44,68,61,76,57,88,72,94,82,100].map((h,i)=><i key={i} style={{height:`${h}%`}}/>)}</div></div><div className="workflow-card"><span><WandSparkles size={16}/> Invoice triage</span><div><b>Extract</b><i/><b>Validate</b><i/><b>Approve</b></div></div></main></div></Shell>;
}

function Aurora() {
  return <div className="commerce-scene"><div className="commerce-browser"><div className="commerce-top"><strong>AURORA</strong><div><Search size={15}/><UserRound size={15}/><ShoppingBag size={15}/></div></div><div className="commerce-hero"><div><small>New Nordic collection</small><h4>Designed for slower mornings.</h4><button>Explore collection</button></div><div className="product-plinth"><span className="product-bag"/><span className="product-shadow"/></div></div><div className="product-strip"><article><span/><small>Cloud Knit</small><b>€129</b></article><article><span/><small>Field Carry</small><b>€189</b></article><article><span/><small>Soft Form</small><b>€99</b></article></div></div><div className="commerce-order"><PackageCheck size={22}/><strong>Order #A-1842</strong><span>Ready for dispatch</span></div></div>;
}

function Sisu() {
  return <div className="mobile-scene"><div className="phone phone--back"><div className="phone-notch"/><div className="phone-screen phone-screen--stats"><small>Weekly progress</small><strong>84%</strong><div className="progress-ring"/><div className="mini-stats"><span>12 sessions</span><span>4.8 streak</span></div></div></div><div className="phone phone--front"><div className="phone-notch"/><div className="phone-screen"><div className="mobile-greeting"><small>Good morning, Aino</small><UserRound size={18}/></div><div className="focus-card"><span>Today’s focus</span><h4>Build a calmer routine.</h4><button>Start session</button></div><div className="mobile-list"><article><CheckCircle2 size={16}/><span>Morning reset</span><b>8 min</b></article><article><CalendarDays size={16}/><span>Plan the week</span><b>12 min</b></article><article><HeartPulse size={16}/><span>Recovery check</span><b>5 min</b></article></div></div></div><span className="floating-pill"><Sparkles size={14}/> Personal plan updated</span></div>;
}

function Helix() {
  return <Shell title="Helix Care Workspace" icon={<HeartPulse size={15}/>}> <div className="health-grid"><aside><div className="patient-card"><span className="patient-avatar">AL</span><div><strong>Anna Lehtinen</strong><small>Care plan active</small></div></div><nav><span className="nav-active">Overview</span><span>Appointments</span><span>Messages</span><span>Documents</span></nav><div className="secure-chip"><ShieldCheck size={14}/> FHIR secured</div></aside><main><div className="health-head"><div><small>Patient overview</small><h4>Coordinated care, one clear view.</h4></div><button><CalendarDays size={15}/> New appointment</button></div><div className="health-cards"><article><small>Next appointment</small><strong>24 Jul · 10:30</strong><span>Dr. Emilia Saarinen</span></article><article><small>Care plan completion</small><strong>76%</strong><div className="health-progress"><i/></div></article></div><div className="timeline-card"><span className="timeline-line"/><article><i/><div><strong>Lab results reviewed</strong><small>Today, 09:42</small></div></article><article><i/><div><strong>Medication plan updated</strong><small>Yesterday, 16:08</small></div></article><article><i/><div><strong>Follow-up scheduled</strong><small>22 Jul, 11:20</small></div></article></div></main></div></Shell>;
}
