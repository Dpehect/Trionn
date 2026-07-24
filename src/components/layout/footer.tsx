import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site";

const groups = [
  { label: "Explore", links: [["Work", "/work"], ["Services", "/services"], ["Process", "/process"], ["About", "/about"]] },
  { label: "Company", links: [["Insights", "/insights"], ["Careers", "/careers"], ["Contact", "/contact"]] },
  { label: "Legal", links: [["Privacy", "/privacy"], ["Cookies", "/cookies"], ["Accessibility", "/accessibility"], ["Terms", "/terms"]] }
] as const;

export function Footer() {
  return (
    <footer className="bg-foreground py-16 text-background md:py-24">
      <div className="container-shell">
        <p className="eyebrow text-white/45">Next ambitious project</p>
        <div className="mt-12 grid gap-12 border-b border-white/20 pb-20 lg:grid-cols-[1.4fr_.6fr] lg:items-end">
          <h2 className="text-balance text-[clamp(4rem,9vw,9.5rem)] font-medium leading-[.78] tracking-[-.078em]">LET’S BUILD SOMETHING WORTH REMEMBERING.</h2>
          <div className="lg:pb-4"><Link className="group inline-flex items-center gap-3 border-b border-white pb-2 text-lg font-medium" href="/contact">Start a project <ArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></Link></div>
        </div>
        <div className="grid gap-12 border-b border-white/20 py-12 md:grid-cols-[1.2fr_2fr]">
          <div><p className="font-semibold">Softbridge Solutions</p><p className="mt-4 max-w-xs text-sm leading-relaxed text-white/45">Finland-focused digital product and web agency for organisations with ambitious ideas.</p><a className="mt-6 inline-block text-sm text-white/75" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">{groups.map((group) => <div key={group.label}><p className="eyebrow text-white/35">{group.label}</p><div className="mt-5 grid gap-3">{group.links.map(([label, href]) => <Link className="text-sm text-white/60 transition hover:text-white" key={href} href={href}>{label}</Link>)}</div></div>)}</div>
        </div>
        <div className="flex flex-col gap-3 pt-6 text-[10px] uppercase tracking-[.14em] text-white/35 sm:flex-row sm:justify-between"><p>© {new Date().getFullYear()} Softbridge Solutions</p><p>Clarity / Character / Endurance</p></div>
      </div>
    </footer>
  );
}
