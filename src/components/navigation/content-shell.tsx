import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/navigation/site-footer";
import { RequestAccessDrawer } from "@/components/forms/request-access-drawer";

export function ContentShell({ children }: { children: React.ReactNode }) {
  return <div className="product-site content-site"><SiteHeader />{children}<SiteFooter /><RequestAccessDrawer /></div>;
}
