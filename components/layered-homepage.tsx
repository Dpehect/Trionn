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

const orbitPanels = [
  { image: "/cases/brinc.jpg", className: "orbit-panel--1", depth: 1.15 },
  { image: "/cases/span.jpg", className: "orbit-panel--2", depth: 0.82 },
  { image: "/cases/sonos.jpg", className: "orbit-panel--3", depth: 1.28 },
  { image: "/cases/formlabs.jpg", className: "orbit-panel--4", depth: 0.92 },
  { image: "/cases/aoi.jpg", className: "orbit-panel--5", depth: 1.38 },
  { image: "/cases/super73.jpg", className: "orbit-panel--6", depth: 0.76 },
  { image: "/cases/square.jpg", className: "orbit-panel--7", depth: 1.22 },
  { image: "/cases/stryker.jpg", className: "orbit-panel--8", depth: 0.88 },
  { image: "/cases/kohler.jpg", className: "orbit-panel--9", depth: 1.34 },
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

      const orbitSection = document.querySelector<HTMLElement>(".orbit-showcase");
      const vortexStage = document.querySelector<HTMLElement>(".vortex-stage");
      const vortexCore = document.querySelector<HTMLElement>(".vortex-core");
      const vortexCards = gsap.utils.toArray<HTMLElement>(".vortex-card");

      if (orbitSection && vortexStage && vortexCore && vortexCards.length) {
        const cardCount = vortexCards.length;
        let targetProgress = 0;
        let renderedProgress = 0;
        let raf = 0;
        let active = false;

        const cardSetters = vortexCards.map((card) => ({
          x: gsap.quickSetter(card, "x", "px"),
          y: gsap.quickSetter(card, "y", "px"),
          scale: gsap.quickSetter(card, "scale"),
          rotate: gsap.quickSetter(card, "rotation", "deg"),
          rotateY: gsap.quickSetter(card, "rotationY", "deg"),
          opacity: gsap.quickSetter(card, "opacity"),
          filter: gsap.quickSetter(card, "filter"),
        }));

        const renderVortex = () => {
          renderedProgress += (targetProgress - renderedProgress) * 0.095;

          const width = vortexStage.clientWidth;
          const height = vortexStage.clientHeight;
          const radiusX = Math.min(width * 0.255, 395);
          const verticalSpan = Math.min(height * 0.86, 720);
          const turns = Math.PI * 2.6;
          const scrollAngle = renderedProgress * Math.PI * 2.1;

          vortexCards.forEach((card, index) => {
            const normalized = index / Math.max(cardCount - 1, 1);
            const angle = normalized * turns + scrollAngle;
            const depth = Math.sin(angle);
            const side = Math.cos(angle);
            const frontness = (depth + 1) / 2;

            const localShift = ((renderedProgress * 1.28 + normalized) % 1.38) - 0.18;
            const y = (0.5 - localShift) * verticalSpan;
            const x = side * radiusX * (0.72 + frontness * 0.3);
            const scale = 0.58 + frontness * 0.56;
            const opacity = 0.16 + frontness * 0.84;
            const blur = (1 - frontness) * 3.1;
            const brightness = 0.3 + frontness * 0.86;
            const yaw = side * -10;
            const roll = side * 3.4;

            cardSetters[index].x(x);
            cardSetters[index].y(y);
            cardSetters[index].scale(scale);
            cardSetters[index].rotate(roll);
            cardSetters[index].rotateY(yaw);
            cardSetters[index].opacity(opacity);
            cardSetters[index].filter(`brightness(${brightness}) blur(${blur}px)`);

            card.style.zIndex = depth > 0
              ? String(420 + Math.round(frontness * 120))
              : String(80 + Math.round(frontness * 50));
            card.style.pointerEvents = frontness > 0.72 ? "auto" : "none";
          });

          gsap.set(vortexCore, {
            rotate: -11 + renderedProgress * 24,
            scale: 1 + Math.sin(renderedProgress * Math.PI * 3) * 0.018,
          });

          if (active || Math.abs(targetProgress - renderedProgress) > 0.0006) {
            raf = requestAnimationFrame(renderVortex);
          } else {
            raf = 0;
          }
        };

        const ensureRender = () => {
          active = true;
          if (!raf) raf = requestAnimationFrame(renderVortex);
        };

        gsap.set(vortexCards, {
          xPercent: -50,
          yPercent: -50,
          transformOrigin: "50% 50%",
          transformPerspective: 1500,
        });

        const vortexTrigger = ScrollTrigger.create({
          trigger: orbitSection,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.15,
          invalidateOnRefresh: true,
          onEnter: ensureRender,
          onEnterBack: ensureRender,
          onLeave: () => { active = false; },
          onLeaveBack: () => { active = false; },
          onUpdate: (self) => {
            targetProgress = self.progress;
            ensureRender();
          },
          onRefresh: (self) => {
            targetProgress = self.progress;
            renderedProgress = self.progress;
            ensureRender();
          },
        });

        gsap.fromTo(
          vortexStage,
          { scale: 0.78, opacity: 0, yPercent: 8 },
          {
            scale: 1,
            opacity: 1,
            yPercent: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: orbitSection,
              start: "top 84%",
              end: "top 18%",
              scrub: 1.05,
            },
          }
        );

        gsap.fromTo(
          vortexCore,
          { opacity: 0, scale: 0.72, filter: "blur(14px)" },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            ease: "power3.out",
            scrollTrigger: {
              trigger: orbitSection,
              start: "top 80%",
              end: "top 24%",
              scrub: 1.1,
            },
          }
        );

        gsap.fromTo(
          ".vortex-copy",
          { y: 42, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: orbitSection,
              start: "top 74%",
              end: "top 30%",
              scrub: 1,
            },
          }
        );

        gsap.to(".vortex-grid", {
          backgroundPosition: "0px 150px",
          ease: "none",
          scrollTrigger: {
            trigger: orbitSection,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
          },
        });

        renderedProgress = 0;
        targetProgress = 0;
        ensureRender();

        return () => {
          active = false;
          cancelAnimationFrame(raf);
          vortexTrigger.kill();
        };
      };
      }
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

      <section className="orbit-showcase" aria-label="Layered product vortex">
        <div className="orbit-showcase__sticky">
          <div className="vortex-grid" aria-hidden="true" />

          <nav className="vortex-nav" aria-hidden="true">
            <span>Approach</span>
            <span>Work</span>
            <span>About</span>
            <span>Pricing</span>
            <span>Contact</span>
          </nav>

          <div className="vortex-copy">
            <span>03 / PRODUCT ECOSYSTEM</span>
            <p>
              Product partners for AI-first platforms. From concept systems to
              launch-ready experiences, every interface layer moves as one
              connected whole.
            </p>
          </div>

          <div className="vortex-stage">
            <div className="vortex-core" aria-hidden="true">
              <div className="vortex-core__shell" />
              <div className="vortex-core__fold vortex-core__fold--one" />
              <div className="vortex-core__fold vortex-core__fold--two" />
              <div className="vortex-core__fold vortex-core__fold--three" />
              <div className="vortex-core__glow" />
            </div>

            <div className="vortex-cards">
              {orbitPanels.map((panel, index) => (
                <article className="vortex-card" key={panel.image}>
                  <div className="vortex-card__surface">
                    <Image
                      className="vortex-card__image"
                      src={panel.image}
                      alt=""
                      fill
                      sizes="(max-width: 700px) 48vw, 22vw"
                    />
                    <div className="vortex-card__overlay" aria-hidden="true" />
                    <div className="vortex-card__ui">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <strong>
                        {index % 3 === 0
                          ? "Product System"
                          : index % 3 === 1
                            ? "Interface Layer"
                            : "AI Platform"}
                      </strong>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="vortex-index" aria-hidden="true">
            <span>03 / 09</span>
            <span>Scroll to orbit</span>
          </div>
        </div>
      </section>

      <section id="contact" className="closing">
        <p>Have a project?</p>
        <h2>Let&apos;s talk.</h2>
      </section>
    </main>
  );
}
