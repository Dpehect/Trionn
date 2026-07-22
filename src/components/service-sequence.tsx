"use client";

import { useState } from "react";

const services = [
  ["01", "Strategy", "Positioning, narrative and product logic before pixels."],
  ["02", "Experience design", "Editorial systems that make complex products feel direct."],
  ["03", "Motion systems", "A coherent motion language across interface, type and media."],
  ["04", "Creative development", "Production code that preserves the art direction."],
  ["05", "WebGL", "Interactive 3D with adaptive performance and graceful fallback."],
];

export function ServiceSequence() {
  const [active, setActive] = useState(0);

  return (
    <section className="container-x section-space grid gap-16 md:grid-cols-[.35fr_1fr]">
      <div className="md:sticky md:top-32 md:self-start">
        <p className="eyebrow">Capabilities</p>
        <p className="body-lg text-muted mt-6 max-w-sm">
          One system from strategic premise to production behavior.
        </p>
      </div>

      <div>
        {services.map(([number, title, body], index) => (
          <button
            key={title}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            className="grid w-full gap-4 border-t hairline py-8 text-left md:grid-cols-[56px_1fr_.7fr]"
          >
            <span className="eyebrow">{number}</span>
            <span className="heading-lg">{title}</span>
            <span
              className={
                index === active
                  ? "body-md text-[var(--text-primary)]"
                  : "body-md text-[var(--text-tertiary)]"
              }
            >
              {body}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
