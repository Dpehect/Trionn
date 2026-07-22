"use client";

import { ArrowUpRight, Check, Layers3, ShieldCheck, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/navigation/site-footer";
import { CinematicHero } from "@/components/product/cinematic-hero";
import { FlipProductLab } from "@/components/product/flip-product-lab";
import { ScrollProductStory } from "@/components/product/scroll-product-story";
import { ObserverGuidedTour } from "@/components/product/observer-guided-tour";
import { DraggableWorkflow } from "@/components/product/draggable-workflow";
import { SvgSystemMap } from "@/components/product/svg-system-map";
import { CapabilityGrid } from "@/components/product/capability-grid";
import { IntelligenceSection } from "@/components/product/intelligence-section";
import { SocialProofCarousel } from "@/components/product/social-proof-carousel";
import { PricingBlocks } from "@/components/product/pricing-blocks";
import { FaqSection } from "@/components/product/faq-section";
import { RequestAccessDrawer } from "@/components/forms/request-access-drawer";
import { phaseFeatures, PHASE_NUMBER } from "@/config/phase";
import { useProductStore } from "@/store/use-product-store";

export function ProductHome() {
  const setRequestOpen = useProductStore((state) => state.setRequestOpen);

  return (
    <div className="product-site" data-phase={PHASE_NUMBER}>
      <SiteHeader />
      <main>
        <CinematicHero />

        {phaseFeatures.productNarrative && (
          <section className="product-intro section-shell">
            <div className="section-index">01 / PRODUCT</div>
            <div className="intro-statement">
              <p className="section-eyebrow">A product space, not another dashboard</p>
              <h2>Make the whole product legible while it is still changing.</h2>
            </div>
            <div className="intro-copy">
              <p>Most tools separate strategy, interface work and launch operations. Trionn connects them, so every decision keeps its source, owner and consequence.</p>
              <div className="intro-facts">
                <span><Check size={15} /> No disconnected handoffs</span>
                <span><Check size={15} /> No stale launch decks</span>
                <span><Check size={15} /> No hidden product context</span>
              </div>
            </div>
          </section>
        )}

        {phaseFeatures.designSystem && (
          <section className="principles-section section-shell">
            <div className="section-index">02 / PRINCIPLES</div>
            <article><Layers3 size={23} /><span>01</span><h3>Context over documents.</h3><p>Product knowledge stays attached to the decision and state it affects.</p></article>
            <article><Sparkles size={23} /><span>02</span><h3>Motion with meaning.</h3><p>Animation explains state, hierarchy and causality rather than decorating the page.</p></article>
            <article><ShieldCheck size={23} /><span>03</span><h3>Control without friction.</h3><p>Governance, ownership and access remain visible without slowing the team.</p></article>
          </section>
        )}

        {phaseFeatures.flipLab && <FlipProductLab />}
        {phaseFeatures.scrollStory && <ScrollProductStory />}
        {phaseFeatures.observerTour && <ObserverGuidedTour />}
        {phaseFeatures.draggableWorkflow && <DraggableWorkflow />}
        {phaseFeatures.svgMotion && <SvgSystemMap />}
        {phaseFeatures.svgMotion && <CapabilityGrid />}
        {phaseFeatures.conversionSystem && <IntelligenceSection />}
        {phaseFeatures.socialProof && <SocialProofCarousel />}

        {phaseFeatures.socialProof && (
          <section className="pricing-preview section-shell">
            <div className="section-index">10 / ACCESS</div>
            <div className="pricing-preview-head"><p className="section-eyebrow">Simple product access</p><h2>Start with one team. Expand with the product system.</h2></div>
            <PricingBlocks compact />
          </section>
        )}

        {phaseFeatures.productionHardening && <FaqSection />}

        <section className="access-section section-shell">
          <div className="access-copy"><p className="section-eyebrow">Private beta</p><h2>Bring your next product into one coherent operating system.</h2></div>
          <div className="access-action"><p>Trionn is opening a limited number of workspaces for product teams prepared to connect evidence, interface logic and launch operations.</p><button className="button button-primary" type="button" onClick={() => setRequestOpen(true)}>Request access <ArrowUpRight size={17} /></button></div>
        </section>
      </main>
      <SiteFooter />
      <RequestAccessDrawer />
    </div>
  );
}
