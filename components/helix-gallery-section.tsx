"use client";

import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const helixItems = [
  ["BRINC", "/cases/brinc.jpg"],
  ["SPAN", "/cases/span.jpg"],
  ["SONOS", "/cases/sonos.jpg"],
  ["FORMLABS", "/cases/formlabs.jpg"],
  ["AOI", "/cases/aoi.jpg"],
  ["SUPER73", "/cases/super73.jpg"],
  ["SQUARE", "/cases/square.jpg"],
  ["STRYKER", "/cases/stryker.jpg"],
  ["KOHLER", "/cases/kohler.jpg"],
  ["BRINC LAB", "/cases/brinc.jpg"],
  ["SPAN GRID", "/cases/span.jpg"],
  ["SONOS CORE", "/cases/sonos.jpg"],
  ["FORM SYSTEM", "/cases/formlabs.jpg"],
  ["AOI LAB", "/cases/aoi.jpg"],
  ["SUPER PLATFORM", "/cases/super73.jpg"],
  ["SQUARE OS", "/cases/square.jpg"],
  ["STRYKER AI", "/cases/stryker.jpg"],
  ["KOHLER FLOW", "/cases/kohler.jpg"],
] as const;

export function HelixGallerySection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;

      const stage = section.querySelector<HTMLElement>(".helix-stage");
      const core = section.querySelector<HTMLElement>(".helix-core");
      const cards = gsap.utils.toArray<HTMLElement>(".helix-card", section);

      if (!stage || !core || cards.length === 0) return;

      let target = 0;
      let current = 0;
      let raf = 0;
      let running = false;

      const setters = cards.map((card) => ({
        x: gsap.quickSetter(card, "x", "px"),
        y: gsap.quickSetter(card, "y", "px"),
        scale: gsap.quickSetter(card, "scale"),
        rotation: gsap.quickSetter(card, "rotation", "deg"),
        rotationY: gsap.quickSetter(card, "rotationY", "deg"),
        opacity: gsap.quickSetter(card, "opacity"),
        filter: gsap.quickSetter(card, "filter"),
      }));

      const draw = () => {
        current += (target - current) * 0.085;

        const width = stage.clientWidth;
        const height = stage.clientHeight;
        const count = cards.length;

        const helixLength = Math.min(width * 1.22, 1780);
        const radius = Math.min(height * 0.29, 235);
        const totalTurns = 3.35;
        const phase = current * Math.PI * 5.2;
        const lateralTravel = (current - 0.5) * Math.min(width * 0.18, 250);

        cards.forEach((card, index) => {
          const u = index / (count - 1);
          const theta = u * totalTurns * Math.PI * 2 + phase;
          const depth = Math.cos(theta);
          const front = (depth + 1) / 2;

          const x = (u - 0.5) * helixLength - lateralTravel;
          const y = Math.sin(theta) * radius;
          const scale = 0.52 + front * 0.58;
          const opacity = 0.12 + front * 0.88;
          const brightness = 0.27 + front * 0.9;
          const blur = (1 - front) * 3.6;
          const roll = Math.sin(theta) * 4.2;
          const yaw = (u - 0.5) * -7;

          setters[index].x(x);
          setters[index].y(y);
          setters[index].scale(scale);
          setters[index].rotation(roll);
          setters[index].rotationY(yaw);
          setters[index].opacity(opacity);
          setters[index].filter(
            `brightness(${brightness}) saturate(${0.48 + front * 0.52}) blur(${blur}px)`,
          );

          // Cards in front pass over the core; cards behind pass beneath it.
          card.style.zIndex =
            depth > 0
              ? String(500 + Math.round(front * 180))
              : String(80 + Math.round(front * 90));
          card.style.pointerEvents = front > 0.78 ? "auto" : "none";
        });

        gsap.set(core, {
          rotate: -7 + current * 16,
          scale: 1 + Math.sin(current * Math.PI * 3) * 0.018,
        });

        if (running || Math.abs(target - current) > 0.00045) {
          raf = requestAnimationFrame(draw);
        } else {
          raf = 0;
        }
      };

      const start = () => {
        running = true;
        if (!raf) raf = requestAnimationFrame(draw);
      };

      gsap.set(cards, {
        xPercent: -50,
        yPercent: -50,
        transformPerspective: 1500,
        transformOrigin: "50% 50%",
      });

      const scroll = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
        invalidateOnRefresh: true,
        onEnter: start,
        onEnterBack: start,
        onLeave: () => {
          running = false;
        },
        onLeaveBack: () => {
          running = false;
        },
        onUpdate: (self) => {
          target = self.progress;
          start();
        },
        onRefresh: (self) => {
          target = self.progress;
          current = self.progress;
          start();
        },
      });

      gsap.fromTo(
        ".helix-stage",
        { opacity: 0, scale: 0.82, yPercent: 8 },
        {
          opacity: 1,
          scale: 1,
          yPercent: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 84%",
            end: "top 17%",
            scrub: 1.05,
          },
        },
      );

      gsap.fromTo(
        ".helix-copy",
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 74%",
            end: "top 34%",
            scrub: 1,
          },
        },
      );

      gsap.to(".helix-grid", {
        backgroundPosition: "150px 0",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });

      start();

      return () => {
        running = false;
        cancelAnimationFrame(raf);
        scroll.kill();
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} className="helix-section" aria-label="Horizontal spiral project gallery">
      <div className="helix-sticky">
        <div className="helix-grid" aria-hidden="true" />

        <div className="helix-copy">
          <span>03 / CONNECTED SYSTEMS</span>
          <p>
            A continuous horizontal helix of product interfaces wrapping around
            one central intelligence.
          </p>
        </div>

        <div className="helix-stage">
          <div className="helix-track helix-track--outer" aria-hidden="true" />
          <div className="helix-track helix-track--inner" aria-hidden="true" />

          <div className="helix-core" aria-hidden="true">
            <div className="helix-core__shell" />
            <div className="helix-core__ring helix-core__ring--a" />
            <div className="helix-core__ring helix-core__ring--b" />
            <div className="helix-core__glow" />
          </div>

          <div className="helix-cards">
            {helixItems.map(([title, image], index) => (
              <article className="helix-card" key={`${title}-${index}`}>
                <div className="helix-card__surface">
                  <Image
                    src={image}
                    alt=""
                    fill
                    className="helix-card__image"
                    sizes="(max-width: 700px) 42vw, 18vw"
                  />
                  <div className="helix-card__shade" aria-hidden="true" />
                  <div className="helix-card__meta">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{title}</strong>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="helix-label" aria-hidden="true">
            <span>CENTRAL</span>
            <strong>ORBIT</strong>
          </div>
        </div>

        <div className="helix-index" aria-hidden="true">
          <span>18 NODES</span>
          <span>3.35 TURNS</span>
        </div>
      </div>
    </section>
  );
}
