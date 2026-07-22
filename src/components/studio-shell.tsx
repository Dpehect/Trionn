import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/navigation/site-footer";
import { MosaicStage } from "@/components/mosaic/mosaic-stage";
import { CustomCursor } from "@/components/cursor/custom-cursor";
import { features } from "@/config/phase";

export function StudioShell() {
  return (
    <div className="site-shell">
      {features.shell && <SiteHeader />}
      <MosaicStage />
      {features.shell && <SiteFooter />}
      <CustomCursor />
    </div>
  );
}
