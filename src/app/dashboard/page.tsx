import { SiteHeader } from "@/components/site-header";
import { inquiryRepository } from "@/server/inquiry-repository";
import { projects } from "@/data/projects";
import { requireRole } from "@/server/auth-session";
import { SupabaseSignOutButton } from "@/components/supabase-sign-out-button";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const profile = await requireRole(["admin", "editor", "viewer"]);
  const inquiries = await inquiryRepository.list();

  const metrics = [
    ["Published projects", String(projects.length)],
    ["Project inquiries", String(inquiries.length)],
    ["Experience score", "94"],
    ["System status", "100%"],
  ];

  return (
    <main>
      <SiteHeader />

      <section className="container-x min-h-screen pb-20 pt-36">
        <div className="flex items-center justify-between gap-6">
          <p className="eyebrow">
            Client portal / {profile.email}
          </p>
          <SupabaseSignOutButton />
        </div>

        <h1 className="mt-8 text-6xl tracking-[-.07em] md:text-9xl">
          CONTROL ROOM
        </h1>

        <div className="mt-16 grid gap-px border hairline bg-[var(--border-soft)] sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map(([label, value]) => (
            <article
              key={label}
              className="flex min-h-44 flex-col justify-between bg-[var(--surface-base)] p-6"
            >
              <p className="eyebrow">{label}</p>
              <strong className="text-5xl tracking-[-.06em]">{value}</strong>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_.8fr]">
          <section className="border hairline p-6">
            <div className="flex items-center justify-between gap-6">
              <p className="eyebrow">Latest inquiries</p>
              <span className="eyebrow">{inquiries.length} total</span>
            </div>

            <div className="mt-6">
              {inquiries.length === 0 ? (
                <p className="py-16 text-center text-[var(--text-secondary)]">
                  No inquiries yet.
                </p>
              ) : (
                inquiries.slice(0, 6).map((item) => (
                  <article
                    key={item.id}
                    className="grid gap-3 border-t hairline py-5 md:grid-cols-[1fr_1fr_auto]"
                  >
                    <div>
                      <strong>{item.name}</strong>
                      <p className="text-sm text-[var(--text-secondary)]">
                        {item.company}
                      </p>
                    </div>

                    <p className="text-sm text-[var(--text-secondary)]">
                      {item.email}
                    </p>

                    <span className="eyebrow">{item.status}</span>
                  </article>
                ))
              )}
            </div>
          </section>

          <section className="border hairline p-6">
            <p className="eyebrow">API endpoints</p>

            <div className="mt-8 space-y-5 font-mono text-sm">
              <div className="border-b hairline pb-4">
                <span className="text-[var(--accent-primary)]">GET</span>{" "}
                /api/projects
              </div>
              <div className="border-b hairline pb-4">
                <span className="text-[var(--accent-primary)]">GET</span>{" "}
                /api/inquiries
              </div>
              <div className="border-b hairline pb-4">
                <span className="text-[var(--accent-primary)]">POST</span>{" "}
                /api/inquiries
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
