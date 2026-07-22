import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/navigation/site-footer";
import { CartDrawer } from "@/components/commerce/cart-drawer";

export function ContentShell({ children }: { children: React.ReactNode }) {
  return <div className="product-site content-site"><SiteHeader />{children}<SiteFooter /><CartDrawer /></div>;
}
