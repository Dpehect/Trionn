"use client";

import { ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const layers = [
  { eyebrow: "01 / EXPERTISE", title: "Our Expertise", body: "We turn complex systems into clear, high-performance digital experiences built for modern brands.", visual: "ring" },
  { eyebrow: "02 / INFRASTRUCTURE", title: "Compute Infrastructure at Scale", body: "A modular digital foundation that remains responsive, efficient and visually controlled at every breakpoint.", visual: "fan" },
  { eyebrow: "03 / STRATEGY", title: "Strategic Sites", body: "Editorial structure, precise interaction design and cinematic transitions combined in one scalable system.", visual: "map" },
] as const;

const cases = [
  { title: "Health Platform", meta: "Digital Product", visual: "people", size: "wide" },
  { title: "Lumen", meta: "Brand Experience", visual: "city", size: "small" },
  { title: "Connected", meta: "Mobile Campaign", visual: "phone", size: "medium" },
  { title: "Commerce Lab", meta: "E-commerce", visual: "commerce", size: "small" },
  { title: "Aesop", meta: "Launch Film", visual: "stage", size: "wide" },
  { title: "Super Interconnect", meta: "Interactive Web", visual: "circuit", size: "large" },
  { title: "Object Coach", meta: "Product Story", visual: "travel", size: "medium" },
  { title: "Drift", meta: "Identity System", visual: "symbol", size: "small" },
  { title: "Caviar", meta: "Motion Identity", visual: "caviar", size: "wide" },
  { title: "Meeting Room", meta: "Digital Service", visual: "meeting", size: "small" },
  { title: "Orbital", meta: "Interactive Film", visual: "orbital", size: "medium" },
  { title: "Scan Smart", meta: "Retail Campaign", visual: "scan", size: "wide" },
  { title: "NFT / 008", meta: "Web3 Experience", visual: "nft", size: "medium" },
] as const;

export function LayeredHomepage() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".layer-card");
    cards.forEach((card, index) => {
      gsap.fromTo(card,
        { clipPath: index === 0 ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "top top", scrub: true } }
      );
      gsap.fromTo(card.querySelector(".layer-copy"), { y: 72, opacity: 0 }, {
        y: 0, opacity: 1, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 75%", end: "top 28%", scrub: .8 }
      });
      gsap.fromTo(card.querySelector(".layer-visual"), { yPercent: 18, rotate: index === 1 ? -8 : 0, scale: .92 }, {
        yPercent: 0, rotate: 0, scale: 1, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true }
      });
    });

    gsap.fromTo(".cases-heading", { y: 70, opacity: 0 }, {
      y: 0, opacity: 1, ease: "power3.out", scrollTrigger: { trigger: ".selected-cases", start: "top 76%", end: "top 32%", scrub: .7 }
    });

    gsap.utils.toArray<HTMLElement>(".case-card").forEach((card, index) => {
      const media = card.querySelector(".case-card__visual");
      gsap.fromTo(card, { y: 90 + (index % 3) * 24, opacity: 0, scale: .96 }, {
        y: 0, opacity: 1, scale: 1, ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 94%", end: "top 58%", scrub: .7 }
      });
      gsap.fromTo(media, { yPercent: -7, scale: 1.08 }, {
        yPercent: 7, scale: 1, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true }
      });
    });

    gsap.fromTo(".project-cta__label", { y: 50, opacity: 0 }, {
      y: 0, opacity: 1, ease: "power3.out", scrollTrigger: { trigger: ".project-cta", start: "top 78%", end: "top 48%", scrub: .6 }
    });
    gsap.fromTo(".project-cta__marquee", { xPercent: -12, opacity: 0 }, {
      xPercent: 0, opacity: 1, ease: "none", scrollTrigger: { trigger: ".project-cta", start: "top 72%", end: "center 48%", scrub: .8 }
    });
  }, { scope: root });

  return (
    <main ref={root} className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Ana sayfa">LAYER/01</a>
        <nav aria-label="Ana navigasyon"><a href="#work">Work</a><a href="#cases">Cases</a><a href="#contact">Contact</a></nav>
        <a className="contact-pill" href="#contact">Start a project <ArrowUpRight size={14} /></a>
      </header>

      <section id="top" className="intro">
        <p>Independent digital studio</p>
        <h1>Transforming ideas<br />into performance</h1>
        <span>Scroll to explore</span>
      </section>

      <section id="work" className="layer-stack" aria-label="Katmanlı içerik alanı">
        {layers.map((layer, index) => (
          <article className={`layer-card layer-card--${index + 1}`} key={layer.title} style={{ zIndex: index + 1 }}>
            <div className="layer-copy"><span className="eyebrow">{layer.eyebrow}</span><h2>{layer.title}</h2><p>{layer.body}</p><a href="#cases" className="text-link">Discover more <ArrowUpRight size={15} /></a></div>
            <div className={`layer-visual visual-${layer.visual}`} aria-hidden="true">
              {layer.visual === "ring" && <div className="metal-ring" />}
              {layer.visual === "fan" && <div className="fan-shape">{Array.from({ length: 11 }).map((_, item) => <span key={item} style={{ transform: `rotate(${item * 8 - 40}deg)` }} />)}</div>}
              {layer.visual === "map" && <div className="map-grid"><div className="map-orb" />{Array.from({ length: 5 }).map((_, item) => <span key={item} style={{ top: `${18 + item * 13}%`, right: `${8 + item * 7}%` }}>NODE 0{item + 1}</span>)}</div>}
            </div>
          </article>
        ))}
      </section>

      <section id="cases" className="selected-cases">
        <div className="cases-heading">
          <div className="cases-index"><span>Selected (13)</span><span>Cases / 2024—26</span></div>
          <h2>Selected Cases</h2>
        </div>

        <div className="cases-grid">
          {cases.map((item, index) => (
            <article className={`case-card case-card--${index + 1} case-card--${item.size}`} key={item.title}>
              <div className={`case-card__visual visual-case--${item.visual}`} aria-hidden="true"><i /><b /></div>
              <div className="case-card__caption"><span>{item.title}</span><small>{item.meta}</small></div>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="project-cta">
        <p className="project-cta__label">Got Project?</p>
        <div className="project-cta__marquee" aria-label="Let's talk">
          <span className="waves">((((</span><strong>LET&apos;S TALK</strong><span className="waves">))))</span>
          <a href="mailto:hello@example.com">Start <ArrowUpRight size={14} /></a>
        </div>
      </section>
    </main>
  );
}
