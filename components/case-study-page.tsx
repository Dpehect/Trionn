"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import type { CaseStudy } from "@/data/cases";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const featuredSlides = [
  {
    category: "AI",
    eyebrow: "Featured capability",
    title: "Artificial Intelligence",
    description: "AI agents, intelligent automation and machine-learning systems designed around measurable business outcomes.",
    image: "/detail-part-01/ai-strategy.jpg",
    label: "AI Strategy",
  },
  {
    category: "Data",
    eyebrow: "Featured capability",
    title: "Data Platforms",
    description: "Operational data products that turn complex information into clear decisions, forecasts and scalable workflows.",
    image: "/detail-part-01/data-platform.jpg",
    label: "Data Systems",
  },
  {
    category: "Software",
    eyebrow: "Featured capability",
    title: "Software Engineering",
    description: "Reliable software foundations for enterprise platforms, internal tools and customer-facing digital products.",
    image: "/detail-part-01/software-studio.jpg",
    label: "Software Studio",
  },
  {
    category: "Web",
    eyebrow: "Featured capability",
    title: "Web Development",
    description: "Fast, accessible and search-ready web applications built with modern product engineering practices.",
    image: "/detail-part-01/web-engineering.jpg",
    label: "Web Engineering",
  },
  {
    category: "Development",
    eyebrow: "Featured capability",
    title: "Development Systems",
    description: "Clear development environments, reusable architecture and delivery systems that support long-term product growth.",
    image: "/detail-part-01/development-environment.jpg",
    label: "Development Environment",
  },
  {
    category: "Product",
    eyebrow: "Featured capability",
    title: "Digital Products",
    description: "Integrated web, mobile and interface systems designed to feel coherent across every screen and user journey.",
    image: "/detail-part-01/digital-product.jpg",
    label: "Product Experience",
  },
  {
    category: "Engineering",
    eyebrow: "Featured capability",
    title: "Engineering Workflow",
    description: "A practical delivery model connecting strategy, design, engineering and continuous product improvement.",
    image: "/detail-part-01/engineering-workflow.jpg",
    label: "Delivery Systems",
  },
] as const;

