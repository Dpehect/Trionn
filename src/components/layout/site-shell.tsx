import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { GsapProvider } from "@/components/providers/gsap-provider";
import { CookieConsent } from "@/components/privacy/cookie-consent";
import { Header } from "./header";
import { Footer } from "./footer";
import { ScrollProgress } from "./scroll-progress";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return <>
    <a href="#main-content" className="skip-link">Skip to content</a>
    <SmoothScroll />
    <GsapProvider />
    <ScrollProgress />
    <Header />
    <div id="main-content">{children}</div>
    <Footer />
    <CookieConsent />
    <div className="noise" aria-hidden="true" />
  </>;
}
