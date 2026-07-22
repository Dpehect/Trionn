import type { Metadata } from "next";
import { ContentShell } from "@/components/navigation/content-shell";
export const metadata: Metadata = { title: "Care & Materials", description: "TRIONN material, care and production principles." };
const controls = [
  ["01", "Small production", "Limited quantities reduce excess stock and keep each collection focused."],
  ["02", "Material clarity", "Every product page states the main material, fit and care direction."],
  ["03", "Repair first", "Construction is selected to support repair before replacement where possible."],
  ["04", "Lower-impact packaging", "Orders use compact recyclable packaging without decorative excess."],
];
export default function CarePage() { return <ContentShell><main className="content-page"><header className="content-hero"><span>CARE / MATERIALS</span><h1>Keep the object<br /><em>in motion.</em></h1><p>Care, repair and controlled production are treated as part of the design.</p></header><section className="control-grid">{controls.map(([i,t,c]) => <article key={t}><span>{i}</span><h2>{t}</h2><p>{c}</p></article>)}</section></main></ContentShell>; }
