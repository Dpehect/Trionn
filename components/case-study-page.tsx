"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowDown, ArrowUpRight } from "lucide-react";
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
      const section = root.current;
      if (!section) return;

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .fromTo(".ref-nav", { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: .7 }, 0)
        .fromTo(".ref-hero__image", { scale: 1.12, filter: "blur(10px) brightness(.65)" }, { scale: 1.02, filter: "blur(0px) brightness(.62)", duration: 1.7 }, 0)
        .fromTo(".ref-hero__prompt", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .8 }, .45)
        .fromTo(".ref-hero__scroll", { opacity: 0 }, { opacity: 1, duration: .55 }, 1.05);

      gsap.to(".ref-hero__image", {
        yPercent: 12,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: ".ref-hero",
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.utils.toArray<HTMLElement>(".ref-panel").forEach((panel) => {
        const copy = panel.querySelector(".ref-panel__copy");
        const media = panel.querySelector(".ref-panel__media");
        const rule = panel.querySelector(".ref-panel__rule");

        if (copy) {
          gsap.fromTo(copy, { opacity: 0, y: 56 }, {
            opacity: 1,
            y: 0,
            ease: "power3.out",
            scrollTrigger: { trigger: panel, start: "top 80%", end: "top 34%", scrub: 1 },
          });
        }

        if (media) {
          gsap.fromTo(media, { clipPath: "inset(10% 12% 10% 12%)", scale: 1.1 }, {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: panel, start: "top 92%", end: "top 24%", scrub: 1.2 },
          });
        }

        if (rule) {
          gsap.fromTo(rule, { scaleX: 0 }, {
            scaleX: 1,
            transformOrigin: "left",
            ease: "none",
            scrollTrigger: { trigger: panel, start: "top 72%", end: "top 44%", scrub: 1 },
          });
        }
      });

      gsap.to(".ref-wide__image", {
        yPercent: 10,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: ".ref-wide",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.fromTo(".ref-final__content", { opacity: 0, y: 42 }, {
        opacity: 1,
        y: 0,
        scrollTrigger: { trigger: ".ref-final", start: "top 74%", end: "top 30%", scrub: 1 },
      });
    },
    { scope: root },
  );

  const chapters = study.sections;

  return (
    <main ref={root} className="ref-case">
      <nav className="ref-nav">
        <Link href="/#cases" className="ref-nav__back">
          <ArrowLeft size={14} /> Cases
        </Link>
        <span className="ref-nav__brand">SoftBridge Solutions</span>
        <span className="ref-nav__office">Finland Office</span>
      </nav>

      <section className="ref-hero">
        <Image
          className="ref-hero__image"
          src={study.hero}
          alt={`${study.title} concept atmosphere`}
          fill
          priority
          sizes="100vw"
        />
        <div className="ref-hero__fog" />
        <div className="ref-hero__prompt">
          <span>{study.kicker}</span>
          <strong>Remember why you are here.</strong>
        </div>
        <div className="ref-hero__scroll">
          <ArrowDown size={14} />
          <span>Scroll to discover</span>
        </div>
      </section>

      <section className="ref-panel ref-panel--intro">
        <aside className="ref-panel__rail">
          <span>01</span>
          <b>PHILOSOPHY</b>
        </aside>

        <div className="ref-panel__copy">
          <span className="ref-panel__eyebrow">OUR PHILOSOPHY</span>
          <h1>{study.statement}</h1>
          <p>{study.intro}</p>
          <div className="ref-panel__rule" />
          <Link href="#chapter-one">View Philosophy <ArrowUpRight size={14} /></Link>
        </div>

        <div className="ref-panel__media">
          <Image src={study.hero} alt={`${study.title} philosophy visual`} fill sizes="42vw" />
        </div>
      </section>

      <section className="ref-wide">
        <Image className="ref-wide__image" src={study.hero} alt={`${study.title} immersive product visual`} fill sizes="100vw" />
        <div className="ref-wide__veil" />
        <span>VIEW PROJECT</span>
      </section>

      <section id="chapter-one" className="ref-panel ref-panel--craft">
        <aside className="ref-panel__rail">
          <span>02</span>
          <b>CRAFT</b>
        </aside>

        <div className="ref-panel__copy">
          <span className="ref-panel__eyebrow">{chapters[0][0].toUpperCase()}</span>
          <h2>{chapters[0][0]}</h2>
          <p>{chapters[0][1]}</p>
          <div className="ref-panel__rule" />
          <Link href="#chapter-two">View Craft <ArrowUpRight size={14} /></Link>
        </div>

        <div className="ref-panel__media ref-panel__media--portrait">
          <Image src={study.hero} alt={`${study.title} ${chapters[0][0].toLowerCase()} visual`} fill sizes="35vw" />
        </div>
      </section>

      <section id="chapter-two" className="ref-panel ref-panel--reverse">
        <aside className="ref-panel__rail">
          <span>03</span>
          <b>{chapters[1][0].toUpperCase()}</b>
        </aside>

        <div className="ref-panel__media">
          <Image src={study.hero} alt={`${study.title} ${chapters[1][0].toLowerCase()} visual`} fill sizes="42vw" />
        </div>

        <div className="ref-panel__copy">
          <span className="ref-panel__eyebrow">{chapters[1][0].toUpperCase()}</span>
          <h2>{chapters[1][0]}</h2>
          <p>{chapters[1][1]}</p>
          <div className="ref-panel__rule" />
          <Link href="#final">Continue <ArrowUpRight size={14} /></Link>
        </div>
      </section>

      <section id="final" className="ref-final">
        <Image className="ref-final__image" src={study.hero} alt={`${study.title} closing atmosphere`} fill sizes="100vw" />
        <div className="ref-final__fog" />
        <div className="ref-final__content">
          <span>SOFTBRIDGE SOLUTIONS</span>
          <h2>Who we are</h2>
          <p>{chapters[2][1]}</p>
          <Link href="/#cases">View more cases <ArrowUpRight size={14} /></Link>
        </div>
      </section>
    </main>
  );
}
