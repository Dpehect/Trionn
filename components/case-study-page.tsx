"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import type { CaseStudy } from "@/data/cases";

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
  uniform float u_hover;
  uniform vec2 u_resolution;
  varying vec2 v_uv;

  void main() {
    vec2 uv = v_uv;
    uv.y = 1.0 - uv.y;

    float frequency = 12.0;
    float speed = 2.4;
    float amp = 0.012 + u_hover * 0.026;

    float wave1 = sin(uv.y * frequency + u_time * speed) * amp;
    float wave2 = cos(uv.x * (frequency * 0.85) - u_time * (speed * 0.8)) * (amp * 0.6);

    vec2 distortedUv = clamp(uv + vec2(wave1 + wave2, wave2 - wave1), 0.0, 1.0);
    vec4 color = texture2D(u_image, distortedUv);

    // Vignette
    float dist = length(uv - vec2(0.5));
    color.rgb *= smoothstep(0.85, 0.25, dist);

    gl_FragColor = color;
  }
`;

export function CaseStudyPage({ study }: { study: CaseStudy }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // WebGL Fragment Shader Liquid Wave Distortion
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl") ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    if (!gl) return;

    function compileShader(type: number, src: string) {
      const shader = gl!.createShader(type);
      if (!shader) return null;
      gl!.shaderSource(shader, src);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        gl!.deleteShader(shader);
        return null;
      }
      return shader;
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
    const uHoverLoc = gl.getUniformLocation(program, "u_hover");
    const uResLoc = gl.getUniformLocation(program, "u_resolution");
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
    img.src = study.editorialHero;
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
    let hoverVal = 0;

    const render = () => {
      const now = (performance.now() - startTime) * 0.001;
      const targetHover = isHovered ? 1.0 : 0.0;
      hoverVal += (targetHover - hoverVal) * 0.08;

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(uTimeLoc, now);
      gl.uniform1f(uHoverLoc, hoverVal);
      gl.uniform2f(uResLoc, canvas.width, canvas.height);
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
  }, [study.editorialHero, isHovered]);

  // Mixed typography helper ("Brand" normal serif, "ing" italic serif)
  const renderTitle = (title: string) => {
    const words = title.split(" ");
    if (words.length === 1) {
      const w = words[0];
      const half = Math.ceil(w.length * 0.6);
      return (
        <>
          <span>{w.slice(0, half)}</span>
          <em className="vivid-italic">{w.slice(half)}</em>
        </>
      );
    }
    const mainPart = words.slice(0, words.length - 1).join(" ");
    const lastWord = words[words.length - 1];
    return (
      <>
        <span>{mainPart}&nbsp;</span>
        <em className="vivid-italic">{lastWord}</em>
      </>
    );
  };

  const clientName = study.kicker.split("/")[0].trim();

  return (
    <main className="vivid-stage">
      {/* 1. TOP NAV: Minimalist Agency Logo & Home Pill */}
      <header className="vivid-nav">
        <Link href="/" className="vivid-brand">
          SoftBridge Solutions<sup>®</sup>
        </Link>
        <Link href="/" className="vivid-home-btn">
          HOME ::
        </Link>
      </header>

      {/* 50/50 SPLIT STAGE */}
      <div className="vivid-hero-split">
        {/* LEFT COLUMN: Typography & Credits */}
        <div className="vivid-hero-left">
          <span className="vivid-kicker">Featured work</span>

          <h1 className="vivid-hero-title">{renderTitle(study.title)}</h1>

          {/* Bottom Left Fixed Client Card (CLIENT / Vakeso) */}
          <div className="vivid-client-card">
            <div className="vivid-client-icon">
              <span className="vivid-icon-shape" />
            </div>
            <div className="vivid-client-meta">
              <span className="vivid-client-label">CLIENT</span>
              <strong className="vivid-client-name">{clientName}</strong>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: WebGL Fluid Distortion Canvas & Brand Center Overlay */}
        <div className="vivid-hero-right">
          <div
            className="vivid-image-frame"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* 2. WebGL Fluid Shader Canvas */}
            <canvas ref={canvasRef} className="vivid-gl-canvas" />

            {/* 3. BRAND CENTER OVERLAY: Iconic Logo & Name (Vakeso) */}
            <div className="vivid-center-brand">
              <div className="vivid-center-logo-mark">
                <span className="vivid-logo-block-1" />
                <span className="vivid-logo-block-2" />
              </div>
              <span className="vivid-center-brand-name">{clientName}</span>
            </div>

            {/* Accent Badge */}
            <div className="vivid-accent-badge">
              <span>{study.accent}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
