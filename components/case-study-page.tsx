"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import type { CaseStudy } from "@/data/cases";

export function CaseStudyPage({ study }: { study: CaseStudy }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // WebGL / Canvas Liquid Wave Distortion Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = study.editorialHero;

    let animId: number;
    let time = 0;
    let amplitude = 4;
    let targetAmplitude = 4;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 520);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    let imgLoaded = false;
    img.onload = () => {
      imgLoaded = true;
    };

    const render = () => {
      time += 0.035;
      targetAmplitude = isHovered ? 14 : 4;
      amplitude += (targetAmplitude - amplitude) * 0.08;

      ctx.clearRect(0, 0, width, height);

      if (imgLoaded) {
        const sliceH = 2;
        for (let y = 0; y < height; y += sliceH) {
          const waveX = Math.sin(y * 0.02 + time) * amplitude;
          const waveX2 = Math.cos(y * 0.045 - time * 0.8) * (amplitude * 0.45);
          const totalX = waveX + waveX2;

          ctx.drawImage(
            img,
            0,
            (y / height) * img.height,
            img.width,
            (sliceH / height) * img.height,
            totalX,
            y,
            width,
            sliceH
          );
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, [study.editorialHero, isHovered]);

  return (
    <main className="fc-stage">
      {/* Navigation Header */}
      <header className="fc-nav">
        <Link href="/" className="fc-brand">
          SoftBridge Solutions<sup>®</sup>
        </Link>
        <Link href="/" className="fc-home-btn">
          HOME ::
        </Link>
      </header>

      {/* Hero Section (Ekran Kaydı Birebir Düzeni) */}
      <div className="fc-hero-split">
        {/* Left Column */}
        <div className="fc-hero-left">
          <span className="fc-kicker">Featured work</span>
          <h1 className="fc-hero-title">{study.title}</h1>

          <div className="fc-client-card">
            <div className="fc-client-icon">
              <span className="fc-icon-symbol">✦</span>
            </div>
            <div className="fc-client-meta">
              <span className="fc-client-label">CLIENT</span>
              <strong className="fc-client-name">
                {study.kicker.split("/")[0].trim()}
              </strong>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Wave Image */}
        <div className="fc-hero-right">
          <div
            className="fc-image-frame"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <canvas ref={canvasRef} className="fc-wave-canvas" />
            <div className="fc-image-badge">
              <span>{study.accent}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
