import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { SiteFooter } from "@/components/footer/site-footer";

export const metadata: Metadata = { title: "Careers", description: "Join Softbridge Solutions Finland and build ambitious digital products with a distributed senior team." };

const roles = [
  { title: "Senior Full-Stack Engineer", type: "Remote / Europe", stack: "Next.js · TypeScript · Node.js" },
  { title: "Product Designer", type: "Helsinki / Hybrid", stack: "Product strategy · UX · Prototyping" },
  { title: "AI Automation Engineer", type: "Remote / Europe", stack: "Python · Agents · Integrations" },
];

export default function CareersPage() {
  return <SiteShell><main className="editorial-page"><section className="site-container editorial-hero"><p>Careers / Build with us</p><h1>SMALL TEAM.<br />SERIOUS CRAFT.<br />REAL OWNERSHIP.</h1><div><span>Open across Europe</span><p>We hire experienced people who can think beyond their discipline and care about the business outcome of what they ship.</p></div></section><section className="site-container careers-principles"><article><span>01</span><h2>Autonomy with context</h2><p>You get the commercial, user and technical context needed to make good decisions without layers of approval.</p></article><article><span>02</span><h2>Craft without ego</h2><p>High standards, honest critique and shared responsibility. The strongest idea wins.</p></article><article><span>03</span><h2>Remote, not disconnected</h2><p>Focused asynchronous work combined with deliberate workshops, reviews and team time.</p></article></section><section className="site-container roles"><div className="roles-heading"><p>Open positions</p><span>{String(roles.length).padStart(2,"0")}</span></div>{roles.map((role,i)=><a key={role.title} href={`mailto:careers@softbridgesolutions.com?subject=${encodeURIComponent(role.title)}`}><span>0{i+1}</span><h3>{role.title}</h3><p>{role.stack}</p><strong>{role.type} ↗</strong></a>)}</section></main><SiteFooter /></SiteShell>;
}
