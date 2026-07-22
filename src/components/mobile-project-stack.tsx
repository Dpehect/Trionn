"use client";
import Link from "next/link";
import type { Project } from "@/data/projects";

export function MobileProjectStack({projects}:{projects:Project[]}) {
  return <div className="grid gap-4 md:hidden">
    {projects.map(project=><Link key={project.slug} href={`/work/${project.slug}`} className="block">
      <article className="aspect-[4/5] rounded-[var(--radius-lg)] border hairline p-5" style={{background:`radial-gradient(circle at 50% 35%,${project.accent},#111 68%)`}}>
        <div className="flex h-full flex-col justify-between">
          <p className="eyebrow">{project.category}</p>
          <div><h2 className="text-5xl tracking-[-.06em]">{project.title}</h2><p className="mt-4 text-sm text-white/70">{project.summary}</p></div>
        </div>
      </article>
    </Link>)}
  </div>;
}
