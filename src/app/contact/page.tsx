import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { SiteFooter } from "@/components/footer/site-footer";
import { ProjectInquiryForm } from "@/components/contact/project-inquiry-form";

export const metadata: Metadata = { title: "Start a project", description: "Tell Softbridge Solutions Finland about your software, AI, SaaS or digital product project." };

export default function ContactPage() {
  return <SiteShell><main className="contact-page"><section className="site-container contact-intro"><p>Start a project / Finland</p><h1>LET&apos;S TURN THE<br />COMPLEX INTO<br />MOMENTUM.</h1><div><p>Share the context, ambition and constraint. We will respond with the right questions and a clear next step.</p><a href="mailto:hello@softbridgesolutions.com">hello@softbridgesolutions.com ↗</a></div></section><section className="site-container contact-layout"><aside><p>Typical response</p><strong>Within two business days</strong><p>Best fit</p><strong>Product builds, modernization, AI automation and complex integrations</strong><p>Locations</p><strong>Helsinki · Finland<br />Adana · Türkiye</strong></aside><ProjectInquiryForm /></section></main><SiteFooter /></SiteShell>;
}
