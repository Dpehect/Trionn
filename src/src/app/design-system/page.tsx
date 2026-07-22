import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata = { title: "Design System" };

const swatches = [
  ["Surface base", "var(--surface-base)"],
  ["Surface raised", "var(--surface-raised)"],
  ["Accent primary", "var(--accent-primary)"],
  ["Accent secondary", "var(--accent-secondary)"],
  ["Accent warm", "var(--accent-warm)"],
];

export default function DesignSystemPage() {
  return (
    <main className="container-x section-space">
      <SectionHeading
        eyebrow="Internal reference"
        title="Design system"
        body="A living visual and interaction reference for the entire experience."
      />

      <section className="mt-24 grid gap-4 md:grid-cols-5">
        {swatches.map(([name, value]) => (
          <article key={name} className="border hairline p-4">
            <div className="aspect-square rounded-[var(--radius-md)]" style={{ background: value }} />
            <p className="mt-4 text-sm">{name}</p>
            <p className="eyebrow mt-1">{value}</p>
          </article>
        ))}
      </section>

      <section className="mt-24 border-t hairline pt-12">
        <p className="eyebrow">Typography</p>
        <div className="mt-10 space-y-12">
          <p className="display-xl">Display XL</p>
          <p className="display-lg">Display large</p>
          <p className="heading-lg">Heading large</p>
          <p className="body-lg max-w-3xl text-muted">
            Large body copy establishes editorial pacing without becoming visually noisy.
          </p>
        </div>
      </section>

      <section className="mt-24 border-t hairline pt-12">
        <p className="eyebrow">Buttons</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button>Primary action</Button>
          <Button variant="secondary">Secondary action</Button>
          <Button variant="ghost">Ghost action</Button>
        </div>
      </section>
    </main>
  );
}
