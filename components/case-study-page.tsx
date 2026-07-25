"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { CaseStudy } from "@/data/cases";

export function CaseStudyPage({ study }: { study: CaseStudy }) {
  return (
    <main className="cs-base-page">
      {/* Navigation Bar */}
      <nav className="cs-base-nav">
        <Link href="/" className="cs-base-logo">
          SOFTBRIDGE<sup>®</sup>
        </Link>
        <Link href="/#cases" className="cs-base-back">
          <ArrowLeft size={14} /> Back to Cases
        </Link>
      </nav>

      {/* Hero Foundation */}
      <div className="cs-base-container">
        <span className="cs-base-badge">{study.kicker}</span>
        <h1 className="cs-base-title">{study.title}</h1>
        <p className="cs-base-intro">{study.intro}</p>
      </div>
    </main>
  );
}
