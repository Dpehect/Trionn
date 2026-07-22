import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContentShell } from "@/components/navigation/content-shell";
import { projectBySlug, projects } from "@/data/projects";

export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectBySlug[slug];
  if (!project) notFound();
  return <ContentShell><main className="project-detail"><section className="project-hero"><h1>{project.title}</h1><div className="project-meta"><span>{project.client} / {project.year}</span><span>{project.discipline}</span><p className="project-summary">{project.summary}</p></div></section><section className="project-gallery">{project.focusMedia.map((src, index) => <figure className="project-shot" key={src}><Image src={src} alt={`${project.title} project image ${index + 1}`} fill sizes="(max-width: 767px) 100vw, 60vw" className="media-image" priority={index < 2} /></figure>)}</section><Link className="back-link" href="/work">Back to all work</Link></main></ContentShell>;
}
