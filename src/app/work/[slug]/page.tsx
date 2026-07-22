import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { projects, getProject } from "@/data/projects";
import { SiteHeader } from "@/components/site-header";
import { CaseStudyBlockRenderer } from "@/components/case-study-block";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  return project
    ? {
        title: project.title,
        description: project.summary,
      }
    : {};
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((item) => item.slug === slug);
  const nextProject = projects[(index + 1) % projects.length];

  return (
    <main>
      <SiteHeader />

      <section className="container-x min-h-screen pt-36">
        <Link href="/work" className="eyebrow inline-flex items-center gap-2">
          <ArrowLeft size={14} />
          All work
        </Link>

        <div className="mt-12 grid gap-10 md:grid-cols-[1fr_.35fr] md:items-end">
          <h1 className="display-xl">{project.title}</h1>
          <div className="pb-3">
            <p className="eyebrow">
              {project.category} / {project.year}
            </p>
            <p className="body-lg text-muted mt-5">{project.summary}</p>
          </div>
        </div>

        <div
          className="mt-16 aspect-video rounded-[var(--radius-lg)]"
          style={{
            background: `radial-gradient(circle at 45% 40%, ${project.accent}, #111 58%)`,
          }}
        />
      </section>

      <section className="container-x py-[var(--section-space)]">
        <div className="grid gap-10 border-y hairline py-10 md:grid-cols-3">
          <div>
            <p className="eyebrow">Services</p>
            <p className="mt-4">{project.services.join(" · ")}</p>
          </div>
          <div>
            <p className="eyebrow">Measured result</p>
            <p className="mt-4 text-3xl tracking-[-.04em]">{project.metric}</p>
          </div>
          <div>
            <p className="eyebrow">Delivery</p>
            <p className="mt-4">Strategy through production</p>
          </div>
        </div>
      </section>

      {project.blocks.map((block, index) => (
        <CaseStudyBlockRenderer key={`${block.type}-${index}`} block={block} />
      ))}

      <section className="container-x py-[var(--section-space)]">
        <p className="eyebrow">Next project</p>
        <Link
          href={`/work/${nextProject.slug}`}
          className="display-xl mt-8 block transition-transform duration-500 hover:translate-x-4"
        >
          {nextProject.title}
        </Link>
      </section>
    </main>
  );
}
