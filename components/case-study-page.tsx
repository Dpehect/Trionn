"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
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

      gsap.fromTo(
        ".pro-case__hero-image",
        { scale: 1.08, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.25, ease: "power3.out" },
      );

      gsap.fromTo(
        ".pro-case__hero-copy > *",
        { opacity: 0, y: 34 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.8, ease: "power3.out", delay: 0.15 },
      );

      gsap.to(".pro-case__hero-image", {
        yPercent: 7,
        ease: "none",
        scrollTrigger: {
          trigger: ".pro-case__hero",
          start: "top top",
          end: "bottom top",
          scrub: 1.4,
        },
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 42 },
          {
            opacity: 1,
            y: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 84%",
              end: "top 48%",
              scrub: 0.8,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".pro-case__media").forEach((media) => {
        gsap.fromTo(
          media,
          { clipPath: "inset(8% 6% 8% 6%)", scale: 1.04 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: media,
              start: "top 90%",
              end: "top 38%",
              scrub: 1.1,
            },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <main ref={root} className="pro-case">
      <header className="pro-case__topbar">
        <Link href="/#cases">
          <ArrowLeft size={15} />
          Selected Cases
        </Link>

        <nav aria-label="Case study sections">
          <a href="#overview">Overview</a>
          <a href="#approach">Approach</a>
          <a href="#solution">Solution</a>
          <a href="#outcome">Outcome</a>
        </nav>

        <span>SoftBridge Solutions / Finland</span>
      </header>

      <section className="pro-case__hero">
        <img
          className="pro-case__hero-image"
          src={study.editorialHero}
          alt={`${study.title} editorial project context`}
        />
        <div className="pro-case__hero-shade" />

        <div className="pro-case__hero-copy">
          <p>{study.kicker}</p>
          <h1>{study.title}</h1>
          <span>{study.accent}</span>
        </div>
      </section>

      <section id="overview" className="pro-case__overview">
        <div className="pro-case__section-label">
          <span>01</span>
          <p>Project overview</p>
        </div>

        <div data-reveal className="pro-case__overview-main">
          <h2>{study.statement}</h2>
          <p>{study.intro}</p>
        </div>

        <dl data-reveal className="pro-case__facts">
          <div>
            <dt>Focus</dt>
            <dd>{study.tags[0]}</dd>
          </div>
          <div>
            <dt>Capability</dt>
            <dd>{study.tags[1]}</dd>
          </div>
          <div>
            <dt>Region</dt>
            <dd>Finland / Europe</dd>
          </div>
          <div>
            <dt>Type</dt>
            <dd>Concept case study</dd>
          </div>
        </dl>
      </section>

      <section className="pro-case__feature">
        <div className="pro-case__media">
          <Image
            src={study.hero}
            alt={`${study.title} product interface overview`}
            fill
            sizes="100vw"
          />
        </div>
      </section>

      <section id="approach" className="pro-case__chapter">
        <div className="pro-case__section-label">
          <span>02</span>
          <p>{study.sections[0][0]}</p>
        </div>

        <div data-reveal className="pro-case__chapter-copy">
          <h2>{study.sections[0][0]}</h2>
          <p>{study.sections[0][1]}</p>
        </div>

        <div data-reveal className="pro-case__principles">
          {study.tags.map((tag, index) => (
            <article key={tag}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{tag}</h3>
              <p>
                A focused product principle used to keep the experience clear,
                reliable and easy to operate.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="solution" className="pro-case__split">
        <div className="pro-case__media pro-case__media--portrait">
          <img
            src={study.editorialHero}
            alt={`${study.title} business and user context`}
          />
        </div>

        <div data-reveal className="pro-case__split-copy">
          <span>03 / {study.sections[1][0]}</span>
          <h2>{study.sections[1][0]}</h2>
          <p>{study.sections[1][1]}</p>

          <ul>
            <li>Clear information architecture</li>
            <li>Consistent interaction patterns</li>
            <li>Accessible responsive behavior</li>
            <li>Scalable engineering foundations</li>
          </ul>
        </div>
      </section>

      <section className="pro-case__gallery">
        <figure className="pro-case__media">
          <Image
            src={study.visuals[0]}
            alt={`${study.title} supporting technology visual`}
            fill
            sizes="60vw"
          />
        </figure>
        <figure className="pro-case__media">
          <Image
            src={study.visuals[1]}
            alt={`${study.title} supporting product-development visual`}
            fill
            sizes="40vw"
          />
        </figure>
      </section>

      <section id="outcome" className="pro-case__outcome">
        <div className="pro-case__section-label">
          <span>04</span>
          <p>{study.sections[2][0]}</p>
        </div>

        <div data-reveal className="pro-case__outcome-copy">
          <h2>{study.sections[2][0]}</h2>
          <p>{study.sections[2][1]}</p>
        </div>

        <div data-reveal className="pro-case__outcome-note">
          <p>
            This case is presented as a capability concept, not as a claim of
            completed client work. It demonstrates how SoftBridge Solutions
            approaches product strategy, interface design and engineering.
          </p>
        </div>
      </section>

      <footer className="pro-case__footer">
        <div>
          <span>Next step</span>
          <h2>Explore another case.</h2>
        </div>

        <Link href="/#cases">
          Back to Selected Cases
          <ArrowRight size={18} />
        </Link>
      </footer>
    </main>
  );
}
