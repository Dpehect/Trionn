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
    title: "Artificial Intelligence",
    image: "/detail-part-01/ai-strategy.jpg",
    label: "AI Strategy",
  },
  {
    category: "Data",
    title: "Data Platforms",
    image: "/detail-part-01/data-platform.jpg",
    label: "Data Systems",
  },
  {
    category: "Software",
    title: "Software Engineering",
    image: "/detail-part-01/software-studio.jpg",
    label: "Software Studio",
  },
  {
    category: "Web",
    title: "Web Development",
    image: "/detail-part-01/web-engineering.jpg",
    label: "Web Engineering",
  },
  {
    category: "Development",
    title: "Development Systems",
    image: "/detail-part-01/development-environment.jpg",
    label: "Development Environment",
  },
  {
    category: "Product",
    title: "Digital Products",
    image: "/detail-part-01/digital-product.jpg",
    label: "Product Experience",
  },
  {
    category: "Engineering",
    title: "Engineering Workflow",
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

      gsap.set(slides.slice(1), {
        clipPath: "inset(100% 0 0 0)",
      });

      gsap.set(".fw-slide__title-line > span", {
        yPercent: 105,
      });

      gsap.set(".fw-slide:first-child .fw-slide__title-line > span", {
        yPercent: 0,
      });

      gsap.set(progressItems[0], { opacity: 1 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".fw-section",
          start: "top top",
          end: `+=${featuredSlides.length * 110}%`,
          pin: ".fw-stage",
          scrub: 1.25,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      slides.forEach((slide, index) => {
        if (index === 0) return;

        const previous = slides[index - 1];
        const currentTitle = slide.querySelectorAll(".fw-slide__title-line > span");
        const previousTitle = previous.querySelectorAll(".fw-slide__title-line > span");

        timeline
          .to(
            previousTitle,
            {
              yPercent: -110,
              duration: .24,
              stagger: .025,
              ease: "power2.in",
            },
            index - .46,
          )
          .to(
            slide,
            {
              clipPath: "inset(0% 0 0 0)",
              duration: .72,
              ease: "power3.inOut",
            },
            index - .55,
          )
          .fromTo(
            slide.querySelector(".fw-slide__image"),
            {
              scale: 1.1,
              yPercent: 6,
            },
            {
              scale: 1,
              yPercent: 0,
              duration: .8,
              ease: "power3.out",
            },
            index - .52,
          )
          .to(
            currentTitle,
            {
              yPercent: 0,
              duration: .42,
              stagger: .035,
              ease: "power3.out",
            },
            index - .26,
          )
          .to(
            progressItems[index - 1],
            {
              opacity: .25,
              duration: .15,
            },
            index - .3,
          )
          .to(
            progressItems[index],
            {
              opacity: 1,
              duration: .15,
            },
            index - .3,
          );
      });

      timeline.fromTo(
        ".fw-all-work",
        {
          yPercent: 100,
        },
        {
          yPercent: 0,
          duration: .55,
          ease: "power3.inOut",
        },
        featuredSlides.length - .15,
      );

      gsap.fromTo(
        ".fw-header",
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: .7, ease: "power3.out" },
      );
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
                  <span className="fw-slide__eyebrow">Featured work</span>

                  <h1>
                    <span className="fw-slide__title-line">
                      <span>{slide.title}</span>
                    </span>
                  </h1>

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
