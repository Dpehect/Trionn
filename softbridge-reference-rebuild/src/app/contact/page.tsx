import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Start a project",
  description: "Discuss a product, software, AI or platform decision with the Softbridge senior team.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-lime pb-20 pt-40 md:pb-28">
        <div className="container-site"><p className="eyebrow text-forest/45">Start a project</p><h1 className="display-lg mt-7 max-w-[10ch]">Bring the decision that is difficult to make.</h1><p className="body-lg mt-8 max-w-2xl text-forest/68">Share the context, constraint and timing. We will reply with a useful next step, not a generic sales sequence.</p></div>
      </section>

      <section className="section-space bg-lavender">
        <div className="container-site grid gap-10 lg:grid-cols-[.72fr_1.28fr]">
          <div>
            <p className="eyebrow text-forest/45">Before sending</p>
            <div className="mt-8 grid gap-4">
              {[
                ["Useful detail", "The decision, affected users, current system and timing pressure."],
                ["First response", "A direct reply from a senior person, normally within two business days."],
                ["NDA-ready", "A mutual NDA can be signed before sensitive product information is shared."],
                ["Local time", "Helsinki · EET / EEST"],
              ].map(([title, text]) => <div key={title} className="border-t border-forest/20 py-5"><h2 className="font-bold">{title}</h2><p className="mt-2 text-forest/60">{text}</p></div>)}
            </div>
            <a href="mailto:hello@softbridge.fi" className="link-line mt-8">hello@softbridge.fi ↗</a>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
