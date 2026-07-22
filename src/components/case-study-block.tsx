import type { CaseStudyBlock } from "@/data/projects";

export function CaseStudyBlockRenderer({ block }: { block: CaseStudyBlock }) {
  if (block.type === "text") {
    return (
      <section className="container-x grid min-h-[70vh] gap-12 border-t hairline py-[var(--section-space)] md:grid-cols-[.32fr_1fr]">
        <p className="eyebrow">{block.eyebrow}</p>
        <div>
          <h2 className="display-lg max-w-5xl">{block.title}</h2>
          <p className="body-lg text-muted mt-10 max-w-2xl">{block.body}</p>
        </div>
      </section>
    );
  }

  if (block.type === "metric") {
    return (
      <section className="container-x py-[var(--section-space)]">
        <div className="grid gap-px border hairline bg-[var(--border-soft)] md:grid-cols-3">
          {block.items.map((item) => (
            <article key={item.label} className="bg-[var(--surface-base)] p-8">
              <p className="eyebrow">{item.label}</p>
              <strong className="mt-6 block text-6xl tracking-[-.06em]">{item.value}</strong>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (block.type === "media") {
    const ratioClass =
      block.ratio === "16/9"
        ? "aspect-video"
        : block.ratio === "4/3"
          ? "aspect-[4/3]"
          : "aspect-square";

    return (
      <section className="container-x py-[var(--section-space)]">
        <div
          className={`${ratioClass} rounded-[var(--radius-lg)] border hairline p-8`}
          style={{
            background: `radial-gradient(circle at 50% 45%, ${block.accent}, #111 62%)`,
          }}
        >
          <div className="flex h-full items-end">
            <p className="eyebrow text-white/70">{block.title}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[var(--accent-primary)] py-[var(--section-space)] text-[var(--text-inverse)]">
      <div className="container-x">
        <blockquote className="display-lg max-w-6xl">“{block.quote}”</blockquote>
        <p className="mt-10 text-xs uppercase tracking-[.18em]">{block.attribution}</p>
      </div>
    </section>
  );
}
