import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/data/case-studies";
import { ProductVisual } from "@/components/work/product-visual";

export const metadata: Metadata = { title: "Selected Work — Softbridge Solutions Finland", description: "Selected software, AI, SaaS and digital product work by Softbridge Solutions Finland." };

export default function ProjectsPage() {
  return <main className="projects-index"><header className="projects-index__header"><Link href="/"><ArrowLeft size={16}/> Studio</Link><span>Selected work / 2025–2026</span></header><section className="projects-index__hero"><p className="section-eyebrow">Case studies</p><h1>Digital systems built for real-world progress.</h1><p>Strategy, design and engineering delivered as one integrated studio.</p></section><section className="projects-grid">{caseStudies.map(project=><Link key={project.slug} href={`/projects/${project.slug}`} className="projects-grid__card"><div className="projects-grid__visual"><ProductVisual project={project} compact /></div><div><p>{project.industry} · {project.year}</p><h2>{project.title}</h2><span>{project.summary}</span></div><ArrowUpRight/></Link>)}</section></main>;
}
