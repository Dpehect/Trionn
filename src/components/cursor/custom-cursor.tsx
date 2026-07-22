"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { features } from "@/config/phase";
import { useStudioStore } from "@/store/use-studio-store";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const label = useStudioStore((state) => state.cursorLabel);

  useEffect(() => {
    if (!features.customCursor || window.matchMedia("(pointer: coarse)").matches) return;
    const cursor = cursorRef.current;
    if (!cursor) return;
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.18, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.18, ease: "power3" });
    const move = (event: PointerEvent) => { xTo(event.clientX); yTo(event.clientY); };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  if (!features.customCursor) return null;
  return <div className={`custom-cursor ${label ? "is-labeled" : ""}`} ref={cursorRef} aria-hidden><span>{label}</span></div>;
}
