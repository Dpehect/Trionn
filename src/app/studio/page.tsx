import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { SectionHeading } from "@/components/ui/section-heading";
import { TeamGrid } from "@/components/team-grid";
import {
  awards,
  studioCapabilities,
  studioValues,
} from "@/data/studio";

export const metadata = { title: "Studio" };

export default function StudioPage() {
  return (
    <main>
      <SiteHeader />

      <section className="container-x min-h-screen pt-40">
        <p className="eyebrow">Studio / Istanbul and remote</p>
        <h1 className="display-xl mt-8">
          BUILT FOR
          <br />
          DIFFICULT IDEAS.
        </h1>
        <div className="mt-16 grid gap-10 border-t hairline pt-8 md:grid-cols-[.35fr_1fr]">
          <p className="eyebrow">Position</p>
          <p className="body-lg max-w-4xl text-[var(--text-secondary)]">
            ATELIER/X is an independent digital studio combining strategy,
            identity, motion and engineering into high-impact product
            experiences.
          </p>
        </div>
      </section>

      <section className="bg-[var(--accent-primary)] py-[var(--section-space)] text-[var(--text-inverse)]">
        <div className="container-x">
          <p className="display-lg max-w-6xl">
            We do not separate the idea from the way it moves, loads, responds
            or survives production.
          </p>
        </div>
      </section>

      <section className="container-x section-space">
        <SectionHeading
          eyebrow="Capabilities"
          title="A complete line from premise to production."
          body="The same senior team owns strategy, design, motion and development."
        />
        <div className="mt-20 grid gap-px bg-[var(--border-soft)] md:grid-cols-2">
          {studioCapabilities.map((item, index) => (
            <article
              key={item}
              className="bg-[var(--surface-base)] p-7 md:min-h-52"
            >
              <span className="eyebrow">{String(index + 1).padStart(2, "0")}</span>
              <h2 className="heading-lg mt-10">{item}</h2>
            </article>
          ))}
        </div>
      </section>

      <section className="container-x section-space">
        <SectionHeading
          eyebrow="Principles"
          title="How we protect the quality of the work."
        />
        <div className="mt-20">
          {studioValues.map((value) => (
            <article
              key={value.number}
              className="grid gap-8 border-t hairline py-10 md:grid-cols-[80px_1fr_.8fr]"
            >
              <span className="eyebrow">{value.number}</span>
              <h3 className="heading-lg">{value.title}</h3>
              <p className="body-md text-muted">{value.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-x section-space">
        <SectionHeading
          eyebrow="Team"
          title="Small enough to stay precise."
          body="A compact senior team with shared ownership of the experience."
        />
        <div className="mt-20">
          <TeamGrid />
        </div>
      </section>

      <section className="container-x section-space">
        <SectionHeading
          eyebrow="Recognition"
          title="Selected recognition."
        />
        <div className="mt-16">
          {awards.map(([platform, award, year]) => (
            <div
              key={`${platform}-${award}`}
              className="grid grid-cols-[1fr_1fr_auto] border-t hairline py-6"
            >
              <span>{platform}</span>
              <span className="text-[var(--text-secondary)]">{award}</span>
              <span className="eyebrow">{year}</span>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
