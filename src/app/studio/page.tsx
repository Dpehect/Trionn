import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Studio",
  description: "How Softbridge combines Helsinki product leadership with senior delivery in Türkiye.",
};

export default function StudioPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-forest pb-20 pt-40 text-white md:pb-28">
        <div className="bridge-mark -left-[22vw] top-[3%] border-lime opacity-20" aria-hidden="true" />
        <div className="container-site relative z-10"><p className="eyebrow text-white/45">Studio</p><h1 className="display-lg mt-7 max-w-[11ch] text-lime">Close to the decision. Senior in delivery.</h1><p className="body-lg mt-8 max-w-2xl text-white/65">The studio model is designed to preserve context across strategy, design, software, AI and production ownership.</p></div>
      </section>

      <section className="section-space bg-lavender">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2">
          <div className="relative min-h-[520px] overflow-hidden rounded-stage stage-shadow"><Image src="/art/studio-scene.svg" alt="Abstract illustration of the Softbridge delivery team" fill className="object-cover" /></div>
          <div><p className="eyebrow text-forest/45">Two locations · one team</p><h2 className="heading-xl mt-6 max-w-[10ch]">The model removes the specification hand-off.</h2><p className="body-lg mt-7 text-forest/65">Product direction stays close to the client in Helsinki. Senior delivery capacity extends through Türkiye. The work shares one backlog, one decision record, one quality standard and one accountable lead.</p></div>
        </div>
      </section>

      <section className="section-space bg-cream">
        <div className="container-site">
          <p className="eyebrow text-forest/45">Working principles</p>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              ["Clarity before code", "Define the decision, constraint and evidence before increasing delivery speed."],
              ["Senior people stay involved", "The people shaping the work remain accountable through implementation."],
              ["One team, one backlog", "Strategy, design and engineering share priorities and trade-offs."],
              ["Show the work", "Risks, assumptions, progress and commercial impact remain visible."],
              ["Build for ownership", "Documentation, observability and transfer are part of the product."],
              ["No dependency theatre", "Use the simplest architecture that can meet the real requirement."],
            ].map(([title, text], index) => <article key={title} className="rounded-[2rem] border border-forest/15 bg-white p-6"><span className="eyebrow text-forest/35">0{index + 1}</span><h2 className="heading-md mt-8">{title}</h2><p className="mt-5 text-forest/65">{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section-space bg-coral text-white">
        <div className="container-site grid gap-12 lg:grid-cols-[.75fr_1.25fr]"><div><p className="eyebrow text-white/55">Trust and transparency</p><h2 className="heading-xl mt-6 max-w-[9ch]">Trust is operational.</h2></div><div className="grid gap-3">{[
          ["Commercial visibility", "Team shape, assumptions, fees and change rules are visible before commitment."],
          ["Decision records", "Important product and architecture trade-offs are written down."],
          ["Production evidence", "Reliability, quality and AI behaviour are measured after release."],
          ["Ownership transfer", "Access, documentation and environments transfer with the system."],
        ].map(([title, text]) => <div key={title} className="border-t border-white/25 py-5"><h3 className="text-xl font-bold">{title}</h3><p className="mt-3 text-white/70">{text}</p></div>)}</div></div>
      </section>

      <section className="section-space bg-white text-center"><div className="container-site"><p className="eyebrow text-forest/45">Work with the studio</p><h2 className="heading-xl mx-auto mt-6 max-w-[11ch]">Start with the constraint, not the technology.</h2><Link href="/contact" className="magnetic-button button-dark mt-8">Start a project</Link></div></section>
    </>
  );
}
