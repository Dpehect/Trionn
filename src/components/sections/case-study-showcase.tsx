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
      gsap.from(item, { y: 90, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 83%" } });
    });
  }, { scope: root });

  return (
    <section ref={root} id="work" className="bg-[#dfe7e1] py-28 md:py-44">
      <div className="container-shell">
        <SectionLabel index="05" label="Selected work" />
        <div className="mt-14 space-y-24">{projects.map((project, index) => (
          <Link data-project href={`/work/${project.slug}`} key={project.slug} className="group block">
            <div className={`grid gap-6 ${index % 2 ? "lg:grid-cols-[.72fr_1.28fr]" : "lg:grid-cols-[1.28fr_.72fr]"}`}>
              <ProjectVisual tone={project.tone} title={project.title} className={`aspect-[5/4] rounded-[1.75rem] ${index % 2 ? "lg:order-2" : ""}`} />
              <div className="flex flex-col justify-between border-t hairline py-5">
                <div className="flex items-start justify-between"><div><p className="eyebrow text-black/45">{project.category}</p><p className="mt-2 text-sm text-black/55">{project.location}</p></div><span className="grid size-12 place-items-center rounded-full border hairline transition duration-500 group-hover:rotate-45 group-hover:bg-foreground group-hover:text-background"><ArrowUpRight /></span></div>
                <div className="mt-20"><h3 className="text-6xl font-semibold tracking-[-.065em] md:text-8xl">{project.title}</h3><p className="mt-5 max-w-md text-base leading-relaxed text-black/60">{project.summary}</p><p className="mt-8 font-mono text-[10px] uppercase tracking-[.18em]">Case study / {project.year}</p></div>
              </div>
            </div>
          </Link>
        ))}</div>
      </div>
    </section>
  );
}
