"use client";

import { useState } from "react";
import { work } from "@/lib/data";
import type { WorkLabel } from "@/lib/data";
import { WorkCard } from "@/components/work-card";

const labels = ["All", "Verified", "Anonymised", "Representative"] as const;

export default function WorkPage() {
  const [filter, setFilter] = useState<(typeof labels)[number]>("All");
  const items = filter === "All" ? work : work.filter((item) => item.label === (filter as WorkLabel));

  return (
    <>
      <section className="section pt-40">
        <div className="container">
          <p className="eyebrow text-muted">Selected work</p>
          <h1 className="display mt-10 max-w-[10ch]">Evidence over theatre.</h1>
          <p className="body-lg mt-12 max-w-2xl">Every case study states what is verified, what is anonymised and what is representative. The label changes what can reasonably be inferred from the work.</p>
          <div className="mt-12 flex flex-wrap gap-2" aria-label="Filter case studies">
            {labels.map((label) => <button type="button" key={label} onClick={() => setFilter(label)} className={`label ${filter === label ? "bg-ink text-paper" : ""}`}>{label}</button>)}
          </div>
        </div>
      </section>

      <section className="pb-28">
        <div className="container">
          <div className="grid gap-8 border-y border-line py-8 md:grid-cols-3">
            <div><p className="eyebrow text-muted">Verified</p><p className="mt-3 text-sm">The engagement and stated evidence can be substantiated.</p></div>
            <div><p className="eyebrow text-muted">Anonymised</p><p className="mt-3 text-sm">Completed work with client identity or sensitive detail withheld.</p></div>
            <div><p className="eyebrow text-muted">Representative</p><p className="mt-3 text-sm">A credible model of our approach, not a claim of client delivery.</p></div>
          </div>
          <div className="mt-16">{items.map((item, index) => <WorkCard key={item.slug} item={item} index={index} />)}</div>
        </div>
      </section>
    </>
  );
}
