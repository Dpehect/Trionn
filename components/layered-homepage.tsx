"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { SpiralOrbitSection } from "@/components/spiral-orbit-section";

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
            start: "top 94%",
            end: "top 24%",
            scrub: 2.25,
          },
        }
      );

      const caseMotion = [
        {
          card: { x: -170, y: 190, rotate: -2.4, rotateX: 7, scale: 0.9 },
          image: { xPercent: -9, yPercent: 10, scale: 1.22, rotate: -0.8 },
          start: "top 108%",
          end: "top 40%",
          scrub: 3.55,
        },
        {
          card: { x: 0, y: 245, rotate: 0.5, rotateX: 9, scale: 0.885 },
          image: { xPercent: 0, yPercent: 13, scale: 1.25, rotate: 0.4 },
          start: "top 112%",
          end: "top 42%",
          scrub: 3.8,
        },
        {
          card: { x: 175, y: 175, rotate: 2.5, rotateX: 6, scale: 0.91 },
          image: { xPercent: 9, yPercent: 9, scale: 1.2, rotate: 0.9 },
          start: "top 107%",
          end: "top 39%",
          scrub: 3.65,
        },
        {
          card: { x: -125, y: 225, rotate: 1.4, rotateX: 8, scale: 0.89 },
          image: { xPercent: -7, yPercent: 12, scale: 1.24, rotate: 0.5 },
          start: "top 111%",
          end: "top 41%",
          scrub: 3.95,
        },
        {
          card: { x: 20, y: 275, rotate: -1.1, rotateX: 10, scale: 0.875 },
          image: { xPercent: 2, yPercent: 15, scale: 1.27, rotate: -0.5 },
          start: "top 115%",
          end: "top 43%",
          scrub: 4.15,
        },
        {
          card: { x: 145, y: 215, rotate: -1.8, rotateX: 7, scale: 0.895 },
          image: { xPercent: 8, yPercent: 11, scale: 1.23, rotate: -0.7 },
          start: "top 110%",
          end: "top 40%",
          scrub: 4.0,
        },
        {
          card: { x: -185, y: 220, rotate: -2.6, rotateX: 9, scale: 0.88 },
          image: { xPercent: -10, yPercent: 13, scale: 1.26, rotate: -1 },
          start: "top 113%",
          end: "top 42%",
          scrub: 4.25,
        },
        {
          card: { x: 0, y: 295, rotate: 0.9, rotateX: 11, scale: 0.865 },
          image: { xPercent: 0, yPercent: 16, scale: 1.29, rotate: 0.4 },
          start: "top 117%",
          end: "top 44%",
          scrub: 4.45,
        },
        {
          card: { x: 190, y: 205, rotate: 2.3, rotateX: 8, scale: 0.89 },
          image: { xPercent: 10, yPercent: 12, scale: 1.24, rotate: 0.9 },
          start: "top 112%",
          end: "top 41%",
          scrub: 4.2,
        },
      ] as const;

      gsap.utils.toArray<HTMLElement>(".case-card").forEach((card, index) => {
        const image = card.querySelector<HTMLElement>(".case-card__image");
        const media = card.querySelector<HTMLElement>(".case-card__media");
        const meta = card.querySelector<HTMLElement>(".case-card__meta");
        const category = card.querySelector<HTMLElement>(".case-card__meta p");
        const title = card.querySelector<HTMLElement>(".case-card__meta h3");
        const arrow = card.querySelector<SVGElement>(".case-card__meta svg");
        const motion = caseMotion[index];

        if (!image || !media || !meta || !category || !title || !arrow) {
          return;
        }

        const timeline = gsap.timeline({
          defaults: {
            overwrite: "auto",
          },
          scrollTrigger: {
            trigger: card,
            start: motion.start,
            end: motion.end,
            scrub: motion.scrub,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .fromTo(
            card,
            {
              x: motion.card.x,
              y: motion.card.y,
              opacity: 0,
              scale: motion.card.scale,
              rotate: motion.card.rotate,
              rotateX: motion.card.rotateX,
              filter: "blur(9px)",
              transformOrigin:
                index % 3 === 0
                  ? "left bottom"
                  : index % 3 === 2
                    ? "right bottom"
                    : "center bottom",
            },
            {
              x: 0,
              y: 0,
              opacity: 1,
              scale: 1,
              rotate: 0,
              rotateX: 0,
              filter: "blur(0px)",
              duration: 0.72,
              ease: "power3.out",
            },
            0
          )
          .fromTo(
            media,
            {
              clipPath: "inset(8% 5% 12% 5% round 18px)",
            },
            {
              clipPath: "inset(0% 0% 0% 0% round 0px)",
              duration: 0.68,
              ease: "power2.inOut",
            },
            0.06
          )
          .fromTo(
            image,
            {
              xPercent: motion.image.xPercent,
              yPercent: motion.image.yPercent,
              scale: motion.image.scale,
              rotate: motion.image.rotate,
            },
            {
              xPercent: 0,
              yPercent: 0,
              scale: 1.045,
              rotate: 0,
              duration: 0.82,
              ease: "power3.out",
            },
            0.03
          )
          .fromTo(
            meta,
            {
              y: 34,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.42,
              ease: "power2.out",
            },
            0.38
          )
          .fromTo(
            category,
            {
              y: 13,
              opacity: 0,
              letterSpacing: "0.16em",
            },
            {
              y: 0,
              opacity: 1,
              letterSpacing: "0.08em",
              duration: 0.26,
              ease: "power2.out",
            },
            0.45
          )
          .fromTo(
            title,
            {
              y: 20,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.3,
              ease: "power3.out",
            },
            0.52
          )
          .fromTo(
            arrow,
            {
              x: -12,
              y: 12,
              opacity: 0,
              rotate: -18,
            },
            {
              x: 0,
              y: 0,
              opacity: 1,
              rotate: 0,
              duration: 0.28,
              ease: "back.out(1.7)",
            },
            0.59
          );

        gsap.fromTo(
          image,
          {
            yPercent: 0,
            scale: 1.045,
          },
          {
            yPercent: -7 - (index % 3) * 1.25,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 74%",
              end: "bottom 5%",
              scrub: 2.6 + index * 0.11,
              invalidateOnRefresh: true,
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

      <SpiralOrbitSection />

      <section id="contact" className="closing">
        <p>Have a project?</p>
        <h2>Let&apos;s talk.</h2>
      </section>
    </main>
  );
}
