import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { RevealTitle } from "@/components/reveal-title";
import { MagneticLink } from "@/components/magnetic-link";
import { HeroExperience } from "@/components/hero-experience";
import { ProjectCarousel } from "@/components/project-carousel";
import { Marquee } from "@/components/marquee";
import { ServiceSequence } from "@/components/service-sequence";
import { SectionHeading } from "@/components/ui/section-heading";

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <HeroExperience />

      <section className="flex min-h-screen items-center bg-[var(--accent-primary)] py-[var(--section-space)] text-[var(--text-inverse)]">
        <div className="container-x grid gap-12 md:grid-cols-[.35fr_1fr]">
          <p className="text-xs uppercase tracking-[.2em]">Our position</p>
          <RevealTitle className="display-lg">
            We combine art direction, motion and engineering into one continuous experience.
          </RevealTitle>
        </div>
      </section>

      <ProjectCarousel />
      <Marquee />
      <ServiceSequence />

      <section className="container-x section-space">
        <SectionHeading
          eyebrow="How we work"
          title="One senior team owns the complete line."
          body="We move from premise to production without handing the core idea between disconnected departments."
        />

        <div className="mt-24 grid gap-24 md:grid-cols-[.35fr_1fr]">
          <div className="md:sticky md:top-32 md:self-start">
            <p className="eyebrow">Process / 01–03</p>
          </div>

          <div className="space-y-32">
            {[
              ["01", "Find the tension", "We isolate the contradiction that gives the product its distinct position."],
              ["02", "Build the behavior", "The visual identity becomes a system of motion, interaction and response."],
              ["03", "Engineer the feeling", "Performance, accessibility and content operations are designed into the experience."],
            ].map(([number, title, body]) => (
              <article key={number} className="border-t hairline pt-8">
                <span className="eyebrow">{number}</span>
                <h2 className="display-lg mt-7">{title}</h2>
                <p className="body-lg text-muted mt-8 max-w-2xl">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface-raised)]">
        <div className="container-x flex min-h-screen items-center py-[var(--section-space)]">
          <RevealTitle className="display-xl">
            DIFFERENT IS NOT A STYLE.
            <br />
            IT IS A SYSTEM.
          </RevealTitle>
        </div>
      </section>

      <section className="container-x flex min-h-[80vh] items-center justify-center text-center">
        <div>
          <p className="eyebrow mb-6">Have a difficult idea?</p>
          <RevealTitle className="display-lg">
            LET’S MAKE IT
            <br />
            IMPOSSIBLE TO IGNORE.
          </RevealTitle>
          <div className="mt-10">
            <MagneticLink>Start a project</MagneticLink>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
