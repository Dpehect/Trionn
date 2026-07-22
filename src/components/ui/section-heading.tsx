export function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return <div className="grid gap-5 border-t pt-5 md:grid-cols-[1fr_2fr]">
    <p className="eyebrow">{eyebrow}</p>
    <div><h2 className="headline max-w-5xl text-balance">{title}</h2>{copy ? <p className="mt-6 max-w-xl text-base leading-7 text-[var(--muted)]">{copy}</p> : null}</div>
  </div>;
}
