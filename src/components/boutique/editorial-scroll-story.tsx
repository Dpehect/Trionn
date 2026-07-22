"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const chapters = [
  { index: "01", title: "Cut", copy: "Silhouette begins with proportion: long lines, compact layers and deliberate space.", image: "/editorial/collection-01.svg" },
  { index: "02", title: "Surface", copy: "Wool, cotton, leather and technical textile create contrast without visual noise.", image: "/editorial/collection-02.svg" },
  { index: "03", title: "Motion", copy: "Every object is tested through walking, sitting and the repeated movement of a real day.", image: "/editorial/collection-03.svg" },
] as const;

export function EditorialScrollStory() {
  const rootRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(() => {
    const root = rootRef.current;
    if (!root || reduced) return;
    const frames = gsap.utils.toArray<HTMLElement>("[data-story-frame]", root);
    frames.forEach((frame, index) => {
      gsap.fromTo(frame, { clipPath: "inset(100% 0 0 0)", scale: 1.08 }, {
        clipPath: "inset(0% 0 0 0)",
        scale: 1,
        ease: "none",
        scrollTrigger: { trigger: frame, start: "top 82%", end: "top 30%", scrub: 1 },
      });
      const copy = root.querySelector<HTMLElement>(`[data-story-copy='${index}']`);
      if (copy) gsap.from(copy, { y: 60, opacity: 0, duration: 0.8, scrollTrigger: { trigger: frame, start: "top 65%", once: true } });
    });
    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, { scope: rootRef, dependencies: [reduced] });

  return (
    <section className="editorial-story section-shell" ref={rootRef}>
      <div className="section-index">05 / MATERIAL STORY</div>
      <div className="editorial-story-head"><p className="section-eyebrow">Built for the body in motion</p><h2>Cut, surface and movement become one object.</h2></div>
      <div className="editorial-chapters">
        {chapters.map((chapter, index) => <article className="editorial-chapter" key={chapter.title}><div className="editorial-frame" data-story-frame><Image src={chapter.image} alt={`${chapter.title} editorial study`} fill sizes="(max-width: 800px) 100vw, 56vw" /></div><div className="editorial-chapter-copy" data-story-copy={index}><span>{chapter.index}</span><h3>{chapter.title}</h3><p>{chapter.copy}</p></div></article>)}
      </div>
    </section>
  );
}
