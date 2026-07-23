import Link from "next/link";
import { MotionLayer } from "@/components/motion/motion-layer";
import { SiteNavigation } from "@/components/navigation/site-navigation";

export default function ContactPage() {
  return <main className="contact-page contact-page--rev">
    <MotionLayer />
    <header className="topbar topbar--page"><Link className="back-button" href="/">←</Link><SiteNavigation /></header>
    <section className="contact-stage">
      <p className="eyebrow" data-motion-reveal>CONTACT / NEW BUSINESS</p>
      <h1 data-motion-reveal>Let’s create something people remember.</h1>
      <a className="contact-mail contact-mail--rev" href="mailto:hello@example.com" data-motion-reveal data-cursor><span>HELLO@EXAMPLE.COM</span><i>↗</i></a>
      <div className="contact-orbit" aria-hidden="true"><span>AVAILABLE</span></div>
    </section>
    <section className="contact-details">
      <div><span>LOCATION</span><strong>Türkiye / Remote</strong></div>
      <div><span>AVAILABILITY</span><strong>Selected projects / 2026</strong></div>
      <div><span>SOCIAL</span><p><a href="#">LinkedIn ↗</a><a href="#">GitHub ↗</a><a href="#">Instagram ↗</a></p></div>
      <div><span>LOCAL TIME</span><strong>GMT +03:00</strong></div>
    </section>
    <footer className="contact-signoff"><span>YEG®</span><p>CREATIVE DEVELOPER</p><strong>2026</strong></footer>
  </main>;
}
