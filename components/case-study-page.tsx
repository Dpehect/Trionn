"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Globe, Sparkles } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import type { CaseStudy } from "@/data/cases";
import { caseStudies } from "@/data/cases";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FEATURED_PROJECTS = [
  {
    kicker: "Featured work",
    title: "Branding",
    clientName: "Vakeso",
    image: "/vivid-3d/scene1.jpg",
    accent: "Brand Identity & Design System",
  },
  {
    kicker: "Featured work",
    title: "Web",
    clientName: "SoundCloud",
    image: "/vivid-3d/scene2.jpg",
    accent: "Global Music Platform & Streaming UI",
  },
  {
    kicker: "Featured work",
    title: "Mobile",
    clientName: "Sona",
    image: "/vivid-3d/scene3.jpg",
    accent: "AI Avatar Studio & iOS Experience",
  },
];

export function CaseStudyPage({ study }: { study: CaseStudy }) {
  const rootRef = useRef<HTMLElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // Next study in cycle for bottom nav
  const currentIndex = caseStudies.findIndex((c) => c.slug === study.slug);
  const nextStudy = caseStudies[(currentIndex + 1) % caseStudies.length];

  useGSAP(
    () => {
      const stage = document.querySelector<HTMLElement>(".sb-featured-stage");
      if (!stage) return;

      ScrollTrigger.create({
        trigger: stage,
        start: "top top",
        end: "+=240%",
        pin: true,
        scrub: 0.4,
        onUpdate: (self) => {
          const idx = Math.min(
            Math.floor(self.progress * FEATURED_PROJECTS.length),
            FEATURED_PROJECTS.length - 1
          );
          setActiveIdx(idx);
        },
      });
    },
    { scope: rootRef }
  );

  const activeProject = FEATURED_PROJECTS[activeIdx];

  return (
    <main ref={rootRef} className="sb-case-page">
      {/* Header Navigation */}
      <header className="sb-case-header">
        <div className="sb-header-left">
          <Link href="/" className="sb-logo">
            <span className="sb-logo-dot" />
            SoftBridge Solutions<sup>®</sup>
          </Link>
          <span className="sb-geo-tag">
            <Globe size={11} /> Finland &amp; Europe
          </span>
        </div>

        <div className="sb-header-right">
          <Link href="/#cases" className="sb-back-btn">
            <ArrowLeft size={13} /> Selected Cases
          </Link>
          <Link href="/#contact" className="sb-contact-btn">
            Get in touch <ArrowUpRight size={13} />
          </Link>
        </div>
      </header>

      {/* FEATURED WORK STICKY SECTION (Clean, Engineering-Focused Minimal Design) */}
      <section className="sb-featured-stage">
        <div className="sb-featured-grid">
          {/* Left Sticky Panel */}
          <div className="sb-featured-left">
            <span className="sb-featured-kicker">{activeProject.kicker}</span>

            <div className="sb-featured-title-wrap">
              <h1 key={activeProject.title} className="sb-featured-title">
                {activeProject.title}
              </h1>
            </div>

            <div className="sb-featured-client-card">
              <span className="sb-client-dot" />
              <div className="sb-client-text">
                <small>CLIENT</small>
                <strong>{activeProject.clientName}</strong>
              </div>
            </div>
          </div>

          {/* Right Visual Showcase (Smooth Clean Crossfade) */}
          <div className="sb-featured-right">
            <div className="sb-media-card">
              {FEATURED_PROJECTS.map((proj, idx) => (
                <img
                  key={proj.image}
                  src={proj.image}
                  alt={proj.title}
                  className={`sb-media-img ${activeIdx === idx ? "is-active" : ""}`}
                />
              ))}
              <div className="sb-media-overlay" />
              <div className="sb-media-caption">
                <span>SOFTBRIDGE ENGINEERING</span>
                <span>{activeProject.accent}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDY DEEP DIVE SECTION */}
      <section className="sb-details-section">
        <div className="sb-details-container">
          <div className="sb-meta-bar">
            <span className="sb-case-tag">CASE STUDY // 0{currentIndex + 1}</span>
            <span className="sb-kicker-tag">{study.kicker}</span>
          </div>

          <h2 className="sb-details-title">{study.title}</h2>
          <p className="sb-details-statement">&ldquo;{study.statement}&rdquo;</p>
          <p className="sb-details-intro">{study.intro}</p>

          {/* Metrics & Highlights */}
          <div className="sb-metrics-flex">
            <div className="sb-metric-card">
              <small>PERFORMANCE METRIC</small>
              <strong>{study.metric}</strong>
              <span>{study.metricLabel}</span>
            </div>

            <div className="sb-accent-card">
              <Sparkles size={16} />
              <div>
                <small>DESIGN ACCENT</small>
                <strong>{study.accent}</strong>
              </div>
            </div>
          </div>

          {/* Sections Breakdown */}
          <div className="sb-sections-grid">
            {study.sections.map(([secTitle, secBody], idx) => (
              <div key={secTitle} className="sb-section-card">
                <div className="sb-sec-num">0{idx + 1}</div>
                <div>
                  <h4>{secTitle}</h4>
                  <p>{secBody}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEXT CASE FOOTER */}
      <section className="sb-next-footer">
        <div className="sb-next-container">
          <span className="sb-next-label">NEXT CASE STUDY</span>
          <h2 className="sb-next-title">{nextStudy.title}</h2>
          <p className="sb-next-kicker">{nextStudy.kicker}</p>
          <Link href={`/cases/${nextStudy.slug}`} className="sb-next-btn">
            Explore Next Case <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
