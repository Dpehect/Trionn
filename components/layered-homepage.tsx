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
        gsap.fromTo(
          card,
          {
            clipPath:
              index === 0
                ? "inset(0% 0% 0% 0%)"
                : "inset(100% 0% 0% 0%)",
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          },
        );

        gsap.fromTo(
          card.querySelector(".layer-copy"),
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
          },
        );

        gsap.fromTo(
          card.querySelector(".layer-visual"),
          {
            yPercent: 18,
            rotate: index === 1 ? -8 : 0,
            scale: 0.92,
          },
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
          },
        );
      });

      gsap.fromTo(
        ".selected-cases__title",
        { yPercent: 70, opacity: 0, scale: 0.94 },
        {
          yPercent: 0,
          opacity: 1,
          scale: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".selected-cases",
            start: "top 78%",
            end: "top 28%",
            scrub: 1.5,
          },
        },
      );
    },
    { scope: root },
  );

  return (
    <main ref={root} className="site-shell">
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
              <a href="#cases" className="text-link">
                Discover more <ArrowUpRight size={15} />
              </a>
            </div>

            <div className={`layer-visual visual-${layer.visual}`} aria-hidden="true">
              {layer.visual === "ring" && <div className="metal-ring" />}

              {layer.visual === "fan" && (
                <div className="fan-shape">
                  {Array.from({ length: 11 }).map((_, item) => (
                    <span
                      key={item}
                      style={{ transform: `rotate(${item * 8 - 40}deg)` }}
                    />
                  ))}
                </div>
              )}

              {layer.visual === "map" && (
                <div className="map-grid">
                  <div className="map-orb" />
                  {Array.from({ length: 5 }).map((_, item) => (
                    <span
                      key={item}
                      style={{
                        top: `${18 + item * 13}%`,
                        right: `${8 + item * 7}%`,
                      }}
                    >
                      NODE 0{item + 1}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </section>

      {/* Layer 2: Video ve videoya gömülü tüm HOBRO/filtre içeriği kaldırıldı. */}
      <section id="cases" className="selected-cases" aria-labelledby="selected-cases-title">
        <h2 id="selected-cases-title" className="selected-cases__title">
          Selected Cases
        </h2>
      </section>

      <section id="contact" className="closing">
        <p>Next layer</p>
        <h2>Ready for the next part.</h2>
      </section>
    </main>
  );
}
