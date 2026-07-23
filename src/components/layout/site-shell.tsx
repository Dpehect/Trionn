"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Lenis from "lenis";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { HeroStage } from "@/components/hero/hero-stage";
import { CinematicLoader } from "@/components/loader/cinematic-loader";
import { SiteNavigation } from "@/components/navigation/site-navigation";

export function SiteShell() {
  const [loading, setLoading] = useState(true);
  const main = useRef<HTMLElement>(null);

  useEffect(() => {
    const seen = sessionStorage.getItem("yeg-loader-seen");
    if (seen) setLoading(false);
    const lenis = new Lenis({ lerp: 0.075, smoothWheel: true });
    let rafId = 0;
    const raf = (time: number) => { lenis.raf(time); rafId = requestAnimationFrame(raf); };
    rafId = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(rafId); lenis.destroy(); };
  }, []);

  useGSAP(() => {
    if (loading || !main.current) return;
    const timeline = gsap.timeline({ defaults: { ease: "power4.out" } });
    timeline
      .from("[data-reveal]", { y: 36, opacity: 0, duration: 1.05, stagger: 0.065 })
      .from(".hero-stage", { scale: 0.82, rotation: -3, opacity: 0, duration: 1.55, ease: "expo.out" }, "-=0.9")
      .from(".hero__rule", { scaleX: 0, duration: 1.2, transformOrigin: "left center" }, "-=1.15");
  }, { scope: main, dependencies: [loading] });

  const finishLoader = () => {
    sessionStorage.setItem("yeg-loader-seen", "1");
    setLoading(false);
  };

  return (
    <>
      {loading && <CinematicLoader onComplete={finishLoader} />}
      <main ref={main} className="site-shell" aria-hidden={loading}>
        <header className="topbar">
          <Link className="brand" href="/" data-reveal><span className="brand__dot" /><span>Creative Developer</span></Link>
          <SiteNavigation />
        </header>
        <section id="index" className="hero">
          <div className="hero__kicker" data-reveal>PORTFOLIO / 2026</div>
          <h1 className="hero__title" data-reveal>YUNUS EMRE<br />GÜRLEK</h1>
          <div className="hero__rule" />
          <HeroStage />
          <div className="hero__meta hero__meta--left" data-reveal><p>BASED IN<br />ISTANBUL, TR</p><p>FOCUS<br />INTERACTIVE EXPERIENCES</p></div>
          <div className="hero__meta hero__meta--right" data-reveal><p>INDEX / 01</p><Link href="/projects">VIEW PROJECTS</Link></div>
          <div className="hero__edition" data-reveal>01—04</div>
        </section>
      </main>
    </>
  );
}
