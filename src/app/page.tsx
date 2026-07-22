import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { RevealTitle } from "@/components/reveal-title";
import { MagneticLink } from "@/components/magnetic-link";
import { HeroCanvas } from "@/components/hero-canvas";
import { ProjectCarousel } from "@/components/project-carousel";
import { Marquee } from "@/components/marquee";

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <section className="relative flex min-h-screen flex-col justify-between overflow-hidden pt-32">
        <HeroCanvas />
        <div className="container-x relative z-10"><p className="eyebrow">Independent design & development studio</p></div>
        <div className="container-x relative z-10 pb-8">
          <h1 className="display mix-blend-difference">WE MAKE<br/><span className="text-[var(--acid)]">DIGITAL</span><br/>FEEL ALIVE.</h1>
          <div className="mt-8 flex justify-between border-t hairline pt-4 text-xs uppercase tracking-[.16em]"><span>Move pointer</span><span>Scroll to enter ↓</span></div>
        </div>
      </section>

      <section className="flex min-h-screen items-center bg-[var(--acid)] py-24 text-black">
        <div className="container-x grid gap-12 md:grid-cols-[.35fr_1fr]">
          <p className="text-xs uppercase tracking-[.2em]">Our position</p>
          <RevealTitle className="text-5xl leading-[.9] tracking-[-.06em] md:text-8xl">
            We combine art direction, motion and engineering into one continuous experience.
          </RevealTitle>
        </div>
      </section>

      <ProjectCarousel />
      <Marquee />

      <section className="container-x grid min-h-screen items-center gap-12 py-28 md:grid-cols-[.42fr_1fr]">
        <div className="md:sticky md:top-32">
          <p className="eyebrow">How we work</p>
          <p className="mt-5 max-w-sm text-[var(--muted)]">One senior team owns the complete line from strategic premise to production code.</p>
        </div>
        <div className="space-y-28">
          {[
            ["01", "Find the tension", "We isolate the contradiction that gives the product its distinct position."],
            ["02", "Build the behavior", "The visual identity becomes a system of motion, interaction and response."],
            ["03", "Engineer the feeling", "Performance, accessibility and content operations are designed into the experience."],
          ].map(([n, title, body]) => (
            <article key={n} className="border-t hairline pt-8">
              <span className="eyebrow">{n}</span>
              <h2 className="mt-7 text-5xl tracking-[-.06em] md:text-8xl">{title}</h2>
              <p className="mt-8 max-w-xl text-xl leading-relaxed text-[var(--muted)]">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-x flex min-h-[80vh] items-center justify-center text-center">
        <div>
          <p className="eyebrow mb-6">Have a difficult idea?</p>
          <RevealTitle className="text-6xl leading-[.85] tracking-[-.07em] md:text-9xl">LET’S MAKE IT<br/>IMPOSSIBLE TO IGNORE.</RevealTitle>
          <div className="mt-10"><MagneticLink>Start a project</MagneticLink></div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
