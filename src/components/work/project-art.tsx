import type { CSSProperties } from "react";
import type { Project } from "@/data/projects";

export function ProjectArt({ project, compact = false }: { project: Project; compact?: boolean }) {
  const style = {
    "--project-a": project.palette[0],
    "--project-b": project.palette[1],
    "--project-c": project.palette[2],
  } as CSSProperties;

  return (
    <div className={`project-art ${compact ? "project-art--compact" : ""}`} style={style} aria-hidden="true">
      <div className="project-art__grid" />
      <div className="project-art__orb project-art__orb--one" />
      <div className="project-art__orb project-art__orb--two" />
      <div className="project-art__panel">
        <span>{project.index}</span>
        <strong>{project.title}</strong>
        <small>{project.sector}</small>
      </div>
      <div className="project-art__signal" />
    </div>
  );
}
