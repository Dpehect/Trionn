"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import type { CaseStudy } from "@/data/cases";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const serviceGroups = [
  {
    number: "01",
    title: "Strategy",
    items: ["Brand Strategy", "Creative Strategy", "Content Strategy", "User Research", "AI Strategy"],
    ticker: "AI STRATEGY",
  },
  {
    number: "02",
    title: "Creative & Design",
    items: ["Brand Identity", "Creative Direction", "Web Design", "Product Design", "UI/UX Design", "Motion Design", "3D & CGI", "Illustration", "Prototyping"],
    ticker: "DESIGN SYSTEMS",
  },
  {
    number: "03",
    title: "Development",
    items: ["Web Development", "Front-end Development", "Back-end Development", "Cloud Architecture", "Mobile Development", "AI Integrations"],
    ticker: "WEB DEVELOPMENT",
  },
] as const;

export function CaseStudyPage({ study }: { study: CaseStudy }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const page = root.current;
      if (!page) return;

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .fromTo(".vm-header", { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: .65 }, 0)
        .fromTo(".vm-intro__statement", { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: .9 }, .12)
        .fromTo(".vm-feature", { opacity: 0, y: 44 }, { opacity: 1, y: 0, stagger: .1, duration: .9 }, .28);

      gsap.utils.toArray<HTMLElement>(".vm-feature").forEach((feature) => {
        const image = feature.querySelector("img");
        if (!image) return;
        gsap.to(image, {
          scale: 1.08,
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: feature,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.3,
          },
        });
      });

      gsap.fromTo(".vm-about__copy", { opacity: 0, y: 48 }, {
        opacity: 1,
        y: 0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".vm-about",
          start: "top 78%",
          end: "top 34%",
          scrub: 1,
        },
      });

      gsap.utils.toArray<HTMLElement>(".vm-service").forEach((service) => {
        const title = service.querySelector(".vm-service__title");
        const items = service.querySelectorAll(".vm-service__item");
        const line = service.querySelector(".vm-service__line");

        if (title) {
          gsap.fromTo(title, { opacity: 0, y: 52 }, {
            opacity: 1,
            y: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: service,
              start: "top 82%",
              end: "top 38%",
              scrub: 1,
            },
          });
        }

        if (items.length) {
          gsap.fromTo(items, { opacity: 0, x: 22 }, {
            opacity: 1,
            x: 0,
            stagger: .035,
            ease: "power2.out",
            scrollTrigger: {
              trigger: service,
              start: "top 72%",
              end: "top 28%",
              scrub: 1,
            },
          });
        }

        if (line) {
          gsap.fromTo(line, { scaleX: 0 }, {
            scaleX: 1,
            transformOrigin: "left",
            ease: "none",
            scrollTrigger: {
              trigger: service,
              start: "top 72%",
              end: "top 42%",
              scrub: 1,
            },
          });
        }
      });

      gsap.fromTo(".vm-closing__inner", { opacity: 0, y: 52 }, {
        opacity: 1,
        y: 0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".vm-closing",
          start: "top 78%",
          end: "top 32%",
          scrub: 1,
        },
      });
    },
    { scope: root },
  );

  const heroTwo = study.visuals[0] || study.hero;

  return (
    <main ref={root} className="vm-page">
      <header className="vm-header">
        <Link href="/#cases" className="vm-header__back">
          <ArrowLeft size={14} />
          Selected Cases
        </Link>

        <span className="vm-header__brand">SoftBridge Solutions</span>

        <Link href="/" className="vm-header__home">
          Home
          <span aria-hidden="true">⋮</span>
        </Link>
      </header>

      <section className="vm-intro">
        <div className="vm-intro__statement">
          <p>
            We design, build and grow digital products for ambitious companies
            across Finland, the Nordics and Europe.
          </p>
        </div>

        <div className="vm-feature vm-feature--primary">
          <div className="vm-feature__copy">
            <span>Featured work</span>
            <h1>{study.title}</h1>
            <p>{study.kicker}</p>
          </div>

          <div className="vm-feature__media">
            <Image
              src={study.hero}
              alt={`${study.title} featured project visualization`}
              fill
              priority
              sizes="65vw"
            />
          </div>

          <div className="vm-feature__client">
            <span>Client</span>
            <strong>SoftBridge Concept Lab</strong>
          </div>
        </div>

        <div className="vm-feature vm-feature--secondary">
          <div className="vm-feature__copy">
            <span>Project focus</span>
            <h2>{study.accent}</h2>
            <p>{study.tags.slice(0, 2).join(" / ")}</p>
          </div>

          <div className="vm-feature__media">
            <Image
              src={heroTwo}
              alt={`${study.title} supporting product visual`}
              fill
              sizes="65vw"
            />
          </div>

          <div className="vm-feature__client">
            <span>Region</span>
            <strong>Finland / Europe</strong>
          </div>
        </div>
      </section>

      <section className="vm-about">
        <span>What we do</span>
        <div className="vm-about__copy">
          <h2>
            Strategy, design and development. From product direction and user
            experience to scalable platforms and software, we build what
            companies need to lead.
          </h2>
          <p>{study.intro}</p>
        </div>
      </section>

      <section className="vm-services" aria-label="Project capabilities">
        {serviceGroups.map((group, groupIndex) => (
          <article className="vm-service" key={group.title}>
            <div className="vm-service__line" />

            <div className="vm-service__heading">
              <span className="vm-service__number">{group.number}</span>
              <h2 className="vm-service__title">{group.title}</h2>
            </div>

            <div className="vm-service__items">
              {group.items.map((item) => (
                <span className="vm-service__item" key={item}>
                  {item}
                </span>
              ))}
            </div>

            <div className="vm-ticker" aria-hidden="true">
              <div className={`vm-ticker__track ${groupIndex % 2 ? "vm-ticker__track--reverse" : ""}`}>
                {Array.from({ length: 7 }).map((_, index) => (
                  <span key={index}>{group.ticker} ✱</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="vm-case-summary">
        <span>Project summary</span>
        <div>
          <h2>{study.statement}</h2>
          <p>{study.sections[2][1]}</p>
          <div className="vm-case-summary__tags">
            {study.tags.map((tag) => <i key={tag}>{tag}</i>)}
          </div>
        </div>
      </section>

      <section className="vm-closing">
        <div className="vm-closing__inner">
          <span>SoftBridge Solutions / Finland Office</span>
          <h2>Explore the next case.</h2>
          <Link href="/#cases">
            Back to Selected Cases
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
