"use client";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";

export function ProjectRail(){
 return <section id="selected" className="project-section">
  <header className="project-section-head"><p>SELECTED WORK / 2024—2026</p><p>{String(projects.length).padStart(2,"0")} SIGNALS</p></header>
  <div className="project-stack">
   {projects.map((project,i)=><Link href={`/work/${project.slug}`} className="project-panel" key={project.slug} style={{"--accent":project.accent} as React.CSSProperties}>
    <div className="project-image"><Image src={project.cover} alt="" fill sizes="100vw" priority={i<2}/><div className="project-scan"/></div>
    <div className="project-number">{project.index}</div>
    <div className="project-copy"><p>{project.category} / {project.year}</p><h2>{project.title}</h2><div><span>{project.summary}</span><strong>{project.metric}</strong></div></div>
    <div className="project-arrow">↗</div>
   </Link>)}
  </div>
 </section>;
}
