"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import { useRef } from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.set(".route-curtain", { scaleY: 1, transformOrigin: "top" });
      gsap.set(".route-content", { opacity: 0, y: 18 });
      const timeline = gsap.timeline({ defaults: { ease: "expo.inOut" } });
      timeline
        .to(".route-curtain", { scaleY: 0, duration: 0.9, transformOrigin: "bottom" })
        .to(".route-content", { opacity: 1, y: 0, duration: 0.8, ease: "power4.out" }, "-=0.48");
    }, root);
    return () => ctx.revert();
  }, { scope: root, dependencies: [pathname] });

  return (
    <div ref={root} className="route-frame">
      <div className="route-curtain" aria-hidden="true" />
      <div className="route-content" key={pathname}>{children}</div>
    </div>
  );
}
