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

const VIDEO_START_RATIO = 0.115;

export function LayeredHomepage() {
  const root = useRef<HTMLElement>(null);
  const casesVideo = useRef<HTMLVideoElement>(null);
  const casesIntro = useRef<HTMLDivElement>(null);

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

      const video = casesVideo.current;
      const intro = casesIntro.current;
      if (!video || !intro) return;

      let animationFrame = 0;
      let targetTime = 0;
      let renderedTime = 0;
      let active = false;
      let trigger: ScrollTrigger | undefined;

      const renderFrame = () => {
        if (!active) return;

        renderedTime += (targetTime - renderedTime) * 0.16;

        if (Math.abs(video.currentTime - renderedTime) > 0.012) {
          video.currentTime = renderedTime;
        }

        animationFrame = requestAnimationFrame(renderFrame);
      };

      const startRendering = () => {
        active = true;
        cancelAnimationFrame(animationFrame);
        animationFrame = requestAnimationFrame(renderFrame);
      };

      const stopRendering = () => {
        active = false;
        cancelAnimationFrame(animationFrame);
      };

      const setupVideoScrub = () => {
        const duration = Math.max(video.duration || 0, 0.1);
        const videoStart = duration * VIDEO_START_RATIO;
        const usableDuration = Math.max(duration - videoStart - 0.02, 0.1);

        video.pause();
        video.currentTime = videoStart;
        renderedTime = videoStart;
        targetTime = videoStart;

        trigger = ScrollTrigger.create({
          trigger: ".selected-cases-video",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.15,
          invalidateOnRefresh: true,
          onEnter: startRendering,
          onEnterBack: startRendering,
          onLeave: stopRendering,
          onLeaveBack: stopRendering,
          onUpdate: (self) => {
            const progress = gsap.utils.clamp(0, 1, self.progress);

            // İlk sahnede yalnızca “Selected Cases” görünür.
            const introOpacity = gsap.utils.clamp(
              0,
              1,
              1 - progress / 0.075,
            );
            const introScale = gsap.utils.mapRange(
              0,
              0.075,
              1,
              0.975,
              Math.min(progress, 0.075),
            );

            gsap.set(intro, {
              autoAlpha: introOpacity,
              scale: introScale,
              pointerEvents: progress < 0.075 ? "auto" : "none",
            });

            // Videonun HOBRO / deck / filtreli giriş kısmını tamamen atlar.
            const videoProgress = gsap.utils.clamp(
              0,
              1,
              (progress - 0.055) / 0.945,
            );

            targetTime = videoStart + videoProgress * usableDuration;
          },
        });

        ScrollTrigger.refresh();
      };

      if (video.readyState >= 1) {
        setupVideoScrub();
      } else {
        video.addEventListener("loadedmetadata", setupVideoScrub, {
          once: true,
        });
      }

      return () => {
        stopRendering();
        trigger?.kill();
        video.removeEventListener("loadedmetadata", setupVideoScrub);
      };
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

      <section
        id="work"
        className="layer-stack"
        aria-label="Katmanlı içerik alanı"
      >
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

      <section
        id="cases"
        className="selected-cases-video"
        aria-label="Selected Cases scroll experience"
      >
        <div className="selected-cases-video__sticky">
          <video
            ref={casesVideo}
            className="selected-cases-video__media"
            src="/media/selected-cases-scroll-optimized.mp4"
            muted
            playsInline
            preload="auto"
            aria-label="Selected Cases animated showcase"
          />

          <div
            ref={casesIntro}
            className="selected-cases-video__intro"
            aria-hidden="true"
          >
            <h2>Selected Cases</h2>
          </div>
        </div>
      </section>

      <section id="contact" className="closing">
        <p>Next layer</p>
        <h2>Ready for the next part.</h2>
      </section>
    </main>
  );
}
