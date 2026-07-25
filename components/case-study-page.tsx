"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowDown,
  ArrowUpRight,
  Circle,
  MoveRight,
} from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import type { CaseStudy } from "@/data/cases";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function CaseStudyPage({ study }: { study: CaseStudy }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const page = root.current;
      if (!page) return;

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

      intro
        .fromTo(".cinema-nav", { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: .7 }, 0)
        .fromTo(".cinema-hero__image", { scale: 1.18, filter: "blur(10px) brightness(.72)" }, { scale: 1.03, filter: "blur(0px) brightness(.74)", duration: 1.7 }, 0)
        .fromTo(".cinema-hero__index", { opacity: 0 }, { opacity: 1, duration: .6 }, .35)
        .fromTo(".cinema-hero__line > span", { yPercent: 115 }, { yPercent: 0, duration: 1.05, stagger: .1 }, .28)
        .fromTo(".cinema-hero__meta", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .75 }, .86);

      gsap.to(".cinema-hero__image", {
        yPercent: 13,
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: ".cinema-hero",
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.to(".cinema-hero__title", {
        yPercent: -14,
        opacity: .2,
        ease: "none",
        scrollTrigger: {
          trigger: ".cinema-hero",
          start: "35% top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.fromTo(".cinema-manifesto__copy", { opacity: 0, y: 80 }, {
        opacity: 1,
        y: 0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cinema-manifesto",
          start: "top 78%",
          end: "top 28%",
          scrub: 1,
        },
      });

      gsap.fromTo(".cinema-manifesto__metric", { scale: .8, opacity: 0 }, {
        scale: 1,
        opacity: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cinema-manifesto",
          start: "top 68%",
          end: "top 22%",
          scrub: 1.1,
        },
      });

      gsap.utils.toArray<HTMLElement>(".visual-story__scene").forEach((scene, index) => {
        const image = scene.querySelector(".visual-story__image");
        const copy = scene.querySelector(".visual-story__copy");
        const progress = scene.querySelector(".visual-story__progress span");

        if (image) {
          gsap.fromTo(image, {
            clipPath: index % 2 === 0 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)",
            scale: 1.13,
          }, {
            clipPath: "inset(0 0 0 0)",
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: scene,
              start: "top 88%",
              end: "top 20%",
              scrub: 1.3,
            },
          });
        }

        if (copy) {
          gsap.fromTo(copy, { opacity: 0, y: 60 }, {
            opacity: 1,
            y: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: scene,
              start: "top 75%",
              end: "top 32%",
              scrub: 1,
            },
          });
        }

        if (progress) {
          gsap.fromTo(progress, { scaleX: 0 }, {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: scene,
              start: "top 65%",
              end: "bottom 45%",
              scrub: 1,
            },
          });
        }
      });

      gsap.to(".system-orbit", {
        rotate: 55,
        ease: "none",
        scrollTrigger: {
          trigger: ".system-visual",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.6,
        },
      });

      gsap.to(".system-grid", {
        backgroundPosition: "120px 80px",
        ease: "none",
        scrollTrigger: {
          trigger: ".system-visual",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.8,
        },
      });

      gsap.fromTo(".cinema-gallery__item", {
        opacity: 0,
        y: 80,
        clipPath: "inset(12% 8% 12% 8%)",
      }, {
        opacity: 1,
        y: 0,
        clipPath: "inset(0 0 0 0)",
        stagger: .08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cinema-gallery",
          start: "top 76%",
          end: "top 20%",
          scrub: 1,
        },
      });

      gsap.fromTo(".cinema-closing__inner", { opacity: 0, y: 70 }, {
        opacity: 1,
        y: 0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cinema-closing",
          start: "top 72%",
          end: "top 26%",
          scrub: 1,
        },
      });
    },
    { scope: root },
  );

  const titleLines = study.title.length > 23
    ? [study.title.split(" ").slice(0, -1).join(" "), study.title.split(" ").slice(-1).join(" ")]
    : [study.title];

  return (
    <main ref={root} className="cinema-case">
      <nav className="cinema-nav">
        <Link href="/#cases"><ArrowLeft size={14} /> Selected Cases</Link>
        <span>SoftBridge Solutions</span>
        <span>Finland / Europe</span>
      </nav>

      <section className="cinema-hero">
        <Image
          className="cinema-hero__image"
          src={study.hero}
          alt={`${study.title} cinematic product visualization`}
          fill
          priority
          sizes="100vw"
        />
        <div className="cinema-hero__grain" />
        <div className="cinema-hero__veil" />

        <span className="cinema-hero__index">CASE / {study.slug.slice(0, 2).toUpperCase()}</span>

        <div className="cinema-hero__title">
          <p>{study.kicker}</p>
          <h1>
            {titleLines.map((line) => (
              <span className="cinema-hero__line" key={line}><span>{line}</span></span>
            ))}
          </h1>
        </div>

        <div className="cinema-hero__meta">
          <span>{study.accent}</span>
          <span className="cinema-hero__scroll"><ArrowDown size={14} /> Scroll to explore</span>
        </div>
      </section>

      <section className="cinema-manifesto">
        <div className="cinema-manifesto__rail">
          <span>01</span>
          <i />
          <b>CONTEXT</b>
        </div>

        <div className="cinema-manifesto__copy">
          <span>THE CHALLENGE</span>
          <h2>{study.statement}</h2>
          <p>{study.intro}</p>
        </div>

        <div className="cinema-manifesto__metric">
          <small>DESIGN TARGET</small>
          <strong>{study.metric}</strong>
          <span>{study.metricLabel}</span>
        </div>
      </section>

      <section className="visual-story">
        {study.sections.map(([title, body], index) => (
          <article className={`visual-story__scene visual-story__scene--${index + 1}`} key={title}>
            <div className="visual-story__media">
              <Image
                className="visual-story__image"
                src={study.visuals[index]}
                alt={`${study.title} ${title.toLowerCase()} editorial visualization`}
                fill
                sizes="(max-width: 900px) 100vw, 58vw"
              />
              <span className="visual-story__number">0{index + 2}</span>
            </div>

            <div className="visual-story__copy">
              <span>{title.toUpperCase()}</span>
              <h2>{title}</h2>
              <p>{body}</p>
              <div className="visual-story__tags">
                {study.tags.slice(index, index + 2).map((tag) => <i key={tag}>{tag}</i>)}
              </div>
              <div className="visual-story__progress"><span /></div>
            </div>
          </article>
        ))}
      </section>

      <section className="system-visual">
        <div className="system-grid" />
        <div className="system-orbit">
          <span className="system-orbit__core">SB</span>
          {study.tags.map((tag, index) => (
            <span
              className="system-orbit__node"
              key={tag}
              style={{ transform: `rotate(${index * (360 / study.tags.length)}deg) translateX(210px) rotate(${-index * (360 / study.tags.length)}deg)` }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="system-visual__copy">
          <span>04 / CONNECTED SYSTEM</span>
          <h2>Strategy, design and engineering move as one.</h2>
          <p>
            The experience is shaped as a complete operating system rather than
            a collection of isolated screens.
          </p>
        </div>
      </section>

      <section className="cinema-gallery">
        <header>
          <span>05 / VISUAL LANGUAGE</span>
          <h2>Built to feel coherent at every scale.</h2>
        </header>

        <div className="cinema-gallery__grid">
          {[study.hero, ...study.visuals].map((src, index) => (
            <figure className={`cinema-gallery__item cinema-gallery__item--${index + 1}`} key={`${src}-${index}`}>
              <Image src={src} alt={`${study.title} visual direction ${index + 1}`} fill sizes="(max-width: 800px) 100vw, 50vw" />
              <figcaption>{String(index + 1).padStart(2, "0")} / {study.accent}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="cinema-closing">
        <Image src={study.visuals[0]} alt={`${study.title} closing visual`} fill sizes="100vw" />
        <div className="cinema-closing__veil" />
        <div className="cinema-closing__inner">
          <span>SOFTBRIDGE SOLUTIONS / FINLAND OFFICE</span>
          <h2>Ready to build<br />what comes next?</h2>
          <Link href="/#cases">Explore another case <ArrowUpRight size={16} /></Link>
        </div>
      </section>
    </main>
  );
}
