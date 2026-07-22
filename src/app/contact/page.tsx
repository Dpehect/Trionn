"use client";

import { ArrowUpRight } from "lucide-react";
import { ContentShell } from "@/components/navigation/content-shell";
import { useProductStore } from "@/store/use-product-store";

export default function ContactPage() {
  const open = useProductStore((state) => state.setRequestOpen);
  return <ContentShell><main className="content-page"><header className="content-hero"><span>CONTACT / PRODUCT ACCESS</span><h1>Tell us what<br /><em>you are moving next.</em></h1><p>New workspaces, product collaboration and enterprise deployment.</p></header><section className="contact-panel"><div><span>PRODUCT ACCESS</span><h2>Request a private beta workspace.</h2><p>Share your product, team and launch horizon. Every request is reviewed by a real person.</p><button className="button button-primary" type="button" onClick={() => open(true)}>Open request form <ArrowUpRight size={17} /></button></div><div><span>GENERAL</span><h2>hello@trionn.example</h2><p>For partnerships, press and product conversations.</p><a className="button button-secondary" href="mailto:hello@trionn.example">Send email <ArrowUpRight size={17} /></a></div></section></main></ContentShell>;
}
