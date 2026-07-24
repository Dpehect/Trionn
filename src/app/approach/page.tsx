import type { Metadata } from "next";
import Link from "next/link";
import { engagementModels, principles, process, trustPractices } from "@/lib/data";
import { SplitHeading } from "@/components/motion/split-heading";

export const metadata: Metadata = {
  title: "Approach and studio",
  description: "How Softbridge combines Helsinki product leadership with senior delivery in Türkiye.",
};

export default function Approach() {
  return (
    <>
      <section className="section pt-40">
        <div className="container">
          <p className="eyebrow text-muted">Approach / Studio</p>
          <h1 className="display mt-10 max-w-[12ch]">Close to the decision. Senior in the delivery.</h1>
          <p className="body-lg mt-12 max-w-2xl">Our structure is designed to preserve context. The people discussing the work, shaping the system and shipping it operate as one team.</p>
        </div>
      </section>

      <section className="section bg-ink text-paper">
        <div className="container grid gap-14 md:grid-cols-2">
          <SplitHeading className="headline max-w-[11ch]">Two locations. One operating model.</SplitHeading>
          <div className="body-lg text-white/70">
            <p>Helsinki anchors client strategy, stakeholder communication and product decisions.</p>
            <p className="mt-6">Türkiye extends senior delivery capacity across product design, software engineering, AI and platforms.</p>
            <p className="mt-6">Work is organised around one backlog, one decision record and shared quality standards. There is no specification hand-off between separate vendors.</p>
          </div>
        </div>
        <div className="container mt-20 grid border-t border-white/20 md:grid-cols-3">
          {[["Client proximity", "Important decisions stay close to client leadership and market context."], ["Delivery depth", "Senior practitioners remain responsible from framing through production."], ["Operational continuity", "Documentation, environments and product knowledge transfer with the work."]].map(([title, text]) => (
            <article key={title} className="border-b border-white/20 py-7 md:border-r md:px-7">
              <h2 className="title">{title}</h2>
              <p className="mt-5 text-white/60">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow text-muted">Working principles</p>
          <div className="mt-14 grid md:grid-cols-2">
            {principles.map(([title, text], index) => (
              <article key={title} className={`border-t border-line py-8 ${index % 2 === 0 ? "md:pr-10" : "md:border-l md:pl-10"}`}>
                <span className="eyebrow text-muted">0{index + 1}</span>
                <h2 className="title mt-10">{title}</h2>
                <p className="mt-5 max-w-lg text-muted">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <p className="eyebrow text-muted">Delivery sequence</p>
          <div className="mt-14 grid border-t border-line md:grid-cols-4">
            {process.map((step) => (
              <article className="border-b border-line py-7 md:border-r md:px-6" key={step.n}>
                <span className="eyebrow text-muted">{step.n}</span>
                <h2 className="title mt-12">{step.title}</h2>
                <p className="mt-5 text-muted">{step.text}</p>
                <ul className="mt-7 space-y-2 text-sm">{step.outputs.map((item) => <li key={item}>— {item}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow text-muted">Commercial structure</p>
          <SplitHeading className="headline mt-12 max-w-[13ch]">Commit in proportion to what is known.</SplitHeading>
          <div className="mt-14 grid border-t border-line md:grid-cols-3">
            {engagementModels.map((model) => (
              <article key={model.title} className="border-b border-line py-8 md:border-r md:px-7">
                <p className="eyebrow text-muted">{model.duration}</p>
                <h2 className="title mt-9">{model.title}</h2>
                <p className="mt-5 text-muted">{model.fit}</p>
                <p className="mt-6 text-sm">{model.outcome}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-ink text-paper">
        <div className="container">
          <p className="eyebrow text-white/50">Trust and transparency</p>
          <SplitHeading className="headline mt-12 max-w-[12ch]">Trust is maintained through operating detail.</SplitHeading>
          <div className="mt-14 grid md:grid-cols-2">
            {trustPractices.map(([title, text]) => (
              <article key={title} className="border-t border-white/20 py-7 md:pr-10">
                <h2 className="title">{title}</h2>
                <p className="mt-4 max-w-xl text-white/60">{text}</p>
              </article>
            ))}
          </div>
          <Link href="/contact" className="link-arrow mt-10">Start with the difficult decision <span>↗</span></Link>
        </div>
      </section>
    </>
  );
}
