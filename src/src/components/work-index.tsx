"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, Grid2X2, List } from "lucide-react";
import type { Project } from "@/data/projects";

export function WorkIndex({ projects }: { projects: Project[] }) {
  const [mode, setMode] = useState<"list" | "grid">("list");
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((project) => project.category)))],
    [projects]
  );

  const filtered = useMemo(
    () =>
      category === "All"
        ? projects
        : projects.filter((project) => project.category === category),
    [category, projects]
  );

  return (
    <>
      <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-y hairline py-5">
        <div className="flex flex-wrap gap-3">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={
                category === item
                  ? "rounded-full bg-[var(--accent-primary)] px-4 py-2 text-xs uppercase tracking-[.14em] text-black"
                  : "rounded-full border hairline px-4 py-2 text-xs uppercase tracking-[.14em] text-[var(--text-secondary)]"
              }
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            aria-label="List view"
            onClick={() => setMode("list")}
            className="grid h-10 w-10 place-items-center rounded-full border hairline"
          >
            <List size={16} />
          </button>
          <button
            aria-label="Grid view"
            onClick={() => setMode("grid")}
            className="grid h-10 w-10 place-items-center rounded-full border hairline"
          >
            <Grid2X2 size={16} />
          </button>
        </div>
      </div>

      {mode === "list" ? (
        <div className="mt-6">
          {filtered.map((project, index) => (
            <Link
              href={`/work/${project.slug}`}
              key={project.slug}
              className="group grid gap-6 border-t hairline py-8 md:grid-cols-[60px_1fr_230px_40px] md:items-center"
            >
              <span className="text-xs text-[var(--text-tertiary)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="display-lg transition-transform duration-500 group-hover:translate-x-4">
                  {project.title}
                </h2>
                <p className="body-md text-muted mt-4 max-w-xl">{project.summary}</p>
              </div>
              <div className="eyebrow">
                {project.category}
                <br />
                {project.year}
              </div>
              <ArrowUpRight className="transition-transform duration-500 group-hover:rotate-45" />
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {filtered.map((project) => (
            <Link key={project.slug} href={`/work/${project.slug}`} className="group">
              <article
                className="aspect-[4/3] rounded-[var(--radius-lg)] border hairline p-7"
                style={{
                  background: `radial-gradient(circle at 50% 40%, ${project.accent}, #121212 60%)`,
                }}
              >
                <div className="flex h-full flex-col justify-between">
                  <span className="eyebrow">{project.category}</span>
                  <div>
                    <h2 className="display-lg">{project.title}</h2>
                    <p className="body-md mt-4 text-white/70">{project.summary}</p>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
