"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useExperienceStore } from "@/store/experience-store";
import { useMobileExperience } from "@/hooks/use-mobile-experience";
import { MobileHeroFallback } from "@/components/mobile-hero-fallback";
import { WebGLErrorBoundary } from "@/components/webgl-error-boundary";

const HeroScene = dynamic(
  () =>
    import("@/components/hero-scene").then(
      (module) => module.HeroScene
    ),
  {
    ssr: false,
    loading: () => <MobileHeroFallback />,
  }
);

export function HeroExperience() {
  const root = useRef<HTMLElement>(null);
  const [engaged, setEngaged] = useState(false);
  const reducedMotion = useExperienceStore(
    (state) => state.reducedMotion
  );
  const quality = useExperienceStore((state) => state.quality);
  const { touchOptimized } = useMobileExperience();

  useEffect(() => {
    if (!root.current || reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.to("[data-hero-copy]", {
        yPercent: touchOptimized ? -8 : -18,
        opacity: touchOptimized ? 0.7 : 0.45,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);

    return () => context.revert();
  }, [reducedMotion, touchOptimized]);

  const fallback = <MobileHeroFallback />;

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-28 md:min-h-[115vh] md:pt-32"
      onPointerDown={() => {
        if (!touchOptimized) setEngaged(true);
      }}
      onPointerUp={() => setEngaged(false)}
      onPointerLeave={() => setEngaged(false)}
    >
      <div className="absolute inset-0 z-[var(--z-canvas)]">
        {touchOptimized || reducedMotion ? (
          fallback
        ) : (
          <WebGLErrorBoundary fallback={fallback}>
            <HeroScene engaged={engaged} quality={quality} />
          </WebGLErrorBoundary>
        )}
      </div>

      <div className="container-x relative z-[var(--z-content)]">
        <p className="eyebrow">
          Independent design & development studio
        </p>
      </div>

      <div className="container-x relative z-[var(--z-content)] pb-8 md:pb-10">
        <div data-hero-copy>
          <h1 className="display-hero mix-blend-difference">
            WE MAKE
            <br />
            <span className="text-[var(--accent-primary)]">
              DIGITAL
            </span>
            <br />
            FEEL ALIVE.
          </h1>
        </div>

        <div className="mt-7 grid gap-3 border-t hairline pt-4 text-[10px] uppercase tracking-[.15em] md:mt-8 md:grid-cols-3 md:gap-5 md:pt-5 md:text-xs">
          <span>
            {touchOptimized
              ? "Swipe to explore"
              : engaged
                ? "Energy engaged"
                : "Press and hold"}
          </span>
          <span className="md:text-center">
            WebGL / Motion / Product
          </span>
          <span className="md:text-right">
            Scroll to enter ↓
          </span>
        </div>
      </div>
    </section>
  );
}
