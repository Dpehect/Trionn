import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock3, MapPin } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { ProjectEnquiryForm } from "@/components/forms/project-enquiry-form";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = { title: "Contact", description: "Start a digital product, web platform or AI systems project with Softbridge Solutions." };

export default function ContactPage() {
  return <main>
    <PageHero eyebrow="Start a project" title="Bring us the difficult part." description="Share the business goal, current constraints and the outcome that would make the project worthwhile." />
    <section className="pb-32"><div className="container-shell grid gap-8 lg:grid-cols-[.72fr_1.28fr]">
      <aside className="space-y-5">
        <div className="bg-ink p-8 text-white"><span className="eyebrow text-white/45">Direct contact</span><Link href={`mailto:${siteConfig.email}`} className="group mt-12 flex items-end justify-between gap-4 break-all text-2xl font-semibold tracking-[-.04em]">{siteConfig.email}<ArrowUpRight className="shrink-0 transition group-hover:rotate-45"/></Link></div>
        <div className="grid gap-4 border hairline p-7 text-sm">
          <p className="flex items-center gap-3"><MapPin size={18}/> Finland-focused, remote delivery</p>
          <p className="flex items-center gap-3"><Clock3 size={18}/> Replies within two business days</p>
        </div>
        <p className="px-2 text-sm leading-relaxed text-black/50">Useful details include the desired launch window, decision-makers, current technical environment and any non-negotiable requirements.</p>
      </aside>
      <ProjectEnquiryForm />
    </div></section>
  </main>;
}
