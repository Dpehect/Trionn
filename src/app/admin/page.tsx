import { MetricCard } from "@/components/admin/metric-card";
import { getAdminMetrics } from "@/server/admin-metrics";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  const metrics = await getAdminMetrics();

  return (
    <div>
      <p className="eyebrow">Overview</p>
      <h1 className="display-lg mt-6">CONTROL ROOM</h1>

      <section className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Projects" value={metrics.projects} note={`${metrics.published} published`} />
        <MetricCard label="Drafts" value={metrics.drafts} note="Awaiting review" />
        <MetricCard label="Inquiries" value={metrics.inquiries} note={`${metrics.newInquiries} new`} />
        <MetricCard label="Reviewing" value={metrics.reviewing} note={`${metrics.closed} closed`} />
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-[1.4fr_.6fr]">
        <article className="border hairline bg-[var(--surface-raised)] p-6">
          <div className="flex items-center justify-between">
            <p className="eyebrow">Recent activity</p>
            <span className="eyebrow">{metrics.recentActivity.length} entries</span>
          </div>
          <div className="mt-6">
            {metrics.recentActivity.length === 0 ? (
              <p className="py-16 text-center text-[var(--text-secondary)]">No activity yet.</p>
            ) : (
              metrics.recentActivity.map((item: any) => (
                <div key={item.id} className="grid gap-3 border-t hairline py-5 md:grid-cols-[1fr_auto]">
                  <div>
                    <p>{item.title ?? item.action}</p>
                    <p className="mt-1 text-sm text-[var(--text-secondary)]">{item.type ?? item.entity_type}</p>
                  </div>
                  <span className="eyebrow">
                    {new Date(item.createdAt ?? item.created_at).toLocaleDateString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </article>

        <article className="border hairline bg-[var(--surface-raised)] p-6">
          <p className="eyebrow">Inquiry pipeline</p>
          <div className="mt-8 grid gap-6">
            {[
              ["New", metrics.newInquiries],
              ["Reviewing", metrics.reviewing],
              ["Closed", metrics.closed],
            ].map(([label, value]) => (
              <div key={String(label)}>
                <div className="flex items-center justify-between">
                  <span>{label}</span>
                  <span className="eyebrow">{value}</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full bg-[var(--accent-primary)]"
                    style={{
                      width: `${Math.max(
                        8,
                        (Number(value) / Math.max(1, metrics.inquiries)) * 100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
