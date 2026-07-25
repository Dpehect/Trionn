"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import type { CaseStudy } from "@/data/cases";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const scenes = [
  {
    category: "AI Systems",
    client: "Nordic Intelligence",
    mark: "NI",
    image: "/detail-part-01/ai-strategy.jpg",
  },
  {
    category: "Enterprise Web",
    client: "Atlas Platform",
    mark: "AP",
    image: "/detail-part-01/digital-product.jpg",
  },
  {
    category: "Mobile Platforms",
    client: "Nova Mobile",
    mark: "NM",
    image: "/detail-part-01/software-studio.jpg",
  },
  {
    category: "Cloud Infrastructure",
    client: "Vault Cloud",
    mark: "VC",
    image: "/detail-part-01/data-platform.jpg",
  },
] as const;

export function CaseStudyPage({ study }: { study: CaseStudy }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const slideTrack = document.querySelector<HTMLElement>(".fc-image-track");
      const categoryTrack = document.querySelector<HTMLElement>(".fc-category-track");
      const clientTrack = document.querySelector<HTMLElement>(".fc-client-track");
      const progress = gsap.utils.toArray<HTMLElement>(".fc-progress span");

      if (!slideTrack || !categoryTrack || !clientTrack) return;

      gsap.set(progress, { opacity: .24 });
      gsap.set(progress[0], { opacity: 1 });

      const master = gsap.timeline({
        scrollTrigger: {
          trigger: ".fc-scroll",
          start: "top top",
          end: `+=${scenes.length * 130}%`,
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
            at,
          )
          .to(
            categoryTrack,
            {
              yPercent: -100 * (index + 1),
              duration: .92,
              ease: "power3.inOut",
            },
            at,
          )
          .to(
            clientTrack,
            {
              yPercent: -100 * (index + 1),
              duration: .92,
              ease: "power3.inOut",
            },
            at,
          )
          .to(progress[index], { opacity: .24, duration: .16 }, at + .56)
          .to(progress[index + 1], { opacity: 1, duration: .16 }, at + .56);
      }

      master.to(
        ".fc-cta",
        {
          yPercent: 0,
          duration: .62,
          ease: "power3.inOut",
        },
        scenes.length - .08,
      );

      gsap.fromTo(
        ".fc-header",
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: .7, ease: "power3.out" },
      );

      gsap.fromTo(
        ".fc-intro-copy",
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: .9, ease: "power3.out", delay: .08 },
      );

      const canvases = gsap.utils.toArray<HTMLElement>(".fc-image-canvas");

      canvases.forEach((canvas) => {
        const image = canvas.querySelector<HTMLElement>(".fc-image");
        const chroma = canvas.querySelector<HTMLElement>(".fc-chroma");
        const wave = canvas.querySelector<HTMLElement>(".fc-wave");
        if (!image || !chroma || !wave) return;

        const xTo = gsap.quickTo(image, "xPercent", { duration: .65, ease: "power3.out" });
        const yTo = gsap.quickTo(image, "yPercent", { duration: .65, ease: "power3.out" });
        const scaleTo = gsap.quickTo(image, "scale", { duration: .7, ease: "power3.out" });

        const onMove = (event: PointerEvent) => {
          const rect = canvas.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - .5;
          const y = (event.clientY - rect.top) / rect.height - .5;

          xTo(x * 1.2);
          yTo(y * 1);
          scaleTo(1.015);

          gsap.to(wave, {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
            opacity: .28,
            scale: 1,
            duration: .22,
            overwrite: true,
          });

          gsap.to(chroma, {
            x: x * 5,
            y: y * 4,
            opacity: .09,
            duration: .22,
            overwrite: true,
          });
        };

        const onLeave = () => {
          xTo(0);
          yTo(0);
          scaleTo(1);

          gsap.to(wave, {
            opacity: 0,
            scale: .8,
            duration: .36,
          });

          gsap.to(chroma, {
            x: 0,
            y: 0,
            opacity: .035,
            duration: .36,
          });
        };

        canvas.addEventListener("pointermove", onMove);
        canvas.addEventListener("pointerleave", onLeave);
      });
    },
    { scope: root },
  );

  return (
    <main ref={root} className="fc-page">
      <section className="fc-intro">
        <header className="fc-header">
          <Link href="/#cases">
            <ArrowLeft size={14} />
            Selected Cases
          </Link>

          <span className="fc-logo">SoftBridge Solutions®</span>

          <Link href="/" className="fc-home">
            Home ::
          </Link>
        </header>

        <div className="fc-intro-copy">
          <p>
            We design, build and grow digital products for Europe&apos;s most
            ambitious companies and boldest new ideas.
          </p>
        </div>
      </section>

      <section className="fc-scroll">
        <div className="fc-stage">
          <div className="fc-left">
            <span className="fc-featured">Featured work</span>

            <div className="fc-category-window">
              <div className="fc-category-track">
                {scenes.map((scene) => (
                  <h1 key={scene.category}>{scene.category}</h1>
                ))}
              </div>
            </div>

            <div className="fc-client-window">
              <div className="fc-client-track">
                {scenes.map((scene) => (
                  <div className="fc-client" key={scene.client}>
                    <span className="fc-client-mark">{scene.mark}</span>
                    <div>
                      <small>Client</small>
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
