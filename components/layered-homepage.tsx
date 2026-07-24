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
      const orbitStage = document.querySelector<HTMLElement>(".orbit-stage");
      const orbitCore = document.querySelector<HTMLElement>(".orbit-core");
      const orbitCards = gsap.utils.toArray<HTMLElement>(".orbit-card");

      if (orbitSection && orbitStage && orbitCore && orbitCards.length) {
        const cardCount = orbitCards.length;
        const setters = orbitCards.map((card) => ({
          x: gsap.quickSetter(card, "x", "px"),
          y: gsap.quickSetter(card, "y", "px"),
          scale: gsap.quickSetter(card, "scale"),
          rotationY: gsap.quickSetter(card, "rotationY", "deg"),
          rotationZ: gsap.quickSetter(card, "rotationZ", "deg"),
          opacity: gsap.quickSetter(card, "opacity"),
          filter: gsap.quickSetter(card, "filter"),
        }));

        let targetProgress = 0;
        let renderedProgress = 0;
        let animationFrame = 0;
        let active = false;

        const renderOrbit = () => {
          renderedProgress += (targetProgress - renderedProgress) * 0.105;

          const width = orbitStage.clientWidth;
          const height = orbitStage.clientHeight;
          const radiusX = Math.min(width * 0.405, 620);
          const radiusY = Math.min(height * 0.245, 190);
          const travel = renderedProgress * Math.PI * 3.15;
          const stageBreath = Math.sin(renderedProgress * Math.PI) * 0.035;

          orbitCards.forEach((card, index) => {
            const baseAngle = (index / cardCount) * Math.PI * 2 - Math.PI / 2;
            const angle = baseAngle + travel;
            const depth = Math.sin(angle);
            const side = Math.cos(angle);
            const frontness = (depth + 1) / 2;

            const x = side * radiusX;
            const y = depth * radiusY + Math.cos(angle * 2) * 12;
            const scale = 0.67 + frontness * 0.43 + stageBreath;
            const opacity = 0.22 + frontness * 0.78;
            const blur = (1 - frontness) * 2.2;
            const brightness = 0.38 + frontness * 0.72;
            const yaw = side * -11;
            const roll = side * 2.1;

            setters[index].x(x);
            setters[index].y(y);
            setters[index].scale(scale);
            setters[index].rotationY(yaw);
            setters[index].rotationZ(roll);
            setters[index].opacity(opacity);
            setters[index].filter(`brightness(${brightness}) blur(${blur}px)`);

            card.style.zIndex = depth > 0
              ? String(300 + Math.round(frontness * 100))
              : String(50 + Math.round(frontness * 40));
            card.style.pointerEvents = frontness > 0.72 ? "auto" : "none";
          });

          const coreScale = 1 + Math.sin(renderedProgress * Math.PI * 2) * 0.018;
          gsap.set(orbitCore, {
            scale: coreScale,
            rotate: renderedProgress * 18 - 9,
          });

          if (active || Math.abs(targetProgress - renderedProgress) > 0.0005) {
            animationFrame = requestAnimationFrame(renderOrbit);
          } else {
            animationFrame = 0;
          }
        };

        const startRender = () => {
          active = true;
          if (!animationFrame) animationFrame = requestAnimationFrame(renderOrbit);
        };

        const stopRender = () => {
          active = false;
        };

        gsap.set(orbitCards, {
          xPercent: -50,
          yPercent: -50,
          transformOrigin: "50% 50%",
          transformPerspective: 1400,
        });

        const orbitTrigger = ScrollTrigger.create({
          trigger: orbitSection,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.15,
          invalidateOnRefresh: true,
          onEnter: startRender,
          onEnterBack: startRender,
          onLeave: stopRender,
          onLeaveBack: stopRender,
          onUpdate: (self) => {
            targetProgress = self.progress;
            startRender();
          },
          onRefresh: () => {
            targetProgress = orbitTrigger.progress;
            renderedProgress = targetProgress;
            startRender();
          },
        });

        gsap.fromTo(
          orbitStage,
          { scale: 0.84, opacity: 0, yPercent: 7 },
          {
            scale: 1,
            opacity: 1,
            yPercent: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: orbitSection,
              start: "top 82%",
              end: "top 18%",
              scrub: 1.15,
            },
          }
        );

        gsap.fromTo(
          orbitCore,
          { scale: 0.72, opacity: 0, filter: "blur(12px)" },
          {
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            ease: "power3.out",
            scrollTrigger: {
              trigger: orbitSection,
              start: "top 78%",
              end: "top 22%",
              scrub: 1.05,
            },
          }
        );

        gsap.fromTo(
          ".orbit-copy",
          { y: 46, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: orbitSection,
              start: "top 72%",
              end: "top 30%",
              scrub: 1,
            },
          }
        );

        gsap.to(".orbit-grid", {
          backgroundPosition: "0px 145px",
          ease: "none",
          scrollTrigger: {
            trigger: orbitSection,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.4,
          },
        });

        gsap.to(".orbit-halo--outer", {
          rotate: 28,
          scale: 1.05,
          ease: "none",
          scrollTrigger: {
            trigger: orbitSection,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.8,
          },
        });

        gsap.to(".orbit-halo--inner", {
          rotate: -34,
          scale: 0.96,
          ease: "none",
          scrollTrigger: {
            trigger: orbitSection,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.6,
          },
        });

        renderedProgress = 0;
        targetProgress = 0;
        startRender();

        return () => {
          active = false;
          cancelAnimationFrame(animationFrame);
          orbitTrigger.kill();
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

      <section className="orbit-showcase" aria-label="Interactive product ecosystem">
        <div className="orbit-showcase__sticky">
          <div className="orbit-grid" aria-hidden="true" />

          <div className="orbit-copy">
            <span>03 / DIGITAL ECOSYSTEMS</span>
            <p>
              Product partners for ambitious digital platforms. From strategy
              and design systems to scalable development, every layer moves as
              one connected experience.
            </p>
          </div>

          <div className="orbit-stage">
            <div className="orbit-halo orbit-halo--outer" aria-hidden="true" />
            <div className="orbit-halo orbit-halo--inner" aria-hidden="true" />
            <div className="orbit-axis orbit-axis--horizontal" aria-hidden="true" />
            <div className="orbit-axis orbit-axis--vertical" aria-hidden="true" />

            <div className="orbit-core" aria-hidden="true">
              <div className="orbit-core__shell" />
              <div className="orbit-core__ring orbit-core__ring--one" />
              <div className="orbit-core__ring orbit-core__ring--two" />
              <div className="orbit-core__glow" />
            </div>

            <div className="orbit-ring" aria-label="Orbiting project gallery">
              {orbitPanels.map((panel, index) => (
                <article className="orbit-card" key={panel.image}>
                  <div className="orbit-card__surface">
                    <Image
                      className="orbit-card__image"
                      src={panel.image}
                      alt=""
                      fill
                      sizes="(max-width: 700px) 44vw, 22vw"
                    />
                    <div className="orbit-card__shade" aria-hidden="true" />
                    <div className="orbit-card__ui">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <strong>
                        {index % 3 === 0
                          ? "Product System"
                          : index % 3 === 1
                            ? "Interface Layer"
                            : "Digital Platform"}
                      </strong>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="orbit-center-label" aria-hidden="true">
              <span>CONNECTED</span>
              <strong>ECOSYSTEM</strong>
            </div>
          </div>

          <div className="orbit-index" aria-hidden="true">
            <span>9 Projects</span>
            <span>24/7 Systems</span>
            <span>One Ecosystem</span>
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
