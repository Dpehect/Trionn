import { notFound } from "next/navigation";
import { ProjectEditor } from "@/components/admin/project-editor";
import { supabaseAdmin } from "@/lib/supabase-admin";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!supabaseAdmin) {
    return (
      <div>
        <p className="eyebrow">Edit project</p>
        <h1 className="display-lg mt-6">LOCAL MODE</h1>
        <p className="body-lg mt-8 text-[var(--text-secondary)]">
          Connect Supabase to edit persisted projects.
        </p>
      </div>
    );
  }

  const { data } = await supabaseAdmin.from("projects").select("*").eq("id", id).single();
  if (!data) notFound();

  return (
    <div>
      <p className="eyebrow">Edit project</p>
      <h1 className="display-lg mt-6">{data.title}</h1>
      <div className="mt-10">
        <ProjectEditor
          projectId={data.id}
          initial={{
            title: data.title,
            slug: data.slug,
            summary: data.summary,
            category: "Digital flagship",
            year: data.year,
            client: data.client ?? "",
            accentColor: data.accent_color ?? "#d8ff61",
            services: Array.isArray(data.services) ? data.services as string[] : [],
            metric: data.metric ?? "",
            status: data.status,
            featured: data.featured,
            seoTitle: data.seo_title ?? "",
            seoDescription: data.seo_description ?? "",
          }}
        />
      </div>
    </div>
  );
}
