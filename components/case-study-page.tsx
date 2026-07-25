"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import type { CaseStudy } from "@/data/cases";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const projects = [
  { category: "AI Systems", client: "Nordic Intelligence", mark: "NI", image: "/detail-part-01/ai-strategy.jpg", description: "Intelligent automation and decision systems for complex operations." },
  { category: "Enterprise Web", client: "Atlas Platform", mark: "AP", image: "/detail-part-01/digital-product.jpg", description: "High-performance digital platforms engineered for clarity and scale." },
  { category: "Mobile Platforms", client: "Nova Mobile", mark: "NM", image: "/detail-part-01/software-studio.jpg", description: "Focused mobile experiences with responsive product systems." },
  { category: "Cloud Infrastructure", client: "Vault Cloud", mark: "VC", image: "/detail-part-01/data-platform.jpg", description: "Reliable cloud foundations for products operating across Europe." },
] as const;

export function CaseStudyPage({ study }: { study: CaseStudy }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const slides = gsap.utils.toArray<HTMLElement>(".sr-slide");
    const categories = gsap.utils.toArray<HTMLElement>(".sr-category");
    const clients = gsap.utils.toArray<HTMLElement>(".sr-client");
    const progress = gsap.utils.toArray<HTMLElement>(".sr-progress span");

    gsap.set(slides, { yPercent: (i) => i * 100 });
    gsap.set(categories, { yPercent: (i) => i * 100 });
    gsap.set(clients, { yPercent: (i) => i * 100 });
    gsap.set(progress, { opacity: .24 });
    gsap.set(progress[0], { opacity: 1 });

    const master = gsap.timeline({
      scrollTrigger: {
        trigger: ".sr-scroll",
        start: "top top",
        end: `+=${projects.length * 125}%`,
        pin: ".sr-stage",
        scrub: 1.22,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    projects.forEach((_, index) => {
      if (index === projects.length - 1) return;
      const at = index + .04;
      master
        .to(slides, {
          yPercent: (i) => (i - index - 1) * 100,
          duration: 1.02,
          ease: "power3.inOut",
        }, at)
        .to(categories, {
          yPercent: (i) => (i - index - 1) * 100,
          duration: .96,
          ease: "power3.inOut",
        }, at)
        .to(clients, {
          yPercent: (i) => (i - index - 1) * 100,
          duration: .96,
          ease: "power3.inOut",
        }, at)
        .to(progress[index], { opacity: .24, duration: .18 }, at + .58)
        .to(progress[index + 1], { opacity: 1, duration: .18 }, at + .58);
    });

    master.to(".sr-see-all", { yPercent: 0, duration: .66, ease: "power3.inOut" }, projects.length - .06);

    gsap.fromTo(".sr-header", { opacity: 0, y: -14 }, { opacity: 1, y: 0, duration: .7, ease: "power3.out" });
    gsap.fromTo(".sr-intro-copy", { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: .92, ease: "power3.out", delay: .08 });

    gsap.utils.toArray<HTMLElement>(".sr-slide__media").forEach((media) => {
      const image = media.querySelector<HTMLElement>(".sr-slide__image");
      const lens = media.querySelector<HTMLElement>(".sr-wave");
      const chroma = media.querySelector<HTMLElement>(".sr-chroma");
      if (!image || !lens || !chroma) return;

      const xTo = gsap.quickTo(image, "xPercent", { duration: .65, ease: "power3.out" });
      const yTo = gsap.quickTo(image, "yPercent", { duration: .65, ease: "power3.out" });
      const rxTo = gsap.quickTo(image, "rotationX", { duration: .75, ease: "power3.out" });
      const ryTo = gsap.quickTo(image, "rotationY", { duration: .75, ease: "power3.out" });

      const onMove = (event: PointerEvent) => {
        const rect = media.getBoundingClientRect();
        const nx = (event.clientX - rect.left) / rect.width - .5;
        const ny = (event.clientY - rect.top) / rect.height - .5;
        xTo(nx * 1.5); yTo(ny * 1.2); rxTo(ny * -2.2); ryTo(nx * 2.6);
        gsap.to(lens, { x: event.clientX - rect.left, y: event.clientY - rect.top, opacity: .48, scale: 1, duration: .28, overwrite: true });
        gsap.to(chroma, { x: nx * 9, y: ny * 7, opacity: .16, duration: .25, overwrite: true });
      };
      const onLeave = () => {
        xTo(0); yTo(0); rxTo(0); ryTo(0);
        gsap.to(lens, { opacity: 0, scale: .72, duration: .38 });
        gsap.to(chroma, { x: 0, y: 0, opacity: .05, duration: .4 });
      };
      media.addEventListener("pointermove", onMove);
      media.addEventListener("pointerleave", onLeave);
    });
  }, { scope: root });

  return (
    <main ref={root} className="sr-page">
      <section className="sr-intro">
        <header className="sr-header">
          <Link href="/#cases"><ArrowLeft size={14}/>Selected Cases</Link>
          <span className="sr-header__brand">SoftBridge Solutions®</span>
          <Link href="/" className="sr-home">Home <span>::</span></Link>
        </header>
        <div className="sr-intro-copy">
          <p>We design, build and grow digital products for Europe&apos;s most ambitious companies and boldest new ideas.</p>
        </div>
      </section>

      <section className="sr-scroll">
        <div className="sr-stage">
          <div className="sr-left">
            <span className="sr-featured">Featured work</span>
            <div className="sr-category-window"><div className="sr-category-track">
              {projects.map((project) => <h1 className="sr-category" key={project.category}>{project.category}</h1>)}
            </div></div>
            <div className="sr-client-window"><div className="sr-client-track">
              {projects.map((project) => (
                <div className="sr-client" key={project.client}>
                  <span className="sr-client__mark">{project.mark}</span>
                  <div><small>Client</small><strong>{project.client}</strong></div>
                </div>
              ))}
            </div></div>
          </div>

          <div className="sr-right"><div className="sr-slides-track">
            {projects.map((project, index) => (
              <article className="sr-slide" key={project.category}>
                <div className="sr-slide__media">
                  <img className="sr-slide__image" src={project.image} alt={`${project.category} project visual`}/>
                  <div className="sr-chroma" style={{ backgroundImage: `url(${project.image})` }}/>
                  <div className="sr-slide__shade"/><div className="sr-film-grain"/><div className="sr-wave"/>
                  <div className="sr-slide__labels"><span>{String(index + 1).padStart(2, "0")}</span><span>{project.description}</span></div>
                </div>
              </article>
            ))}
          </div></div>

          <div className="sr-progress">{projects.map((project, index) => <span key={project.category}>{String(index + 1).padStart(2, "0")}</span>)}</div>
          <div className="sr-see-all"><Link href="/#cases">See all work <ArrowRight size={18}/></Link></div>
        </div>
      </section>
    </main>
  );
}
