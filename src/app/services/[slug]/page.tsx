import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, getService } from "@/content/services";

export function generateStaticParams() { return services.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const service = getService(slug); return service ? { title: `${service.title} | Softbridge Solutions`, description: service.short } : {}; }

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  return <main className="pb-28 pt-40"><div className="container-shell"><p className="eyebrow text-black/45">Capability / {service.index}</p><h1 className="mt-8 max-w-6xl text-[clamp(4.5rem,12vw,11rem)] font-semibold leading-[.8] tracking-[-.08em]">{service.title}</h1><div className="mt-20 grid gap-16 border-t hairline pt-10 lg:grid-cols-[.75fr_1.25fr]"><p className="max-w-md text-xl leading-relaxed text-black/58">{service.short}</p><div><p className="text-4xl leading-tight tracking-[-.045em] md:text-6xl">{service.description}</p><div className="mt-20 grid gap-10 md:grid-cols-2"><section><p className="eyebrow text-black/42">Outcomes</p><ul className="mt-5">{service.outcomes.map((item, i) => <li key={item} className="grid grid-cols-[40px_1fr] border-t hairline py-5"><span className="font-mono text-[10px] text-black/40">0{i + 1}</span><span className="text-lg">{item}</span></li>)}</ul></section><section><p className="eyebrow text-black/42">Capabilities</p><ul className="mt-5">{service.capabilities.map((item, i) => <li key={item} className="grid grid-cols-[40px_1fr] border-t hairline py-5"><span className="font-mono text-[10px] text-black/40">0{i + 1}</span><span className="text-lg">{item}</span></li>)}</ul></section></div></div></div></div></main>;
}
