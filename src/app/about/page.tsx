import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { SiteFooter } from "@/components/footer/site-footer";

export const metadata: Metadata = { title: "About", description: "Softbridge Solutions Finland is a senior software studio connecting Nordic product thinking with distributed engineering excellence." };

const values = [
  ["01", "Clarity before code", "We define the business constraint, user need and technical risk before choosing a stack."],
  ["02", "Senior by default", "Small, accountable teams with direct access to the people designing and building the product."],
  ["03", "Momentum over theatre", "Short feedback loops, visible progress and production decisions that survive beyond launch."],
  ["04", "Built to transfer", "Clean systems, documentation and shared ownership so your team is never locked in."],
];

export default function AboutPage() {
  return <SiteShell><main className="editorial-page"><section className="site-container editorial-hero"><p>About / Softbridge Finland</p><h1>NORDIC PRODUCT THINKING.<br />DISTRIBUTED ENGINEERING POWER.</h1><div><span>Finland ↔ Türkiye</span><p>We partner with ambitious companies to design, build and scale software products that create measurable operational and customer value.</p></div></section><section className="site-container about-story"><p>Our model</p><h2>One senior product team, shaped around the problem—not a catalogue of anonymous resources.</h2><div><p>Softbridge Solutions Finland combines local market understanding with a distributed engineering network. Strategy, design and technology work as one system from the first workshop through production.</p><p>We are strongest when the problem is ambiguous, the system is business-critical, and speed cannot come at the expense of long-term quality.</p></div></section><section className="site-container values-list">{values.map(([n,t,d]) => <article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</section><section className="site-container timeline"><p>How we work</p><div>{["Discover / Frame", "Design / Prototype", "Build / Integrate", "Launch / Learn", "Scale / Transfer"].map((item,i)=><article key={item}><span>0{i+1}</span><h3>{item}</h3></article>)}</div></section></main><SiteFooter /></SiteShell>;
}
