import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/site-data";
import { SiteNavigation } from "@/components/navigation/site-navigation";

export function generateStaticParams(){return projects.map(({slug})=>({slug}));}
export default async function ProjectPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params; const project=projects.find(p=>p.slug===slug); if(!project) notFound();
 const next=projects[(projects.indexOf(project)+1)%projects.length];
 const style={"--c1":project.palette[0],"--c2":project.palette[1],"--c3":project.palette[2]} as React.CSSProperties;
 return <main className="case-study" style={style}>
  <header className="topbar topbar--page case-study__nav"><Link className="back-button" href="/projects" aria-label="Back to projects">←</Link><SiteNavigation/></header>
  <section className="case-hero"><p className="eyebrow">PROJECT {project.index} / {project.year}</p><h1>{project.title}</h1><p className="case-hero__summary">{project.summary}</p><div className="case-hero__meta"><span>CLIENT<br/><strong>{project.client}</strong></span><span>ROLE<br/><strong>{project.role}</strong></span><span>DISCIPLINE<br/><strong>{project.discipline}</strong></span></div></section>
  <section className="case-visual case-visual--hero"><div className="case-orbit"/><span>{project.index}</span><strong>{project.title}</strong></section>
  <section className="case-copy"><p className="eyebrow">CONTEXT / APPROACH</p><div><h2>{project.challenge}</h2><p>{project.solution}</p></div></section>
  <section className="case-grid"><div className="case-visual case-visual--portrait"><span>FORM</span></div><div className="case-visual case-visual--type"><strong>{project.title.slice(0,1)}</strong></div></section>
  <section className="case-services"><p className="eyebrow">SERVICES</p><ol>{project.services.map((s,i)=><li key={s}><span>0{i+1}</span>{s}</li>)}</ol></section>
  <Link className="next-project" href={`/projects/${next.slug}`}><span>NEXT PROJECT / {next.index}</span><strong>{next.title}</strong><i>↗</i></Link>
 </main>;
}
