import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { ProjectArt } from "@/components/work/project-art";
import { getProject, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const next = projects[(currentIndex + 1) % projects.length];

  return (
    <SiteShell>
      <main className="project-detail">
        <section className="project-detail__hero site-container">
          <Link href="/#work" data-cursor="link" className="project-detail__back"><ArrowLeft size={15} /> Selected work</Link>
          <div className="project-detail__eyebrow"><span>{project.index}</span><span>{project.sector}</span><span>{project.year}</span></div>
          <h1>{project.title}</h1>
          <p>{project.summary}</p>
        </section>

        <section className="site-container pb-24">
          <ProjectArt project={project} />
        </section>

        <section className="project-detail__facts site-container">
          <div><span>Client</span><strong>{project.client}</strong></div>
          <div><span>Services</span><strong>{project.services.join(" / ")}</strong></div>
          <div><span>Technology</span><strong>{project.stack.join(" / ")}</strong></div>
        </section>

        <section className="project-detail__story site-container">
          <div><span>01 / Challenge</span><h2>{project.challenge}</h2></div>
          <div><span>02 / Solution</span><h2>{project.solution}</h2></div>
        </section>

        <section className="project-detail__outcomes site-container">
          <p>Measured outcomes</p>
          <div>{project.outcomes.map((outcome) => <article key={outcome.label}><strong>{outcome.value}</strong><span>{outcome.label}</span></article>)}</div>
        </section>

        <section className="project-detail__media site-container">
          <div className="project-detail__media-wide"><ProjectArt project={project} compact /></div>
          <div className="project-detail__media-grid"><ProjectArt project={project} compact /><ProjectArt project={project} compact /></div>
        </section>

        <Link href={`/work/${next.slug}`} data-cursor="link" className="next-project">
          <span>Next case / {next.index}</span>
          <strong>{next.title}</strong>
          <ArrowUpRight />
        </Link>
      </main>
    </SiteShell>
  );
}
