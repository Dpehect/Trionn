"use client";

import { useState } from "react";
import { team } from "@/data/studio";

export function TeamGrid() {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-5 md:grid-cols-3">
      {team.map((member, index) => (
        <article
          key={member.name}
          onMouseEnter={() => setActive(index)}
          onFocus={() => setActive(index)}
          tabIndex={0}
          className="group min-h-[34rem] overflow-hidden rounded-[var(--radius-lg)] border hairline p-6"
          style={{
            background:
              active === index
                ? `radial-gradient(circle at 50% 35%, ${member.accent}, #121212 62%)`
                : "var(--surface-raised)",
          }}
        >
          <div className="flex h-full flex-col justify-between">
            <p className="eyebrow">{member.role}</p>
            <div className="transition-transform duration-500 group-hover:-translate-y-3">
              <h3 className="heading-lg">{member.name}</h3>
              <p className="body-md mt-5 max-w-sm text-white/70">
                {member.statement}
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
