import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  body,
  className,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  className?: string;
}) {
  return (
    <header className={cn("grid gap-8 md:grid-cols-[.32fr_1fr]", className)}>
      <p className="eyebrow">{eyebrow}</p>
      <div>
        <h2 className="display-lg">{title}</h2>
        {body && <p className="body-lg text-muted mt-8 max-w-2xl">{body}</p>}
      </div>
    </header>
  );
}
