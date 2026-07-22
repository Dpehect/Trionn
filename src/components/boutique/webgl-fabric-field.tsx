"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const vertexShader = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const fragmentShader = `
precision highp float;
varying vec2 vUv;
uniform vec2 uResolution;
uniform vec2 uPointer;
uniform float uTime;
uniform float uMotion;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}

void main() {
  vec2 uv = vUv;
  vec2 pointer = uPointer / max(uResolution, vec2(1.0));
  float t = uTime * 0.12 * uMotion;
  float fold = sin((uv.x * 7.0 + noise(uv * 3.0 + t) * 1.8) + t) * 0.5 + 0.5;
  float weave = sin(uv.y * 95.0 + noise(uv * 7.0 - t) * 4.0) * 0.5 + 0.5;
  float distanceToPointer = distance(uv, pointer);
  float pulse = smoothstep(0.58, 0.0, distanceToPointer);
  vec3 paper = vec3(0.93, 0.91, 0.86);
  vec3 ink = vec3(0.055, 0.058, 0.055);
  vec3 signal = vec3(0.875, 1.0, 0.22);
  vec3 clay = vec3(0.91, 0.35, 0.22);
  vec3 color = mix(paper, ink, smoothstep(0.36, 0.88, fold) * 0.88);
  color = mix(color, signal, pulse * 0.72 + weave * 0.045);
  color = mix(color, clay, smoothstep(0.76, 1.0, uv.x + uv.y) * 0.18);
  float vignette = smoothstep(0.92, 0.25, distance(uv, vec2(0.5)));
  color *= 0.78 + vignette * 0.22;
  gl_FragColor = vec4(color, 1.0);
}`;

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function WebGLFabricField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) return;

    const vertex = compileShader(gl, gl.VERTEX_SHADER, vertexShader);
    const fragment = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShader);
    if (!vertex || !fragment) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const resolution = gl.getUniformLocation(program, "uResolution");
    const pointer = gl.getUniformLocation(program, "uPointer");
    const time = gl.getUniformLocation(program, "uTime");
    const motion = gl.getUniformLocation(program, "uMotion");
    const pointerState = { x: 0.68, y: 0.42 };
    let frame = 0;
    let visible = true;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.max(1, Math.floor(canvas.clientWidth * ratio));
      const height = Math.max(1, Math.floor(canvas.clientHeight * ratio));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    const move = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerState.x = (event.clientX - rect.left) / Math.max(rect.width, 1);
      pointerState.y = 1 - (event.clientY - rect.top) / Math.max(rect.height, 1);
    };

    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0.02 });
    observer.observe(canvas);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    canvas.addEventListener("pointermove", move, { passive: true });

    const render = (now: number) => {
      if (visible) {
        resize();
        gl.uniform2f(resolution, canvas.width, canvas.height);
        gl.uniform2f(pointer, pointerState.x * canvas.width, pointerState.y * canvas.height);
        gl.uniform1f(time, now / 1000);
        gl.uniform1f(motion, reduced ? 0 : 1);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
      frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      canvas.removeEventListener("pointermove", move);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      gl.deleteBuffer(buffer);
    };
  }, [reduced]);

  return <canvas className="fabric-webgl" ref={canvasRef} aria-hidden />;
}
