"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function IntroStage() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const media = gsap.matchMedia();
    media.add("(min-width: 768px)", () => {
      gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=125%",
          pin: true,
          scrub: 1,
        },
      })
        .fromTo("[data-intro-circle]", { scale: 0.68, rotate: -24 }, { scale: 1.65, rotate: 18, ease: "none" }, 0)
        .fromTo("[data-intro-image]", { clipPath: "inset(18% 18% 18% 18% round 2rem)" }, { clipPath: "inset(0% 0% 0% 0% round 2.5rem)", ease: "none" }, 0)
        .fromTo("[data-intro-copy]", { y: 60, opacity: 0 }, { y: 0, opacity: 1, ease: "none" }, 0.2);
    });

    return () => media.revert();
  }, { scope: root });

  return (
    <section ref={root} className="relative min-h-screen overflow-hidden bg-lavender py-20 md:grid md:place-items-center md:py-0">
      <div data-intro-circle className="absolute -left-[14vw] top-[12%] size-[54vw] min-h-[480px] min-w-[480px] rounded-full border-[5.5rem] border-forest border-r-transparent md:border-[8rem]" aria-hidden="true" />
      <div className="container-site relative z-10 grid items-center gap-10 md:grid-cols-[1.08fr_.92fr]">
        <div data-intro-image className="relative min-h-[480px] overflow-hidden rounded-stage stage-shadow md:min-h-[650px]">
          <Image src="/art/studio-scene.svg" alt="Abstract Softbridge studio collaboration" fill className="object-cover" />
        </div>
        <div data-intro-copy className="md:pl-10">
          <p className="eyebrow text-forest/55">One operating model</p>
          <h2 className="heading-xl mt-6 max-w-[10ch]">One team, without the hand-off.</h2>
          <p className="body-lg mt-7 max-w-xl text-forest/72">
            Helsinki keeps strategy and product decisions close. Türkiye extends senior design, software and AI delivery. The same people preserve context from framing to production.
          </p>
          <dl className="mt-10 border-t border-forest/20">
            {[
              ["Helsinki", "Client strategy, stakeholder alignment, product direction"],
              ["Türkiye", "Senior product design, engineering, AI and platform delivery"],
              ["Shared", "One backlog, standards, decision record and accountability"],
            ].map(([term, detail]) => (
              <div key={term} className="grid grid-cols-[95px_1fr] gap-4 border-b border-forest/20 py-4">
                <dt className="eyebrow pt-1">{term}</dt><dd className="text-forest/66">{detail}</dd>
              </div>
            ))}
          </dl>
          <Link href="/studio" className="link-line mt-8">See how the studio works ↗</Link>
        </div>
      </div>
    </section>
  );
}
