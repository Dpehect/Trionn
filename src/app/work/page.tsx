import Link from "next/link";
import { ContentShell } from "@/components/navigation/content-shell";
import { projects } from "@/data/projects";

export default function WorkPage() {
  return <ContentShell><main className="content-page"><div className="content-grid"><p className="content-kicker">Selected work</p><h1 className="content-heading">Identity and digital systems for ambitious missions.</h1><p className="content-copy">Our work moves between strategy, brand, product and motion, with each system built to stay useful after launch.</p></div><div className="project-index">{projects.map((project, index) => <Link className="project-row" href={`/work/${project.slug}`} key={project.slug}><strong>{project.title}</strong><span>{project.discipline}</span><span>{project.year}</span><span>{String(index + 1).padStart(2, "0")}</span></Link>)}</div></main></ContentShell>;
}
