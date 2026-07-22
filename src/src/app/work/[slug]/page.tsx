import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { projects, getProject } from "@/data/projects";
import { SiteHeader } from "@/components/site-header";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  return project ? { title: project.title, description: project.summary } : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <main>
      <SiteHeader />
      <section className="container-x min-h-screen pt-36">
        <Link href="/work" className="eyebrow inline-flex items-center gap-2"><ArrowLeft size={14}/> All work</Link>
        <div className="mt-12 grid gap-10 md:grid-cols-[1fr_.35fr] md:items-end">
          <h1 className="text-[clamp(5rem,14vw,13rem)] font-bold leading-[.72] tracking-[-.085em]">{project.title}</h1>
          <div className="pb-3">
            <p className="eyebrow">{project.category} / {project.year}</p>
            <p className="mt-5 text-xl leading-relaxed text-[var(--muted)]">{project.summary}</p>
          </div>
        </div>
        <div className="mt-16 aspect-[16/9] rounded-[2rem]" style={{ background: `radial-gradient(circle at 45% 40%, ${project.accent}, #111 58%)` }} />
      </section>

      <section className="container-x py-28">
        <div className="grid gap-10 border-y hairline py-10 md:grid-cols-3">
          <div><p className="eyebrow">Services</p><p className="mt-4">{project.services.join(" · ")}</p></div>
          <div><p className="eyebrow">Measured result</p><p className="mt-4 text-3xl tracking-[-.04em]">{project.metric}</p></div>
          <div><p className="eyebrow">Delivery</p><p className="mt-4">Strategy through production</p></div>
        </div>
      </section>

      {project.chapters.map((chapter, index) => (
        <section key={chapter.label} className="container-x grid min-h-[75vh] gap-12 border-t hairline py-24 md:grid-cols-[.35fr_1fr]">
          <p className="eyebrow">0{index + 1} / {chapter.label}</p>
          <div>
            <h2 className="max-w-5xl text-5xl leading-[.92] tracking-[-.06em] md:text-8xl">{chapter.title}</h2>
            <p className="mt-10 max-w-2xl text-xl leading-relaxed text-[var(--muted)]">{chapter.body}</p>
          </div>
        </section>
      ))}
    </main>
  );
}
