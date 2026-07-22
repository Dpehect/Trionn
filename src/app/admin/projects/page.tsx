import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { projects } from "@/data/projects";
import { SiteHeader } from "@/components/site-header";

export default async function AdminProjectsPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") redirect("/login");

  return (
    <main>
      <SiteHeader />
      <section className="container-x min-h-screen pb-24 pt-36">
        <p className="eyebrow">Administration</p>
        <h1 className="mt-8 text-6xl tracking-[-.07em] md:text-9xl">PROJECT CMS</h1>

        <div className="mt-16 grid gap-5">
          {projects.map((project) => (
            <article key={project.slug} className="grid gap-6 border hairline p-6 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="eyebrow">{project.category} / {project.year}</p>
                <h2 className="mt-3 text-4xl tracking-[-.05em]">{project.title}</h2>
                <p className="mt-3 text-[var(--muted)]">{project.summary}</p>
              </div>
              <button className="rounded-full border hairline px-5 py-3 text-xs uppercase tracking-[.14em]">
                Edit
              </button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
