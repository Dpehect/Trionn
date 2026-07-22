import { Activity, Boxes, Radio, ShieldCheck, Workflow, Zap } from "lucide-react";

const capabilities = [
  { icon: Workflow, index: "01", title: "Live product map", copy: "Goals, evidence, decisions and release work remain visibly connected." },
  { icon: Boxes, index: "02", title: "Interface system", copy: "Reusable states carry product logic, ownership and validation rules." },
  { icon: Radio, index: "03", title: "Launch room", copy: "Readiness, risks and release decisions update in one operational surface." },
  { icon: Activity, index: "04", title: "Decision stream", copy: "Every meaningful change keeps its source, owner and downstream effect." },
  { icon: Zap, index: "05", title: "Product intelligence", copy: "Ask questions across evidence, interface state and launch context." },
  { icon: ShieldCheck, index: "06", title: "Controlled access", copy: "Roles, review gates and traceable decisions protect critical product work." },
];

export function CapabilityGrid() {
  return (
    <section className="capability-section section-shell">
      <div className="section-index">08 / CAPABILITIES</div>
      <div className="capability-heading"><p className="section-eyebrow">Everything necessary. Nothing ornamental.</p><h2>Product clarity designed into the operating system.</h2></div>
      <div className="capability-grid">
        {capabilities.map(({ icon: Icon, index, title, copy }) => (
          <article className="capability-card" key={title}>
            <div className="capability-card-top"><span>{index}</span><Icon size={24} strokeWidth={1.4} /></div>
            <h3>{title}</h3><p>{copy}</p><span className="capability-mark">↗</span>
          </article>
        ))}
      </div>
    </section>
  );
}
