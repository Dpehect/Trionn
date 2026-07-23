import { SiteHeader } from "@/components/layout/site-header";
import { Hero } from "@/components/sections/hero";
import { PlaceholderSections } from "@/components/sections/placeholder-sections";

export default function HomePage() {
  return (
    <main>
      <SiteHeader />
      <Hero />
      <PlaceholderSections />
    </main>
  );
}
