import Link from "next/link";
import { Plus, ArrowUpRight } from "lucide-react";
import { projectAdminRepository } from "@/server/project-admin-repository";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await projectAdminRepository.list();

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Content</p>
          <h1 className="display-lg mt-6">PROJECTS</h1>
        </div>
        <Link href="/admin/projects/new" className="btn-primary">
          <Plus size={16} />
          New project
        </Link>
      </div>

      <div className="mt-10 grid gap-4">
        {projects.length === 0 ? (
          <div className="border hairline bg-[var(--surface-raised)] p-12 text-center">
            <p className="text-[var(--text-secondary)]">No database projects yet.</p>
          </div>
        ) : (
          projects.map((project: any) => (
            <Link
              key={project.id}
              href={`/admin/projects/${project.id}`}
              className="group grid gap-6 border hairline bg-[var(--surface-raised)] p-6 md:grid-cols-[1fr_auto] md:items-center"
            >
              <div>
                <p className="eyebrow">{project.status} / {project.year}</p>
                <h2 className="heading-lg mt-3">{project.title}</h2>
                <p className="body-md mt-3 max-w-2xl text-[var(--text-secondary)]">
                  {project.summary}
                </p>
              </div>
              <ArrowUpRight className="transition-transform group-hover:rotate-45" />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
