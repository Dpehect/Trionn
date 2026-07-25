"use client";

import Link from "next/link";
<<<<<<< HEAD
import { ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import type { CaseStudy } from "@/data/cases";
import styles from "./case-study-page.module.css";
=======
import { ArrowLeft, ArrowUpRight, Globe, Sparkles } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import type { CaseStudy } from "@/data/cases";
import { caseStudies } from "@/data/cases";
>>>>>>> 7ae7a0920e5a5c3e5237cd8093b38674692b11c1

const VERTEX_SHADER_SRC = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = (a_position + 1.0) * 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

<<<<<<< HEAD
const featuredItems = [
  { category: "Branding", client: "Vakeso", logo: "https://cdn.prod.website-files.com/6a1865808036c41f27ddd715/6a216554894abd7ab54f31f6_logo-vakeso.png", image: "https://cdn.prod.website-files.com/6a1865808036c41f27ddd715/6a2291003b9fe4985cd42349_vakeso.avif", href: "/projects/vakeso" },
  { category: "Web", client: "SoundCloud", logo: "https://cdn.prod.website-files.com/6a1865808036c41f27ddd715/6a21654ec9611c64ea764636_logo-soundcloud.png", image: "https://cdn.prod.website-files.com/6a1865808036c41f27ddd715/6a2290f9df6c01a0603a8645_soundcloud.avif", href: "/projects/soundcloud-website" },
  { category: "Mobile", client: "Sona", logo: "https://cdn.prod.website-files.com/6a1865808036c41f27ddd715/6a21655bce06dc884f5a1e7a_logo-sona.png", image: "https://cdn.prod.website-files.com/6a1865808036c41f27ddd715/6a2290ac5bcedfea95e9c0f1_sona.avif", href: "/projects/sona-ai" },
  { category: "Motion", client: "Vault Bank", logo: "https://cdn.prod.website-files.com/6a1865808036c41f27ddd715/6a4d047bed23f5e522210f34_logo-vault.png", image: "https://cdn.prod.website-files.com/6a1865808036c41f27ddd715/6a4cfe6149932a0f324d1e58_Vault%20Card%20Cover%20Be%20edit2%20copy.png", href: "/projects/vault" },
] as const;

export function CaseStudyPage({ study: _study }: { study: CaseStudy }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const titles = gsap.utils.toArray<HTMLElement>(`.${styles.featuredTitle}`);
    const clients = gsap.utils.toArray<HTMLElement>(`.${styles.clientItem}`);
    const media = gsap.utils.toArray<HTMLElement>(`.${styles.mediaItem}`);

    gsap.set(titles, { autoAlpha: 0, y: 32 });
    gsap.set(clients, { autoAlpha: 0, x: -32 });
    gsap.set(media, { autoAlpha: .25, scale: 1.05 });
    gsap.set(titles[0], { autoAlpha: 1, y: 0 });
    gsap.set(clients[0], { autoAlpha: 1, x: 0 });
    gsap.set(media[0], { autoAlpha: 1, scale: 1 });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: `.${styles.workSection}`,
        start: "top top",
        end: "+=390%",
        pin: `.${styles.workSticky}`,
        scrub: 1.05,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    featuredItems.forEach((_, index) => {
      if (index === 0) return;
      const previous = index - 1;
      const at = index - .12;
      timeline
        .to(titles[previous], { autoAlpha: 0, y: -32, duration: .36, ease: "power2.inOut" }, at)
        .fromTo(titles[index], { autoAlpha: 0, y: 32 }, { autoAlpha: 1, y: 0, duration: .48, ease: "power3.out" }, at + .2)
        .to(clients[previous], { autoAlpha: 0, x: 32, duration: .34, ease: "power2.inOut" }, at)
        .fromTo(clients[index], { autoAlpha: 0, x: -32 }, { autoAlpha: 1, x: 0, duration: .46, ease: "power3.out" }, at + .18)
        .to(media[previous], { autoAlpha: .25, scale: 1.05, duration: .58, ease: "power2.inOut" }, at)
        .to(media[index], { autoAlpha: 1, scale: 1, duration: .72, ease: "power3.inOut" }, at + .06);
    });

    timeline.fromTo(`.${styles.cta}`, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: .48, ease: "power3.out" }, 3.72);
    gsap.fromTo(`.${styles.introText}`, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: .8, ease: "power3.out" });
  }, { scope: root });

  return (
    <main ref={root} className={styles.page}>
      <section className={styles.workSection}>
        <div className={styles.workSticky}>
          <div className={styles.container}>
            <div className={styles.introGrid}>
              <div className={styles.introText}>We design, build and grow brands and digital products for the world&apos;s biggest companies and boldest new ones</div>
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
=======
const FRAGMENT_SHADER_SRC = `
  precision highp float;
  uniform sampler2D u_image;
  uniform float u_time;
  uniform float u_fluid;
  uniform vec2 u_mouse;
  varying vec2 v_uv;

  void main() {
    vec2 uv = v_uv;
    uv.y = 1.0 - uv.y;

    // Cursor-only fluid wave ripple (active only when cursor moves over image)
    float dist = distance(uv, u_mouse);
    float ripple = smoothstep(0.4, 0.0, dist) * u_fluid * sin(dist * 22.0 - u_time * 4.5);

    vec2 distortedUv = clamp(uv + vec2(ripple * 0.035, ripple * 0.02), 0.0, 1.0);
    vec4 color = texture2D(u_image, distortedUv);

    gl_FragColor = color;
  }
`;

export function CaseStudyPage({ study }: { study: CaseStudy }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const currentIndex = caseStudies.findIndex((c) => c.slug === study.slug);
  const nextStudy = caseStudies[(currentIndex + 1) % caseStudies.length];
  const clientName = study.kicker.split("/")[0].trim();

  // Mouse movement tracking over canvas image
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  // Cursor-only WebGL Fluid Ripple Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl") ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (!gl) return;

    function compileShader(type: number, src: string) {
      const s = gl!.createShader(type);
      if (!s) return null;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      if (!gl!.getShaderParameter(s, gl!.COMPILE_STATUS)) {
        gl!.deleteShader(s);
        return null;
      }
      return s;
    }

    const vs = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER_SRC);
    const fs = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SRC);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const aPosLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(aPosLoc);
    gl.vertexAttribPointer(aPosLoc, 2, gl.FLOAT, false, 0, 0);

    const uTimeLoc = gl.getUniformLocation(program, "u_time");
    const uFluidLoc = gl.getUniformLocation(program, "u_fluid");
    const uMouseLoc = gl.getUniformLocation(program, "u_mouse");
    const uImgLoc = gl.getUniformLocation(program, "u_image");

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    let isLoaded = false;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = study.editorialHero || "/vivid-3d/scene1.jpg";
    img.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      isLoaded = true;
    };

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    let animId: number;
    let startTime = performance.now();
    let fluidVal = 0;

    const render = () => {
      const now = (performance.now() - startTime) * 0.001;
      const targetFluid = isHovered ? 1.0 : 0.0;
      fluidVal += (targetFluid - fluidVal) * 0.08;

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(uTimeLoc, now);
      gl.uniform1f(uFluidLoc, fluidVal);
      gl.uniform2f(uMouseLoc, mousePos.x, mousePos.y);
      gl.uniform1i(uImgLoc, 0);

      if (isLoaded) {
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, [study.editorialHero, isHovered, mousePos]);

  // Mixed typography helper ("AI Software" normal + "Development" italic)
  const renderTitle = (title: string) => {
    const words = title.split(" ");
    if (words.length === 1) {
      const w = words[0];
      const half = Math.ceil(w.length * 0.6);
      return (
        <>
          <span>{w.slice(0, half)}</span>
          <em className="sb-title-italic">{w.slice(half)}</em>
        </>
      );
    }
    const mainPart = words.slice(0, words.length - 1).join(" ");
    const lastWord = words[words.length - 1];
    return (
      <>
        <span>{mainPart}&nbsp;</span>
        <em className="sb-title-italic">{lastWord}</em>
      </>
    );
  };

  return (
    <main className="sb-case-page">
      {/* Header Navigation */}
      <header className="sb-case-header">
        <div className="sb-header-left">
          <Link href="/" className="sb-logo">
            <span className="sb-logo-dot" />
            SoftBridge Solutions<sup>®</sup>
          </Link>
          <span className="sb-geo-tag">
            <Globe size={11} /> Finland &amp; Europe
          </span>
        </div>

        <div className="sb-header-right">
          <Link href="/#cases" className="sb-back-btn">
            <ArrowLeft size={13} /> Selected Cases
          </Link>
          <Link href="/#contact" className="sb-contact-btn">
            Get in touch <ArrowUpRight size={13} />
          </Link>
        </div>
      </header>

      {/* HERO SECTION (Single 50/50 Stage - Exactly like Video) */}
      <section className="sb-hero-stage">
        <div className="sb-hero-grid">
          {/* Left Column */}
          <div className="sb-hero-left">
            <span className="sb-hero-kicker">Featured work</span>
            <h1 className="sb-hero-title">{renderTitle(study.title)}</h1>

            <div className="sb-client-badge">
              <span className="sb-client-dot" />
              <div className="sb-client-info">
                <small>CLIENT</small>
                <strong>{clientName}</strong>
              </div>
            </div>
          </div>

          {/* Right Visual Showcase (Cursor-Only Fluid Wave) */}
          <div className="sb-hero-right">
            <div
              className="sb-media-frame"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onMouseMove={handleMouseMove}
            >
              <canvas ref={canvasRef} className="sb-canvas-gl" />
              <div className="sb-media-overlay" />
              <div className="sb-media-caption">
                <span>SOFTBRIDGE ENGINEERING</span>
                <span>{study.accent}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDY DEEP DIVE SECTION (Natural Scroll Down) */}
      <section className="sb-details-section">
        <div className="sb-details-container">
          <div className="sb-meta-bar">
            <span className="sb-case-tag">CASE STUDY // 0{currentIndex + 1}</span>
            <span className="sb-kicker-tag">{study.kicker}</span>
          </div>

          <h2 className="sb-details-title">{study.title}</h2>
          <p className="sb-details-statement">&ldquo;{study.statement}&rdquo;</p>
          <p className="sb-details-intro">{study.intro}</p>

          {/* Metrics & Highlights */}
          <div className="sb-metrics-flex">
            <div className="sb-metric-card">
              <small>PERFORMANCE METRIC</small>
              <strong>{study.metric}</strong>
              <span>{study.metricLabel}</span>
            </div>

            <div className="sb-accent-card">
              <Sparkles size={16} />
              <div>
                <small>DESIGN ACCENT</small>
                <strong>{study.accent}</strong>
              </div>
            </div>
          </div>

          {/* Sections Breakdown */}
          <div className="sb-sections-grid">
            {study.sections.map(([secTitle, secBody], idx) => (
              <div key={secTitle} className="sb-section-card">
                <div className="sb-sec-num">0{idx + 1}</div>
                <div>
                  <h4>{secTitle}</h4>
                  <p>{secBody}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEXT CASE FOOTER */}
      <section className="sb-next-footer">
        <div className="sb-next-container">
          <span className="sb-next-label">NEXT CASE STUDY</span>
          <h2 className="sb-next-title">{nextStudy.title}</h2>
          <p className="sb-next-kicker">{nextStudy.kicker}</p>
          <Link href={`/cases/${nextStudy.slug}`} className="sb-next-btn">
            Explore Next Case <ArrowUpRight size={16} />
          </Link>
>>>>>>> 7ae7a0920e5a5c3e5237cd8093b38674692b11c1
        </div>
      </section>
    </main>
  );
}
