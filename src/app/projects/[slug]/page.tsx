import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { caseStudies, getCaseStudy } from "@/data/case-studies";
import { ProductVisual } from "@/components/work/product-visual";

export function generateStaticParams() { return caseStudies.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const project = getCaseStudy(slug); return project ? { title: `${project.title} — Softbridge Case Study`, description: project.summary } : {}; }

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const project = getCaseStudy(slug); if (!project) notFound();
  const current = caseStudies.findIndex(item=>item.slug===project.slug); const next = caseStudies[(current+1)%caseStudies.length];
  return <main className="case-page">
    <header className="case-nav"><Link href="/projects"><ArrowLeft size={16}/> All work</Link><span>{project.number} / {caseStudies.length.toString().padStart(2,"0")}</span></header>
    <section className="case-hero"><div><p>{project.industry} · {project.year}</p><span className="case-status">{project.status}</span><h1>{project.title}</h1></div><p>{project.summary}</p></section>
    <div className="case-visual"><ProductVisual project={project} /></div>
    <aside className="case-disclosure"><strong>Evidence disclosure</strong><p>{project.disclosure}</p></aside><section className="case-facts"><div><span>Client</span><p>{project.client}</p></div><div><span>Services</span><p>{project.services.join(" · ")}</p></div><div><span>Technology</span><p>{project.stack.join(" · ")}</p></div></section>
    <section className="case-story"><article><p className="section-eyebrow">The challenge</p><h2>Make complexity feel clear.</h2><p>{project.challenge}</p></article><article><p className="section-eyebrow">The solution</p><h2>One focused product system.</h2><p>{project.solution}</p></article></section>
    <section className="case-process"><p className="section-eyebrow">How we built it</p><div><article><span>01</span><h3>Discover</h3><p>Stakeholder workshops, service mapping and product-risk analysis aligned the team around one measurable outcome.</p></article><article><span>02</span><h3>Prototype</h3><p>Interactive product flows and technical spikes validated the experience before full-scale implementation.</p></article><article><span>03</span><h3>Deliver</h3><p>A modular design system and observable architecture enabled a fast launch without compromising maintainability.</p></article></div></section><section className="case-impact"><p className="section-eyebrow">Outcome signals</p><div>{project.impact.map(metric=><article key={metric.label}><small>{metric.basis}</small><strong>{metric.value}</strong><span>{metric.label}</span></article>)}</div></section>
    <Link className="case-next" href={`/projects/${next.slug}`}><div><p>Next case study</p><h2>{next.title}</h2></div><ArrowUpRight size={40}/></Link>
  </main>;
}
