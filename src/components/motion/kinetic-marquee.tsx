"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function KineticMarquee() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.to("[data-marquee-track]", { xPercent: -25, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 1 } });
    gsap.fromTo(root.current, { clipPath: "inset(18% 0 18% 0)" }, { clipPath: "inset(0% 0 0% 0)", ease: "none", scrollTrigger: { trigger: root.current, start: "top 85%", end: "top 45%", scrub: 1 } });
  }, { scope: root });
  return <section ref={root} className="overflow-hidden bg-signal py-7 text-foreground md:py-10">
    <div data-marquee-track className="flex w-max items-center whitespace-nowrap text-[clamp(3.5rem,8vw,9rem)] font-medium leading-none tracking-[-.075em]">
      {[0,1,2,3].map((item) => <span key={item} className="flex items-center"><span>STRATEGY / DESIGN / ENGINEERING</span><span className="mx-10 inline-block size-4 bg-foreground md:size-7"/></span>)}
    </div>
  </section>;
}
