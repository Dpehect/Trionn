"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { useRef, useState } from "react";
import { HeroStage } from "@/components/hero/hero-stage";
import { CinematicLoader } from "@/components/loader/cinematic-loader";
import { SiteNavigation } from "@/components/navigation/site-navigation";

export function SiteShell() {
  const [loading, setLoading] = useState(true);
  const main = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (loading) return;
    gsap.timeline({ defaults: { ease: "expo.out" } })
      .from("[data-reveal]", { y: 18, opacity: 0, duration: 1, stagger: 0.055 })
      .from(".dark-mesh-stage", { opacity: 0, scale: 0.9, duration: 1.55 }, "-=0.72");
  }, { scope: main, dependencies: [loading] });

  return <>
    {loading && <CinematicLoader onComplete={() => setLoading(false)} />}
    <main ref={main} className="site-shell hiro-home dark-home" aria-hidden={loading}>
      <header className="topbar dark-header">
        <Link className="brand dark-brand" href="/" data-reveal>CREATIVE DEVELOPER</Link>
        <SiteNavigation />
      </header>
      <section className="hero dark-hero">
        <div className="dark-grid" aria-hidden="true" />
        <h1 className="dark-hero-title" data-reveal>YUNUS EMRE<br />GÜRLEK</h1>
        <HeroStage />
        <footer className="dark-footer-bar" data-reveal>
          <div><span>BASE:</span><b>ADANA, TURKEY</b></div>
          <div><span>FOCUS:</span><b>CREATIVE DEVELOPMENT / MOTION / 3D MODELING</b></div>
          <div><span>INDEX:</span><b>PORTFOLIO 2026</b></div>
        </footer>
      </section>
    </main>
  </>;
}
