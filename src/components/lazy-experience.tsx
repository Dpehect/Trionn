"use client";
import dynamic from "next/dynamic";

export const LazyProjectCarousel = dynamic(
  () => import("@/components/project-carousel").then((m) => m.ProjectCarousel),
  { ssr: false, loading: () => <div className="container-x min-h-96 animate-pulse bg-white/5" /> }
);

export const LazyServiceSequence = dynamic(
  () => import("@/components/service-sequence").then((m) => m.ServiceSequence),
  { ssr: false }
);
