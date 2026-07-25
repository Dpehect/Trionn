"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import type { CaseStudy } from "@/data/cases";
import styles from "./case-study-page.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const softBridgeLogo =
  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' rx='14' fill='%23F0642F'/%3E%3Cpath d='M13 31V17h8.2c4.2 0 6.8 2 6.8 5.2 0 1.8-.8 3.2-2.4 4 2.1.7 3.3 2.3 3.3 4.5 0 3.8-3 5.3-7.4 5.3H13Zm5-8.4h3c1.5 0 2.3-.6 2.3-1.8 0-1.1-.8-1.7-2.3-1.7h-3v3.5Zm0 8h3.6c1.8 0 2.7-.7 2.7-2 0-1.3-.9-2-2.7-2H18v4Z' fill='white'/%3E%3C/svg%3E";

const featuredItems = [
  {
    category: "AI Transformation",
    client: "SoftBridge Solutions",
    logo: softBridgeLogo,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1800&q=88",
    href: "/cases/ai-software-development-finland",
  },
  {
    category: "Enterprise Platforms",
    client: "SoftBridge Solutions",
    logo: softBridgeLogo,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1800&q=88",
    href: "/#cases",
  },
  {
    category: "Mobile Experiences",
    client: "SoftBridge Solutions",
    logo: softBridgeLogo,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1800&q=88",
    href: "/#cases",
  },
  {
    category: "Cloud Infrastructure",
    client: "SoftBridge Solutions",
    logo: softBridgeLogo,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1800&q=88",
    href: "/#cases",
  },
] as const;

const serviceGroups = [
  {
    number: "01",
    title: "Strategy",
    rows: [
      { label: "Digital Strategy", image: "/detail-part-01/ai-strategy.jpg" },
      { label: "Product Strategy", image: "/detail-part-01/digital-product.jpg" },
      { label: "User Research", image: "/detail-part-01/software-studio.jpg" },
      { label: "AI Strategy", image: "/detail-part-01/data-platform.jpg" },
    ],
  },
  {
    number: "02",
    title: "Creative & Design",
    rows: [
      { label: "Brand Systems", image: "/detail-part-01/digital-product.jpg" },
      { label: "UI/UX Design", image: "/detail-part-01/software-studio.jpg" },
      { label: "Design Systems", image: "/detail-part-01/web-engineering.jpg" },
      { label: "Motion Design", image: "/detail-part-01/engineering-workflow.jpg" },
    ],
  },
  {
    number: "03",
    title: "Development",
    rows: [
      { label: "Web Development", image: "/detail-part-01/web-engineering.jpg" },
      { label: "Mobile Development", image: "/detail-part-01/software-studio.jpg" },
      { label: "Enterprise Software", image: "/detail-part-01/development-environment.jpg" },
      { label: "API & Integrations", image: "/detail-part-01/data-platform.jpg" },
    ],
  },
  {
    number: "04",
    title: "AI & Cloud",
    rows: [
      { label: "AI Automation", image: "/detail-part-01/ai-strategy.jpg" },
      { label: "LLM Solutions", image: "/detail-part-01/digital-product.jpg" },
      { label: "Cloud Infrastructure", image: "/detail-part-01/data-platform.jpg" },
      { label: "DevOps & Scaling", image: "/detail-part-01/engineering-workflow.jpg" },
    ],
  },
] as const;


