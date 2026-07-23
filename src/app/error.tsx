"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="system-page"><p className="eyebrow">SYSTEM / INTERRUPTION</p><h1>SOMETHING<br />WENT WRONG.</h1><button className="system-link" onClick={reset}>Try again</button></main>;
}
