"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { ProjectArt } from "@/components/work/project-art";

gsap.registerPlugin(ScrollTrigger);

export function HorizontalWork() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      if (!track.current) return;
      const distance = () => Math.max(0, track.current!.scrollWidth - window.innerWidth);
      const tween = gsap.to(track.current, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: () => `+=${distance() + window.innerHeight * 0.8}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => section.current?.style.setProperty("--horizontal-progress", String(self.progress)),
        },
      });
      return () => tween.kill();
    });
    return () => media.revert();
  }, { scope: section });

  return (
    <section ref={section} className="horizontal-work" aria-label="Horizontal project showcase">
      <div className="horizontal-work__header site-container">
        <p>Featured systems / drag or scroll</p>
        <span>04 projects</span>
      </div>
      <div ref={track} className="horizontal-work__track">
        <div className="horizontal-work__intro">
          <span>Selected work</span>
          <h2>BUILDING<br />WHAT<br />MOVES NEXT.</h2>
        </div>
        {projects.map((project) => (
          <article key={project.slug} className="horizontal-project">
            <Link href={`/work/${project.slug}`} data-cursor="link" className="horizontal-project__link">
              <ProjectArt project={project} compact />
              <div className="horizontal-project__copy">
                <span>{project.index}</span>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <small>{project.services.join(" / ")}</small>
                <ArrowUpRight className="horizontal-project__arrow" />
              </div>
            </Link>
          </article>
        ))}
      </div>
      <div className="horizontal-work__progress"><span /></div>
    </section>
  );
}