export function CaseStudyPage({ study }: { study: CaseStudy }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;

      const slides = gsap.utils.toArray<HTMLElement>(".fw-slide");
      const progressItems = gsap.utils.toArray<HTMLElement>(".fw-progress__item");

      gsap.set(slides, {
        yPercent: (index) => (index === 0 ? 0 : 100),
      });

      gsap.set(slides.slice(1), {
        visibility: "visible",
      });

      gsap.set(".fw-slide__title-line > span", { yPercent: 105 });
      gsap.set(".fw-slide:first-child .fw-slide__title-line > span", { yPercent: 0 });
      gsap.set(".fw-slide:first-child .fw-slide__description", { opacity: 1, y: 0 });
      gsap.set(progressItems[0], { opacity: 1 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".fw-section",
          start: "top top",
          end: `+=${featuredSlides.length * 115}%`,
          pin: ".fw-stage",
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      slides.forEach((slide, index) => {
        if (index === 0) return;

        const previous = slides[index - 1];
        const previousTitle = previous.querySelectorAll(".fw-slide__title-line > span");
        const currentTitle = slide.querySelectorAll(".fw-slide__title-line > span");
        const currentDescription = slide.querySelector(".fw-slide__description");

        timeline
          .to(
            previous,
            {
              yPercent: -100,
              duration: .9,
              ease: "power3.inOut",
            },
            index - .58,
          )
          .to(
            slide,
            {
              yPercent: 0,
              duration: .9,
              ease: "power3.inOut",
            },
            index - .58,
          )
          .to(
            previousTitle,
            {
              yPercent: -110,
              duration: .32,
              stagger: .025,
              ease: "power2.in",
            },
            index - .56,
          )
          .fromTo(
            currentTitle,
            { yPercent: 108 },
            {
              yPercent: 0,
              duration: .48,
              stagger: .035,
              ease: "power3.out",
            },
            index - .16,
          )
          .fromTo(
            currentDescription,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: .4,
              ease: "power2.out",
            },
            index - .08,
          )
          .to(
            progressItems[index - 1],
            { opacity: .25, duration: .15 },
            index - .2,
          )
          .to(
            progressItems[index],
            { opacity: 1, duration: .15 },
            index - .2,
          );
      });

      timeline.fromTo(
        ".fw-all-work",
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: .55,
          ease: "power3.inOut",
        },
        featuredSlides.length - .12,
      );

      gsap.fromTo(
        ".fw-header",
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: .7, ease: "power3.out" },
      );

      const mediaElements = gsap.utils.toArray<HTMLElement>(".fw-slide__media");

      mediaElements.forEach((media) => {
        const image = media.querySelector<HTMLElement>(".fw-slide__image");
        const wave = media.querySelector<HTMLElement>(".fw-slide__wave");
        if (!image || !wave) return;

        const xTo = gsap.quickTo(image, "xPercent", { duration: .7, ease: "power3.out" });
        const yTo = gsap.quickTo(image, "yPercent", { duration: .7, ease: "power3.out" });
        const rotateXTo = gsap.quickTo(image, "rotationX", { duration: .8, ease: "power3.out" });
        const rotateYTo = gsap.quickTo(image, "rotationY", { duration: .8, ease: "power3.out" });

        const onMove = (event: PointerEvent) => {
          const rect = media.getBoundingClientRect();
          const nx = (event.clientX - rect.left) / rect.width - .5;
          const ny = (event.clientY - rect.top) / rect.height - .5;

          xTo(nx * 2.6);
          yTo(ny * 2.2);
          rotateXTo(ny * -3.5);
          rotateYTo(nx * 4);

          gsap.to(wave, {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
            opacity: .42,
            scale: 1,
            duration: .35,
            ease: "power2.out",
            overwrite: true,
          });
        };

        const onLeave = () => {
          xTo(0);
          yTo(0);
          rotateXTo(0);
          rotateYTo(0);

          gsap.to(wave, {
            opacity: 0,
            scale: .7,
            duration: .45,
            ease: "power2.out",
          });
        };

        media.addEventListener("pointermove", onMove);
        media.addEventListener("pointerleave", onLeave);

        return () => {
          media.removeEventListener("pointermove", onMove);
          media.removeEventListener("pointerleave", onLeave);
        };
      });
    },
    { scope: root },
  );

  return (
    <main ref={root} className="fw-page">
      <section className="fw-section">
        <div className="fw-stage">
          <header className="fw-header">
            <Link href="/#cases" className="fw-header__back">
              <ArrowLeft size={14} />
              Selected Cases
            </Link>

            <span className="fw-header__brand">SoftBridge Solutions</span>

            <Link href="/" className="fw-header__home">
              Home
              <span>33</span>
            </Link>
          </header>

          <div className="fw-slides">
            {featuredSlides.map((slide, index) => (
              <article
                className={`fw-slide fw-slide--${index + 1}`}
                key={slide.title}
                style={{ zIndex: index + 1 }}
              >
                <div className="fw-slide__copy">
                  <span className="fw-slide__eyebrow">{slide.eyebrow}</span>

                  <h1>
                    <span className="fw-slide__title-line">
                      <span>{slide.title}</span>
                    </span>
                  </h1>

                  <p className="fw-slide__description">
                    {slide.description}
                  </p>

                  <div className="fw-slide__meta">
                    <span>{slide.label}</span>
                    <strong>{study.title}</strong>
                  </div>
                </div>

                <div className="fw-slide__media">
                  <img
                    className="fw-slide__image"
                    src={slide.image}
                    alt={`${slide.title} featured visual`}
                  />

                  <div className="fw-slide__media-shade" />
                  <div className="fw-slide__wave" />

                  <div className="fw-slide__media-label">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span>{slide.category}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="fw-progress" aria-label="Featured work progress">
            {featuredSlides.map((slide, index) => (
              <span className="fw-progress__item" key={slide.title}>
                {String(index + 1).padStart(2, "0")}
              </span>
            ))}
          </aside>

          <div className="fw-all-work">
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
