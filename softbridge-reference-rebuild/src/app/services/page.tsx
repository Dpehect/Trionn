import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { capabilities } from "@/lib/data";
import { PlatformShowcase } from "@/components/platform-showcase";
import { FAQ } from "@/components/faq";

export const metadata: Metadata = {
  title: "Services",
  description: "Product, experience, AI and platform engineering delivered by one integrated senior team.",
};

const detail = [
  {
    title: "Product",
    signal: "The opportunity is important, but scope, priorities or evidence are not yet strong enough to justify a full build.",
    work: ["Decision framing", "User and workflow research", "Prototype and technical spike", "Prioritised release plan"],
    outcome: "A buildable product direction with the major uncertainties exposed before delivery scales.",
    shape: "2–4 week framing or 8–16 week product stream",
  },
  {
    title: "Experience",
    signal: "Users are navigating workarounds, inconsistent interfaces or a product that has grown without a coherent interaction system.",
    work: ["Experience audit", "Information architecture", "Accessible interface design", "Design system and frontend patterns"],
    outcome: "A product that supports complex work without transferring complexity to the user.",
    shape: "6–16 week experience and frontend stream",
  },
  {
    title: "Intelligence",
    signal: "A workflow may benefit from AI, but accuracy, source quality, permissions or operational ownership remain unclear.",
    work: ["Use-case evaluation", "Retrieval and data design", "Human review workflow", "Evaluation and observability"],
    outcome: "A controlled AI workflow with evidence, failure modes and a clear production owner.",
    shape: "3–5 week evaluation, then 8–20 week delivery",
  },
  {
    title: "Platform",
    signal: "Delivery is slowed by unstable architecture, repeated integrations, weak observability or unclear ownership boundaries.",
    work: ["Architecture decisions", "Application and API engineering", "Cloud and deployment systems", "Reliability and ownership transfer"],
    outcome: "A production foundation teams can operate, extend and explain.",
    shape: "10–28 week platform stream",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-lime pb-20 pt-40 md:pb-28">
        <div className="bridge-mark -right-[25vw] top-[-20%] opacity-10" aria-hidden="true" />
        <div className="container-site relative z-10">
          <p className="eyebrow text-forest/50">Services</p>
          <h1 className="display-lg mt-7 max-w-[11ch]">Senior capability, organised around the product.</h1>
          <p className="body-lg mt-8 max-w-2xl text-forest/68">Use one focused capability or combine them in one delivery team. Strategy, design, software and AI work from the same decisions.</p>
        </div>
      </section>

      <section className="section-space bg-cream">
        <div className="container-site grid gap-5">
          {detail.map((item, index) => (
            <article key={item.title} className="rounded-stage grid overflow-hidden border border-forest/15 bg-white lg:grid-cols-[.45fr_1.55fr]">
              <div className={`${index === 0 ? "bg-forest text-white" : index === 1 ? "bg-ochre text-white" : index === 2 ? "bg-coral text-white" : "bg-lavender text-forest"} flex min-h-72 flex-col justify-between p-6 md:p-9`}>
                <p className="eyebrow opacity-55">0{index + 1}</p>
                <h2 className="display-lg text-[clamp(3.5rem,6vw,7rem)]">{item.title}</h2>
              </div>
              <div className="grid gap-10 p-6 md:p-10 lg:grid-cols-2">
                <div>
                  <p className="eyebrow text-forest/45">A useful signal</p>
                  <p className="body-lg mt-5">{item.signal}</p>
                  <p className="mt-8 border-t border-forest/15 pt-5 text-sm font-bold">Typical shape · {item.shape}</p>
                </div>
                <div>
                  <p className="eyebrow text-forest/45">What the team does</p>
                  <ul className="mt-5 grid gap-3">
                    {item.work.map((work) => <li key={work} className="border-b border-forest/15 pb-3">→ {work}</li>)}
                  </ul>
                  <p className="mt-7 text-forest/65">{item.outcome}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <PlatformShowcase />

      <section className="section-space bg-lavender">
        <div className="container-site grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div><p className="eyebrow text-forest/45">Commercial clarity</p><h2 className="heading-xl mt-6 max-w-[10ch]">Commit in proportion to what is known.</h2></div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Frame", "2–4 weeks", "Resolve product, user and technical uncertainty before a larger commitment."],
              ["Deliver", "8–24 weeks", "A stable senior team ships from one prioritised backlog."],
              ["Strengthen", "Monthly", "Improve an existing product, platform or internal delivery system."],
            ].map(([title, time, text]) => (
              <article key={title} className="rounded-[2rem] bg-white p-6"><p className="eyebrow text-forest/45">{time}</p><h3 className="heading-md mt-8">{title}</h3><p className="mt-5 text-forest/65">{text}</p></article>
            ))}
          </div>
        </div>
      </section>

      <FAQ />

      <section className="section-space bg-forest text-white">
        <div className="container-site text-center"><p className="eyebrow text-white/45">The next useful step</p><h2 className="heading-xl mx-auto mt-6 max-w-[12ch] text-lime">Bring the decision that is difficult to make.</h2><Link href="/contact" className="magnetic-button mt-8 bg-white text-forest">Start a project <ArrowUpRight size={16} /></Link></div>
      </section>
    </>
  );
}
