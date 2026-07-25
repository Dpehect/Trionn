"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import type { CaseStudy } from "@/data/cases";

const SCENARIO_IMAGES = [
  "/vivid-3d/scene1.jpg",
  "/vivid-3d/scene2.jpg",
  "/vivid-3d/scene3.jpg",
];

const SCENARIO_LABELS = [
  { kicker: "Featured work", title: "Branding", sub: "Vakeso" },
  { kicker: "Featured work", title: "Web", sub: "SoundCloud Worldwide" },
  { kicker: "Featured work", title: "Mobile", sub: "AI Avatar Studio" },
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
  uniform sampler2D u_currentImage;
  uniform sampler2D u_nextImage;
  uniform float u_progress;
  uniform float u_time;
  uniform float u_hover;
  varying vec2 v_uv;

  void main() {
    vec2 uv = v_uv;
    uv.y = 1.0 - uv.y;

    // Prismatic chromatic aberration & liquid wave
    float wave = sin(uv.y * 14.0 + u_time * 2.5) * (0.015 + u_hover * 0.025);
    float glitch = sin(uv.x * 30.0 + u_time * 8.0) * u_progress * 0.03;

    vec2 p1 = uv + vec2(wave + glitch, 0.0);
    vec2 p2 = uv + vec2(wave * 0.5, glitch);

    // RGB Split / Chromatic Aberration
    float r = texture2D(u_currentImage, p1 + vec2(0.008 * u_progress, 0.0)).r;
    float g = texture2D(u_currentImage, p1).g;
    float b = texture2D(u_currentImage, p1 - vec2(0.008 * u_progress, 0.0)).b;
    vec4 currentCol = vec4(r, g, b, 1.0);

    float rNext = texture2D(u_nextImage, p2 + vec2(0.008 * (1.0 - u_progress), 0.0)).r;
    float gNext = texture2D(u_nextImage, p2).g;
    float bNext = texture2D(u_nextImage, p2 - vec2(0.008 * (1.0 - u_progress), 0.0)).b;
    vec4 nextCol = vec4(rNext, gNext, bNext, 1.0);

    vec4 finalColor = mix(currentCol, nextCol, u_progress);

    // Holographic rainbow edge vignette
    float dist = length(uv - vec2(0.5));
    finalColor.rgb *= smoothstep(0.88, 0.2, dist);

    gl_FragColor = finalColor;
  }
`;

export function CaseStudyPage({ study }: { study: CaseStudy }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeScene, setActiveScene] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  // Auto sequence camera movement cycle
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveScene((prev) => (prev + 1) % SCENARIO_IMAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // WebGL Holographic Glitch & Liquid Transition Engine
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
    const uHoverLoc = gl.getUniformLocation(program, "u_hover");
    const uCurrLoc = gl.getUniformLocation(program, "u_currentImage");
    const uNextLoc = gl.getUniformLocation(program, "u_nextImage");

    // Load All 3D CGI Textures
    const textures: WebGLTexture[] = [];
    SCENARIO_IMAGES.forEach((src, idx) => {
      const tex = gl.createTexture()!;
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = src;
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
    let currProg = 0;

    const render = () => {
      const now = (performance.now() - startTime) * 0.001;

      // Smooth progress animation on scene change
      currProg += (0 - currProg) * 0.05;

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(uTimeLoc, now);
      gl.uniform1f(uProgressLoc, currProg);
      gl.uniform1f(uHoverLoc, isHovered ? 1.0 : 0.0);

      const currTex = textures[activeScene] || textures[0];
      const nextTex = textures[(activeScene + 1) % textures.length] || textures[0];

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, currTex);
      gl.uniform1i(uCurrLoc, 0);

      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, nextTex);
      gl.uniform1i(uNextLoc, 1);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, [activeScene, isHovered]);

  const sceneInfo = SCENARIO_LABELS[activeScene];

  return (
    <main className="vivid-3d-stage">
      {/* Film Grain & Chromatic Light Leaks Overlay */}
      <div className="vivid-dust-grain" />

      {/* TOP NAV HEADER */}
      <header className="vivid-3d-nav">
        <Link href="/" className="vivid-3d-brand">
          Vivid Motion<sup>®</sup>
        </Link>
        <Link href="/" className="vivid-3d-home-btn">
          HOME ::
        </Link>
      </header>

      {/* 50/50 SPLIT STAGE */}
      <div className="vivid-3d-split">
        {/* LEFT COLUMN: Serif Typography & Interactive Client Logos */}
        <div className="vivid-3d-left">
          <span className="vivid-3d-kicker">{sceneInfo.kicker}</span>

          <h1 className="vivid-3d-title">
            {sceneInfo.title === "Branding" ? (
              <>
                Brand<em className="vivid-3d-em">ing</em>
              </>
            ) : sceneInfo.title === "Web" ? (
              <>
                We<em className="vivid-3d-em">b</em>
              </>
            ) : (
              <>
                Mobi<em className="vivid-3d-em">le</em>
              </>
            )}
          </h1>

          {/* Bottom Client Logos Sequence Controls */}
          <div className="vivid-3d-clients">
            {SCENARIO_LABELS.map((item, idx) => (
              <button
                key={item.sub}
                className={`vivid-3d-client-pill ${activeScene === idx ? "is-active" : ""}`}
                onClick={() => setActiveScene(idx)}
              >
                <span className="vivid-3d-client-mark" />
                <div className="vivid-3d-client-text">
                  <small>CLIENT</small>
                  <strong>{item.sub}</strong>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: 3D CGI Commercial Render Canvas with Holographic Rays */}
        <div className="vivid-3d-right">
          <div
            className="vivid-3d-frame"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Real-time WebGL Fragment Shader Canvas */}
            <canvas ref={canvasRef} className="vivid-3d-canvas" />

            {/* Cinematic Camera Orbit Badge */}
            <div className="vivid-3d-badge">
              <span>OCTANE RENDER 8K // SCENE 0{activeScene + 1}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
