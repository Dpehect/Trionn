import type { Metadata } from "next";
import Link from "next/link";
import { capabilities, engagementModels, process } from "@/lib/data";
import { SectionLabel } from "@/components/section-label";
import { SplitHeading } from "@/components/motion/split-heading";
import { PageSchema } from "@/components/page-schema";

export const metadata: Metadata = {
  title: "Digital product development services",
  description: "Senior product, experience, AI and platform teams for digital product development in Helsinki and Europe.",
  alternates: { canonical: "/services/digital-products" },
};

export default function Services() {
  const faq = [
    { q: "How long does a typical Softbridge engagement take?", a: "Focused framing and technical interventions usually take 2 to 10 weeks. Integrated product delivery commonly runs for 8 to 28 weeks." },
    { q: "Where is the Softbridge team based?", a: "Client strategy and product leadership are anchored in Helsinki, with senior design and engineering delivery in Türkiye." },
    { q: "How does an engagement start?", a: "Most work starts with a paid framing phase that defines the decision, evidence, scope, risks, team shape and commercial model." },
    { q: "Can Softbridge work with an existing internal team?", a: "Yes. We can form a complete delivery team or take responsibility for a defined product, design, AI or platform problem alongside internal owners." },
  ];

  return (
    <>
      <PageSchema type="Service" name="Digital product engineering services" description="Senior product, experience, AI and platform engineering for organisations in Helsinki, Finland and Europe." path="/services/digital-products" faq={faq} />

      <section className="section pt-40">
        <div className="container">
          <p className="eyebrow text-muted">Services / Digital products</p>
          <h1 className="display mt-10 max-w-[11ch]">One team across the product.</h1>
          <p className="body-lg mt-12 max-w-2xl">We combine product direction, experience design, AI and platform engineering when separating them would increase risk.</p>
        </div>
      </section>

      <section className="pb-28">
        <div className="container">
          {capabilities.map((capability) => (
            <article id={capability.slug} key={capability.slug} className="border-t border-line py-14 md:py-20">
              <div className="grid gap-10 md:grid-cols-[80px_1fr_1fr]">
                <span className="eyebrow text-muted">{capability.index}</span>
                <div>
                  <h2 className="headline">{capability.title}</h2>
                  <p className="body-lg mt-7 max-w-xl">{capability.summary}</p>
                  <p className="mt-7 max-w-xl text-muted">{capability.description}</p>
                </div>
                <div className="md:pt-3">
                  <dl>
                    {[["Typical length", capability.length], ["Team shape", capability.team], ["Outcomes", capability.outcomes.join(" · ")]].map(([term, value]) => (
                      <div className="border-t border-line py-4" key={term}>
                        <dt className="eyebrow text-muted">{term}</dt>
                        <dd className="mt-2">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              <div className="mt-12 grid gap-10 md:ml-[80px] md:grid-cols-3 md:gap-8">
                <div>
                  <h3 className="eyebrow text-muted">When this is useful</h3>
                  <ul className="mt-5 space-y-3">{capability.signals.map((item) => <li key={item} className="border-t border-line pt-3 text-sm">{item}</li>)}</ul>
                </div>
                <div>
                  <h3 className="eyebrow text-muted">Typical deliverables</h3>
                  <ul className="mt-5 space-y-3">{capability.deliverables.map((item) => <li key={item} className="border-t border-line pt-3 text-sm">{item}</li>)}</ul>
                </div>
                <div>
                  <h3 className="eyebrow text-muted">Risk reduced</h3>
                  <ul className="mt-5 space-y-3">{capability.risks.map((item) => <li key={item} className="border-t border-line pt-3 text-sm">{item}</li>)}</ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <SectionLabel index="05" label="Engagement models" />
          <SplitHeading className="headline mt-14 max-w-[12ch]">Choose the smallest commitment that can produce evidence.</SplitHeading>
          <div className="mt-16 grid border-t border-line md:grid-cols-3">
            {engagementModels.map((model) => (
              <article key={model.title} className="border-b border-line py-8 md:border-r md:px-7">
                <p className="eyebrow text-muted">{model.duration}</p>
                <h3 className="title mt-10">{model.title}</h3>
                <p className="mt-6 text-muted">{model.fit}</p>
                <p className="mt-6 border-t border-line pt-5 text-sm"><span className="eyebrow text-muted">You leave with</span><br />{model.outcome}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionLabel index="06" label="Delivery sequence" />
          <div className="mt-16 grid border-t border-line md:grid-cols-4">
            {process.map((step) => (
              <article key={step.n} className="border-b border-line py-7 md:border-r md:px-6">
                <span className="eyebrow text-muted">{step.n}</span>
                <h3 className="title mt-8">{step.title}</h3>
                <p className="mt-4 text-muted">{step.text}</p>
                <ul className="mt-7 space-y-2 text-sm">{step.outputs.map((output) => <li key={output}>— {output}</li>)}</ul>
              </article>
            ))}
          </div>
          <p className="body-lg mt-12 max-w-2xl">Commercial position, delivery risk and scope movement stay visible throughout. When evidence changes the plan, we change the plan before increasing spend.</p>
          <Link href="/contact" className="link-arrow mt-9">Discuss an engagement <span>↗</span></Link>
        </div>
      </section>
    </>
  );
}
