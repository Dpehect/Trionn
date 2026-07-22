export function MetricCard({
  label,
  value,
  note,
}: {
  label: string;
  value: string | number;
  note?: string;
}) {
  return (
    <article className="flex min-h-44 flex-col justify-between border hairline bg-[var(--surface-raised)] p-6">
      <p className="eyebrow">{label}</p>
      <div>
        <strong className="text-5xl tracking-[-.06em] md:text-6xl">{value}</strong>
        {note && <p className="mt-3 text-sm text-[var(--text-secondary)]">{note}</p>}
      </div>
    </article>
  );
}
