"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Globe, Sparkles } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import type { CaseStudy } from "@/data/cases";
import { caseStudies } from "@/data/cases";
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
<<<<<<< HEAD
>>>>>>> 7ae7a0920e5a5c3e5237cd8093b38674692b11c1
=======
>>>>>>> 7ae7a0920e5a5c3e5237cd8093b38674692b11c1
        </div>
      </section>
    </main>
  );
}
