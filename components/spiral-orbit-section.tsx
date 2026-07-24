"use client";

import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const spiralItems = [
  { image: "/cases/brinc.jpg", title: "BRINC", type: "PRODUCT SYSTEM" },
  { image: "/cases/span.jpg", title: "SPAN", type: "INTERFACE LAYER" },
  { image: "/cases/sonos.jpg", title: "SONOS", type: "DIGITAL PLATFORM" },
  { image: "/cases/formlabs.jpg", title: "FORMLABS", type: "PRODUCT SYSTEM" },
  { image: "/cases/aoi.jpg", title: "AOI", type: "INTERFACE LAYER" },
  { image: "/cases/super73.jpg", title: "SUPER73", type: "DIGITAL PLATFORM" },
  { image: "/cases/square.jpg", title: "SQUARE", type: "PRODUCT SYSTEM" },
  { image: "/cases/stryker.jpg", title: "STRYKER", type: "INTERFACE LAYER" },
  { image: "/cases/kohler.jpg", title: "KOHLER", type: "DIGITAL PLATFORM" },
  { image: "/cases/brinc.jpg", title: "BRINC LAB", type: "AI PLATFORM" },
  { image: "/cases/aoi.jpg", title: "AOI CORE", type: "PRODUCT SYSTEM" },
  { image: "/cases/span.jpg", title: "SPAN GRID", type: "INTERFACE LAYER" },
] as const;

export function SpiralOrbitSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const stage = section.querySelector<HTMLElement>(".spiral-stage");
      const core = section.querySelector<HTMLElement>(".spiral-core");
      const cards = gsap.utils.toArray<HTMLElement>(".spiral-card", section);

      if (!stage || !core || cards.length === 0) return;

      let targetProgress = 0;
      let renderedProgress = 0;
      let frame = 0;
      let active = false;

      const setters = cards.map((card) => ({
        x: gsap.quickSetter(card, "x", "px"),
        y: gsap.quickSetter(card, "y", "px"),
        scale: gsap.quickSetter(card, "scale"),
        rotation: gsap.quickSetter(card, "rotation", "deg"),
        rotationY: gsap.quickSetter(card, "rotationY", "deg"),
        opacity: gsap.quickSetter(card, "opacity"),
        filter: gsap.quickSetter(card, "filter"),
      }));

      const render = () => {
        renderedProgress += (targetProgress - renderedProgress) * 0.11;

        const width = stage.clientWidth;
        const height = stage.clientHeight;
        const spanX = Math.min(width * 0.82, 1260);
        const radiusY = Math.min(height * 0.245, 205);
        const turns = Math.PI * 5.15;
        const phase = renderedProgress * Math.PI * 4.2;
        const count = cards.length;

        cards.forEach((card, index) => {
          const t = index / (count - 1);
          const x = (t - 0.5) * spanX;
          const angle = t * turns + phase;
          const depth = Math.cos(angle);
          const frontness = (depth + 1) * 0.5;
          const y = Math.sin(angle) * radiusY;
          const slope = Math.cos(angle) * 5.5;

          const scale = 0.61 + frontness * 0.54;
          const opacity = 0.18 + frontness * 0.82;
          const blur = (1 - frontness) * 3.2;
          const brightness = 0.31 + frontness * 0.82;
          const yaw = (t - 0.5) * -8;

          setters[index].x(x);
          setters[index].y(y);
          setters[index].scale(scale);
          setters[index].rotation(slope);
          setters[index].rotationY(yaw);
          setters[index].opacity(opacity);
          setters[index].filter(
            `brightness(${brightness}) saturate(${0.58 + frontness * 0.42}) blur(${blur}px)`,
          );

          card.style.zIndex = depth >= 0
            ? String(500 + Math.round(frontness * 180))
            : String(80 + Math.round(frontness * 80));
          card.style.pointerEvents = frontness > 0.72 ? "auto" : "none";
        });

        gsap.set(core, {
          rotate: -8 + renderedProgress * 18,
          scale: 1 + Math.sin(renderedProgress * Math.PI * 2) * 0.015,
        });

        if (active || Math.abs(targetProgress - renderedProgress) > 0.0005) {
          frame = requestAnimationFrame(render);
        } else {
          frame = 0;
        }
      };

      const startRender = () => {
        active = true;
        if (!frame) frame = requestAnimationFrame(render);
      };

      gsap.set(cards, {
        xPercent: -50,
        yPercent: -50,
        transformOrigin: "50% 50%",
        transformPerspective: 1500,
      });

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.15,
        invalidateOnRefresh: true,
        onEnter: startRender,
        onEnterBack: startRender,
        onLeave: () => { active = false; },
        onLeaveBack: () => { active = false; },
        onUpdate: (self) => {
          targetProgress = self.progress;
          startRender();
        },
        onRefresh: (self) => {
          targetProgress = self.progress;
          renderedProgress = self.progress;
          startRender();
        },
      });

      gsap.fromTo(
        ".spiral-stage",
        { scale: 0.78, yPercent: 8, opacity: 0 },
        {
          scale: 1,
          yPercent: 0,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 84%",
            end: "top 16%",
            scrub: 1.05,
          },
        },
      );

      gsap.fromTo(
        ".spiral-copy",
        { y: 38, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 76%",
            end: "top 32%",
            scrub: 1,
          },
        },
      );

      gsap.to(".spiral-grid", {
        backgroundPosition: "140px 0px",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.45,
        },
      });

      startRender();

      return () => {
        active = false;
        cancelAnimationFrame(frame);
        trigger.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="spiral-orbit" aria-label="Horizontal spiral project orbit">
      <div className="spiral-orbit__sticky">
        <div className="spiral-grid" aria-hidden="true" />

        <div className="spiral-copy">
          <span>03 / CONNECTED SYSTEMS</span>
          <p>
            A horizontal product helix wrapping around one central intelligence.
            Scroll to rotate the full system through foreground and background depth.
          </p>
        </div>

        <div className="spiral-stage">
          <div className="spiral-axis" aria-hidden="true" />
          <div className="spiral-guide spiral-guide--one" aria-hidden="true" />
          <div className="spiral-guide spiral-guide--two" aria-hidden="true" />

          <div className="spiral-core" aria-hidden="true">
            <div className="spiral-core__body" />
            <div className="spiral-core__ring spiral-core__ring--one" />
            <div className="spiral-core__ring spiral-core__ring--two" />
            <div className="spiral-core__glow" />
          </div>

          <div className="spiral-cards">
            {spiralItems.map((item, index) => (
              <article className="spiral-card" key={`${item.title}-${index}`}>
                <div className="spiral-card__surface">
                  <Image
                    className="spiral-card__image"
                    src={item.image}
                    alt=""
                    fill
                    sizes="(max-width: 700px) 46vw, 20vw"
                  />
                  <div className="spiral-card__shade" aria-hidden="true" />
                  <div className="spiral-card__meta">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <small>{item.type}</small>
                      <strong>{item.title}</strong>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="spiral-core-label" aria-hidden="true">
            <span>ORBITAL</span>
            <strong>INTELLIGENCE</strong>
          </div>
        </div>

        <div className="spiral-index" aria-hidden="true">
          <span>12 NODES</span>
          <span>04.2 ROTATIONS</span>
        </div>
      </div>
    </section>
  );
}
