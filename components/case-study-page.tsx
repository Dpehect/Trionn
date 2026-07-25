"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import type { CaseStudy } from "@/data/cases";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const scenes = [
  {
    title: "Artificial Intelligence",
    shortTitle: "AI",
    image: "/detail-part-01/ai-strategy.jpg",
    client: "AI Strategy",
    tone: "01",
  },
  {
    title: "Data Platforms",
    shortTitle: "Data",
    image: "/detail-part-01/data-platform.jpg",
    client: "Data Systems",
    tone: "02",
  },
  {
    title: "Software Engineering",
    shortTitle: "Software",
    image: "/detail-part-01/software-studio.jpg",
    client: "Software Studio",
    tone: "03",
  },
  {
    title: "Web Development",
    shortTitle: "Web",
    image: "/detail-part-01/web-engineering.jpg",
    client: "Web Engineering",
    tone: "04",
  },
  {
    title: "Development Systems",
    shortTitle: "Systems",
    image: "/detail-part-01/development-environment.jpg",
    client: "Development Environment",
    tone: "05",
  },
  {
    title: "Digital Products",
    shortTitle: "Product",
    image: "/detail-part-01/digital-product.jpg",
    client: "Product Experience",
    tone: "06",
  },
  {
    title: "Engineering Workflow",
    shortTitle: "Motion",
    image: "/detail-part-01/engineering-workflow.jpg",
    client: "Delivery Systems",
    tone: "07",
  },
] as const;

export function CaseStudyPage({ study }: { study: CaseStudy }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const wrapper = root.current;
      if (!wrapper) return;

      const sceneEls = gsap.utils.toArray<HTMLElement>(".rm-scene");
      const titleEls = gsap.utils.toArray<HTMLElement>(".rm-left-title");
      const clientEls = gsap.utils.toArray<HTMLElement>(".rm-client");
      const progressEls = gsap.utils.toArray<HTMLElement>(".rm-progress span");

      gsap.set(sceneEls, {
        yPercent: (index) => index * 100,
      });

      gsap.set(titleEls, {
        yPercent: (index) => index * 100,
      });

      gsap.set(clientEls, {
        yPercent: (index) => index * 100,
      });

      gsap.set(progressEls, { opacity: .22 });
      gsap.set(progressEls[0], { opacity: 1 });

      const master = gsap.timeline({
        scrollTrigger: {
          trigger: ".rm-scroll",
          start: "top top",
          end: `+=${scenes.length * 105}%`,
          pin: ".rm-pin",
          scrub: 1.28,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      scenes.forEach((_, index) => {
        if (index === scenes.length - 1) return;

        const at = index + .02;

        master
          .to(
            sceneEls,
            {
              yPercent: (sceneIndex) => (sceneIndex - index - 1) * 100,
              duration: 1.02,
              ease: "power2.inOut",
            },
            at,
          )
          .to(
            titleEls,
            {
              yPercent: (titleIndex) => (titleIndex - index - 1) * 100,
              duration: 1.02,
              ease: "power2.inOut",
            },
            at,
          )
          .to(
            clientEls,
            {
              yPercent: (clientIndex) => (clientIndex - index - 1) * 100,
              duration: 1.02,
              ease: "power2.inOut",
            },
            at,
          )
          .to(progressEls[index], { opacity: .22, duration: .2 }, at + .55)
          .to(progressEls[index + 1], { opacity: 1, duration: .2 }, at + .55);
      });

      master.to(
        ".rm-see-all",
        {
          yPercent: 0,
          duration: .68,
          ease: "power2.inOut",
        },
        scenes.length - .1,
      );

      gsap.fromTo(
        ".rm-header",
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: .7, ease: "power3.out" },
      );

      gsap.fromTo(
        ".rm-intro-copy",
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: .8, ease: "power3.out", delay: .1 },
      );

      const mediaEls = gsap.utils.toArray<HTMLElement>(".rm-scene__media");

      mediaEls.forEach((media) => {
        const image = media.querySelector<HTMLElement>(".rm-scene__image");
        const lens = media.querySelector<HTMLElement>(".rm-wave");
        if (!image || !lens) return;

        const xTo = gsap.quickTo(image, "xPercent", { duration: .55, ease: "power3.out" });
        const yTo = gsap.quickTo(image, "yPercent", { duration: .55, ease: "power3.out" });
        const sxTo = gsap.quickTo(image, "skewX", { duration: .6, ease: "power3.out" });
        const syTo = gsap.quickTo(image, "skewY", { duration: .6, ease: "power3.out" });

        const onMove = (event: PointerEvent) => {
          const rect = media.getBoundingClientRect();
          const nx = (event.clientX - rect.left) / rect.width - .5;
          const ny = (event.clientY - rect.top) / rect.height - .5;

          xTo(nx * 1.6);
          yTo(ny * 1.25);
          sxTo(nx * .65);
          syTo(ny * -.4);

          gsap.to(lens, {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
            opacity: .5,
            scale: 1,
            duration: .28,
            ease: "power2.out",
            overwrite: true,
          });
        };

        const onLeave = () => {
          xTo(0);
          yTo(0);
          sxTo(0);
          syTo(0);

          gsap.to(lens, {
            opacity: 0,
            scale: .72,
            duration: .38,
            ease: "power2.out",
          });
        };

        media.addEventListener("pointermove", onMove);
        media.addEventListener("pointerleave", onLeave);

        return () => {
          media.removeEventListener("pointermove", onMove);
          media.removeEventListener("pointerleave", onLeave);
        };
      });
    },
    { scope: root },
  );

  return (
    <main ref={root} className="rm-page">
      <section className="rm-intro">
        <header className="rm-header">
          <Link href="/#cases">
            <ArrowLeft size={14} />
            Selected Cases
          </Link>

          <span>SoftBridge Solutions</span>

          <Link href="/" className="rm-home">
            Home
            <b>33</b>
          </Link>
        </header>

        <div className="rm-intro-copy">
          <p>
            Digital products for Europe&apos;s most ambitious companies and boldest
            new ideas.
          </p>
        </div>
      </section>

      <section className="rm-scroll">
        <div className="rm-pin">
          <div className="rm-stage">
            <div className="rm-left">
              <span className="rm-featured">Featured work</span>

              <div className="rm-left-title-window">
                <div className="rm-left-title-track">
                  {scenes.map((scene) => (
                    <h1 className="rm-left-title" key={scene.shortTitle}>
                      {scene.shortTitle}
                    </h1>
                  ))}
                </div>
              </div>

              <div className="rm-client-window">
                <div className="rm-client-track">
                  {scenes.map((scene) => (
                    <div className="rm-client" key={scene.client}>
                      <span>{scene.client}</span>
                      <strong>{study.title}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rm-right">
              <div className="rm-scenes-track">
                {scenes.map((scene) => (
                  <article className="rm-scene" key={scene.title}>
                    <div className="rm-scene__media">
                      <img
                        className="rm-scene__image"
                        src={scene.image}
                        alt={`${scene.title} featured work visual`}
                      />
                      <div className="rm-scene__shade" />
                      <div className="rm-wave" />

                      <div className="rm-scene__labels">
                        <span>{scene.tone}</span>
                        <span>{scene.title}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="rm-progress">
              {scenes.map((scene) => (
                <span key={scene.tone}>{scene.tone}</span>
              ))}
            </div>

            <div className="rm-see-all">
              <Link href="/#cases">
                See all work
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
