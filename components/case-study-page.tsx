"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Globe, Cpu, Layers, ShieldCheck, Zap, Sparkles, ChevronRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { useRef, useState, useEffect } from "react";
import type { CaseStudy } from "@/data/cases";
import { caseStudies } from "@/data/cases";

gsap.registerPlugin(ScrollTrigger, Flip, useGSAP);

export function CaseStudyPage({ study }: { study: CaseStudy }) {
  const root = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "architecture" | "gallery">("overview");

  // Calculate next study in cycle
  const currentIndex = caseStudies.findIndex((c) => c.slug === study.slug);
  const nextStudy = caseStudies[(currentIndex + 1) % caseStudies.length];

  // Setup WebGL / Canvas ambient particle wave effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      alpha: number;
    }> = Array.from({ length: 55 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.8,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.45 + 0.15,
    }));

    const render = () => {
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      ctx.clearRect(0, 0, width, height);

      // Ambient radial glow following cursor
      const grad = ctx.createRadialGradient(
        mouseX,
        mouseY,
        10,
        mouseX,
        mouseY,
        Math.max(width, height) * 0.5
      );
      grad.addColorStop(0, "rgba(240, 100, 47, 0.09)");
      grad.addColorStop(0.4, "rgba(59, 130, 246, 0.03)");
      grad.addColorStop(1, "rgba(6, 7, 8, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw particle network
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 243, 237, ${p.alpha})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(245, 243, 237, ${(1 - dist / 120) * 0.1})`;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // GSAP Animations
  useGSAP(
    () => {
      gsap.fromTo(
        ".cs-hero-title",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      gsap.fromTo(
        ".cs-hero-card",
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out", delay: 0.15 }
      );

      gsap.utils.toArray<HTMLElement>(".cs-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 45 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "top 25%",
              scrub: 0.8,
            },
          }
        );
      });

      gsap.to(".cs-orbit-ring", {
        rotate: 360,
        duration: 40,
        repeat: -1,
        ease: "none",
      });
    },
    { scope: root }
  );

  // Tab switching with GSAP Flip
  const handleTabChange = (tab: "overview" | "architecture" | "gallery") => {
    if (tab === activeTab) return;
    const state = Flip.getState(".cs-tab-content");
    setActiveTab(tab);
    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.6,
        ease: "power3.inOut",
        fade: true,
      });
    });
  };

  // Structured Schema.org metadata for SEO
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: study.title,
    description: study.intro,
    image: study.editorialHero || study.hero,
    author: {
      "@type": "Organization",
      name: "SoftBridge Solutions",
      url: "https://softbridgesolutions.com",
    },
    publisher: {
      "@type": "Organization",
      name: "SoftBridge Solutions Finland",
      logo: {
        "@type": "ImageObject",
        url: "https://softbridgesolutions.com/logo.png",
      },
    },
    genre: study.kicker,
    keywords: study.tags.join(", "),
    inLanguage: "en-US",
  };

  return (
    <main ref={root} className="cs-page">
      {/* Schema.org Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* WebGL Ambient Background Canvas */}
      <canvas ref={canvasRef} className="cs-canvas" />

      {/* Navigation Header */}
      <header className="cs-header">
        <div className="cs-header-left">
          <Link href="/" className="cs-logo">
            <span className="cs-logo-dot" />
            SoftBridge Solutions<sup>®</sup>
          </Link>
          <span className="cs-geo-badge">
            <Globe size={11} /> Finland &amp; Europe
          </span>
        </div>

        <div className="cs-header-right">
          <Link href="/#cases" className="cs-back-btn">
            <ArrowLeft size={13} /> Selected Cases
          </Link>
          <Link href="/#contact" className="cs-contact-btn">
            Get in touch <ArrowUpRight size={13} />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="cs-hero">
        <div className="cs-hero-container">
          <div className="cs-hero-meta">
            <span className="cs-tag">CASE STUDY // 0{currentIndex + 1}</span>
            <span className="cs-kicker-tag">{study.kicker}</span>
          </div>

          <h1 className="cs-hero-title">{study.title}</h1>
          <p className="cs-hero-statement">&ldquo;{study.statement}&rdquo;</p>
          <p className="cs-hero-intro">{study.intro}</p>

          <div className="cs-hero-highlights">
            <div className="cs-metric-box">
              <small>KEY PERFORMANCE METRIC</small>
              <strong>{study.metric}</strong>
              <span>{study.metricLabel}</span>
            </div>

            <div className="cs-accent-box">
              <Sparkles size={16} />
              <div>
                <small>DESIGN ACCENT</small>
                <strong>{study.accent}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Visual Card */}
        <div className="cs-hero-card">
          <img
            src={study.editorialHero || study.hero}
            alt={`${study.title} hero visualization`}
            className="cs-hero-img"
          />
          <div className="cs-hero-overlay" />
          <div className="cs-hero-card-meta">
            <span>SOFTBRIDGE ENGINEERING NODE</span>
            <span>{study.accent}</span>
          </div>
        </div>
      </section>

      {/* Interactive GSAP Flip Navigation Tabs */}
      <section className="cs-nav-tabs-wrapper cs-reveal">
        <div className="cs-nav-tabs">
          <button
            className={`cs-tab-btn ${activeTab === "overview" ? "is-active" : ""}`}
            onClick={() => handleTabChange("overview")}
          >
            <Layers size={14} />
            <span>01 / Overview &amp; Impact</span>
          </button>

          <button
            className={`cs-tab-btn ${activeTab === "architecture" ? "is-active" : ""}`}
            onClick={() => handleTabChange("architecture")}
          >
            <Cpu size={14} />
            <span>02 / System Architecture</span>
          </button>

          <button
            className={`cs-tab-btn ${activeTab === "gallery" ? "is-active" : ""}`}
            onClick={() => handleTabChange("gallery")}
          >
            <Sparkles size={14} />
            <span>03 / Visual Direction</span>
          </button>
        </div>
      </section>

      {/* Tab Content Container */}
      <section className="cs-content-section cs-reveal">
        <div className="cs-tab-content">
          {activeTab === "overview" && (
            <div className="cs-overview-grid">
              {/* Challenge & Discovery Sections */}
              <div className="cs-story-column">
                <h3 className="cs-section-heading">Discovery &amp; Strategy</h3>
                {study.sections.map(([title, body], index) => (
                  <div key={title} className="cs-section-card cs-content-card">
                    <div className="cs-card-num">0{index + 1}</div>
                    <div>
                      <h4>{title}</h4>
                      <p>{body}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Key Deliverables & GEO Specs */}
              <div className="cs-specs-column">
                <div className="cs-specs-card cs-content-card">
                  <h4>Key Deliverables</h4>
                  <ul className="cs-check-list">
                    <li>
                      <CheckCircle2 size={16} /> Composable system design &amp; UX
                    </li>
                    <li>
                      <CheckCircle2 size={16} /> EU GDPR &amp; privacy compliance
                    </li>
                    <li>
                      <CheckCircle2 size={16} /> Multi-region Nordic cloud deployment
                    </li>
                    <li>
                      <CheckCircle2 size={16} /> Real-time telemetry &amp; observability
                    </li>
                  </ul>
                </div>

                <div className="cs-specs-card cs-content-card">
                  <h4>Regional Execution</h4>
                  <p className="cs-geo-desc">
                    Tailored for organizations operating across Finland, Sweden, Norway, and broader European markets. Built with zero-latency edge delivery targets.
                  </p>
                  <div className="cs-tags-flex">
                    {study.tags.map((tag) => (
                      <span key={tag} className="cs-spec-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "architecture" && (
            <div className="cs-architecture-view">
              <div className="cs-orbit-wrapper cs-content-card">
                <div className="cs-orbit-ring">
                  <div className="cs-orbit-core">SB</div>
                  {study.tags.map((tag, i) => (
                    <div
                      key={tag}
                      className="cs-orbit-node"
                      style={{
                        transform: `rotate(${i * (360 / study.tags.length)}deg) translateX(180px) rotate(${-i * (360 / study.tags.length)}deg)`,
                      }}
                    >
                      {tag}
                    </div>
                  ))}
                </div>

                <div className="cs-orbit-copy">
                  <h3>Connected System Blueprint</h3>
                  <p>
                    Every architectural component is orchestrated to maintain high availability, deterministic execution, and seamless integration with legacy systems.
                  </p>
                </div>
              </div>

              <div className="cs-arch-specs-grid">
                <div className="cs-arch-box cs-content-card">
                  <ShieldCheck size={20} />
                  <h5>Enterprise Security</h5>
                  <p>Role-based access control, end-to-end encryption, and audit trail logging.</p>
                </div>
                <div className="cs-arch-box cs-content-card">
                  <Zap size={20} />
                  <h5>High-Performance Core</h5>
                  <p>Sub-50ms regional response times and auto-scaling cloud microservices.</p>
                </div>
                <div className="cs-arch-box cs-content-card">
                  <Globe size={20} />
                  <h5>Nordic &amp; EU Compliance</h5>
                  <p>Built according to European data governance and security standards.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "gallery" && (
            <div className="cs-gallery-grid">
              {[study.hero, ...study.visuals].map((imgSrc, i) => (
                <div key={`${imgSrc}-${i}`} className="cs-gallery-card cs-content-card">
                  <img
                    src={imgSrc}
                    alt={`${study.title} editorial visual ${i + 1}`}
                    className="cs-gallery-img"
                  />
                  <div className="cs-gallery-label">
                    <span>VISUAL DIRECTION // 0{i + 1}</span>
                    <strong>{study.accent}</strong>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SEO Technical Specifications Table */}
      <section className="cs-tech-specs cs-reveal">
        <div className="cs-tech-container">
          <h3>Technical Specifications &amp; Project Metadata</h3>

          <div className="cs-specs-table">
            <div className="cs-table-row">
              <span>Project Title</span>
              <strong>{study.title}</strong>
            </div>
            <div className="cs-table-row">
              <span>Domain &amp; Region</span>
              <strong>{study.kicker}</strong>
            </div>
            <div className="cs-table-row">
              <span>Core Metric Target</span>
              <strong>{study.metric} {study.metricLabel}</strong>
            </div>
            <div className="cs-table-row">
              <span>Technology Stack</span>
              <strong>{study.tags.join(" · ")}</strong>
            </div>
            <div className="cs-table-row">
              <span>Engineering Studio</span>
              <strong>SoftBridge Solutions (Helsinki, Finland)</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Next Case Study Transition Footer */}
      <section className="cs-next-footer cs-reveal">
        <div className="cs-next-container">
          <span className="cs-next-label">NEXT CASE STUDY</span>
          <h2 className="cs-next-title">{nextStudy.title}</h2>
          <p className="cs-next-kicker">{nextStudy.kicker}</p>
          <Link href={`/cases/${nextStudy.slug}`} className="cs-next-btn">
            Explore Next Case <ChevronRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
