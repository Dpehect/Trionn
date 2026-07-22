"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import type { Project } from "@/lib/types";
import { features } from "@/config/phase";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

gsap.registerPlugin(Flip);

export function ProjectFocus({ project, sourceRect }: { project: Project; sourceRect: DOMRect | null }) {
  const groupRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    const group = groupRef.current;
    if (!group || reduced) return;
    const items = Array.from(group.querySelectorAll<HTMLElement>("[data-focus-media]")) as HTMLElement[];
    const stage = group.parentElement?.getBoundingClientRect();
    if (!stage) return;

    const genericLayout = [
      { x: 8, y: 20, w: 18, h: 26 },
      { x: 30, y: 55, w: 22, h: 28 },
      { x: 57, y: 20, w: 24, h: 26 },
      { x: 70, y: 56, w: 18, h: 25 },
      { x: 38, y: 18, w: 15, h: 20 },
      { x: 12, y: 59, w: 14, h: 22 },
    ];
    const targetLayout = features.projectCompositions ? project.focusLayout : genericLayout;

    const from = sourceRect
      ? { x: sourceRect.left - stage.left, y: sourceRect.top - stage.top, width: sourceRect.width, height: sourceRect.height }
      : { x: stage.width * 0.5, y: stage.height * 0.5, width: 1, height: 1 };

    items.forEach((item) => gsap.set(item, {
      left: from.x, top: from.y, width: from.width, height: from.height, opacity: 0, scale: 0.88,
    }));

    if (features.flipMotion) {
      const state = Flip.getState(items);
      items.forEach((item, index) => {
        const rect = targetLayout[index] ?? targetLayout[targetLayout.length - 1];
        item.style.left = `${rect.x}%`;
        item.style.top = `${rect.y}%`;
        item.style.width = `${rect.w}%`;
        item.style.height = `${rect.h}%`;
        item.style.opacity = "1";
        item.style.transform = "scale(1)";
      });
      Flip.from(state, { duration: 0.86, ease: "expo.inOut", stagger: 0.035, absolute: true });
    } else {
      items.forEach((item, index) => {
        const rect = targetLayout[index] ?? targetLayout[targetLayout.length - 1];
        gsap.to(item, {
          left: `${rect.x}%`, top: `${rect.y}%`, width: `${rect.w}%`, height: `${rect.h}%`,
          opacity: 1, scale: 1, duration: 0.75, ease: "power4.inOut", delay: index * 0.035,
        });
      });
    }
  }, [project, reduced, sourceRect]);

  return (
    <div className="focus-group" ref={groupRef} aria-hidden>
      {project.focusMedia.map((src, index) => (
        <div key={src} className="focus-media" data-focus-media>
          <Image src={src} alt="" fill sizes="(max-width: 768px) 50vw, 28vw" className="media-image" priority={index < 2} />
        </div>
      ))}
    </div>
  );
}
