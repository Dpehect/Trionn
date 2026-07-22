import { SiteHeader } from "@/components/site-header";
import { ProjectBriefForm } from "@/components/project-brief-form";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <main>
      <SiteHeader />
      <section className="container-x min-h-screen pb-24 pt-40">
        <p className="eyebrow">Start a project</p>
        <h1 className="display-xl mt-8">
          MAKE THE
          <br />
          NEXT MOVE.
        </h1>

        <div className="mt-20 grid gap-12 md:grid-cols-[.35fr_1fr]">
          <div>
            <p className="body-lg text-muted max-w-sm">
              Tell us what must change, what success means and where the difficult part begins.
            </p>
            <div className="mt-12 border-t hairline pt-6">
              <p className="eyebrow">Direct contact</p>
              <a className="mt-3 block text-xl" href="mailto:hello@example.com">
                hello@example.com
              </a>
            </div>
          </div>

          <ProjectBriefForm />
        </div>
      </section>
    </main>
  );
}
