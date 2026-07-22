import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/navigation/site-footer";
import { CustomCursor } from "@/components/cursor/custom-cursor";

export function ContentShell({ children }: { children: React.ReactNode }) {
  return <div className="site-shell"><SiteHeader />{children}<SiteFooter /><CustomCursor /></div>;
}
