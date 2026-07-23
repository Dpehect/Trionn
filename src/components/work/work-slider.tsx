"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowUpRight, MoveHorizontal } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { caseStudies } from "@/data/case-studies";
import { ProductVisual } from "@/components/work/product-visual";

gsap.registerPlugin(ScrollTrigger);

export function WorkSlider() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      if (!section.current || !track.current) return;
      const getDistance = () => Math.max(0, track.current!.scrollWidth - window.innerWidth + 64);
      const tween = gsap.to(track.current, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: () => `+=${getDistance() + window.innerHeight * 0.7}`,
          pin: true,
          scrub: 0.7,
          invalidateOnRefresh: true,
        },
      });
      return () => tween.kill();
    });
    return () => media.revert();
  }, []);

  return (
    <section ref={section} id="work" className="work-experience">
      <div className="work-intro">
        <div><p className="section-eyebrow">04 / Selected work</p><h2 className="display-section">Products designed to create measurable momentum.</h2></div>
        <div className="work-intro__aside"><p>Selected product engineering, AI and experience design engagements across Finland and Europe.</p><span><MoveHorizontal size={17}/> Drag or scroll</span></div>
      </div>
      <div ref={track} className="work-track">
        {caseStudies.map((project) => (
          <Link href={`/projects/${project.slug}`} className="work-card" key={project.slug} data-cursor="view">
            <div className="work-card__visual"><ProductVisual project={project} compact /></div>
            <span className="work-card__status">{project.status}</span><div className="work-card__body"><div><p>{project.industry}</p><h3>{project.title}</h3></div><ArrowUpRight size={25}/></div>
            <p className="work-card__summary">{project.summary}</p>
          </Link>
        ))}
        <Link href="/projects" className="work-card work-card--archive"><span>All case studies</span><ArrowUpRight size={34}/></Link>
      </div>
    </section>
  );
}
