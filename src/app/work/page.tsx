import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { projects } from "@/data/projects";

export const metadata = { title: "Work" };

export default function WorkPage() {
  return (
    <main>
      <SiteHeader />
      <section className="container-x min-h-screen pb-24 pt-40">
        <p className="eyebrow">Selected work / 2025–2026</p>
        <h1 className="mt-8 text-[clamp(5rem,16vw,15rem)] font-bold leading-[.75] tracking-[-.08em]">WORK</h1>
        <div className="mt-20">
          {projects.map((project, index) => (
            <Link href={`/work/${project.slug}`} key={project.slug} className="group grid gap-6 border-t hairline py-8 md:grid-cols-[60px_1fr_230px_40px] md:items-center">
              <span className="text-xs text-[var(--muted)]">0{index + 1}</span>
              <div>
                <h2 className="text-4xl font-semibold tracking-[-.055em] transition-transform duration-500 group-hover:translate-x-4 md:text-7xl">{project.title}</h2>
                <p className="mt-3 max-w-xl text-[var(--muted)]">{project.summary}</p>
              </div>
              <div className="eyebrow">{project.category}<br />{project.year}</div>
              <ArrowUpRight className="transition-transform duration-500 group-hover:rotate-45" />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
