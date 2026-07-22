"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { GripHorizontal } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

gsap.registerPlugin(Draggable, InertiaPlugin);

const workflow = [
  ["01", "Evidence", "Connect interviews, tickets, analytics and research notes."],
  ["02", "Direction", "Translate evidence into a visible product hypothesis."],
  ["03", "Flow", "Map user intent, system responses and edge conditions."],
  ["04", "Interface", "Keep every component state attached to the product logic."],
  ["05", "Readiness", "Track ownership, dependencies and launch gates live."],
  ["06", "Learning", "Return post-launch evidence to the same product map."],
] as const;

export function DraggableWorkflow() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track || reduced) return;

    const getBounds = () => ({ minX: Math.min(0, viewport.clientWidth - track.scrollWidth), maxX: 0 });
    const draggable = Draggable.create(track, {
      type: "x",
      bounds: getBounds(),
      inertia: true,
      edgeResistance: 0.88,
      dragResistance: 0.04,
      cursor: "grab",
      activeCursor: "grabbing",
      snap: {
        x: (value) => {
          const first = track.querySelector<HTMLElement>(".workflow-card");
          if (!first) return value;
          const step = first.offsetWidth + 14;
          return Math.round(value / step) * step;
        },
      },
    })[0];

    const resize = () => draggable.applyBounds(getBounds());
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      draggable.kill();
    };
  }, [reduced]);

  return (
    <section className="draggable-section section-shell">
      <div className="section-index">06 / DRAGGABLE</div>
      <div className="draggable-heading">
        <div><p className="section-eyebrow">Momentum product workflow</p><h2>Move through the system without losing the thread.</h2></div>
        <p>Drag the workflow. Inertia and snap preserve a tactile feeling without adding a persistent render loop.</p>
      </div>
      <div className="workflow-viewport" ref={viewportRef}>
        <div className="workflow-track" ref={trackRef}>
          {workflow.map(([index, title, copy]) => (
            <article className="workflow-card" key={title}>
              <div className="workflow-card-top"><span>{index}</span><GripHorizontal size={19} /></div>
              <h3>{title}</h3>
              <p>{copy}</p>
              <div className="workflow-card-line"><i /><span /></div>
            </article>
          ))}
        </div>
      </div>
      <div className="drag-instruction"><span>DRAG</span><i /><span>RELEASE WITH MOMENTUM</span></div>
    </section>
  );
}
