import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { TrionnHeader } from "@/components/trionn/header";
import { TrionnFooter } from "@/components/trionn/footer";
export default function WorkPage(){return <main className="trionn-site"><TrionnHeader/><section className="work-index-hero"><p>WORK / ARCHIVE</p><h1>SELECTED<br/><span>SIGNALS.</span></h1></section><section className="work-grid">{projects.map(p=><Link href={`/work/${p.slug}`} key={p.slug} className="work-card" style={{"--accent":p.accent} as React.CSSProperties}><div className="work-card-image"><Image src={p.cover} alt="" fill sizes="(max-width: 800px) 100vw, 50vw"/></div><div><span>{p.index} / {p.year}</span><h2>{p.title}</h2><p>{p.category}</p></div></Link>)}</section><TrionnFooter/></main>}
