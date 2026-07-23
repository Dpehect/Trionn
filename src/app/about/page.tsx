import Link from "next/link";
import { MotionLayer } from "@/components/motion/motion-layer";
import { SiteNavigation } from "@/components/navigation/site-navigation";

export default function AboutPage() {
  return <main className="about-page about-page--rev">
    <MotionLayer />
    <header className="topbar topbar--page"><Link className="back-button" href="/">←</Link><SiteNavigation /></header>
    <section className="about-intro">
      <p className="eyebrow" data-motion-reveal>ABOUT / 2026</p>
      <h1 data-motion-reveal>Creative development for digital experiences that need a distinct point of view.</h1>
      <div className="about-intro__aside" data-motion-reveal><span>BASED IN TÜRKİYE</span><span>WORKING WORLDWIDE</span></div>
    </section>
    <section className="about-portrait" data-cursor><div className="about-portrait__figure"><i /><i /><i /></div><p>DESIGN × CODE × MOTION</p></section>
    <section className="about-manifesto">
      <p className="eyebrow">PROFILE</p>
      <div><h2>I work between interface design and front-end engineering.</h2><p>My process starts with hierarchy and rhythm, then uses motion and selective 3D to strengthen the idea. The goal is not decoration. The goal is a site that feels authored, performs reliably and remains clear on every screen.</p></div>
    </section>
    <section className="about-capabilities">
      {[['01','Creative development','Next.js, React, TypeScript, GSAP and WebGL.'],['02','Digital direction','Visual systems, interaction concepts and prototypes.'],['03','Motion systems','Transitions, scroll choreography and micro-interactions.'],['04','Production','Responsive implementation, accessibility and performance.']].map(([n,title,copy])=><article key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p></article>)}
    </section>
    <section className="about-history"><p className="eyebrow">SELECTED EXPERIENCE</p><div>{['Independent / Creative Developer / 2024—Now','Softbridge Solutions / Product & Web / 2023—Now','Mobile Engineering / Java, Kotlin, Flutter / 2020—2024'].map(item=><p key={item}>{item}</p>)}</div></section>
    <footer className="about-footer about-footer--rev"><p>AVAILABLE FOR SELECTED COLLABORATIONS</p><Link href="/contact" data-cursor>START A PROJECT ↗</Link></footer>
  </main>;
}
