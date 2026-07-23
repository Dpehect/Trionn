"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { ProjectCard } from "@/components/projects/project-card";
import { projects } from "@/lib/site-data";

export function ProjectsGallery() {
  const scroller = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = scroller.current;
    if (!node) return;
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      event.preventDefault();
      node.scrollLeft += event.deltaY * 1.18;
    };
    const onScroll = () => {
      const max = node.scrollWidth - node.clientWidth;
      setProgress(max > 0 ? node.scrollLeft / max : 0);
    };
    node.addEventListener("wheel", onWheel, { passive: false });
    node.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { node.removeEventListener("wheel", onWheel); node.removeEventListener("scroll", onScroll); };
  }, []);

  useGSAP(() => {
    gsap.from("[data-project-card]", { x: 110, opacity: 0, duration: 1.2, stagger: 0.09, ease: "power4.out", delay: 0.2 });
  }, { scope: scroller });

  return (
    <>
      <div className="projects-gallery" ref={scroller} tabIndex={0} aria-label="Project gallery">
        <div className="projects-gallery__track">
          {projects.map((project) => <ProjectCard key={project.slug} project={project} />)}
          <div className="projects-gallery__end"><span>END OF INDEX</span><strong>06 / 06</strong></div>
        </div>
      </div>
      <div className="gallery-progress" aria-hidden="true"><span style={{ transform: `scaleX(${Math.max(progress, 0.025)})` }} /></div>
    </>
  );
}
