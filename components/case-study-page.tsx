"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import type { CaseStudy } from "@/data/cases";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Scene {
  category: string;
  client: string;
  mark: string;
  color: string;
  image: string;
  logoText: string;
}

const defaultScenes: Scene[] = [
  {
    category: "Branding",
    client: "Vakeso",
    mark: "V",
    color: "#f0642f",
    image: "/detail-part-01/digital-product.jpg",
    logoText: "Vakeso",
  },
  {
    category: "AI Systems",
    client: "Nordic Intelligence",
    mark: "NI",
    color: "#3b82f6",
    image: "/detail-part-01/ai-strategy.jpg",
    logoText: "Nordic AI",
  },
  {
    category: "Enterprise Web",
    client: "Atlas Platform",
    mark: "AP",
    color: "#10b981",
    image: "/detail-part-01/web-engineering.jpg",
    logoText: "Atlas",
  },
  {
    category: "Mobile Platforms",
    client: "Nova Mobile",
    mark: "NM",
    color: "#8b5cf6",
    image: "/detail-part-01/software-studio.jpg",
    logoText: "Nova",
  },
  {
    category: "Cloud Infrastructure",
    client: "Vault Cloud",
    mark: "VC",
    color: "#ec4899",
    image: "/detail-part-01/data-platform.jpg",
    logoText: "Vault",
  },
];

