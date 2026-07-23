import { BadgeCheck, FileCheck2, ShieldCheck, UsersRound } from "lucide-react";

const signals = [
  { icon: BadgeCheck, title: "Claims are labelled", copy: "Case-study outcomes distinguish verified results, project targets and representative benchmarks." },
  { icon: UsersRound, title: "Senior-led by default", copy: "Discovery, architecture and delivery decisions stay with experienced product and engineering leads." },
  { icon: ShieldCheck, title: "Confidentiality built in", copy: "NDA-ready discovery, least-privilege access and privacy-conscious delivery practices." },
  { icon: FileCheck2, title: "Clear commercial scope", copy: "Every proposal defines outcomes, assumptions, team shape, timeline and acceptance criteria." },
];

export function CredibilitySection() {
  return (
    <section className="credibility-section section-shell" aria-labelledby="credibility-title">
      <div className="credibility-section__intro">
        <p className="section-eyebrow">Trust / how to read this site</p>
        <h2 id="credibility-title">High craft without inflated claims.</h2>
        <p>We separate demonstrative product work from verified client evidence. Public case studies are labelled so buyers, partners and investors can evaluate the work on the right basis.</p>
      </div>
      <div className="credibility-grid">
        {signals.map(({ icon: Icon, title, copy }) => (
          <article key={title}>
            <Icon size={20} aria-hidden="true" />
            <h3>{title}</h3>
            <p>{copy}</p>
          </article>
        ))}
      </div>
      <div className="credibility-disclosure">
        <strong>Company disclosure</strong>
        <p>Softbridge is presented as an independent product and engineering studio. Legal entity, contracting party and registration details must be confirmed in each commercial proposal before engagement.</p>
      </div>
    </section>
  );
}
