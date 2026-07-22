import type { Metadata } from "next";
import { ContentShell } from "@/components/navigation/content-shell";

export const metadata: Metadata = { title: "Changelog", description: "Recent Trionn product updates." };
const releases = [
  ["2026.07", "Context trails", "Every interface state can now reveal the evidence, decision and launch dependency that created it."],
  ["2026.06", "Launch rooms", "Release readiness gains ownership gates, risk states and a complete decision timeline."],
  ["2026.05", "Product intelligence", "Ask questions across research, interface logic and delivery context from one product surface."],
  ["2026.04", "Signal map", "Research notes, support evidence and analytics can be connected to live product hypotheses."],
];
export default function ChangelogPage() { return <ContentShell><main className="content-page"><header className="content-hero"><span>CHANGELOG / LIVE</span><h1>The product system<br /><em>keeps moving.</em></h1><p>Meaningful changes, written for the teams using them.</p></header><section className="release-list">{releases.map(([version,title,copy])=><article key={version}><span>{version}</span><h2>{title}</h2><p>{copy}</p><b>RELEASED</b></article>)}</section></main></ContentShell>; }
