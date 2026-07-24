import { cn } from "@/lib/utils";
import type { ProjectTone } from "@/content/projects";

const tones: Record<ProjectTone, string> = {
  aurora: "from-[#b7ff9f] via-[#4e9d87] to-[#123643]",
  ice: "from-[#e7f6f2] via-[#78aeb4] to-[#173e58]",
  ember: "from-[#f5d79d] via-[#b66c52] to-[#211923]"
};

export function ProjectVisual({ tone, title, className }: { tone: ProjectTone; title: string; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden bg-gradient-to-br", tones[tone], className)}>
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.3)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="absolute left-[12%] top-[14%] h-[56%] w-[42%] rotate-[-8deg] rounded-[999px] border border-white/35 bg-white/10 backdrop-blur-md" />
      <div className="absolute bottom-[10%] right-[8%] h-[48%] w-[38%] rotate-[12deg] rounded-[2rem] border border-white/25 bg-black/10 backdrop-blur-sm" />
      <span className="absolute bottom-6 left-6 text-[clamp(3rem,7vw,7rem)] font-semibold leading-none tracking-[-.07em] text-white">{title}</span>
    </div>
  );
}
