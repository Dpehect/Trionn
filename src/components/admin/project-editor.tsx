"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  projectAdminSchema,
  type ProjectAdminInput,
} from "@/lib/project-admin-schema";
import { toast } from "sonner";

const services = [
  "Strategy",
  "Experience design",
  "Motion systems",
  "Creative development",
  "WebGL",
  "Product engineering",
];

export function ProjectEditor({
  initial,
  projectId,
}: {
  initial?: Partial<ProjectAdminInput>;
  projectId?: string;
}) {
  const [selectedServices, setSelectedServices] = useState<string[]>(
    initial?.services ?? []
  );

  const defaults = useMemo<ProjectAdminInput>(
    () => ({
      title: initial?.title ?? "",
      slug: initial?.slug ?? "",
      summary: initial?.summary ?? "",
      category: initial?.category ?? "Digital flagship",
      year: initial?.year ?? "2026",
      client: initial?.client ?? "",
      accentColor: initial?.accentColor ?? "#d8ff61",
      services: initial?.services ?? [],
      metric: initial?.metric ?? "",
      status: initial?.status ?? "draft",
      featured: initial?.featured ?? false,
      seoTitle: initial?.seoTitle ?? "",
      seoDescription: initial?.seoDescription ?? "",
    }),
    [initial]
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProjectAdminInput>({
    resolver: zodResolver(projectAdminSchema),
    defaultValues: defaults,
  });

  function toggleService(service: string) {
    const next = selectedServices.includes(service)
      ? selectedServices.filter((item) => item !== service)
      : [...selectedServices, service];

    setSelectedServices(next);
    setValue("services", next, { shouldValidate: true });
  }

  async function submit(data: ProjectAdminInput) {
    const response = await fetch(
      projectId ? `/api/admin/projects/${projectId}` : "/api/admin/projects",
      {
        method: projectId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      toast.error("Project could not be saved.");
      return;
    }

    toast.success(projectId ? "Project updated." : "Project created.");
  }

  const input = "w-full border-b hairline bg-transparent py-4 outline-none";

  return (
    <form onSubmit={handleSubmit(submit)} className="grid gap-10">
      <section className="grid gap-6 border hairline bg-[var(--surface-raised)] p-6 md:grid-cols-2">
        <div>
          <label className="eyebrow">Title</label>
          <input className={input} {...register("title")} />
        </div>
        <div>
          <label className="eyebrow">Slug</label>
          <input className={input} {...register("slug")} />
        </div>
        <div className="md:col-span-2">
          <label className="eyebrow">Summary</label>
          <textarea className={`${input} min-h-32`} {...register("summary")} />
        </div>
        <div>
          <label className="eyebrow">Category</label>
          <input className={input} {...register("category")} />
        </div>
        <div>
          <label className="eyebrow">Year</label>
          <input className={input} {...register("year")} />
        </div>
        <div>
          <label className="eyebrow">Client</label>
          <input className={input} {...register("client")} />
        </div>
        <div>
          <label className="eyebrow">Accent color</label>
          <input type="color" className="mt-4 h-12 w-full bg-transparent" {...register("accentColor")} />
        </div>
      </section>

      <section className="border hairline bg-[var(--surface-raised)] p-6">
        <p className="eyebrow">Services</p>
        <div className="mt-5 flex flex-wrap gap-3">
          {services.map((service) => (
            <button
              key={service}
              type="button"
              onClick={() => toggleService(service)}
              className={
                selectedServices.includes(service)
                  ? "rounded-full bg-[var(--accent-primary)] px-4 py-3 text-xs uppercase tracking-[.13em] text-black"
                  : "rounded-full border hairline px-4 py-3 text-xs uppercase tracking-[.13em]"
              }
            >
              {service}
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-6 border hairline bg-[var(--surface-raised)] p-6 md:grid-cols-2">
        <div>
          <label className="eyebrow">Metric</label>
          <input className={input} {...register("metric")} />
        </div>
        <div>
          <label className="eyebrow">Status</label>
          <select className={input} {...register("status")}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <label className="flex items-center gap-3">
          <input type="checkbox" {...register("featured")} />
          Featured project
        </label>
      </section>

      <section className="grid gap-6 border hairline bg-[var(--surface-raised)] p-6">
        <div>
          <label className="eyebrow">SEO title</label>
          <input className={input} {...register("seoTitle")} />
        </div>
        <div>
          <label className="eyebrow">SEO description</label>
          <textarea className={`${input} min-h-28`} {...register("seoDescription")} />
        </div>
      </section>

      {Object.keys(errors).length > 0 && (
        <p className="text-sm text-[var(--status-error)]">
          Review the highlighted project fields.
        </p>
      )}

      <button disabled={isSubmitting} className="btn-primary justify-self-start">
        {isSubmitting ? "Saving…" : "Save project"}
      </button>
    </form>
  );
}
