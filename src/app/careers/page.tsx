import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers and talent network",
  description:
    "Open roles and the Softbridge senior talent network are separate, transparent paths.",
};

export default function Careers() {
  return (
    <>
      <section className="section pt-40">
        <div className="container">
          <p className="eyebrow text-muted">Careers / Talent network</p>
          <h1 className="display mt-10 max-w-[12ch]">
            Join for a role. Or stay known.
          </h1>
          <p className="body-lg mt-12 max-w-2xl">
            Open roles are active hiring needs. The talent network is permission
            to contact you when relevant work appears. We do not create false
            urgency around either.
          </p>
        </div>
      </section>

      <section className="pb-28">
        <div className="container grid gap-12 md:grid-cols-2">
          <article className="border-t border-line pt-8">
            <p className="eyebrow text-muted">Open roles</p>
            <h2 className="headline mt-10">No open roles today.</h2>
            <p className="mt-7 max-w-lg text-muted">
              When a role opens, this page will show the scope, working
              arrangement, compensation range and hiring process.
            </p>
          </article>

          <article className="border-t border-line pt-8">
            <p className="eyebrow text-muted">Senior talent network</p>
            <h2 className="headline mt-10">
              Relevant contact, without promises.
            </h2>
            <p className="mt-7 max-w-lg text-muted">
              Share a concise profile, location, discipline and availability. We
              review the network when a specific engagement needs your experience.
            </p>
            <a className="link-arrow mt-9" href="mailto:talent@softbridge.fi">
              Join the network <span>↗</span>
            </a>
          </article>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <p className="eyebrow text-muted">Application process</p>
          <ol className="mt-14 grid border-t border-line md:grid-cols-3">
            {[
              ["01", "Send", "A concise profile and relevant work."],
              [
                "02",
                "Discuss",
                "One practical conversation with the person leading the work.",
              ],
              [
                "03",
                "Decide",
                "Clear scope, rate, availability and expectations before commitment.",
              ],
            ].map(([number, title, description]) => (
              <li
                className="border-b border-line py-8 md:border-r md:px-7"
                key={number}
              >
                <span className="eyebrow text-muted">{number}</span>
                <h2 className="title mt-10">{title}</h2>
                <p className="mt-4 text-muted">{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
