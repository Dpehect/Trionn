import { Hero } from "@/components/hero";
import { TrustMarquee } from "@/components/trust-marquee";
import { IntroStage } from "@/components/intro-stage";
import { CapabilityCards } from "@/components/capability-cards";
import { OutcomesStage } from "@/components/outcomes-stage";
import { WorkShowcase } from "@/components/work-showcase";
import { PlatformShowcase } from "@/components/platform-showcase";
import { DeliveryEstimator } from "@/components/delivery-estimator";
import { Testimonials } from "@/components/testimonials";
import { FAQ } from "@/components/faq";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustMarquee />
      <IntroStage />
      <CapabilityCards />
      <OutcomesStage />
      <WorkShowcase />
      <PlatformShowcase />
      <DeliveryEstimator />
      <Testimonials />
      <FAQ />
    </>
  );
}
