"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export function PageTransition() {
  const pathname = usePathname();
  const root = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>("[data-route-panel]");
      gsap.timeline()
        .set(root.current, { display: "block" })
        .fromTo(panels, { scaleY: 0, transformOrigin: "bottom" }, { scaleY: 1, duration: .55, stagger: .06, ease: "power4.inOut" })
        .call(() => window.scrollTo(0, 0))
        .to(panels, { scaleY: 0, transformOrigin: "top", duration: .7, stagger: .05, ease: "power4.inOut" }, "+=.05")
        .set(root.current, { display: "none" });
    }, root);
    return () => ctx.revert();
  }, [pathname]);

  return <div ref={root} className="pointer-events-none fixed inset-0 z-[170] hidden grid-cols-3" aria-hidden="true">
    <div data-route-panel className="bg-foreground"/><div data-route-panel className="bg-signal"/><div data-route-panel className="bg-foreground"/>
  </div>;
}
