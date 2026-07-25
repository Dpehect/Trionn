"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import type { CaseStudy } from "@/data/cases";

export function CaseStudyPage({ study }: { study: CaseStudy }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Canvas Liquid Wave Distortion with Rounded Mask
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
    let amplitude = 3;
    let targetAmplitude = 3;

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
      time += 0.03;
      targetAmplitude = isHovered ? 10 : 3;
      amplitude += (targetAmplitude - amplitude) * 0.08;

      ctx.clearRect(0, 0, width, height);

      if (imgLoaded) {
        ctx.save();
        // Clip rounded rectangle boundary for ultra-sharp card edges
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(0, 0, width, height, 24);
        } else {
          ctx.rect(0, 0, width, height);
        }
        ctx.clip();

        // Render fluid internal wave slices
        const sliceH = 3;
        for (let y = 0; y < height; y += sliceH) {
          const waveX = Math.sin(y * 0.025 + time) * amplitude;
          const waveX2 = Math.cos(y * 0.04 - time * 0.7) * (amplitude * 0.5);
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

        // Dark warm vignette overlay matching reference
        const grad = ctx.createLinearGradient(0, height, 0, 0);
        grad.addColorStop(0, "rgba(9, 10, 12, 0.65)");
        grad.addColorStop(0.5, "rgba(9, 10, 12, 0.1)");
        grad.addColorStop(1, "rgba(9, 10, 12, 0.35)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, [study.editorialHero, isHovered]);

  // Mixed serif/italic typography helper
  const renderTitle = (title: string) => {
    const words = title.split(" ");
    if (words.length === 1) {
      const w = words[0];
      const half = Math.ceil(w.length * 0.6);
      return (
        <>
          <span>{w.slice(0, half)}</span>
          <em className="fc-italic">{w.slice(half)}</em>
        </>
      );
    }
    const mainPart = words.slice(0, words.length - 1).join(" ");
    const lastWord = words[words.length - 1];
    return (
      <>
        <span>{mainPart}&nbsp;</span>
        <em className="fc-italic">{lastWord}</em>
      </>
    );
  };

  const clientName = study.kicker.split("/")[0].trim();

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

      {/* Hero Section */}
      <div className="fc-hero-split">
        {/* Left Column */}
        <div className="fc-hero-left">
          <span className="fc-kicker">Featured work</span>
          <h1 className="fc-hero-title">{renderTitle(study.title)}</h1>

          <div className="fc-client-card">
            <div className="fc-client-icon">
              <span className="fc-icon-symbol">✦</span>
            </div>
            <div className="fc-client-meta">
              <span className="fc-client-label">CLIENT</span>
              <strong className="fc-client-name">{clientName}</strong>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Wave Image with Center Logo Overlay */}
        <div className="fc-hero-right">
          <div
            className="fc-image-frame"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <canvas ref={canvasRef} className="fc-wave-canvas" />

            {/* Center Logo Overlay like Vakeso in reference */}
            <div className="fc-center-logo">
              <div className="fc-logo-mark">
                <span className="fc-logo-shape" />
              </div>
              <span className="fc-logo-text">{clientName}</span>
            </div>

            <div className="fc-image-badge">
              <span>{study.accent}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
