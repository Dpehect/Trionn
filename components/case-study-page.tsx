"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ArrowDown, Activity, ShieldCheck, Zap, Cpu, Sparkles, Terminal, Code2, Layers } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect, useState } from "react";
import type { CaseStudy } from "@/data/cases";
import { caseStudies } from "@/data/cases";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const VS_SOURCE = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FS_SOURCE = `
  precision highp float;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_time;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y;

    vec2 mouse = u_mouse / u_resolution;
    mouse.x *= u_resolution.x / u_resolution.y;

    float dist = distance(st, mouse);
    float mouseWave = smoothstep(0.4, 0.0, dist) * 0.28;

    float n1 = snoise(st * 2.5 + vec2(u_time * 0.08, u_time * 0.05));
    float n2 = snoise(st * 5.0 - vec2(u_time * 0.12));

    vec3 colorBg = vec3(0.025, 0.028, 0.032);
    vec3 colorOrange = vec3(0.94, 0.37, 0.18) * 0.16;
    vec3 colorBlue = vec3(0.22, 0.45, 0.85) * 0.12;

    vec3 color = mix(colorBg, colorOrange, n1 + mouseWave);
    color = mix(color, colorBlue, n2 * 0.4);

    gl_FragColor = vec4(color, 1.0);
  }
`;

