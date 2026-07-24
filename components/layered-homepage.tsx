"use client";

import { ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const layers = [
  { eyebrow: "01 / EXPERTISE", title: "Our Expertise", body: "We turn complex systems into clear, high-performance digital experiences built for modern brands.", visual: "ring" },
  { eyebrow: "02 / INFRASTRUCTURE", title: "Compute Infrastructure at Scale", body: "A modular digital foundation that remains responsive, efficient and visually controlled at every breakpoint.", visual: "fan" },
  { eyebrow: "03 / STRATEGY", title: "Strategic Sites", body: "Editorial structure, precise interaction design and cinematic transitions combined in one scalable system.", visual: "map" },
] as const;

export function LayeredHomepage() {
  const root = useRef<HTMLElement>(null);
  const casesVideo = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".layer-card");
    cards.forEach((card, index) => {
      gsap.fromTo(card,
        { clipPath: index === 0 ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "top top", scrub: true } }
      );
      gsap.fromTo(card.querySelector(".layer-copy"), { y: 72, opacity: 0 }, {
        y: 0, opacity: 1, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 75%", end: "top 28%", scrub: .8 }
      });
      gsap.fromTo(card.querySelector(".layer-visual"), { yPercent: 18, rotate: index === 1 ? -8 : 0, scale: .92 }, {
        yPercent: 0, rotate: 0, scale: 1, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true }
      });
    });

    const video = casesVideo.current;
    if (!video) return;

    let frameRequest = 0;
    let targetTime = 0;
    let renderedTime = 0;
    let active = false;

    const renderFrame = () => {
      if (!active) return;
      renderedTime += (targetTime - renderedTime) * 0.2;
      if (Math.abs(video.currentTime - renderedTime) > 0.008) {
        video.currentTime = renderedTime;
      }
      frameRequest = requestAnimationFrame(renderFrame);
    };

    const setupVideoScrub = () => {
      const duration = Math.max(video.duration || 0, 0.1);
      video.pause();
      video.currentTime = 0.001;
      renderedTime = 0.001;

      const trigger = ScrollTrigger.create({
        trigger: ".selected-cases-video",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.7,
        onEnter: () => {
          active = true;
          cancelAnimationFrame(frameRequest);
          frameRequest = requestAnimationFrame(renderFrame);
        },
        onEnterBack: () => {
          active = true;
          cancelAnimationFrame(frameRequest);
          frameRequest = requestAnimationFrame(renderFrame);
        },
        onLeave: () => {
          active = false;
          cancelAnimationFrame(frameRequest);
        },
        onLeaveBack: () => {
          active = false;
          cancelAnimationFrame(frameRequest);
        },
        onUpdate: (self) => {
          // Slightly compressed mapping removes dead scroll time between case groups.
          const p = gsap.utils.clamp(0, 1, self.progress);
          const compact = p < 0.08
            ? p * 1.35
            : p < 0.82
              ? 0.108 + (p - 0.08) * 1.08
              : 0.907 + (p - 0.82) * 0.515;
          targetTime = Math.min(duration - 0.02, Math.max(0.001, compact * duration));
        },
      });

      ScrollTrigger.refresh();
      return () => trigger.kill();
    };

    let cleanupTrigger: (() => void) | undefined;
    if (video.readyState >= 1) cleanupTrigger = setupVideoScrub();
    else {
      const onMetadata = () => { cleanupTrigger = setupVideoScrub(); };
      video.addEventListener("loadedmetadata", onMetadata, { once: true });
    }

    return () => {
      active = false;
      cancelAnimationFrame(frameRequest);
      cleanupTrigger?.();
    };
  }, { scope: root });

  return (
    <main ref={root} className="site-shell">
      <section id="top" className="intro">
        <p>Independent digital studio</p>
        <h1>Transforming ideas<br />into performance</h1>
        <span>Scroll to explore</span>
      </section>

      <section id="work" className="layer-stack" aria-label="Katmanlı içerik alanı">
        {layers.map((layer, index) => (
          <article className={`layer-card layer-card--${index + 1}`} key={layer.title} style={{ zIndex: index + 1 }}>
            <div className="layer-copy"><span className="eyebrow">{layer.eyebrow}</span><h2>{layer.title}</h2><p>{layer.body}</p><a href="#cases" className="text-link">Discover more <ArrowUpRight size={15} /></a></div>
            <div className={`layer-visual visual-${layer.visual}`} aria-hidden="true">
              {layer.visual === "ring" && <div className="metal-ring" />}
              {layer.visual === "fan" && <div className="fan-shape">{Array.from({ length: 11 }).map((_, item) => <span key={item} style={{ transform: `rotate(${item * 8 - 40}deg)` }} />)}</div>}
              {layer.visual === "map" && <div className="map-grid"><div className="map-orb" />{Array.from({ length: 5 }).map((_, item) => <span key={item} style={{ top: `${18 + item * 13}%`, right: `${8 + item * 7}%` }}>NODE 0{item + 1}</span>)}</div>}
            </div>
          </article>
        ))}
      </section>

      <section id="cases" className="selected-cases-video" aria-label="Selected Cases scroll experience">
        <div className="selected-cases-video__sticky">
          <video
            ref={casesVideo}
            className="selected-cases-video__media"
            src="/media/selected-cases-scroll-optimized.mp4"
            muted
            playsInline
            preload="metadata"
            aria-label="Selected Cases animated showcase"
          />
          <div className="selected-cases-video__header-mask selected-cases-video__header-mask--deck" aria-hidden="true" />
          <div className="selected-cases-video__header-mask selected-cases-video__header-mask--nav" aria-hidden="true" />
        </div>
      </section>

      <section id="contact" className="closing">
        <p>Next layer</p>
        <h2>Ready for the next part.</h2>
      </section>
    </main>
  );
}
