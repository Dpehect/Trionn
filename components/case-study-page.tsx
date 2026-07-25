"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { CaseStudy } from "@/data/cases";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STAGES = [
  {
    kicker: "Featured work",
    title: "Branding",
    clientName: "Vakeso",
    clientColor: "#f0642f",
    sceneText: "SCENE 01 // AWWARDS SELECTION",
    image: "/vivid-3d/scene1.jpg",
  },
  {
    kicker: "Featured work",
    title: "Web",
    clientName: "SoundCloud",
    clientColor: "#ff5500",
    sceneText: "SCENE 02 // AWWARDS SELECTION",
    image: "/vivid-3d/scene2.jpg",
  },
];

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
  uniform sampler2D u_tex0;
  uniform sampler2D u_tex1;
  uniform float u_progress;
  uniform float u_reveal;
  uniform float u_time;
  uniform vec2 u_mouse;
  varying vec2 v_uv;

  void main() {
    vec2 uv = v_uv;
    uv.y = 1.0 - uv.y;

    // Liquid glitch reveal wave
    float wave = sin(uv.y * 18.0 + u_time * 3.0) * (1.0 - u_reveal) * 0.08;
    float glitch = sin(uv.x * 35.0 + u_time * 7.0) * sin(u_progress * 3.14159) * 0.05;

    // Mouse interaction distortion
    float dist = distance(uv, u_mouse);
    float hoverDisplace = smoothstep(0.4, 0.0, dist) * 0.02 * sin(dist * 25.0 - u_time * 5.0);

    vec2 uv1 = uv + vec2(wave + glitch + hoverDisplace, glitch * 0.5);
    vec2 uv2 = uv + vec2(wave * 0.5 - glitch + hoverDisplace, -glitch * 0.5);

    // RGB Split / Chromatic Aberration
    float splitAmt = 0.015 * (1.0 - u_reveal) + 0.012 * sin(u_progress * 3.14159);

    float r0 = texture2D(u_tex0, uv1 + vec2(splitAmt, 0.0)).r;
    float g0 = texture2D(u_tex0, uv1).g;
    float b0 = texture2D(u_tex0, uv1 - vec2(splitAmt, 0.0)).b;
    vec4 col0 = vec4(r0, g0, b0, 1.0);

    float r1 = texture2D(u_tex1, uv2 + vec2(splitAmt, 0.0)).r;
    float g1 = texture2D(u_tex1, uv2).g;
    float b1 = texture2D(u_tex1, uv2 - vec2(splitAmt, 0.0)).b;
    vec4 col1 = vec4(r1, g1, b1, 1.0);

    vec4 mixedCol = mix(col0, col1, u_progress);

    // Smooth reveal from completely black container (0.0 -> 1.0)
    vec4 blackBg = vec4(0.01, 0.01, 0.01, 1.0);
    vec4 finalColor = mix(blackBg, mixedCol, u_reveal);

    // Vignette
    float edgeDist = length(uv - vec2(0.5));
    finalColor.rgb *= smoothstep(0.9, 0.25, edgeDist);

    gl_FragColor = finalColor;
  }
