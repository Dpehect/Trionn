"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export function MotionLayer() {
  const cursor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = cursor.current;
    if (!node || window.matchMedia("(pointer: coarse)").matches) return;
    const xTo = gsap.quickTo(node, "x", { duration: 0.35, ease: "power3" });
    const yTo = gsap.quickTo(node, "y", { duration: 0.35, ease: "power3" });
    const move = (event: PointerEvent) => { xTo(event.clientX); yTo(event.clientY); };
    const over = (event: PointerEvent) => {
      const target = event.target as HTMLElement;
      node.dataset.active = target.closest("a,button,[data-cursor]") ? "true" : "false";
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    return () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerover", over); };
  }, []);

  useGSAP(() => {
    gsap.fromTo("[data-motion-reveal]", { y: 42, opacity: 0 }, {
      y: 0, opacity: 1, duration: 1.15, stagger: 0.08, ease: "expo.out", delay: 0.15,
    });
  }, []);

  return <div ref={cursor} className="custom-cursor" aria-hidden="true"><span>VIEW</span></div>;
}
