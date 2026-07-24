"use client";

import Image from "next/image";
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
  { name: "BRINC", category: "Product design, branding", image: "/cases/brinc.jpg" },
  { name: "SPAN", category: "Product design, branding", image: "/cases/span.jpg" },
  { name: "SONOS", category: "Product design", image: "/cases/sonos.jpg" },
  { name: "FORMLABS", category: "Product design", image: "/cases/formlabs.jpg" },
  { name: "AOI", category: "Product design, branding", image: "/cases/aoi.jpg" },
  { name: "SUPER73", category: "Product design", image: "/cases/super73.jpg" },
  { name: "SQUARE", category: "Hardware design, branding", image: "/cases/square.jpg" },
  { name: "STRYKER", category: "Product design", image: "/cases/stryker.jpg" },
  { name: "KOHLER", category: "Product design", image: "/cases/kohler.jpg" },
] as const;

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
        { yPercent: 38, opacity: 0, filter: "blur(10px)" },
        {
          yPercent: 0,
          opacity: 1,
          filter: "blur(0px)",
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".selected-cases",
            start: "top 82%",
            end: "top 32%",
            scrub: 1.35,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(".case-card").forEach((card, index) => {
        const image = card.querySelector(".case-card__image");
        const row = Math.floor(index / 3);
        const column = index % 3;

        gsap.fromTo(
          card,
          {
            y: 100 + row * 28,
            x: column === 0 ? -18 : column === 2 ? 18 : 0,
            opacity: 0,
            scale: 0.96,
            rotateX: 4,
          },
          {
            y: 0,
            x: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 94%",
              end: "top 62%",
              scrub: 1.15,
            },
          }
        );

        if (image) {
          gsap.fromTo(
            image,
            { scale: 1.12, yPercent: 6 },
            {
              scale: 1,
              yPercent: -3,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.3,
              },
            }
          );
        }
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
                      style={{ transform: `rotate(${item * 8 - 40}deg)` }}
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
          {cases.map((item) => (
            <article className="case-card" key={item.name}>
              <a href="#contact" className="case-card__link">
                <div className="case-card__media">
                  <Image
                    className="case-card__image"
                    src={item.image}
                    alt={`${item.name} project`}
                    fill
                    sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  />
                </div>
                <div className="case-card__meta">
                  <div>
                    <p>{item.category}</p>
                    <h3>{item.name}</h3>
                  </div>
                  <ArrowUpRight size={20} strokeWidth={1.4} />
                </div>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="closing">
        <p>Have a project?</p>
        <h2>Let&apos;s talk.</h2>
      </section>
    </main>
  );
}
