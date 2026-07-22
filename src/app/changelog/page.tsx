import type { Metadata } from "next";
import { ContentShell } from "@/components/navigation/content-shell";
export const metadata: Metadata = { title: "Journal", description: "TRIONN collection and material journal." };
const notes = [
  ["2026.07", "Footwork / 01", "Arc soles, low profiles and a first independent footwear edit."],
  ["2026.06", "Night Study", "Matte outerwear and reflective footwear for low-light movement."],
  ["2026.05", "Form / 01", "Long proportions and controlled volume across coats, shirts and knitwear."],
];
export default function JournalPage() { return <ContentShell><main className="content-page"><header className="content-hero"><span>JOURNAL / COLLECTION NOTES</span><h1>Objects, materials<br /><em>and movement.</em></h1><p>Notes from each collection, material test and footwear study.</p></header><section className="release-list">{notes.map(([date,title,copy]) => <article key={date}><span>{date}</span><h2>{title}</h2><p>{copy}</p><b>READ NOTE</b></article>)}</section></main></ContentShell>; }
