"use client";

import { type MutableRefObject, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { PerspectiveCamera } from "three";
import type { GarmentHandle } from "@/components/canvas/Garment";
import { useGarmentStore } from "@/store/useGarmentStore";

interface UseGarmentAnimationOptions {
  garmentRef: MutableRefObject<GarmentHandle | null>;
  cameraRef: MutableRefObject<PerspectiveCamera | null>;
}

export function useGarmentAnimation({
  garmentRef,
  cameraRef,
}: UseGarmentAnimationOptions): void {
  const setHotspotsVisible = useGarmentStore(
    (state) => state.setHotspotsVisible,
  );

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const garment = garmentRef.current;
    const camera = cameraRef.current;

    if (!garment || !camera) {
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      garment.group.position.set(0, -0.2, 0);
      garment.group.rotation.set(0, 0, 0);
      camera.position.set(0, 0, 4.5);
      setHotspotsVisible(true);
      return;
    }

    const context = gsap.context(() => {
      gsap.set(garment.group.position, {
        x: 0,
        y: -0.2,
        z: 0,
      });

      gsap.set(garment.group.rotation, {
        x: 0,
        y: 0,
        z: 0,
      });

      gsap.set(camera.position, {
        x: 0,
        y: 0,
        z: 5,
      });

      // SECTION 1 — HERO
      gsap.timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
      .to(
        garment.group.rotation,
        {
          y: Math.PI * 2,
          ease: "none",
        },
        0,
      )
      .to(
        garment.group.position,
        {
          y: -0.05,
          ease: "none",
        },
        0,
      );

      // SECTION 2 — DETAILS
      const detailsTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#details",
          start: "top 75%",
          end: "bottom 25%",
          scrub: 1,
          invalidateOnRefresh: true,
          onEnter: () => setHotspotsVisible(false),
          onEnterBack: () => setHotspotsVisible(false),
        },
      });

      detailsTimeline
        .to(
          camera.position,
          {
            x: 0.6,
            y: 0.3,
            z: 2.2,
            ease: "power2.inOut",
          },
          0,
        )
        .to(
          garment.group.position,
          {
            x: -0.8,
            y: 0.05,
            z: 0.15,
            ease: "power2.inOut",
          },
          0,
        )
        .to(
          garment.group.rotation,
          {
            y: Math.PI * 2.12,
            x: -0.05,
            ease: "power2.inOut",
          },
          0,
        )
        .fromTo(
          "[data-detail-card]",
          {
            autoAlpha: 0,
            y: 24,
          },
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.2,
            duration: 0.55,
            ease: "power3.out",
          },
          0.18,
        );

      // SECTION 3 — VARIANTS
      const variantsTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#variants",
          start: "top 75%",
          end: "center center",
          scrub: 1,
          invalidateOnRefresh: true,
          onEnter: () => setHotspotsVisible(true),
          onEnterBack: () => setHotspotsVisible(true),
          onLeaveBack: () => setHotspotsVisible(false),
        },
      });

      variantsTimeline
        .to(
          camera.position,
          {
            x: 0,
            y: 0,
            z: 4.5,
            ease: "power2.inOut",
          },
          0,
        )
        .to(
          garment.group.position,
          {
            x: 0,
            y: -0.15,
            z: 0,
            ease: "power2.inOut",
          },
          0,
        )
        .to(
          garment.group.rotation,
          {
            x: 0,
            y: Math.PI * 2,
            z: 0,
            ease: "power2.inOut",
          },
          0,
        )
        .fromTo(
          "[data-variant-panel]",
          {
            autoAlpha: 0,
            y: 30,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          0.18,
        );

      ScrollTrigger.refresh();
    });

    return () => {
      context.revert();
      setHotspotsVisible(false);
    };
  }, [cameraRef, garmentRef, setHotspotsVisible]);
}
