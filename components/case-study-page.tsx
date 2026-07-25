"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect } from "react";
import type { CaseStudy } from "@/data/cases";
import { caseStudies } from "@/data/cases";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function CaseStudyPage({ study }: { study: CaseStudy }) {
  const root = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Calculate next study in cycle
  const currentIndex = caseStudies.findIndex((c) => c.slug === study.slug);
  const nextStudy = caseStudies[(currentIndex + 1) % caseStudies.length];

  // WebGL / Canvas ambient fluid particle effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animId: number;

    let mouseX = width / 2;
    let mouseY = height / 2;
    let currX = mouseX;
    let currY = mouseY;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    const draw = () => {
      currX += (mouseX - currX) * 0.05;
      currY += (mouseY - currY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Liquid ambient gradient
      const grad = ctx.createRadialGradient(
        currX,
        currY,
        15,
        currX,
        currY,
        Math.max(width, height) * 0.5
      );
      grad.addColorStop(0, "rgba(237, 75, 42, 0.09)");
      grad.addColorStop(0.5, "rgba(100, 140, 245, 0.03)");
      grad.addColorStop(1, "rgba(3, 3, 3, 0)");

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  // GSAP Animations
  useGSAP(
    () => {
      // Horizontal gallery track pin
      const track = document.querySelector<HTMLElement>(".aw-horizontal-track");
      const container = document.querySelector<HTMLElement>(".aw-horizontal-wrapper");

      if (track && container && window.innerWidth > 900) {
        const slides = track.querySelectorAll(".aw-horizontal-slide");
        const totalWidth = (slides.length - 1) * 100;

        gsap.to(track, {
          xPercent: -totalWidth,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: `+=${slides.length * 100}%`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }

      // Parallax hero image
      gsap.to(".aw-hero-img", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: ".aw-hero-media",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Hero title characters staggered reveal
      gsap.fromTo(
        ".aw-hero-title-char",
        { yPercent: 120, rotate: 6, opacity: 0 },
        {
          yPercent: 0,
          rotate: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.02,
          ease: "power4.out",
        }
      );
    },
    { scope: root }
  );

  return (
    <main ref={root} className="aw-case-page">
      {/* WebGL Ambient Canvas */}
      <canvas ref={canvasRef} className="aw-canvas" />

      {/* Film Grain Texture */}
      <div className="aw-noise" />

      {/* Navigation Bar */}
      <nav className="aw-nav">
        <Link href="/" className="aw-brand">
          <span className="aw-brand-mark">SOFTBRIDGE</span>
          <span className="aw-brand-sub">EDITORIAL // 2026</span>
        </Link>

        <div className="aw-nav-center">
          <span className="aw-geo-pill">
            <span className="aw-pulse-dot" /> NORDIC NODE // {study.kicker.split("/")[0].trim()}
          </span>
        </div>

        <div className="aw-nav-right">
          <Link href="/#cases" className="aw-nav-link">
            <ArrowLeft size={13} /> INDEX
          </Link>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="aw-hero">
        <div className="aw-hero-header">
          <div className="aw-hero-meta">
            <span className="aw-hero-num">N°0{currentIndex + 1}</span>
            <span className="aw-hero-kicker">{study.kicker}</span>
          </div>

          <h1 className="aw-hero-title">
            {study.title.split("").map((char, i) => (
              <span key={i} className="aw-hero-title-char">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>

          <div className="aw-hero-deck">
            <p className="aw-hero-statement">&ldquo;{study.statement}&rdquo;</p>
            <p className="aw-hero-intro">{study.intro}</p>
          </div>
        </div>

        {/* Hero Media Frame */}
        <div className="aw-hero-media">
          <img
            src={study.editorialHero}
            alt={study.title}
            className="aw-hero-img"
          />
          <div className="aw-hero-media-overlay" />
          <div className="aw-hero-media-caption">
            <span>PROJECT VISUAL DIRECTION</span>
            <span>{study.accent}</span>
          </div>
        </div>
      </header>

      {/* Oversized Metric Showcase Section */}
      <section className="aw-metric-section">
        <div className="aw-metric-bg-text">IMPACT</div>
        <div className="aw-metric-content">
          <span className="aw-metric-label">KEY VALUE DELIVERED</span>
          <div className="aw-metric-value">{study.metric}</div>
          <p className="aw-metric-desc">{study.metricLabel}</p>
        </div>
      </section>

      {/* Horizontal Scroll Gallery (Awwwards Style Pinning) */}
      <section className="aw-horizontal-wrapper">
        <div className="aw-horizontal-track">
          <div className="aw-horizontal-slide aw-intro-slide">
            <div className="aw-slide-number">01</div>
            <h2>EXECUTIVE SUMMARY &amp; ARCHITECTURE</h2>
            <p>{study.statement}</p>
            <div className="aw-tags-list">
              {study.tags.map((t) => (
                <span key={t} className="aw-tag-pill">{t}</span>
              ))}
            </div>
          </div>

          {study.sections.map(([title, body], idx) => (
            <div key={title} className="aw-horizontal-slide">
              <div className="aw-slide-media">
                <img
                  src={study.visuals[idx] || study.editorialHero}
                  alt={title}
                />
                <span className="aw-slide-badge">0{idx + 2} // {title}</span>
              </div>
              <div className="aw-slide-content">
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </div>
          ))}

          <div className="aw-horizontal-slide aw-spec-slide">
            <div className="aw-slide-number">0{study.sections.length + 2}</div>
            <h2>REGIONAL EXECUTION &amp; COMPLIANCE</h2>
            <p>Built for scalable deployment across European markets with GDPR &amp; ISO data security standards.</p>
            <div className="aw-spec-stats">
              <div>
                <strong>99.9%</strong>
                <small>Uptime SLA</small>
              </div>
              <div>
                <strong>&lt;50ms</strong>
                <small>Regional Latency</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Asymmetric Editorial Deep-Dive Section */}
      <section className="aw-editorial-section">
        <div className="aw-editorial-header">
          <span>DEEP DIVE</span>
          <h2>Designed around operational realities.</h2>
        </div>

        <div className="aw-editorial-grid">
          {study.sections.map(([title, body], i) => (
            <article key={title} className="aw-editorial-card">
              <span className="aw-card-index">SECTION 0{i + 1}</span>
              <h3>{title}</h3>
              <p>{body}</p>
              <div className="aw-card-tags">
                {study.tags.slice(i, i + 2).map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Full-Bleed Next Case Footer */}
      <section className="aw-next-section">
        <img src={nextStudy.editorialHero} alt={nextStudy.title} className="aw-next-bg" />
        <div className="aw-next-overlay" />
        <div className="aw-next-content">
          <span className="aw-next-sub">NEXT PROJECT</span>
          <h2 className="aw-next-title">{nextStudy.title}</h2>
          <p className="aw-next-kicker">{nextStudy.kicker}</p>
          <Link href={`/cases/${nextStudy.slug}`} className="aw-next-btn">
            EXPLORE CASE <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
