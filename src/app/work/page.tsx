import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/content/projects";
import { ProjectVisual } from "@/components/ui/project-visual";

export const metadata: Metadata = { title: "Work | Softbridge Solutions", description: "Selected digital product, web and AI case studies by Softbridge Solutions." };

export default function WorkPage() {
  return <main className="pb-28 pt-40"><div className="container-shell"><p className="eyebrow text-black/45">Selected work / 2025–2026</p><h1 className="mt-8 max-w-6xl text-[clamp(4.5rem,11vw,11rem)] font-semibold leading-[.8] tracking-[-.08em]">Systems that move business forward.</h1><div className="mt-24 space-y-20">{projects.map((project) => <Link key={project.slug} href={`/work/${project.slug}`} className="group grid gap-6 border-t hairline pt-6 lg:grid-cols-[1.25fr_.75fr]"><ProjectVisual tone={project.tone} title={project.title} className="aspect-[5/3] rounded-[1.75rem]"/><div className="flex flex-col justify-between"><div className="flex justify-between"><p className="eyebrow text-black/45">{project.category}</p><ArrowUpRight className="transition group-hover:rotate-45" /></div><div className="mt-16"><h2 className="text-6xl font-semibold tracking-[-.06em]">{project.title}</h2><p className="mt-5 max-w-md leading-relaxed text-black/58">{project.summary}</p></div></div></Link>)}</div></div></main>;
}
