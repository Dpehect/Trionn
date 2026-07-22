"use client";

import {
  type MutableRefObject,
  useLayoutEffect,
} from "react";
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

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      garment.group.position.set(0, -0.5, 0);
      garment.group.rotation.set(0, 0, 0);
      camera.position.set(0, 0, 4.5);
      setHotspotsVisible(true);
      return;
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "none",
        },
        scrollTrigger: {
          trigger: "#experience-root",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setHotspotsVisible(self.progress >= 0.7);
          },
          onLeaveBack: () => setHotspotsVisible(false),
        },
      });

      timeline
        .set(garment.group.position, {
          x: 0,
          y: -0.5,
          z: 0,
        }, 0)
        .set(garment.group.rotation, {
          x: 0,
          y: 0,
          z: 0,
        }, 0)
        .set(camera.position, {
          x: 0,
          y: 0,
          z: 5,
        }, 0)

        // Phase 1: 0% - 30%
        .to(
          garment.group.rotation,
          {
            y: Math.PI * 2,
            duration: 0.3,
          },
          0,
        )

        // Phase 2: 30% - 70%
        .to(
          garment.group.position,
          {
            x: 1.2,
            y: 0,
            z: 1,
            duration: 0.4,
          },
          0.3,
        )
        .to(
          camera.position,
          {
            x: 0.5,
            y: 0.5,
            z: 2,
            duration: 0.4,
          },
          0.3,
        )
        .fromTo(
          "[data-detail-copy]",
          {
            autoAlpha: 0,
            y: 20,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.16,
            stagger: 0.035,
          },
          0.38,
        )
        .to(
          "[data-detail-copy]",
          {
            autoAlpha: 0,
            y: -16,
            duration: 0.1,
            stagger: 0.02,
          },
          0.62,
        )

        // Phase 3: 70% - 100%
        .to(
          camera.position,
          {
            x: 0,
            y: 0,
            z: 4.5,
            duration: 0.3,
          },
          0.7,
        )
        .to(
          garment.group.position,
          {
            x: 0,
            y: -0.15,
            z: 0,
            duration: 0.3,
          },
          0.7,
        )
        .to(
          garment.group.rotation,
          {
            y: Math.PI * 2,
            duration: 0.3,
          },
          0.7,
        )
        .fromTo(
          "[data-buy-panel]",
          {
            autoAlpha: 0,
            y: 28,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.18,
          },
          0.76,
        );
    });

    return () => {
      context.revert();
      setHotspotsVisible(false);
    };
  }, [cameraRef, garmentRef, setHotspotsVisible]);
}
