import { ProductAccordion } from "@/components/ui/accordion";

const faq = [
  { question: "Is Trionn a project-management tool?", answer: "No. Trionn is a product operating system. It connects product evidence, interface logic and launch readiness; it can link to delivery tools without duplicating sprint management." },
  { question: "Does the interface require 3D or WebGL?", answer: "No. The experience uses DOM, SVG, GSAP and modern browser layout. It avoids continuous canvas rendering and remains usable on mid-range mobile hardware." },
  { question: "Can we import existing research and product documentation?", answer: "Yes. Beta workspaces include structured imports for notes, links, decision records and interface-state data. Connectors can be introduced without changing the core product model." },
  { question: "How does AI product intelligence use our data?", answer: "The intelligence layer reads only the workspace context permitted by your organization. Enterprise controls include retention policies, audit history and configurable access boundaries." },
  { question: "Is there a reduced-motion experience?", answer: "Yes. Motion is progressively enhanced. Reduced-motion users receive immediate state changes, natural scrolling and the complete product content without cinematic sequences." },
];

export function FaqSection() {
  return (
    <section className="faq-section section-shell">
      <div className="section-index">11 / QUESTIONS</div>
      <div className="faq-heading"><p className="section-eyebrow">Clear before commitment</p><h2>Questions product teams ask before changing the system.</h2></div>
      <ProductAccordion items={faq} />
    </section>
  );
}
