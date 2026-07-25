"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { caseStudies } from "@/data/cases";
import styles from "./arc-carousel-section.module.css";

const CLONE_COUNT = 6;

function shortestWrappedDistance(index: number, position: number, count: number) {
  let distance = index - position;
  const half = count / 2;

  if (distance > half) distance -= count;
  if (distance < -half) distance += count;

  return distance;
}

export function ArcCarouselSection({
  currentSlug,
}: {
  currentSlug: string;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(0);
  const targetRef = useRef(0);
  const velocityRef = useRef(0);
  const dragStartRef = useRef({ x: 0, position: 0 });
  const lastMoveRef = useRef({ x: 0, time: 0 });
  const isDraggingRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragging, setDragging] = useState(false);

  const relatedCases = useMemo(
    () => caseStudies.filter((study) => study.slug !== currentSlug),
    [currentSlug],
  );

  const cloneCount = Math.min(CLONE_COUNT, relatedCases.length);

  const renderedCases = useMemo(
    () => [
      ...relatedCases.slice(-cloneCount),
      ...relatedCases,
      ...relatedCases.slice(0, cloneCount),
    ],
    [cloneCount, relatedCases],
  );

  useEffect(() => {
    positionRef.current = cloneCount;
    targetRef.current = cloneCount;
    velocityRef.current = 0;
    setActiveIndex(0);

    const animate = () => {
      const position = positionRef.current;

      if (!isDraggingRef.current) {
        velocityRef.current *= 0.94;
        targetRef.current += velocityRef.current;
      }

      positionRef.current =
        position + (targetRef.current - position) * 0.115;

      const count = relatedCases.length;
      const min = cloneCount;
      const max = cloneCount + count;

      if (count > 0) {
        if (positionRef.current < min - 1) {
          positionRef.current += count;
          targetRef.current += count;
        } else if (positionRef.current > max + 1) {
          positionRef.current -= count;
          targetRef.current -= count;
        }

        const originalIndex =
          ((Math.round(positionRef.current) - cloneCount) % count + count) %
          count;

        setActiveIndex((current) =>
          current === originalIndex ? current : originalIndex,
        );
      }

      viewportRef.current?.style.setProperty(
        "--arc-position",
        String(positionRef.current),
      );

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [cloneCount, currentSlug, relatedCases.length]);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    event.currentTarget.setPointerCapture(event.pointerId);
    isDraggingRef.current = true;
    setDragging(true);
    velocityRef.current = 0;

    dragStartRef.current = {
      x: event.clientX,
      position: targetRef.current,
    };

    lastMoveRef.current = {
      x: event.clientX,
      time: performance.now(),
    };
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--cursor-x", `${event.clientX}px`);
    event.currentTarget.style.setProperty("--cursor-y", `${event.clientY}px`);

    if (!isDraggingRef.current) return;

    const viewportWidth = Math.max(
      viewportRef.current?.clientWidth ?? 1,
      1,
    );
    const pixelsPerCard = Math.max(150, viewportWidth * 0.13);
    const delta =
      (event.clientX - dragStartRef.current.x) / pixelsPerCard;

    targetRef.current = dragStartRef.current.position - delta;

    const now = performance.now();
    const dt = Math.max(now - lastMoveRef.current.time, 8);
    const dx = event.clientX - lastMoveRef.current.x;

    velocityRef.current =
      (-dx / pixelsPerCard) * (16.67 / dt);

    lastMoveRef.current = {
      x: event.clientX,
      time: now,
    };
  };

  const finishDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    isDraggingRef.current = false;
    setDragging(false);
    targetRef.current += velocityRef.current * 7.5;
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      velocityRef.current = 0;
      targetRef.current += 1;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      velocityRef.current = 0;
      targetRef.current -= 1;
    }

    if (event.key === "Home") {
      event.preventDefault();
      velocityRef.current = 0;
      targetRef.current = cloneCount;
    }
  };

  return (
    <section className={styles.section} aria-labelledby="arc-carousel-title">
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Section 03 — Related work</p>
          <h2 id="arc-carousel-title" className={styles.title}>
            Explore other cases.
          </h2>
        </div>


      </div>

      <div
        ref={viewportRef}
        className={`${styles.viewport} ${dragging ? styles.dragging : ""}`}
        role="region"
        aria-roledescription="carousel"
        aria-label="Other SoftBridge Solutions case studies. Drag or use the arrow keys."
        tabIndex={0}
        onPointerEnter={(event) => {
          event.currentTarget.style.setProperty(
            "--cursor-x",
            `${event.clientX}px`,
          );
          event.currentTarget.style.setProperty(
            "--cursor-y",
            `${event.clientY}px`,
          );
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onKeyDown={onKeyDown}
      >
        <div className={styles.ring}>
          {renderedCases.map((study, index) => {
            const sourceIndex =
              ((index - cloneCount) % relatedCases.length +
                relatedCases.length) %
              relatedCases.length;

            const distance = shortestWrappedDistance(
              index,
              cloneCount + activeIndex,
              renderedCases.length,
            );

            const isActive =
              sourceIndex === activeIndex && Math.abs(distance) < 1.1;

            const isClone =
              index < cloneCount ||
              index >= cloneCount + relatedCases.length;

            return (
              <div
                className={`${styles.slot} ${isActive ? styles.active : ""}`}
                style={
                  {
                    "--slot-index": index,
                  } as React.CSSProperties
                }
                key={`${study.slug}-${index}`}
                aria-hidden={isClone}
              >
                <article className={styles.card}>
                  <div className={styles.tags}>
                    <span>{study.kicker.split("/")[0]?.trim()}</span>
                    <span>{study.tags[0]}</span>
                  </div>

                  <div className={styles.coverWrap}>
                    <a
                      className={styles.cover}
                      href={`/cases/${study.slug}`}
                      aria-label={`View case study: ${study.title}`}
                      draggable={false}
                      tabIndex={isClone ? -1 : 0}
                    >
                      <img
                        src={study.editorialHero}
                        alt={`${study.title} — SoftBridge Solutions case study`}
                        draggable={false}
                      />
                    </a>
                  </div>

                  <div className={styles.text}>
                    <h3>{study.title}</h3>
                    <p>{study.intro}</p>
                    <a
                      href={`/cases/${study.slug}`}
                      tabIndex={isClone ? -1 : 0}
                    >
                      View case
                    </a>
                  </div>
                </article>
              </div>
            );
          })}
        </div>

        <div className={styles.dragCursor} aria-hidden="true">
          <span>&lt; DRAG &gt;</span>
        </div>
      </div>

      <div className={styles.progress} aria-hidden="true">
        <span
          style={{
            width: `${((activeIndex + 1) / relatedCases.length) * 100}%`,
          }}
        />
      </div>
    </section>
  );
}
