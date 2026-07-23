import { ArrowUpRight } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";

const industries = [
  ["01", "SaaS & Platforms", "Scalable products, operational systems and subscription experiences built for growth."],
  ["02", "Retail & Commerce", "Composable commerce, customer journeys and high-performance digital storefronts."],
  ["03", "AI & Automation", "Agents, decision systems and workflow automation grounded in measurable business value."],
  ["04", "Health & Education", "Accessible, secure platforms for complex human journeys and regulated workflows."],
  ["05", "Finance & Professional Services", "Clear digital products for high-trust services, data and transactions."],
  ["06", "Logistics & Operations", "Connected operational platforms that improve visibility, speed and coordination."],
] as const;

export default function IndustriesPage() {
  return (
    <SiteShell>
      <main className="industries-page site-container">
        <header>
          <p>Industries / Finland and beyond</p>
          <h1>Deep product thinking across complex industries.</h1>
        </header>
        <section className="industries-list">
          {industries.map(([index, title, description]) => (
            <article key={index}>
              <span>{index}</span>
              <h2>{title}</h2>
              <p>{description}</p>
              <ArrowUpRight />
            </article>
          ))}
        </section>
      </main>
    </SiteShell>
  );
}
