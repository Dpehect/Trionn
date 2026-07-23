"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/section-label";
import { ProjectArt } from "@/components/work/project-art";
import { projects } from "@/data/projects";

export function CaseStudiesSection() {
  const section = useRef<HTMLElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>("[data-case-card]");
    cards.forEach((card) => {
      gsap.fromTo(card, { y: 90, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 1.1,
        ease: "power4.out",
        scrollTrigger: { trigger: card, start: "top 88%" },
      });
    });
  }, { scope: section });

  return (
    <section ref={section} id="work" className="site-container py-28 sm:py-40">
      <div className="mb-14 grid gap-8 border-t border-white/10 pt-5 md:grid-cols-[.65fr_1.35fr]">
        <SectionLabel index="04">Selected work</SectionLabel>
        <div>
          <h2 className="max-w-[12ch] text-[clamp(3rem,7vw,7.5rem)] font-semibold uppercase leading-[0.84] tracking-[-0.075em]">Systems designed to perform in the real world.</h2>
          <p className="mt-8 max-w-xl text-sm leading-7 text-white/48">A selection of product, AI, commerce and mobile work built with senior teams across Finland and international markets.</p>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {projects.map((project, index) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            data-case-card
            data-cursor="link"
            className={`case-card group ${index % 3 === 0 ? "lg:row-span-2" : ""}`}
          >
            <div className="case-card__visual">
              <ProjectArt project={project} compact={index % 3 !== 0} />
              <span className="case-card__view">View case <ArrowUpRight size={15} /></span>
            </div>
            <div className="case-card__meta">
              <div>
                <span>{project.index}</span>
                <h3>{project.title}</h3>
              </div>
              <p>{project.sector} / {project.year}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
