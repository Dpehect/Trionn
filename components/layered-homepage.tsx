"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import homeTheme from "./home-black-background.module.css";
import { IntroAudienceSection } from "./intro-audience-section";
import { CapabilityMarqueeSection } from "./capability-marquee-section";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const layers = [
  {
    eyebrow: "01 / AI & AUTOMATION",
    title: "Intelligence Built Into the Product",
    body: "AI agents, workflow automation and intelligent software designed around measurable business outcomes.",
    accent: "AI",
    image: "/layer-images/ai-automation.jpg",
    alt: "Artificial intelligence processor and digital infrastructure representing AI automation services",
  },
  {
    eyebrow: "02 / SOFTWARE SYSTEMS",
    title: "Software That Scales With the Business",
    body: "Cloud-native platforms, internal systems and digital infrastructure engineered for reliability and long-term growth.",
    accent: "SYSTEMS",
    image: "/layer-images/software-systems.jpg",
    alt: "Software development source code representing scalable enterprise software systems",
  },
  {
    eyebrow: "03 / DIGITAL PRODUCTS",
    title: "Clear Experiences Across Every Screen",
    body: "High-performance web and mobile products shaped by strong UX, accessible interfaces and production-grade engineering.",
    accent: "PRODUCTS",
    image: "/layer-images/digital-products.jpg",
    alt: "Digital product development workspace with web and mobile application interfaces",
  },
  {
    eyebrow: "04 / EUROPEAN DELIVERY",
    title: "Global Engineering, Closer Nordic Collaboration",
    body: "SoftBridge Solutions combines global delivery capability with a Finland-focused presence for companies across the Nordics and Europe.",
    accent: "EUROPE",
    image: "/layer-images/european-delivery.jpg",
    alt: "European Union flag representing SoftBridge Solutions delivery across Finland and Europe",
  },
] as const;

const cases = [
  {
    name: "AI Software Development",
    category: "AI engineering · Finland & Europe",
    image: "/cases-seo/ai-software-development-finland.webp",
    alt: "AI software development dashboard concept for Finnish and European businesses by SoftBridge Solutions",
    slug: "ai-software-development-finland",
  },
  {
    name: "Enterprise SaaS Platform",
    category: "SaaS product development · Nordics",
    image: "/cases-seo/enterprise-saas-platform.webp",
    alt: "Enterprise SaaS analytics platform concept for Nordic companies by SoftBridge Solutions",
    slug: "enterprise-saas-platform",
  },
  {
    name: "Healthcare Software",
    category: "Digital health platform · Nordics",
    image: "/cases-seo/healthcare-software-nordics.webp",
    alt: "Healthcare software platform concept for Nordic clinics and health organizations",
    slug: "healthcare-software-nordics",
  },
  {
    name: "Logistics Platform",
    category: "Fleet and logistics software · Europe",
    image: "/cases-seo/logistics-software-europe.webp",
    alt: "Logistics and fleet management software dashboard concept for European operations",
    slug: "logistics-software-europe",
  },
  {
    name: "Manufacturing AI",
    category: "Predictive maintenance · Industry 4.0",
    image: "/cases-seo/manufacturing-ai-solutions.webp",
    alt: "Manufacturing AI and predictive maintenance dashboard concept for European factories",
    slug: "manufacturing-ai-solutions",
  },
  {
    name: "Cloud Applications",
    category: "Cloud-native software · Europe",
    image: "/cases-seo/cloud-application-development.webp",
    alt: "Cloud application architecture and observability platform concept by SoftBridge Solutions",
    slug: "cloud-application-development",
  },
  {
    name: "Mobile Product",
    category: "iOS and Android development · Finland",
    image: "/cases-seo/mobile-app-development-finland.webp",
    alt: "Mobile app development concept for Finnish businesses by SoftBridge Solutions",
    slug: "mobile-app-development-finland",
  },
  {
    name: "Retail AI Automation",
    category: "Commerce intelligence · Europe",
    image: "/cases-seo/retail-ai-automation.webp",
    alt: "Retail AI automation and commerce analytics dashboard concept for European brands",
    slug: "retail-ai-automation",
  },
  {
    name: "Digital Transformation",
    category: "Enterprise modernization · Nordics",
    image: "/cases-seo/digital-transformation-platform.webp",
    alt: "Digital transformation platform concept for Nordic enterprise organizations",
    slug: "digital-transformation-platform",
  },
] as const;

