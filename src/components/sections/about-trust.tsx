"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Globe2, Layers3, ShieldCheck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "6+", label: "Years building products" },
  { value: "2", label: "Delivery hubs" },
  { value: "8", label: "Core capabilities" },
  { value: "EU", label: "Market focus" },
];

export function AboutTrust() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    gsap.from("[data-about-word]", {
      yPercent: 115,
      opacity: 0,
      stagger: 0.045,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
    });
    gsap.from("[data-stat]", {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: { trigger: "[data-stats]", start: "top 82%" },
    });
  }, { scope: sectionRef });

  return (
    <section id="about" ref={sectionRef} className="about-trust">
      <div className="about-trust__intro">
        <div>
          <p className="section-eyebrow">Studio / 02</p>
          <p className="about-trust__label">Helsinki + distributed delivery</p>
        </div>
        <h2 className="about-trust__manifesto">
          {"Nordic clarity. Global product thinking. Software built to move ambitious companies forward."
            .split(" ")
            .map((word) => <span key={word} className="about-word-wrap"><span data-about-word>{word}&nbsp;</span></span>)}
        </h2>
      </div>

      <div className="about-trust__grid">
        <article className="about-map-card">
          <div className="about-map-card__head">
            <div><p className="section-eyebrow">Delivery model</p><h3>Finland meets Türkiye.</h3></div>
            <Globe2 size={26} />
          </div>
          <div className="delivery-map" aria-label="Distributed delivery between Helsinki and Türkiye">
            <span className="delivery-map__grid" />
            <span className="delivery-map__route" />
            <span className="delivery-map__node delivery-map__node--helsinki"><i />Helsinki</span>
            <span className="delivery-map__node delivery-map__node--turkiye"><i />Türkiye</span>
            <span className="delivery-map__pulse delivery-map__pulse--one" />
            <span className="delivery-map__pulse delivery-map__pulse--two" />
          </div>
          <p>Strategy and client proximity in Finland, paired with a senior cross-border product and engineering team.</p>
        </article>

        <div className="about-trust__principles">
          <article><ShieldCheck size={22}/><h3>Clarity before code</h3><p>We define the real product problem, success criteria and technical constraints before implementation.</p></article>
          <article><Layers3 size={22}/><h3>One integrated team</h3><p>Product, design and engineering work as one system instead of disconnected handoffs.</p></article>
          <a href="#services" className="about-trust__link">Explore capabilities <ArrowUpRight size={17}/></a>
        </div>
      </div>

      <div className="about-stats" data-stats>
        {stats.map((stat) => <div key={stat.label} data-stat><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
      </div>
    </section>
  );
}
