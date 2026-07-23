"use client";
import { useEffect } from "react";
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return <main className="route-state"><p className="section-eyebrow">Application error</p><h1 className="display-section">Something interrupted the experience.</h1><button className="hero-button hero-button--primary" onClick={reset}>Try again</button></main>;
}
