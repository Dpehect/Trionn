"use client";

import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowLeft, ArrowDownRight } from "lucide-react";
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
        .fromTo(".case-nav", { opacity: 0, y: -14 }, { opacity: 1, y: 0, duration: .7 }, 0)
        .fromTo(".case-hero__image", { scale: 1.12, filter: "blur(8px)" }, { scale: 1, filter: "blur(0px)", duration: 1.5 }, 0)
        .fromTo(".case-hero__kicker", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .7 }, .25)
        .fromTo(".case-hero__title-line > span", { yPercent: 115 }, { yPercent: 0, stagger: .12, duration: 1 }, .3)
        .fromTo(".case-hero__scroll", { opacity: 0 }, { opacity: 1, duration: .6 }, .95);

      gsap.to(".case-hero__image", {
        yPercent: 12,
        scale: 1.06,
        ease: "none",
        scrollTrigger: {
          trigger: ".case-hero",
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.utils.toArray<HTMLElement>(".case-editorial").forEach((block) => {
        const image = block.querySelector(".case-editorial__media");
        const copy = block.querySelector(".case-editorial__copy");

        if (image) {
          gsap.fromTo(image, { clipPath: "inset(18% 8% 18% 8%)", scale: 1.1 }, {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: block, start: "top 90%", end: "top 28%", scrub: 1.25 },
          });
        }

        if (copy) {
          gsap.fromTo(copy, { opacity: 0, y: 70 }, {
            opacity: 1,
            y: 0,
            ease: "power3.out",
            scrollTrigger: { trigger: block, start: "top 82%", end: "top 38%", scrub: 1 },
          });
        }
      });

      gsap.fromTo(".case-closing__content", { opacity: 0, y: 60 }, {
        opacity: 1,
        y: 0,
        scrollTrigger: { trigger: ".case-closing", start: "top 78%", end: "top 30%", scrub: 1.1 },
      });
    },
    { scope: root },
  );

  return (
    <main ref={root} className="case-page">
      <nav className="case-nav">
        <Link href="/#cases"><ArrowLeft size={15} /> Selected Cases</Link>
        <span>SoftBridge Solutions</span>
        <span>Finland Office</span>
      </nav>

      <section className="case-hero">
        <Image className="case-hero__image" src={study.hero} alt={`${study.title} concept case hero`} fill priority sizes="100vw" />
        <div className="case-hero__veil" />
        <div className="case-hero__content">
          <p className="case-hero__kicker">{study.kicker}</p>
          <h1>
            {study.title.split(" ").reduce<string[][]>((lines, word) => {
              const current = lines[lines.length - 1];
              if (!current || current.join(" ").length > 17) lines.push([word]);
              else current.push(word);
              return lines;
            }, []).map((line, index) => (
              <span className="case-hero__title-line" key={index}><span>{line.join(" ")}</span></span>
            ))}
          </h1>
          <p className="case-hero__scroll">Scroll to discover <ArrowDownRight size={16} /></p>
        </div>
      </section>

      <section className="case-statement">
        <span>01 / PROJECT VISION</span>
        <h2>{study.statement}</h2>
        <p>{study.intro}</p>
      </section>

      {study.sections.map(([title, body], index) => (
        <section className={`case-editorial case-editorial--${index + 1}`} key={title}>
          <div className="case-editorial__media">
            <Image src={study.hero} alt={`${study.title} ${title.toLowerCase()} visual`} fill sizes="(max-width: 900px) 100vw, 52vw" />
          </div>
          <div className="case-editorial__copy">
            <span>{String(index + 2).padStart(2, "0")} / {title.toUpperCase()}</span>
            <h2>{title}</h2>
            <p>{body}</p>
            <div className="case-editorial__tags">
              {study.tags.slice(index, index + 2).map((tag) => <i key={tag}>{tag}</i>)}
            </div>
          </div>
        </section>
      ))}

      <section className="case-closing">
        <div className="case-closing__content">
          <span>SOFTBRIDGE SOLUTIONS / FINLAND OFFICE</span>
          <h2>Built for clarity.<br />Engineered for scale.</h2>
          <Link href="/#cases">Explore more cases <ArrowDownRight size={18} /></Link>
        </div>
      </section>
    </main>
  );
}
