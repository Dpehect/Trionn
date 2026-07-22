import type { QualityLevel } from "@/store/experience-store";

export function detectQuality(): QualityLevel {
  if (typeof window === "undefined") return "high";

  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
  const cores = navigator.hardwareConcurrency ?? 8;
  const width = window.innerWidth;

  if (memory <= 4 || cores <= 4 || width < 600) return "low";
  if (memory <= 8 || cores <= 6 || width < 1100) return "medium";
  return "high";
}
