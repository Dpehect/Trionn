import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { GsapProvider } from "@/components/providers/gsap-provider";
import { CookieConsent } from "@/components/privacy/cookie-consent";
import { IntroLoader } from "@/components/motion/intro-loader";
import { PageTransition } from "@/components/motion/page-transition";
import { CinematicCursor } from "@/components/motion/cinematic-cursor";
import { SectionTransitions } from "@/components/motion/section-transitions";
import { Header } from "./header";
import { Footer } from "./footer";
import { ScrollProgress } from "./scroll-progress";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return <>
    <a href="#main-content" className="skip-link">Skip to content</a>
    <SmoothScroll />
    <GsapProvider />
    <IntroLoader />
    <PageTransition />
    <CinematicCursor />
    <SectionTransitions />
    <ScrollProgress />
    <Header />
    <div id="main-content">{children}</div>
    <Footer />
    <CookieConsent />
    <div className="noise" aria-hidden="true" />
  </>;
}
