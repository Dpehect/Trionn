import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Start a project",
  description: "Start a product engineering project with Softbridge in Helsinki.",
};

export default function Contact() {
  return (
    <>
      <section className="section pt-40">
        <div className="container">
          <p className="eyebrow text-muted">Contact / Start a project</p>
          <div className="mt-10 grid gap-14 md:grid-cols-2">
            <div>
              <h1 className="display max-w-[9ch]">Start with the difficult decision.</h1>
              <p className="body-lg mt-10 max-w-xl">A useful first brief explains what needs to change, why it matters now, what has already been tried and which uncertainty is blocking commitment.</p>
              <div className="mt-14 border-t border-line">
                {[["Response", "Within two working days"], ["Time zone", "Helsinki · EET / EEST"], ["Confidentiality", "NDA-ready before sensitive detail"], ["First engagement", "Usually a paid 2–4 week framing phase"]].map(([term, value]) => (
                  <div className="border-b border-line py-5" key={term}><p className="eyebrow text-muted">{term}</p><p className="mt-2">{value}</p></div>
                ))}
              </div>
              <a href={process.env.NEXT_PUBLIC_CAL_URL || "https://cal.com/softbridge/intro"} className="link-arrow mt-9">Book a 30-minute introduction <span>↗</span></a>
            </div>
            <div className="md:pt-4">
              <p className="body-lg mb-12">You do not need a finished specification. Context, constraints and the decision you need to make are more useful.</p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <p className="eyebrow text-muted">What happens next</p>
          <ol className="mt-14 grid border-t border-line md:grid-cols-3">
            {[["01", "Fit", "We review whether the problem, timing and working model fit our capabilities."], ["02", "Conversation", "A senior lead discusses context, constraints, ownership and the evidence needed."], ["03", "Proposal", "When there is a fit, we propose the smallest useful engagement with scope, team, timing and commercial terms."]].map(([number, title, text]) => (
              <li key={number} className="border-b border-line py-8 md:border-r md:px-7"><span className="eyebrow text-muted">{number}</span><h2 className="title mt-10">{title}</h2><p className="mt-5 text-muted">{text}</p></li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
