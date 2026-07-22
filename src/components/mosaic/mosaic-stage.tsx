"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { features } from "@/config/phase";
import { homeTiles, projectBySlug } from "@/data/projects";
import { useStudioStore } from "@/store/use-studio-store";
import { AnimatedTitle } from "@/components/motion/animated-title";
import { ProjectFocus } from "@/components/mosaic/project-focus";

export function MosaicStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [sourceRect, setSourceRect] = useState<DOMRect | null>(null);
  const activeProject = useStudioStore((state) => state.activeProject);
  const setActiveProject = useStudioStore((state) => state.setActiveProject);
  const setCursorLabel = useStudioStore((state) => state.setCursorLabel);
  const project = useMemo(() => activeProject ? projectBySlug[activeProject] : null, [activeProject]);

  const activate = (slug: string, element: HTMLElement) => {
    if (!features.hover) return;
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setSourceRect(element.getBoundingClientRect());
    setActiveProject(slug);
    setCursorLabel(features.projectDetails ? "View" : "");
  };

  const scheduleReset = () => {
    if (!features.hover) return;
    leaveTimer.current = setTimeout(() => {
      setActiveProject(null);
      setCursorLabel("");
      setSourceRect(null);
    }, 170);
  };

  return (
    <main className="studio-stage" ref={stageRef} onPointerLeave={scheduleReset}>
      <div className="title-wrap">
        <AnimatedTitle>{project?.title ?? "Moving Missions Forward"}</AnimatedTitle>
      </div>

      {features.mosaic && (
        <div className={`home-mosaic ${project ? "has-focus" : ""} ${!features.coordinateEngine ? "is-grid-fallback" : ""}`}>
          {homeTiles.map((tile, index) => {
            const style = features.coordinateEngine
              ? { left: `${tile.layout.x}%`, top: `${tile.layout.y}%`, width: `${tile.layout.w}%`, height: `${tile.layout.h}%` }
              : undefined;
            const media = (
              <Image
                src={tile.src}
                alt={tile.alt}
                fill
                sizes="(max-width: 767px) 46vw, 14vw"
                className="media-image"
                priority={features.performance ? index < 7 : false}
              />
            );
            return (
              <div
                key={tile.id}
                className={`mosaic-tile ${project?.slug === tile.projectSlug ? "is-source-project" : ""}`}
                style={style}
                onPointerEnter={(event) => activate(tile.projectSlug, event.currentTarget)}
                onPointerLeave={scheduleReset}
                onFocus={(event) => activate(tile.projectSlug, event.currentTarget)}
                onBlur={scheduleReset}
              >
                {features.projectDetails ? (
                  <Link href={`/work/${tile.projectSlug}`} aria-label={`Open ${projectBySlug[tile.projectSlug].title}`}>{media}</Link>
                ) : media}
              </div>
            );
          })}
        </div>
      )}

      {features.focusMode && project && <ProjectFocus project={project} sourceRect={sourceRect} />}
    </main>
  );
}
