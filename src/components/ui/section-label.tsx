import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionLabel({ index, children, className }: { index: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-muted", className)}>
      <span className="text-accent">[{index}]</span>
      <span>{children}</span>
    </div>
  );
}
