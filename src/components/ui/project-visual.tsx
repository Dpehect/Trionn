import { cn } from "@/lib/utils";
import type { ProjectTone } from "@/content/projects";

const palette: Record<ProjectTone, { bg: string; accent: string; panel: string }> = {
  aurora: { bg: "#dce8d5", accent: "#183b32", panel: "#f7f6f0" },
  ice: { bg: "#d8e3e7", accent: "#173e58", panel: "#f5f7f7" },
  ember: { bg: "#e7d7c8", accent: "#4a2d24", panel: "#fbf4ec" },
};

export function ProjectVisual({ tone, title, className }: { tone: ProjectTone; title: string; className?: string }) {
  const colors = palette[tone];
  return (
    <div className={cn("relative overflow-hidden", className)} style={{ background: colors.bg }}>
      <div className="absolute left-[6%] right-[6%] top-[8%] h-[84%] border border-black/20 bg-white/45">
        <div className="flex h-10 items-center justify-between border-b border-black/15 px-4 text-[8px] uppercase tracking-[.16em] text-black/55">
          <span>{title}</span><span>Softbridge / Case study</span>
        </div>
        <div className="grid h-[calc(100%-2.5rem)] grid-cols-[.36fr_.64fr]">
          <div className="flex flex-col justify-between border-r border-black/15 p-[7%]">
            <div className="space-y-2"><div className="h-1.5 w-8 bg-black/70"/><div className="h-1.5 w-16 bg-black/20"/><div className="h-1.5 w-12 bg-black/20"/></div>
            <p className="text-[clamp(1.1rem,2.5vw,3rem)] font-medium leading-[.9] tracking-[-.055em]">{title}<br/>digital system</p>
          </div>
          <div className="relative m-[7%] overflow-hidden" style={{ background: colors.accent }}>
            <div className="absolute left-[9%] top-[10%] h-[12%] w-[55%] bg-white/90" />
            <div className="absolute left-[9%] top-[27%] h-[5%] w-[76%] bg-white/25" />
            <div className="absolute left-[9%] top-[35%] h-[5%] w-[62%] bg-white/25" />
            <div className="absolute bottom-[9%] left-[9%] right-[9%] grid h-[38%] grid-cols-3 gap-2">
              <div style={{ background: colors.panel }} /><div className="bg-white/22"/><div className="bg-white/12"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
