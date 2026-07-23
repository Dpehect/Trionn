import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { caseStudies, getCaseStudy } from "@/data/case-studies";

export function generateStaticParams() { return caseStudies.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const project = getCaseStudy(slug); return project ? { title: `${project.title} — Softbridge Case Study`, description: project.summary } : {}; }

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const project = getCaseStudy(slug); if (!project) notFound();
  const current = caseStudies.findIndex(item=>item.slug===project.slug); const next = caseStudies[(current+1)%caseStudies.length];
  return <main className="case-page">
    <header className="case-nav"><Link href="/projects"><ArrowLeft size={16}/> All work</Link><span>{project.number} / {caseStudies.length.toString().padStart(2,"0")}</span></header>
    <section className="case-hero"><div><p>{project.industry} · {project.year}</p><h1>{project.title}</h1></div><p>{project.summary}</p></section>
    <div className="case-visual" style={{background:project.gradient}}><span className="case-visual__orb"/><span className="case-visual__window"/><span className="case-visual__rail"/></div>
    <section className="case-facts"><div><span>Client</span><p>{project.client}</p></div><div><span>Services</span><p>{project.services.join(" · ")}</p></div><div><span>Technology</span><p>{project.stack.join(" · ")}</p></div></section>
    <section className="case-story"><article><p className="section-eyebrow">The challenge</p><h2>Make complexity feel clear.</h2><p>{project.challenge}</p></article><article><p className="section-eyebrow">The solution</p><h2>One focused product system.</h2><p>{project.solution}</p></article></section>
    <section className="case-impact"><p className="section-eyebrow">Measured impact</p><div>{project.impact.map(metric=><article key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></article>)}</div></section>
    <Link className="case-next" href={`/projects/${next.slug}`}><div><p>Next case study</p><h2>{next.title}</h2></div><ArrowUpRight size={40}/></Link>
  </main>;
}
