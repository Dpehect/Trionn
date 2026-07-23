"use client";

import Link from "next/link";
import type { Project } from "@/lib/site-data";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={`project-card project-card--${project.ratio}`} data-project-card>
      <Link href={`/projects/${project.slug}`} className="project-card__link" aria-label={`Open ${project.title}`}>
        <div className="project-card__visual" style={{ "--c1": project.palette[0], "--c2": project.palette[1], "--c3": project.palette[2] } as React.CSSProperties}>
          <div className="project-art project-art--grid" />
          <div className="project-art project-art--disc" />
          <div className="project-art project-art--type">{project.index}</div>
          <span className="project-card__open">View project ↗</span>
        </div>
        <footer className="project-card__footer">
          <div><strong>{project.title}</strong><span>{project.client}</span></div>
          <div><span>{project.discipline}</span><span>{project.year}</span></div>
        </footer>
      </Link>
    </article>
  );
}