`;

export function CaseStudyPage({ study }: { study: CaseStudy }) {
  const rootRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeIdx, setActiveIdx] = useState(0);
  const [nextIdx, setNextIdx] = useState(1);
  const [stageProgress, setStageProgress] = useState(0);
  const [revealProgress, setRevealProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  // GSAP ScrollTrigger pinning & scroll sync
  useGSAP(
    () => {
      const container = document.querySelector<HTMLElement>(".dark-stage-container");
      if (!container) return;

      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "+=250%",
        pin: true,
        scrub: 0.8,
        onUpdate: (self) => {
          // Reveal container from black initially as user scrolls into stage
          const reveal = Math.min(1.0, self.progress * 4.0);
          setRevealProgress(reveal);

          // Transition between Stage 0 (Branding / Vakeso) and Stage 1 (Web / SoundCloud)
          if (self.progress > 0.4) {
            setActiveIdx(1);
            setNextIdx(1);
            setStageProgress(Math.min(1.0, (self.progress - 0.4) * 2.5));
          } else {
            setActiveIdx(0);
            setNextIdx(1);
            setStageProgress(self.progress * 2.5);
          }
        },
      });
    },
    { scope: rootRef }
  );

  // Mouse move handler for container interaction
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
    setRevealProgress(1.0); // Immediately reveal on hover interaction
  };

  // WebGL Holographic Liquid Shader Setup
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
    const uProgressLoc = gl.getUniformLocation(program, "u_progress");
    const uRevealLoc = gl.getUniformLocation(program, "u_reveal");
    const uMouseLoc = gl.getUniformLocation(program, "u_mouse");
    const uTex0Loc = gl.getUniformLocation(program, "u_tex0");
    const uTex1Loc = gl.getUniformLocation(program, "u_tex1");

    // Load textures
    const textures: WebGLTexture[] = [];
    STAGES.forEach((sc) => {
      const tex = gl.createTexture()!;
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = sc.image;
      img.onload = () => {
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      };
      textures.push(tex);
    });

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

    const render = () => {
      const now = (performance.now() - startTime) * 0.001;

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(uTimeLoc, now);
      gl.uniform1f(uProgressLoc, stageProgress);
      gl.uniform1f(uRevealLoc, revealProgress);
      gl.uniform2f(uMouseLoc, mousePos.x, mousePos.y);

      const t0 = textures[activeIdx] || textures[0];
      const t1 = textures[nextIdx] || textures[0];

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, t0);
      gl.uniform1i(uTex0Loc, 0);

      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, t1);
      gl.uniform1i(uTex1Loc, 1);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, [activeIdx, nextIdx, stageProgress, revealProgress, mousePos]);

  const activeStage = STAGES[activeIdx];

  return (
    <main ref={rootRef} className="dark-portfolio-page">
      {/* STICKY CONTAINER STAGE */}
      <section className="dark-stage-container">
        {/* Navigation Header */}
        <header className="dark-stage-nav">
          <Link href="/" className="dark-nav-brand">
            Vivid Motion<sup>®</sup>
          </Link>
          <Link href="/" className="dark-nav-home">
            HOME ::
          </Link>
        </header>

        {/* 50/50 Split Stage Layout */}
        <div className="dark-split-layout">
          {/* LEFT SIDE STICKY PANEL */}
          <div className="dark-panel-left">
            {/* 1. Small gray text "Featured work" */}
            <span className="dark-kicker-text">{activeStage.kicker}</span>

            {/* 2. Large elegant white serif title ("Branding" -> "Web") */}
            <h1 className="dark-serif-title">
              {activeStage.title === "Branding" ? (
                <>
                  Brand<em className="dark-em">ing</em>
                </>
              ) : (
                <>
                  We<em className="dark-em">b</em>
                </>
              )}
            </h1>

            {/* 3. Rounded client badge at bottom left ("Vakeso" -> "SoundCloud") */}
            <div className="dark-client-badge">
              <div
                className="dark-badge-icon"
                style={{ backgroundColor: activeStage.clientColor }}
              >
                <span className="dark-icon-shape" />
              </div>
              <div className="dark-badge-meta">
                <small>CLIENT</small>
                <strong>{activeStage.clientName}</strong>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: CONTAINER WITH SOFT BORDER (INITIALLY BLACK) */}
          <div className="dark-panel-right">
            <div
              className="dark-hero-container-box"
              onMouseEnter={() => setRevealProgress(1.0)}
              onMouseLeave={() => setRevealProgress(0.0)}
              onMouseMove={handleMouseMove}
            >
              {/* WebGL Canvas for 3D Holographic Image Reveal */}
              <canvas ref={canvasRef} className="dark-webgl-canvas" />

              {/* Bottom Right Text ("SCENE 01 // AWWARDS SELECTION" -> "SCENE 02") */}
              <div className="dark-scene-badge">
                <span>{activeStage.sceneText}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Continuation Section */}
      <section className="dark-below-section">
        <div className="dark-below-container">
          <h2>Crafted for High-Impact Brands</h2>
          <p>{study.intro}</p>
        </div>
      </section>
    </main>
  );
}
