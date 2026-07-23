import { HeroSection } from "@/components/hero/hero-section";
import { SiteShell } from "@/components/layout/site-shell";
import { StudioSection } from "@/components/studio/studio-section";
import { ServicesSection } from "@/components/services/services-section";
import { CaseStudiesSection } from "@/components/work/case-studies-section";
import { HorizontalWork } from "@/components/work/horizontal-work";
import { SiteFooter } from "@/components/footer/site-footer";

export default function HomePage() {
  return (
    <SiteShell>
      <main className="overflow-clip">
        <HeroSection />

        <StudioSection />
        <ServicesSection />
        <CaseStudiesSection />
        <HorizontalWork />

        <SiteFooter />
      </main>
    </SiteShell>
  );
}