export function CaseStudyPage({ study: _study }: { study: CaseStudy }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const titles = gsap.utils.toArray<HTMLElement>(`.${styles.featuredTitle}`);
    const clients = gsap.utils.toArray<HTMLElement>(`.${styles.clientItem}`);
    const media = gsap.utils.toArray<HTMLElement>(`.${styles.mediaItem}`);

    gsap.set(titles, { autoAlpha: 0, y: 32 });
    gsap.set(clients, { autoAlpha: 0, x: -32 });
    gsap.set(media, { autoAlpha: 0, scale: 1.035, pointerEvents: "none" });
    gsap.set(titles[0], { autoAlpha: 1, y: 0 });
    gsap.set(clients[0], { autoAlpha: 1, x: 0 });
    gsap.set(media[0], { autoAlpha: 1, scale: 1, pointerEvents: "auto", zIndex: 2 });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: `.${styles.workSection}`,
        start: "top top",
        end: () => `+=${Math.round(window.innerHeight * 3.25)}`,
        pin: `.${styles.workSticky}`,
        pinSpacing: true,
        scrub: .9,
        anticipatePin: 1,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
      },
    });

    featuredItems.forEach((_, index) => {
      if (index === 0) return;
      const previous = index - 1;
      const at = (index - 1) * 1.0 + .08;
      gsap.set(media[index], { zIndex: index + 2 });
      timeline
        .to(titles[previous], { autoAlpha: 0, y: -32, duration: .36, ease: "power2.inOut" }, at)
        .fromTo(titles[index], { autoAlpha: 0, y: 32 }, { autoAlpha: 1, y: 0, duration: .48, ease: "power3.out" }, at + .2)
        .to(clients[previous], { autoAlpha: 0, x: 32, duration: .34, ease: "power2.inOut" }, at)
        .fromTo(clients[index], { autoAlpha: 0, x: -32 }, { autoAlpha: 1, x: 0, duration: .46, ease: "power3.out" }, at + .18)
        .to(media[previous], { autoAlpha: 0, scale: 1.035, pointerEvents: "none", duration: .4, ease: "power2.inOut" }, at)
        .fromTo(media[index], { autoAlpha: 0, scale: 1.035, pointerEvents: "none" }, { autoAlpha: 1, scale: 1, pointerEvents: "auto", duration: .56, ease: "power3.out" }, at + .16);
    });

    timeline.fromTo(
      `.${styles.cta}`,
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: .42, ease: "power3.out" },
      2.78,
    );
    gsap.fromTo(`.${styles.introText}`, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: .8, ease: "power3.out" });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh, { once: true });
    requestAnimationFrame(refresh);

    gsap.utils.toArray<HTMLElement>(`.${styles.serviceGroup}`).forEach((group) => {
      const header = group.querySelector(`.${styles.serviceHeader}`);
      const rows = group.querySelectorAll(`.${styles.serviceRow}`);

      gsap.fromTo(
        header,
        { autoAlpha: 0, y: 38 },
        {
          autoAlpha: 1,
          y: 0,
          duration: .85,
          ease: "power3.out",
          scrollTrigger: { trigger: group, start: "top 82%" },
        },
      );

      gsap.fromTo(
        rows,
        { autoAlpha: 0, y: 18 },
        {
          autoAlpha: 1,
          y: 0,
          duration: .62,
          stagger: .07,
          ease: "power3.out",
          scrollTrigger: { trigger: group, start: "top 72%" },
        },
      );
    });
  }, { scope: root });

  return (
    <main ref={root} className={styles.page}>
      <section className={styles.workSection}>
        <div className={styles.workSticky}>
          <div className={styles.container}>
            <div className={styles.introGrid}>
              <div className={styles.introText}>We design, engineer and scale AI-powered software, enterprise platforms and digital experiences for ambitious companies.</div>
            </div>

            <div className={styles.workGrid}>
              <div className={styles.workContent}>
                <div className={styles.featuredLabel}>Featured work</div>
                <div className={styles.featuredTitleGroup}>
                  {featuredItems.map((item) => <div className={styles.featuredTitle} key={item.category}>{item.category}</div>)}
                </div>
                <div className={styles.clientGroup}>
                  {featuredItems.map((item) => (
                    <div className={styles.clientItem} key={item.client}>
                      <div className={styles.clientLogo}><img src={item.logo} alt={item.client} /></div>
                      <div className={styles.clientText}><div className={styles.clientLabel}>Client</div><div className={styles.clientName}>{item.client}</div></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.mediaArea}>
                {featuredItems.map((item) => (
                  <a key={item.category} aria-label={item.client} href={item.href} className={styles.mediaItem}>
                    <img src={item.image} alt={item.client} />
                  </a>
                ))}
              </div>
            </div>

            <div className={styles.ctaRow}>
              <div className={styles.cta}><Link href="/#cases"><span>See all work</span><ArrowRight size={18} /></Link></div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.servicesSection} aria-label="SoftBridge Solutions services">
        <div className={styles.servicesContainer}>
          {serviceGroups.map((group) => (
            <article className={styles.serviceGroup} key={group.number}>
              <header className={styles.serviceHeader}>
                <span className={styles.serviceNumber}>{group.number}</span>
                <h2 className={styles.serviceTitle}>{group.title}</h2>
              </header>

              <div className={styles.serviceRows}>
                {group.rows.map((row) => (
                  <div className={styles.serviceRow} key={row.label}>
                    <span className={styles.serviceRowLabel}>{row.label}</span>

                    <div className={styles.serviceHoverLayer} aria-hidden="true">
                      <div className={styles.marqueeTrack}>
                        {[0, 1].map((copy) => (
                          <div className={styles.marqueeGroup} key={copy}>
                            {[0, 1, 2, 3, 4].map((item) => (
                              <span key={item}>
                                <i>✣</i> {row.label}
                              </span>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={styles.servicePreview} aria-hidden="true">
                      <img src={row.image} alt="" />
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

    </main>
  );
}
