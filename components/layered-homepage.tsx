"use client";

import { ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const layers = [
  {
    eyebrow: "01 / EXPERTISE",
    title: "Our Expertise",
    body: "We turn complex systems into clear, high-performance digital experiences built for modern brands.",
    visual: "ring",
  },
  {
    eyebrow: "02 / INFRASTRUCTURE",
    title: "Compute Infrastructure at Scale",
    body: "A modular digital foundation that remains responsive, efficient and visually controlled at every breakpoint.",
    visual: "fan",
  },
  {
    eyebrow: "03 / STRATEGY",
    title: "Strategic Sites",
    body: "Editorial structure, precise interaction design and cinematic transitions combined in one scalable system.",
    visual: "map",
  },
] as const;

export function LayeredHomepage() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".layer-card");

      cards.forEach((card, index) => {
        const content = card.querySelector(".layer-copy");
        const visual = card.querySelector(".layer-visual");

        gsap.fromTo(
          card,
          { clipPath: index === 0 ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          }
        );

        gsap.fromTo(
          content,
          { y: 72, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
              end: "top 28%",
              scrub: 0.8,
            },
          }
        );

        gsap.fromTo(
          visual,
          { yPercent: 18, rotate: index === 1 ? -8 : 0, scale: 0.92 },
          {
            yPercent: 0,
            rotate: 0,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      gsap.fromTo(
        ".brand-reveal__mark",
        { scale: 0.42, opacity: 0, y: 70 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".brand-reveal",
            start: "top 75%",
            end: "center center",
            scrub: 0.8,
          },
        }
      );

      gsap.fromTo(
        ".architecture-panel__surface",
        { scale: 1.12, yPercent: 8 },
        {
          scale: 1,
          yPercent: -4,
          ease: "none",
          scrollTrigger: {
            trigger: ".architecture-panel",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        ".architecture-card",
        { y: 55, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".architecture-grid",
            start: "top 78%",
            end: "top 42%",
            scrub: 0.7,
          },
        }
      );

      gsap.fromTo(
        ".proof-map",
        { xPercent: -8, opacity: 0.35 },
        {
          xPercent: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".proof-section",
            start: "top 80%",
            end: "center center",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        ".proof-copy",
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".proof-section",
            start: "top 72%",
            end: "center 55%",
            scrub: 0.8,
          },
        }
      );
    },
    { scope: root }
  );

  return (
    <main ref={root} className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Ana sayfa">
          LAYER/01
        </a>
        <nav aria-label="Ana navigasyon">
          <a href="#work">Work</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
        </nav>
        <a className="contact-pill" href="#contact">
          Start a project <ArrowUpRight size={14} />
        </a>
      </header>

      <section id="top" className="intro">
        <p>Independent digital studio</p>
        <h1>
          Transforming ideas
          <br />
          into performance
        </h1>
        <span>Scroll to explore</span>
      </section>

      <section id="work" className="layer-stack" aria-label="Katmanlı içerik alanı">
        {layers.map((layer, index) => (
          <article
            className={`layer-card layer-card--${index + 1}`}
            key={layer.title}
            style={{ zIndex: index + 1 }}
          >
            <div className="layer-copy">
              <span className="eyebrow">{layer.eyebrow}</span>
              <h2>{layer.title}</h2>
              <p>{layer.body}</p>
              <a href="#contact" className="text-link">
                Discover more <ArrowUpRight size={15} />
              </a>
            </div>

            <div className={`layer-visual visual-${layer.visual}`} aria-hidden="true">
              {layer.visual === "ring" && <div className="metal-ring" />}
              {layer.visual === "fan" && (
                <div className="fan-shape">
                  {Array.from({ length: 11 }).map((_, item) => (
                    <span key={item} style={{ transform: `rotate(${item * 8 - 40}deg)` }} />
                  ))}
                </div>
              )}
              {layer.visual === "map" && (
                <div className="map-grid">
                  <div className="map-orb" />
                  {Array.from({ length: 5 }).map((_, item) => (
                    <span key={item} style={{ top: `${18 + item * 13}%`, right: `${8 + item * 7}%` }}>
                      NODE 0{item + 1}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </section>

      <section className="brand-reveal" aria-label="Marka geçişi">
        <div className="brand-reveal__cloud brand-reveal__cloud--left" />
        <div className="brand-reveal__cloud brand-reveal__cloud--right" />
        <div className="brand-reveal__mark" aria-hidden="true">
          <div className="wolf-shield"><span /></div>
          <strong>TERAWULF</strong>
        </div>
      </section>

      <section className="architecture-panel" aria-label="Power infrastructure">
        <div className="architecture-panel__surface" aria-hidden="true">
          <div className="facility-lines" />
          <div className="facility-block facility-block--one" />
          <div className="facility-block facility-block--two" />
          <div className="facility-block facility-block--three" />
        </div>
        <div className="architecture-panel__veil" />
        <div className="architecture-content">
          <span className="eyebrow eyebrow--light">ARCHITECTED FOR A</span>
          <h2>Power-Constrained Future</h2>
          <div className="architecture-grid">
            <article className="architecture-card">
              <h3>Built Beyond Limits</h3>
              <p>Purpose-built systems engineered for demanding workloads, evolving infrastructure and long-term operational resilience.</p>
              <a href="#proof">Our expertise <ArrowUpRight size={13} /></a>
            </article>
            <article className="architecture-card">
              <h3>Power Behind Progress</h3>
              <p>Reliable energy architecture connects every stage of delivery, from site planning through continuous operation.</p>
              <a href="#proof">Our power platform <ArrowUpRight size={13} /></a>
            </article>
            <article className="architecture-card">
              <h3>Asset-Backed Platform</h3>
              <p>Physical infrastructure, strategic locations and disciplined execution create a scalable operating advantage.</p>
              <a href="#proof">View our portfolio <ArrowUpRight size={13} /></a>
            </article>
          </div>
        </div>
      </section>

      <section id="proof" className="proof-section">
        <div className="proof-map" aria-hidden="true">
          <div className="usa-shape" />
          <span className="proof-node proof-node--1"><i />01</span>
          <span className="proof-node proof-node--2"><i />02</span>
          <span className="proof-node proof-node--3"><i />03</span>
        </div>
        <div className="proof-copy">
          <span className="eyebrow">EXECUTION AT SCALE</span>
          <h2>The Proof is in<br />the Execution</h2>
          <p>Credibility is earned through delivery. Our platform combines secure sites, resilient infrastructure and disciplined capital deployment to turn ambitious plans into operating assets.</p>
          <div className="proof-stats">
            <span><b>3.0 GW</b> controlled</span>
            <span><b>300 MW</b> contracted</span>
            <span><b>5</b> prime locations</span>
          </div>
        </div>
      </section>

      <section id="contact" className="closing">
        <p>Continue building below</p>
        <h2>Next section.</h2>
      </section>
    </main>
  );
}
