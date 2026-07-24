"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { BrandStatementSection } from "./brand-statement-section";
import { CapabilityMarqueeSection } from "./capability-marquee-section";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const layers = [
  {
    eyebrow: "01 / AI ENGINEERING",
    title: "AI Software Development",
    body: "Business-focused AI agents, intelligent automation and custom machine-learning systems for companies operating across Finland, the Nordics and Europe.",
    visual: "ai",
  },
  {
    eyebrow: "02 / ENTERPRISE PLATFORMS",
    title: "Scalable Software Systems",
    body: "Cloud-native SaaS products, internal business platforms and enterprise applications engineered for security, reliability and long-term growth.",
    visual: "enterprise",
  },
  {
    eyebrow: "03 / DIGITAL PRODUCTS",
    title: "Web and Mobile Products",
    body: "High-performance web applications, mobile products and design systems that combine clear user experience with production-grade engineering.",
    visual: "products",
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
    { scope: root }
  );

  return (
    <main ref={root} className="site-shell">
      <section className="intro">
        <p>SoftBridge Solutions · Finland Office</p>
        <h1>
          Software, AI
          <br />
          and digital products
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
              {layer.visual === "ai" && (
                <div className="softbridge-visual softbridge-visual--ai">
                  <div className="softbridge-ui">
                    <header>
                      <span>AI OPERATIONS</span>
                      <strong>LIVE</strong>
                    </header>
                    <div className="softbridge-ui__metrics">
                      <article><small>AI Agents</small><b>24</b></article>
                      <article><small>Automations</small><b>86%</b></article>
                      <article><small>Active Flows</small><b>48</b></article>
                    </div>
                    <div className="softbridge-ui__graph">
                      <span>Automation performance</span>
                      <svg viewBox="0 0 600 230">
                        <path d="M12 198 C90 180 118 166 170 130 S265 145 330 94 S440 80 588 26" />
                      </svg>
                    </div>
                    <div className="softbridge-ui__chips">
                      <span>AI Agents</span><span>LLM Workflows</span><span>Automation</span>
                    </div>
                  </div>
                </div>
              )}

              {layer.visual === "enterprise" && (
                <div className="softbridge-visual softbridge-visual--enterprise">
                  <div className="enterprise-shell">
                    <aside>
                      <strong>SOFTBRIDGE</strong>
                      <span>Overview</span>
                      <span>Operations</span>
                      <span>Analytics</span>
                      <span>Infrastructure</span>
                    </aside>
                    <main>
                      <header>
                        <div><small>Enterprise platform</small><b>System overview</b></div>
                        <em>99.99% uptime</em>
                      </header>
                      <div className="enterprise-shell__cards">
                        <article><small>Cloud services</small><b>32</b></article>
                        <article><small>EU regions</small><b>12</b></article>
                      </div>
                      <div className="enterprise-shell__network">
                        {Array.from({ length: 7 }).map((_, item) => (
                          <i key={item} style={{ left: `${10 + item * 13}%`, top: `${25 + (item % 3) * 23}%` }} />
                        ))}
                      </div>
                    </main>
                  </div>
                </div>
              )}

              {layer.visual === "products" && (
                <div className="softbridge-visual softbridge-visual--products">
                  <div className="product-browser">
                    <header><span /><span /><span /><b>Digital Product System</b></header>
                    <div className="product-browser__body">
                      <div className="product-browser__copy">
                        <small>WEB · MOBILE · UX</small>
                        <strong>One product.<br />Every screen.</strong>
                        <p>Responsive interfaces built for clarity, speed and scale.</p>
                      </div>
                      <div className="product-browser__device">
                        <div className="product-browser__screen">
                          <span>Nordic Platform</span>
                          <b>Ready</b>
                          <small>Mobile experience</small>
                        </div>
                      </div>
                    </div>
                    <footer><span>Next.js</span><span>React</span><span>Mobile</span><span>Design Systems</span></footer>
                  </div>
                </div>
              )}
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
              <a id={item.slug} href="#industries" className="case-card__link" itemProp="url">
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
                    <meta itemProp="url" content={`#${item.slug}`} />
                  </div>
                  <ArrowUpRight size={20} strokeWidth={1.4} />
                </div>
              </a>
            </article>
          ))}
        </div>
      </section>

      <BrandStatementSection />

      <CapabilityMarqueeSection />
    </main>
  );
}
