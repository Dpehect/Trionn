"use client";

import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { projects } from "@/data/projects";

export function ProjectCarousel() {
  const [viewportRef, embla] = useEmblaCarousel({ loop: true, align: "start", dragFree: true });
  const [progress, setProgress] = useState(0);

  const updateProgress = useCallback(() => {
    if (!embla) return;
    setProgress(Math.max(0, Math.min(1, embla.scrollProgress())));
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    updateProgress();
    embla.on("scroll", updateProgress);
    embla.on("reInit", updateProgress);
    return () => {
      embla.off("scroll", updateProgress);
      embla.off("reInit", updateProgress);
    };
  }, [embla, updateProgress]);

  return (
    <section className="py-28">
      <div className="container-x mb-10 flex items-end justify-between">
        <div><p className="eyebrow">Drag to explore</p><h2 className="mt-4 text-5xl tracking-[-.06em] md:text-8xl">Selected signals</h2></div>
        <span className="eyebrow">{Math.round(progress * 100)}%</span>
      </div>
      <div ref={viewportRef} className="overflow-hidden">
        <div className="flex touch-pan-y gap-5 pl-[max(16px,calc((100vw-1440px)/2))]">
          {projects.concat(projects).map((project, index) => (
            <Link href={`/work/${project.slug}`} key={`${project.slug}-${index}`} className="group min-w-[78vw] md:min-w-[48vw]">
              <div className="aspect-[4/3] overflow-hidden rounded-[2rem] border hairline p-7" style={{ background: `radial-gradient(circle at 50% 40%, ${project.accent}, #121212 60%)` }}>
                <div className="flex h-full flex-col justify-between">
                  <span className="eyebrow text-white/65">{project.category}</span>
                  <span className="self-end text-[8rem] font-black leading-none text-black/25 transition-transform duration-700 group-hover:rotate-12 md:text-[14rem]">✦</span>
                  <h3 className="text-4xl font-semibold tracking-[-.055em] md:text-7xl">{project.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="container-x mt-8 h-px bg-white/15"><div className="h-full bg-[var(--acid)]" style={{ width: `${Math.max(8, progress * 100)}%` }} /></div>
    </section>
  );
}
