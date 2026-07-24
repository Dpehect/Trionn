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

const cases = [
  { name: "Aether", type: "Digital identity", size: "large" },
  { name: "Noema", type: "Product experience", size: "small" },
  { name: "Forma", type: "Commerce platform", size: "medium" },
  { name: "Solace", type: "Campaign system", size: "tall" },
];

export function LayeredHomepage() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".layer-card").forEach((card, index) => {
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
          }
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
              start: "top 76%",
              end: "top 30%",
              scrub: 0.9,
            },
          }
        );
      });

      gsap.fromTo(
        ".selected-cases__title",
        { yPercent: 45, opacity: 0, letterSpacing: "-0.08em" },
        {
          yPercent: 0,
          opacity: 1,
          letterSpacing: "-0.06em",
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".selected-cases",
            start: "top 78%",
            end: "top 28%",
            scrub: 1.2,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(".case-card").forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            y: 130 + index * 18,
            opacity: 0,
            scale: 0.965,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 94%",
              end: "top 56%",
              scrub: 1.1,
            },
          }
        );
      });
    },
    { scope: root }
  );

  return (
    <main ref={root} className="site-shell">
      <section className="intro">
        <p>Independent digital studio</p>
        <h1>
          Transforming ideas
          <br />
          into performance
        </h1>
        <span>Scroll to explore</span>
      </section>

      <section className="layer-stack" aria-label="Layered content">
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

            <div
              className={`layer-visual visual-${layer.visual}`}
              aria-hidden="true"
            >
              {layer.visual === "ring" && <div className="metal-ring" />}
              {layer.visual === "fan" && (
                <div className="fan-shape">
                  {Array.from({ length: 11 }).map((_, item) => (
                    <span
                      key={item}
                      style={{
                        transform: `rotate(${item * 8 - 40}deg)`,
                      }}
                    />
                  ))}
                </div>
              )}
              {layer.visual === "map" && (
                <div className="map-grid">
                  <div className="map-orb" />
                </div>
              )}
            </div>
          </article>
        ))}
      </section>

      <section id="cases" className="selected-cases">
        <header className="selected-cases__header">
          <h2 className="selected-cases__title">Selected Cases</h2>
        </header>

        <div className="selected-cases__gallery">
          {cases.map((item, index) => (
            <article
              className={`case-card case-card--${item.size}`}
              key={item.name}
            >
              <div className={`case-card__visual case-card__visual--${index + 1}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="case-card__meta">
                <h3>{item.name}</h3>
                <p>{item.type}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="closing">
        <p>Have a project?</p>
        <h2>Let&apos;s talk.</h2>
      </section>
    </main>
  );
}
