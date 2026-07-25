"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { CaseStudy } from "@/data/cases";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SCENES = [
  {
    kicker: "Featured work",
    titleMain: "Brand",
    titleItalic: "ing",
    clientName: "Vakeso",
    image: "/vivid-3d/scene1.jpg",
  },
  {
    kicker: "Featured work",
    titleMain: "We",
    titleItalic: "b",
    clientName: "SoundCloud",
    image: "/vivid-3d/scene2.jpg",
  },
  {
    kicker: "Featured work",
    titleMain: "Mobi",
    titleItalic: "le",
    clientName: "Sona",
    image: "/vivid-3d/scene3.jpg",
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
  uniform float u_time;
  uniform float u_hover;
  uniform vec2 u_mouse;
  varying vec2 v_uv;

  void main() {
    vec2 uv = v_uv;
    uv.y = 1.0 - uv.y;

    // Hover-ONLY Fluid ripple effect (only active when hovering)
    float dist = distance(uv, u_mouse);
    float hoverRipple = smoothstep(0.45, 0.0, dist) * u_hover * 0.035 * sin(dist * 20.0 - u_time * 4.0);

    // Scroll Transition Glitch (active only during transition progress)
    float glitch = sin(uv.x * 25.0 + u_time * 8.0) * sin(u_progress * 3.14159) * 0.04;

    vec2 uv1 = uv + vec2(hoverRipple + glitch, glitch * 0.5);
    vec2 uv2 = uv + vec2(hoverRipple * 0.6 - glitch, -glitch * 0.5);

    // RGB Split / Chromatic Aberration during transition & hover
    float splitAmt = 0.012 * sin(u_progress * 3.14159) + (u_hover * 0.004);

    float r0 = texture2D(u_tex0, uv1 + vec2(splitAmt, 0.0)).r;
    float g0 = texture2D(u_tex0, uv1).g;
    float b0 = texture2D(u_tex0, uv1 - vec2(splitAmt, 0.0)).b;
    vec4 col0 = vec4(r0, g0, b0, 1.0);

    float r1 = texture2D(u_tex1, uv2 + vec2(splitAmt, 0.0)).r;
    float g1 = texture2D(u_tex1, uv2).g;
    float b1 = texture2D(u_tex1, uv2 - vec2(splitAmt, 0.0)).b;
    vec4 col1 = vec4(r1, g1, b1, 1.0);

    vec4 finalCol = mix(col0, col1, u_progress);

    // Holographic edge vignette
    float edgeDist = length(uv - vec2(0.5));
    finalCol.rgb *= smoothstep(0.9, 0.2, edgeDist);

    gl_FragColor = finalCol;
  }
`;

export function CaseStudyPage({ study }: { study: CaseStudy }) {
  const rootRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeIdx, setActiveIdx] = useState(0);
  const [nextIdx, setNextIdx] = useState(1);
  const [transitionProgress, setTransitionProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  // GSAP ScrollTrigger pinning & scroll-driven sync
  useGSAP(
    () => {
      const container = document.querySelector<HTMLElement>(".vivid-scroll-stage");
      if (!container) return;

      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 0.8,
        onUpdate: (self) => {
          const rawProgress = self.progress * (SCENES.length - 1);
          const currentStage = Math.min(
            Math.floor(rawProgress),
            SCENES.length - 1
          );
          const stageSubProgress = rawProgress - currentStage;

          setActiveIdx(currentStage);
          setNextIdx(Math.min(currentStage + 1, SCENES.length - 1));
          setTransitionProgress(stageSubProgress);
        },
      });
    },
    { scope: rootRef }
  );

  // Mouse movement tracking over canvas frame
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  // WebGL Shader Renderer
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
    const uMouseLoc = gl.getUniformLocation(program, "u_mouse");
    const uTex0Loc = gl.getUniformLocation(program, "u_tex0");
    const uTex1Loc = gl.getUniformLocation(program, "u_tex1");

    // Load textures
    const textures: WebGLTexture[] = [];
    SCENES.forEach((sc) => {
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
    let currHover = 0;

    const render = () => {
      const now = (performance.now() - startTime) * 0.001;
      const targetHover = isHovered ? 1.0 : 0.0;
      currHover += (targetHover - currHover) * 0.08;

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(uTimeLoc, now);
      gl.uniform1f(uProgressLoc, transitionProgress);
      gl.uniform1f(uHoverLoc, currHover);
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
  }, [activeIdx, nextIdx, transitionProgress, isHovered, mousePos]);

  const activeScene = SCENES[activeIdx];

  return (
    <main ref={rootRef} className="vivid-scroll-page">
      {/* Film Grain Texture */}
      <div className="vivid-scroll-grain" />

      {/* STICKY FEATURED WORK SECTION */}
      <section className="vivid-scroll-stage">
        {/* Navigation Header */}
        <header className="vivid-scroll-nav">
          <Link href="/" className="vivid-scroll-logo">
            Vivid Motion<sup>®</sup>
          </Link>
          <Link href="/" className="vivid-scroll-home-btn">
            HOME ::
          </Link>
        </header>

        {/* 50/50 Split Content */}
        <div className="vivid-scroll-split">
          {/* LEFT SIDE: STICKY PANEL */}
          <div className="vivid-scroll-left">
            {/* Top Small Gray Text */}
            <span className="vivid-scroll-kicker">{activeScene.kicker}</span>

            {/* Center Large White Serif Typography */}
            <h1 className="vivid-scroll-title">
              {activeScene.titleMain}
              <em className="vivid-scroll-em">{activeScene.titleItalic}</em>
            </h1>

            {/* Bottom Left Client Logo + Name (Vakeso → SoundCloud → Sona) */}
            <div className="vivid-scroll-client-card">
              <div className="vivid-scroll-client-mark">
                <span className="vivid-scroll-shape" />
              </div>
              <div className="vivid-scroll-client-info">
                <small>CLIENT</small>
                <strong>{activeScene.clientName}</strong>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: CINEMATIC 3D HERO VISUALS (HOVER-ONLY FLUID RIPPLE) */}
          <div className="vivid-scroll-right">
            <div
              className="vivid-scroll-frame"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onMouseMove={handleMouseMove}
            >
              <canvas ref={canvasRef} className="vivid-scroll-canvas" />

              <div className="vivid-scroll-badge">
                <span>SCENE 0{activeIdx + 1} // AWWWARDS SELECTION</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Follow-up content section */}
      <section className="vivid-scroll-below">
        <div className="vivid-scroll-below-inner">
          <h2>Crafted for High-Impact Brands</h2>
          <p>{study.intro}</p>
        </div>
      </section>
    </main>
  );
}
