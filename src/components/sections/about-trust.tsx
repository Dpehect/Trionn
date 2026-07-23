"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowUpRight, CheckCircle2, Clock3, Globe2, Layers3, MapPin, ShieldCheck, Users2, Video } from "lucide-react";

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
          <div className="delivery-system" aria-label="Softbridge distributed delivery operating model">
            <div className="delivery-system__topline">
              <span><i /> Live operating model</span>
              <strong>One team · two hubs</strong>
            </div>

            <div className="delivery-hubs">
              <article className="delivery-hub delivery-hub--finland">
                <div className="delivery-hub__icon"><MapPin size={18}/></div>
                <div>
                  <p>Finland hub</p>
                  <h4>Client strategy</h4>
                  <span>Discovery, product direction, stakeholder alignment and Nordic market proximity.</span>
                </div>
                <b>Helsinki</b>
              </article>

              <div className="delivery-bridge" aria-hidden="true">
                <span className="delivery-bridge__line" />
                <span className="delivery-bridge__packet delivery-bridge__packet--one" />
                <span className="delivery-bridge__packet delivery-bridge__packet--two" />
                <div><Video size={15}/><span>Daily overlap</span></div>
              </div>

              <article className="delivery-hub delivery-hub--turkiye">
                <div className="delivery-hub__icon"><Users2 size={18}/></div>
                <div>
                  <p>Engineering hub</p>
                  <h4>Senior delivery</h4>
                  <span>Product design, full-stack engineering, AI automation, QA and continuous delivery.</span>
                </div>
                <b>Türkiye</b>
              </article>
            </div>

            <div className="delivery-flow">
              {["Shape", "Design", "Build", "Validate", "Release"].map((step, index) => (
                <div key={step} className="delivery-flow__step">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{step}</strong>
                  {index < 4 && <ArrowRight size={15} aria-hidden="true"/>}
                </div>
              ))}
            </div>

            <div className="delivery-metrics">
              <div><Clock3 size={17}/><span><strong>4h+</strong> daily collaboration window</span></div>
              <div><CheckCircle2 size={17}/><span><strong>1</strong> shared backlog and release cadence</span></div>
              <div><ShieldCheck size={17}/><span><strong>Senior-led</strong> delivery from discovery to launch</span></div>
            </div>
          </div>
          <p>Strategy and client proximity in Finland, paired with a senior cross-border product and engineering team operating through one backlog, one roadmap and one quality standard.</p>
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