export function CaseStudyPage({ study }: { study?: CaseStudy }) {
  const root = useRef<HTMLElement>(null);

  const scenes: Scene[] = study
    ? [
        {
          category: study.title === "AI Software Development" ? "Branding" : study.title,
          client: study.title === "AI Software Development" ? "Vakeso" : (study.kicker ? study.kicker.split("/")[0].trim() : "Vakeso"),
          mark: study.title === "AI Software Development" ? "V" : study.title.charAt(0),
          color: "#f0642f",
          image: study.editorialHero || study.hero || "/detail-part-01/digital-product.jpg",
          logoText: study.title === "AI Software Development" ? "Vakeso" : study.title,
        },
        ...defaultScenes.filter(
          (s) => s.category !== (study.title === "AI Software Development" ? "Branding" : study.title)
        ),
      ]
    : defaultScenes;

  useGSAP(
    () => {
      const slideTrack = document.querySelector<HTMLElement>(".fc-image-track");
      const categoryTrack = document.querySelector<HTMLElement>(".fc-category-track");
      const clientTrack = document.querySelector<HTMLElement>(".fc-client-track");
      const progress = gsap.utils.toArray<HTMLElement>(".fc-progress span");

      if (!slideTrack || !categoryTrack || !clientTrack) return;

      gsap.set(progress, { opacity: 0.24 });
      if (progress[0]) gsap.set(progress[0], { opacity: 1 });

      const master = gsap.timeline({
        scrollTrigger: {
          trigger: ".fc-scroll",
          start: "top top",
          end: `+=${scenes.length * 120}%`,
          pin: ".fc-stage",
          scrub: 1.15,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      for (let index = 0; index < scenes.length - 1; index += 1) {
        const at = index + 0.05;

        master
          .to(
            slideTrack,
            {
              yPercent: -100 * (index + 1),
              duration: 1,
              ease: "power3.inOut",
            },
            at
          )
          .to(
            categoryTrack,
            {
              yPercent: -100 * (index + 1),
              duration: 0.92,
              ease: "power3.inOut",
            },
            at
          )
          .to(
            clientTrack,
            {
              yPercent: -100 * (index + 1),
              duration: 0.92,
              ease: "power3.inOut",
            },
            at
          )
          .to(progress[index], { opacity: 0.24, duration: 0.16 }, at + 0.56)
          .to(progress[index + 1], { opacity: 1, duration: 0.16 }, at + 0.56);
      }

      master.to(
        ".fc-cta",
        {
          yPercent: 0,
          duration: 0.62,
          ease: "power3.inOut",
        },
        scenes.length - 0.08
      );

      gsap.fromTo(
        ".fc-header",
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );

      const canvases = gsap.utils.toArray<HTMLElement>(".fc-image-canvas");

      canvases.forEach((canvas) => {
        const image = canvas.querySelector<HTMLElement>(".fc-image");
        const overlay = canvas.querySelector<HTMLElement>(".fc-brand-overlay");
        const chroma = canvas.querySelector<HTMLElement>(".fc-chroma");
        const wave = canvas.querySelector<HTMLElement>(".fc-wave");
        if (!image || !chroma || !wave) return;

        const xTo = gsap.quickTo(image, "xPercent", { duration: 0.65, ease: "power3.out" });
        const yTo = gsap.quickTo(image, "yPercent", { duration: 0.65, ease: "power3.out" });
        const scaleTo = gsap.quickTo(image, "scale", { duration: 0.7, ease: "power3.out" });

        const overlayXTo = overlay ? gsap.quickTo(overlay, "x", { duration: 0.5, ease: "power2.out" }) : null;
        const overlayYTo = overlay ? gsap.quickTo(overlay, "y", { duration: 0.5, ease: "power2.out" }) : null;

        const onMove = (event: PointerEvent) => {
          const rect = canvas.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;

          xTo(x * 1.5);
          yTo(y * 1.2);
          scaleTo(1.02);

          if (overlayXTo && overlayYTo) {
            overlayXTo(x * 12);
            overlayYTo(y * 8);
          }

          gsap.to(wave, {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
            opacity: 0.32,
            scale: 1,
            duration: 0.22,
            overwrite: true,
          });

          gsap.to(chroma, {
            x: x * 5,
            y: y * 4,
            opacity: 0.09,
            duration: 0.22,
            overwrite: true,
          });
        };

        const onLeave = () => {
          xTo(0);
          yTo(0);
          scaleTo(1);

          if (overlayXTo && overlayYTo) {
            overlayXTo(0);
            overlayYTo(0);
          }

          gsap.to(wave, {
            opacity: 0,
            scale: 0.8,
            duration: 0.36,
          });

          gsap.to(chroma, {
            x: 0,
            y: 0,
            opacity: 0.035,
            duration: 0.36,
          });
        };

        canvas.addEventListener("pointermove", onMove);
        canvas.addEventListener("pointerleave", onLeave);
      });
    },
    { scope: root }
  );

  return (
    <main ref={root} className="fc-page">
      <header className="fc-header">
        <div className="fc-header-left">
          <Link href="/" className="fc-logo">
            Vivid Motion<sup>®</sup>
          </Link>
        </div>

        <div className="fc-header-center">
          <p className="fc-header-statement">
            We design, build and grow brands and digital products for the world&apos;s biggest companies and boldest new ones
          </p>
        </div>

        <div className="fc-header-right">
          <Link href="/" className="fc-home-btn">
            HOME ::
          </Link>
        </div>
      </header>

      <section className="fc-scroll">
        <div className="fc-stage">
          <div className="fc-left">
            <div className="fc-left-top">
              <span className="fc-featured">Featured work</span>

              <div className="fc-category-window">
                <div className="fc-category-track">
                  {scenes.map((scene) => (
                    <h1 key={scene.category}>{scene.category}</h1>
                  ))}
                </div>
              </div>
            </div>

            <div className="fc-client-window">
              <div className="fc-client-track">
                {scenes.map((scene) => (
                  <div className="fc-client" key={scene.client}>
                    <div
                      className="fc-client-mark"
                      style={{ backgroundColor: scene.color }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M5 6L12 18L19 6" stroke="#FFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                        <rect x="4" y="4" width="6" height="6" rx="1.5" fill="#FFF" />
                      </svg>
                    </div>
                    <div className="fc-client-info">
                      <small>CLIENT</small>
                      <strong>{scene.client}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="fc-right">
            <div className="fc-image-track">
              {scenes.map((scene, index) => (
                <article className="fc-image-scene" key={scene.category}>
                  <div className="fc-image-canvas">
                    <img
                      className="fc-image"
                      src={scene.image}
                      alt={`${scene.category} project visual`}
                    />

                    <div className="fc-brand-overlay">
                      <div
                        className="fc-brand-icon"
                        style={{ backgroundColor: scene.color }}
                      >
                        <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                          <path d="M5 6L12 18L19 6" stroke="#FFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                          <rect x="4" y="4" width="6" height="6" rx="1.5" fill="#FFF" />
                        </svg>
                      </div>
                      <span className="fc-brand-name">{scene.logoText}</span>
                    </div>

                    <div
                      className="fc-chroma"
                      style={{ backgroundImage: `url(${scene.image})` }}
                    />
                    <div className="fc-image-shade" />
                    <div className="fc-grain" />
                    <div className="fc-wave" />

                    <div className="fc-image-meta">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <span>{scene.category}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="fc-progress">
            {scenes.map((scene, index) => (
              <span key={scene.category}>
                {String(index + 1).padStart(2, "0")}
              </span>
            ))}
          </div>

          <div className="fc-cta">
            <Link href="/#cases">
              See all work
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
