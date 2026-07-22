import { cn } from "@/lib/utils";
export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("inline-flex border border-current px-2 py-1 text-[10px] uppercase tracking-[.14em]", className)}>{children}</span>;
}
