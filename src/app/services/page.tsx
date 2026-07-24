import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/content/services";

export const metadata: Metadata = { title: "Services | Softbridge Solutions", description: "Digital product, web platform, AI systems and growth services for companies in Finland and beyond." };

export default function ServicesPage() {
  return <main className="pb-28 pt-40"><div className="container-shell"><p className="eyebrow text-black/45">Capabilities</p><h1 className="mt-8 max-w-6xl text-[clamp(4.5rem,11vw,11rem)] font-semibold leading-[.8] tracking-[-.08em]">Strategy, design and engineering as one system.</h1><div className="mt-24">{services.map((service) => <Link href={`/services/${service.slug}`} key={service.slug} className="group grid gap-5 border-t hairline py-8 md:grid-cols-[70px_1fr_1fr_auto] md:items-start"><span className="font-mono text-[10px] text-black/40">{service.index}</span><h2 className="text-5xl font-semibold tracking-[-.055em] md:text-7xl">{service.title}</h2><p className="max-w-md leading-relaxed text-black/55">{service.description}</p><ArrowUpRight className="transition group-hover:rotate-45" /></Link>)}</div></div></main>;
}
