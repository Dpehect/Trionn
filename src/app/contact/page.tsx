import { ContentShell } from "@/components/navigation/content-shell";
import { ContactForm } from "./contact-form";
export default function ContactPage() { return <ContentShell><main className="content-page"><div className="content-grid"><p className="content-kicker">Contact</p><h1 className="content-heading">Tell us where you are trying to go.</h1><p className="content-copy">New business, collaborations and speaking engagements.</p><ContactForm /></div></main></ContentShell>; }
