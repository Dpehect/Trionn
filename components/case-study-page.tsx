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

const capabilities = [
  {
    number: "01",
    title: "Strategy",
    items: ["Product Strategy", "AI Strategy", "User Research", "Content Strategy", "Roadmapping"],
    ticker: "STRATEGY",
  },
  {
    number: "02",
    title: "Creative & Design",
    items: ["Creative Direction", "Brand Identity", "Product Design", "UI/UX Design", "Motion Design", "Design Systems"],
    ticker: "CREATIVE DIRECTION",
  },
  {
    number: "03",
    title: "Development",
    items: ["Front-end Development", "Back-end Development", "Cloud Architecture", "Mobile Development", "AI Integrations", "Quality Engineering"],
    ticker: "DEVELOPMENT",
  },
] as const;

export function CaseStudyPage({ study }: { study: CaseStudy }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const page = root.current;
      if (!page) return;

      const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTimeline
        .fromTo(".aw-nav", { opacity: 0, y: -14 }, { opacity: 1, y: 0, duration: .7 }, 0)
        .fromTo(".aw-hero__eyebrow", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .7 }, .1)
        .fromTo(".aw-hero__line > span", { yPercent: 120 }, { yPercent: 0, duration: 1.1, stagger: .12 }, .15)
        .fromTo(".aw-hero__meta > *", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .65, stagger: .06 }, .72);

      gsap.to(".aw-hero__title", {
        yPercent: -10,
        opacity: .2,
        ease: "none",
        scrollTrigger: {
          trigger: ".aw-hero",
          start: "35% top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to(".aw-hero__background", {
        scale: 1.08,
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: ".aw-hero",
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.utils.toArray<HTMLElement>(".aw-feature").forEach((section, index) => {
        const image = section.querySelector(".aw-feature__image");
        const copy = section.querySelector(".aw-feature__copy");
        const mask = section.querySelector(".aw-feature__mask");

        if (image) {
          gsap.fromTo(image, { scale: 1.12 }, {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.4,
            },
          });
        }

        if (mask) {
          gsap.fromTo(mask, {
            clipPath: index % 2 === 0 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)",
          }, {
            clipPath: "inset(0 0 0 0)",
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 88%",
              end: "top 18%",
              scrub: 1.2,
            },
          });
        }

        if (copy) {
          gsap.fromTo(copy, { opacity: 0, y: 58 }, {
            opacity: 1,
            y: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 72%",
              end: "top 28%",
              scrub: 1,
            },
          });
        }
      });

      gsap.fromTo(".aw-about__copy", { opacity: 0, y: 60 }, {
        opacity: 1,
        y: 0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".aw-about",
          start: "top 76%",
          end: "top 30%",
          scrub: 1,
        },
      });

      gsap.utils.toArray<HTMLElement>(".aw-capability").forEach((section) => {
        const title = section.querySelector(".aw-capability__title");
        const items = section.querySelectorAll(".aw-capability__item");
        const divider = section.querySelector(".aw-capability__divider");

        if (title) {
          gsap.fromTo(title, { opacity: 0, y: 62 }, {
            opacity: 1,
            y: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
              end: "top 30%",
              scrub: 1,
            },
          });
        }

        if (items.length) {
          gsap.fromTo(items, { opacity: 0, x: 28 }, {
            opacity: 1,
            x: 0,
            stagger: .04,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 64%",
              end: "top 18%",
              scrub: 1,
            },
          });
        }

        if (divider) {
          gsap.fromTo(divider, { scaleX: 0 }, {
            scaleX: 1,
            transformOrigin: "left",
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 72%",
              end: "top 42%",
              scrub: 1,
            },
          });
        }
      });

      gsap.fromTo(".aw-gallery__item", {
        opacity: 0,
        y: 70,
        clipPath: "inset(10% 7% 10% 7%)",
      }, {
        opacity: 1,
        y: 0,
        clipPath: "inset(0 0 0 0)",
        stagger: .08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".aw-gallery",
          start: "top 76%",
          end: "top 18%",
          scrub: 1,
        },
      });

      gsap.fromTo(".aw-next__content", { opacity: 0, y: 70 }, {
        opacity: 1,
        y: 0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".aw-next",
          start: "top 74%",
          end: "top 28%",
          scrub: 1,
        },
      });
    },
    { scope: root },
  );

  const heroTwo = study.visuals[0] || study.hero;
  const heroThree = study.visuals[1] || study.hero;

  const heroLines =
    study.title.length > 22
      ? [study.title.split(" ").slice(0, -1).join(" "), study.title.split(" ").slice(-1).join(" ")]
      : [study.title];

  return (
    <main ref={root} className="aw-page">
      <nav className="aw-nav">
        <Link href="/#cases">
          <ArrowLeft size={14} />
          Selected Cases
        </Link>
        <span>SoftBridge Solutions</span>
        <span>Finland / Europe</span>
      </nav>

      <section className="aw-hero">
        <Image
          className="aw-hero__background"
          src={study.hero}
          alt={`${study.title} project background`}
          fill
          priority
          sizes="100vw"
        />
        <div className="aw-hero__overlay" />
        <div className="aw-hero__grain" />

        <div className="aw-hero__content">
          <p className="aw-hero__eyebrow">{study.kicker}</p>
          <h1 className="aw-hero__title">
            {heroLines.map((line) => (
              <span className="aw-hero__line" key={line}>
                <span>{line}</span>
              </span>
            ))}
          </h1>

          <div className="aw-hero__meta">
            <span>{study.accent}</span>
            <span>Concept Case Study</span>
            <span>Scroll to explore</span>
          </div>
        </div>
      </section>

      <section className="aw-feature aw-feature--one">
        <div className="aw-feature__copy">
          <span>Featured work</span>
          <h2>{study.statement}</h2>
          <p>{study.intro}</p>
        </div>

        <div className="aw-feature__mask">
          <Image
            className="aw-feature__image"
            src={study.hero}
            alt={`${study.title} interface composition`}
            fill
            sizes="62vw"
          />
        </div>

        <footer>
          <span>SoftBridge Concept Lab</span>
          <span>{study.tags.slice(0, 2).join(" / ")}</span>
        </footer>
      </section>

      <section className="aw-feature aw-feature--two">
        <div className="aw-feature__copy">
          <span>Project direction</span>
          <h2>{study.sections[0][0]}</h2>
          <p>{study.sections[0][1]}</p>
        </div>

        <div className="aw-feature__mask">
          <Image
            className="aw-feature__image"
            src={heroTwo}
            alt={`${study.title} project direction visual`}
            fill
            sizes="62vw"
          />
        </div>

        <footer>
          <span>Finland / Europe</span>
          <span>{study.tags.slice(1, 3).join(" / ")}</span>
        </footer>
      </section>

      <section className="aw-about">
        <span>What we do</span>

        <div className="aw-about__copy">
          <h2>
            Strategy, design and development for digital products that need to
            feel clear, distinctive and ready to scale.
          </h2>
          <p>{study.sections[1][1]}</p>
        </div>
      </section>

      <section className="aw-capabilities">
        {capabilities.map((group, index) => (
          <article className="aw-capability" key={group.title}>
            <div className="aw-capability__divider" />

            <div className="aw-capability__heading">
              <span>{group.number}</span>
              <h2 className="aw-capability__title">{group.title}</h2>
            </div>

            <div className="aw-capability__items">
              {group.items.map((item) => (
                <span className="aw-capability__item" key={item}>
                  {item}
                </span>
              ))}
            </div>

            <div className="aw-ticker" aria-hidden="true">
              <div className={`aw-ticker__track ${index % 2 ? "aw-ticker__track--reverse" : ""}`}>
                {Array.from({ length: 8 }).map((_, tickerIndex) => (
                  <span key={tickerIndex}>{group.ticker} ✱</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="aw-gallery">
        <header>
          <span>Visual system</span>
          <h2>A consistent experience across every touchpoint.</h2>
        </header>

        <div className="aw-gallery__grid">
          {[study.hero, heroTwo, heroThree].map((src, index) => (
            <figure className={`aw-gallery__item aw-gallery__item--${index + 1}`} key={`${src}-${index}`}>
              <Image
                src={src}
                alt={`${study.title} visual system ${index + 1}`}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
              />
              <figcaption>
                {String(index + 1).padStart(2, "0")} / {study.tags[index] || study.accent}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="aw-next">
        <Image
          src={heroThree}
          alt={`${study.title} next project background`}
          fill
          sizes="100vw"
        />
        <div className="aw-next__overlay" />

        <div className="aw-next__content">
          <span>Next project</span>
          <h2>Continue exploring.</h2>
          <Link href="/#cases">
            View all selected cases
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
