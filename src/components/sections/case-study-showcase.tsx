"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/content/projects";
import { ProjectVisual } from "@/components/ui/project-visual";
import { SectionLabel } from "@/components/ui/section-label";

export function CaseStudyShowcase() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>("[data-project]").forEach((item) => {
      gsap.from(item, { y: 80, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 84%" } });
    });
  }, { scope: root });

  return (
    <section ref={root} id="work" className="py-28 md:py-44">
      <div className="container-shell">
        <SectionLabel index="05" label="Selected work" />
        <div className="mt-14 space-y-28">
          {projects.map((project, index) => (
            <Link data-project href={`/work/${project.slug}`} key={project.slug} className="group block">
              <ProjectVisual tone={project.tone} title={project.title} className="aspect-[16/10] md:aspect-[16/8]" />
              <div className="grid gap-7 border-b hairline py-7 md:grid-cols-[1fr_.8fr_auto] md:items-start">
                <div><p className="index-number text-black/40">0{index + 1} / {project.year}</p><h3 className="mt-3 text-5xl font-medium tracking-[-.06em] md:text-7xl">{project.title}</h3></div>
                <div><p className="eyebrow text-black/42">{project.category} / {project.location}</p><p className="mt-4 max-w-lg leading-relaxed text-black/58">{project.summary}</p></div>
                <span className="grid size-12 place-items-center border border-black/25 transition-colors duration-300 group-hover:bg-foreground group-hover:text-background"><ArrowUpRight /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