export function CaseStudyPage({ study }: { study: CaseStudy }) {
  const root = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  // Next study in cycle
  const currentIndex = caseStudies.findIndex((c) => c.slug === study.slug);
  const nextStudy = caseStudies[(currentIndex + 1) % caseStudies.length];

  // WebGL GLSL Liquid Canvas Implementation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl") || (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (!gl) return;

    function createShader(glCtx: WebGLRenderingContext, type: number, source: string) {
      const shader = glCtx.createShader(type);
      if (!shader) return null;
      glCtx.shaderSource(shader, source);
      glCtx.compileShader(shader);
      if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        glCtx.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertShader = createShader(gl, gl.VERTEX_SHADER, VS_SOURCE);
    const fragShader = createShader(gl, gl.FRAGMENT_SHADER, FS_SOURCE);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const resLoc = gl.getUniformLocation(program, "u_resolution");
    const mouseLoc = gl.getUniformLocation(program, "u_mouse");
    const timeLoc = gl.getUniformLocation(program, "u_time");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currMouseX = mouseX;
    let currMouseY = mouseY;

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = window.innerHeight - e.clientY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    handleResize();

    let animId: number;
    let startTime = performance.now();

    const render = () => {
      currMouseX += (mouseX - currMouseX) * 0.05;
      currMouseY += (mouseY - currMouseY) * 0.05;

      const time = (performance.now() - startTime) * 0.001;

      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform2f(mouseLoc, currMouseX, currMouseY);
      gl.uniform1f(timeLoc, time);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Custom Cursor Spring Movement
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.25, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.25, ease: "power3.out" });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  // GSAP Animations & Storyboard ScrollTrigger
  useGSAP(
    () => {
      // Split Title reveal
      gsap.fromTo(
        ".aw-title-word",
        { yPercent: 110, rotate: 3, opacity: 0 },
        {
          yPercent: 0,
          rotate: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.08,
          ease: "power4.out",
        }
      );

      // Hero image parallax & scale
      gsap.fromTo(
        ".aw-hero-img-inner",
        { scale: 1.15 },
        {
          scale: 1,
          duration: 1.6,
          ease: "power3.out",
        }
      );

      gsap.to(".aw-hero-img-inner", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: ".aw-hero-media-wrapper",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Storyboard scene progress & active step updates
      const scenes = gsap.utils.toArray<HTMLElement>(".aw-story-scene");
      scenes.forEach((scene, i) => {
        ScrollTrigger.create({
          trigger: scene,
          start: "top 60%",
          end: "bottom 60%",
          onEnter: () => setActiveStep(i),
          onEnterBack: () => setActiveStep(i),
        });

        const img = scene.querySelector(".aw-story-img");
        if (img) {
          gsap.fromTo(
            img,
            { clipPath: "inset(12% 0 12% 0)", scale: 1.1 },
            {
              clipPath: "inset(0% 0 0% 0)",
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: scene,
                start: "top 80%",
                end: "top 20%",
                scrub: 1,
              },
            }
          );
        }
      });
    },
    { scope: root }
  );

  return (
    <main ref={root} className="aw-case-root">
      {/* Custom Spring Cursor */}
      <div ref={cursorRef} className="aw-cursor-ring" />

      {/* WebGL Real-time GLSL Fluid Canvas */}
      <canvas ref={canvasRef} className="aw-gl-canvas" />

      {/* Organic Noise Grain Overlay */}
      <div className="aw-film-noise" />

      {/* Header Navigation */}
      <nav className="aw-top-nav">
        <Link href="/" className="aw-brand-link">
          <span className="aw-brand-title">SOFTBRIDGE</span>
          <span className="aw-brand-sub">HELSINKI // EST. 2026</span>
        </Link>

        <div className="aw-nav-badge">
          <span className="aw-live-dot" />
          <span>EU NODE // {study.kicker}</span>
        </div>

        <div className="aw-nav-actions">
          <Link href="/#cases" className="aw-nav-btn">
            <ArrowLeft size={13} /> INDEX
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="aw-hero-container">
        <div className="aw-hero-header">
          <div className="aw-hero-meta-bar">
            <span className="aw-case-num">CASE STUDY N°0{currentIndex + 1}</span>
            <span className="aw-case-region">NORDICS &amp; EUROPE</span>
          </div>

          <h1 className="aw-main-title">
            {study.title.split(" ").map((word, idx) => (
              <span key={idx} className="aw-title-word-wrap">
                <span className="aw-title-word">{word}&nbsp;</span>
              </span>
            ))}
          </h1>

          <div className="aw-hero-grid">
            <div className="aw-statement-box">
              <p>&ldquo;{study.statement}&rdquo;</p>
            </div>
            <div className="aw-intro-box">
              <p>{study.intro}</p>
              <div className="aw-metric-pill">
                <strong>{study.metric}</strong>
                <span>{study.metricLabel}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Full Media Display */}
        <div className="aw-hero-media-wrapper">
          <div className="aw-hero-img-holder">
            <img
              src={study.editorialHero}
              alt={study.title}
              className="aw-hero-img-inner"
            />
            <div className="aw-hero-shade" />
          </div>
          <div className="aw-hero-bar">
            <span>SOFTBRIDGE DESIGN SYSTEM // 2026</span>
            <span>ACCENT: {study.accent}</span>
          </div>
        </div>
      </header>

      {/* Pinned Dual-Column Storyboard Section */}
      <section className="aw-storyboard">
        <div className="aw-storyboard-sticky">
          <div className="aw-sticky-nav">
            <span className="aw-sticky-title">PROJECT PHASES</span>
            <div className="aw-phase-list">
              {study.sections.map(([title], i) => (
                <div
                  key={title}
                  className={`aw-phase-item ${activeStep === i ? "is-active" : ""}`}
                >
                  <span className="aw-phase-num">0{i + 1}</span>
                  <span className="aw-phase-name">{title}</span>
                </div>
              ))}
            </div>

            <div className="aw-sticky-tags">
              <span className="aw-tags-label">TAGS &amp; DOMAIN</span>
              <div className="aw-tags-flex">
                {study.tags.map((t) => (
                  <span key={t} className="aw-tag-chip">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="aw-storyboard-flow">
          {study.sections.map(([title, body], i) => (
            <article key={title} className="aw-story-scene">
              <div className="aw-scene-media">
                <img
                  src={study.visuals[i] || study.editorialHero}
                  alt={title}
                  className="aw-story-img"
                />
                <span className="aw-scene-tag">PHASE 0{i + 1} // {title}</span>
              </div>

              <div className="aw-scene-copy">
                <h2>{title}</h2>
                <p>{body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Interactive Live Architecture Simulator Widget */}
      <section className="aw-simulator-section">
        <div className="aw-sim-card">
          <div className="aw-sim-header">
            <div className="aw-sim-dots">
              <span />
              <span />
              <span />
            </div>
            <span className="aw-sim-title">SOFTBRIDGE ORCHESTRATION PIPELINE</span>
            <span className="aw-sim-status"><Activity size={12} /> LIVE NODE ACTIVE</span>
          </div>

          <div className="aw-sim-body">
            <div className="aw-sim-nodes">
              {study.tags.map((tag, idx) => (
                <div key={tag} className="aw-sim-node">
                  <div className="aw-sim-icon">
                    {idx === 0 ? <Cpu size={16} /> : idx === 1 ? <Zap size={16} /> : <ShieldCheck size={16} />}
                  </div>
                  <div>
                    <strong>{tag}</strong>
                    <small>HEALTH // 100% OPERATIONAL</small>
                  </div>
                </div>
              ))}
            </div>

            <div className="aw-sim-stats">
              <div className="aw-stat">
                <small>SYSTEM METRIC</small>
                <strong>{study.metric}</strong>
                <span>{study.metricLabel}</span>
              </div>
              <div className="aw-stat">
                <small>LATENCY TARGET</small>
                <strong>&lt; 24ms</strong>
                <span>NORDIC EDGE DELIVERY</span>
              </div>
              <div className="aw-stat">
                <small>EU COMPLIANCE</small>
                <strong>GDPR / ISO</strong>
                <span>FULL DATA SOVEREIGNTY</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="aw-marquee-strip">
        <div className="aw-marquee-track">
          <span>SOFTBRIDGE SOLUTIONS // {study.title} // {study.accent} // NORDIC ENGINEERING NODE // </span>
          <span>SOFTBRIDGE SOLUTIONS // {study.title} // {study.accent} // NORDIC ENGINEERING NODE // </span>
        </div>
      </section>

      {/* Next Project Footer */}
      <section className="aw-next-project">
        <img
          src={nextStudy.editorialHero}
          alt={nextStudy.title}
          className="aw-next-img"
        />
        <div className="aw-next-veil" />
        <div className="aw-next-inner">
          <span className="aw-next-label">CONTINUE EXPLORING</span>
          <h2 className="aw-next-heading">{nextStudy.title}</h2>
          <p className="aw-next-kicker-text">{nextStudy.kicker}</p>
          <Link href={`/cases/${nextStudy.slug}`} className="aw-next-link-btn">
            EXPLORE NEXT CASE <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
