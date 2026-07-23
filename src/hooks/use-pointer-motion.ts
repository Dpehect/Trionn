"use client";

import { useEffect, useRef } from "react";

export function usePointerMotion() {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const update = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("pointermove", update, { passive: true });
    return () => window.removeEventListener("pointermove", update);
  }, []);

  return pointer;
}
