import { SiteHeader } from "@/components/site-header";
import { inquiryRepository } from "@/server/inquiry-repository";
import { projects } from "@/data/projects";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SignOutButton } from "@/components/sign-out-button";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const session = await auth();
  if (!session?.user) redirect("/login");
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
        <div className="flex items-center justify-between"><p className="eyebrow">Client portal / {session.user.email}</p><SignOutButton /></div>
        <h1 className="mt-8 text-6xl tracking-[-.07em] md:text-9xl">CONTROL ROOM</h1>

        <div className="mt-16 grid gap-px border hairline bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map(([label, value]) => (
            <article key={label} className="flex min-h-44 flex-col justify-between bg-[var(--bg)] p-6">
              <p className="eyebrow">{label}</p>
              <strong className="text-5xl tracking-[-.06em]">{value}</strong>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_.8fr]">
          <section className="border hairline p-6">
            <div className="flex items-center justify-between"><p className="eyebrow">Latest inquiries</p><span className="eyebrow">{inquiries.length} total</span></div>
            <div className="mt-6">
              {inquiries.length === 0 ? (
                <p className="py-16 text-center text-[var(--muted)]">No inquiries yet. Submit the contact form to create one locally.</p>
              ) : inquiries.slice(0, 6).map((item) => (
                <article key={item.id} className="grid gap-3 border-t hairline py-5 md:grid-cols-[1fr_1fr_auto]">
                  <div><strong>{item.name}</strong><p className="text-sm text-[var(--muted)]">{item.company}</p></div>
                  <p className="text-sm text-[var(--muted)]">{item.email}</p>
                  <span className="eyebrow">{item.status}</span>
                </article>
              ))}
            </div>
          </section>

          <section className="border hairline p-6">
            <p className="eyebrow">API endpoints</p>
            <div className="mt-8 space-y-5 font-mono text-sm">
              <div className="border-b hairline pb-4"><span className="text-[var(--acid)]">GET</span> /api/projects</div>
              <div className="border-b hairline pb-4"><span className="text-[var(--acid)]">GET</span> /api/inquiries</div>
              <div className="border-b hairline pb-4"><span className="text-[var(--acid)]">POST</span> /api/inquiries</div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
