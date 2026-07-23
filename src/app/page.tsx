import { SiteHeader } from "@/components/layout/site-header";
import { Hero } from "@/components/sections/hero";
import { FoundationSections } from "@/components/sections/foundation-sections";

export default function HomePage() {
  return (
    <main>
      <SiteHeader />
      <Hero />
      <FoundationSections />
    </main>
  );
}
