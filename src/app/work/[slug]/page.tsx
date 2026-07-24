import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { work } from "@/lib/data";

export function generateStaticParams() {
  return work.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = work.find((entry) => entry.slug === slug);
  return item ? { title: item.title, description: item.summary } : {};
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = work.find((entry) => entry.slug === slug);
  if (!item) notFound();

  return (
    <>
      <section className="section pt-40">
        <div className="container">
          <span className="label">{item.label}</span>
          <p className="eyebrow mt-5 text-muted">{item.sector}</p>
          <h1 className="display mt-9 max-w-[12ch]">{item.title}</h1>
          <p className="body-lg mt-12 max-w-2xl">{item.summary}</p>
        </div>
      </section>

      <section className="pb-28">
        <div className="container grid gap-12 border-t border-line pt-10 md:grid-cols-2">
          <div>
            <p className="eyebrow text-muted">Context</p>
            <p className="body-lg mt-5">{item.context}</p>
          </div>
          <div>
            <p className="eyebrow text-muted">Outcome</p>
            <p className="body-lg mt-5">{item.result}</p>
            <ul className="mt-10">{item.metrics.map((metric) => <li className="border-t border-line py-4" key={metric}>{metric}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container grid gap-14 md:grid-cols-2">
          <div>
            <p className="eyebrow text-muted">The challenge</p>
            <h2 className="headline mt-10 max-w-[12ch]">The hard part was not the interface.</h2>
          </div>
          <p className="body-lg md:pt-16">{item.challenge}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow text-muted">Approach</p>
          <ol className="mt-14 grid border-t border-line md:grid-cols-4">
            {item.approach.map((step, index) => (
              <li key={step} className="border-b border-line py-8 md:border-r md:px-7">
                <span className="eyebrow text-muted">0{index + 1}</span>
                <p className="mt-10">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section bg-ink text-paper">
        <div className="container grid gap-14 md:grid-cols-2">
          <div>
            <p className="eyebrow text-white/50">Softbridge contribution</p>
            <ul className="mt-10">{item.contribution.map((entry) => <li className="border-t border-white/20 py-4" key={entry}>{entry}</li>)}</ul>
          </div>
          <div>
            <p className="eyebrow text-white/50">Evidence note</p>
            <p className="body-lg mt-10 text-white/70">{item.evidence}</p>
          </div>
        </div>
      </section>

      <section className="section border-t border-line">
        <div className="container text-center">
          <p className="eyebrow text-muted">A similar decision?</p>
          <h2 className="headline mx-auto mt-8 max-w-[13ch]">Start with context, not a predefined solution.</h2>
          <Link href="/contact" className="mt-10 inline-block bg-ink px-8 py-4 text-paper">Discuss the work</Link>
        </div>
      </section>
    </>
  );
}
