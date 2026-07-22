"use client";

import { useExperienceStore } from "@/store/experience-store";

export function QualityBadge() {
  const quality = useExperienceStore((state) => state.quality);

  if (process.env.NODE_ENV === "production") return null;

  return (
    <div className="fixed bottom-5 right-5 z-[70] rounded-full border hairline bg-black/40 px-4 py-2 text-[10px] uppercase tracking-[.16em] backdrop-blur">
      Quality: {quality}
    </div>
  );
}