export function LayeredHomepage() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const introTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      introTimeline
        .fromTo(".intro-office", { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.8 }, 0.1)
        .fromTo(".intro-title__line > span", { yPercent: 115, rotate: 1.5 }, { yPercent: 0, rotate: 0, duration: 1.1, stagger: 0.12 }, 0.18)
        .fromTo(".intro-scroll", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7 }, 0.82);

      gsap.to(".intro-title", {
        yPercent: -7,
        scale: 0.985,
        ease: "none",
        scrollTrigger: { trigger: ".intro", start: "top top", end: "bottom top", scrub: 1.1 },
      });
      gsap.to(".intro-office", {
        yPercent: -75,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: { trigger: ".intro", start: "top top", end: "bottom top", scrub: 1 },
      });
      gsap.to(".intro-aurora--one", {
        xPercent: 13, yPercent: -9, rotate: 10, ease: "none",
        scrollTrigger: { trigger: ".intro", start: "top top", end: "bottom top", scrub: 1.4 },
      });
      gsap.to(".intro-aurora--two", {
        xPercent: -11, yPercent: 12, rotate: -9, ease: "none",
        scrollTrigger: { trigger: ".intro", start: "top top", end: "bottom top", scrub: 1.6 },
      });
      gsap.to(".intro-scroll i", { scaleX: 1, repeat: -1, yoyo: true, duration: 1.15, ease: "sine.inOut" });

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

      gsap.utils.toArray<HTMLElement>(".layer-card").forEach((card, index) => {
        const background = card.querySelector<HTMLElement>(".layer-background");
        if (!background) return;

        gsap.fromTo(
          background,
          {
            yPercent: index % 2 === 0 ? -4 : -2,
            scale: 1.08,
          },
          {
            yPercent: index % 2 === 0 ? 5 : 4,
            scale: 1.12,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.6,
              invalidateOnRefresh: true,
            },
          },
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
        { x: -115, y: 145, rotate: -1.6, scale: 0.945, start: "top 112%", end: "top 46%", scrub: 2.8 },
        { x: 0, y: 195, rotate: 0.8, scale: 0.935, start: "top 116%", end: "top 48%", scrub: 3.0 },
        { x: 120, y: 135, rotate: 1.7, scale: 0.95, start: "top 111%", end: "top 45%", scrub: 2.9 },
        { x: -95, y: 180, rotate: 1.0, scale: 0.94, start: "top 114%", end: "top 47%", scrub: 3.15 },
        { x: 18, y: 220, rotate: -0.9, scale: 0.93, start: "top 118%", end: "top 49%", scrub: 3.35 },
        { x: 105, y: 170, rotate: -1.2, scale: 0.945, start: "top 115%", end: "top 47%", scrub: 3.1 },
        { x: -125, y: 175, rotate: -1.7, scale: 0.935, start: "top 116%", end: "top 48%", scrub: 3.4 },
        { x: 0, y: 235, rotate: 0.9, scale: 0.925, start: "top 120%", end: "top 50%", scrub: 3.55 },
        { x: 130, y: 160, rotate: 1.5, scale: 0.94, start: "top 117%", end: "top 48%", scrub: 3.3 },
      ] as const;

      gsap.utils.toArray<HTMLElement>(".case-card").forEach((card, index) => {
        const image = card.querySelector<HTMLElement>(".case-card__image");
        const meta = card.querySelector<HTMLElement>(".case-card__meta");
        const motion = caseMotion[index];

        const timeline = gsap.timeline({
          defaults: { overwrite: "auto" },
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
              x: motion.x,
              y: motion.y,
              opacity: 0,
              scale: motion.scale,
              rotate: motion.rotate,
              filter: "blur(10px)",
              transformOrigin: index % 3 === 0 ? "left center" : index % 3 === 2 ? "right center" : "center center",
            },
            {
              x: 0,
              y: 0,
              opacity: 1,
              scale: 1,
              rotate: 0,
              filter: "blur(0px)",
              duration: 0.9,
              ease: "power2.out",
            },
            0
          )
          .fromTo(
            image,
            {
              scale: 1.2,
              xPercent: index % 3 === 0 ? -5 : index % 3 === 2 ? 5 : 0,
              yPercent: 8 + (index % 2) * 3,
            },
            {
              scale: 1.04,
              xPercent: 0,
              yPercent: 0,
              duration: 0.82,
              ease: "power2.out",
            },
            0.03
          )
          .fromTo(
            meta,
            { y: 28, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.48, ease: "power2.out" },
            0.42
          );

        gsap.to(image, {
          yPercent: -5 - (index % 3) * 1.5,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            end: "bottom 4%",
            scrub: 2.45 + index * 0.08,
          },
        });
      });
    },
    { scope: root, dependencies: [] }
  );

  return (
    <main ref={root} className={`site-shell ${homeTheme.root}`}>
      <section className="intro">
        <div className="intro-aurora intro-aurora--one" aria-hidden="true" />
        <div className="intro-aurora intro-aurora--two" aria-hidden="true" />
        <div className="intro-grid" aria-hidden="true" />

        <p className="intro-office">SoftBridge Solutions · Finland Office</p>

        <h1 className="intro-title" aria-label="Software, AI and digital products">
          <span className="intro-title__line"><span>Software, AI</span></span>
          <span className="intro-title__line"><span>and digital products</span></span>
        </h1>

        <div className="intro-scroll">
          <span>Scroll to explore</span>
          <i aria-hidden="true" />
        </div>
      </section>

      <section className="layer-stack" aria-label="Layered content">
        {layers.map((layer, index) => (
          <article
            className={`layer-card layer-card--${index + 1}`}
            key={layer.title}
            style={{ zIndex: index + 1 }}
          >
            <div
              className="layer-background"
              style={{ backgroundImage: `url(${layer.image})` }}
              aria-hidden="true"
            />
            <div className="layer-copy">
              <span className="eyebrow">{layer.eyebrow}</span>
              <h2>{layer.title}</h2>
              <p>{layer.body}</p>
              <a href="#cases" className="text-link">
                Discover more <ArrowUpRight size={15} />
              </a>
            </div>

            <div className="layer-visual layer-visual--image">
              <figure className="layer-image-frame">
                <Image
                  src={layer.image}
                  alt={layer.alt}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 800px) 100vw, 50vw"
                  className="layer-image"
                />

                <div className="layer-image-frame__overlay" aria-hidden="true" />

                <figcaption className="layer-image-frame__caption">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{layer.accent}</strong>
                </figcaption>

                <div className="layer-image-frame__meta" aria-hidden="true">
                  <span>SOFTBRIDGE SOLUTIONS</span>
                  <span>FINLAND / EUROPE</span>
                </div>
              </figure>
            </div>
          </article>
        ))}
      </section>

      <section id="cases" className="selected-cases">
        <header className="selected-cases__header">
          <div>
            <span className="selected-cases__eyebrow">Selected digital product capabilities</span>
            <h2 className="selected-cases__title">Selected Cases</h2>
            <p className="selected-cases__intro">
              AI software, SaaS, healthcare, logistics, manufacturing, cloud and mobile product concepts for Finland, the Nordics and Europe.
            </p>
          </div>
        </header>

        <div className="selected-cases__gallery">
          {cases.map((item) => (
            <article className="case-card" key={item.name} itemScope itemType="https://schema.org/CreativeWork">
              <Link
                id={item.slug}
                href={{ pathname: `/cases/${item.slug}` }}
                prefetch
                scroll
                className="case-card__link"
                itemProp="url"
                aria-label={`Open ${item.name} case study`}
              >
                <div className="case-card__media">
                  <Image
                    className="case-card__image"
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
                    itemProp="image"
                  />
                </div>
                <div className="case-card__meta">
                  <div>
                    <p>{item.category}</p>
                    <h3 itemProp="name">{item.name}</h3>
                    <meta itemProp="description" content={item.category} />
                    <meta itemProp="url" content={`/cases/${item.slug}`} />
                  </div>
                  <ArrowUpRight size={20} strokeWidth={1.4} />
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <IntroAudienceSection />

      <CapabilityMarqueeSection />
    </main>
  );
}
