import { supabaseAdmin } from "@/lib/supabase-admin";
import { projects as fallbackProjects } from "@/data/projects";
import { inquiryRepository } from "@/server/inquiry-repository";

export async function getAdminMetrics() {
  const inquiries = await inquiryRepository.list();

  if (!supabaseAdmin) {
    return {
      projects: fallbackProjects.length,
      published: fallbackProjects.length,
      drafts: 0,
      inquiries: inquiries.length,
      newInquiries: inquiries.filter((item) => item.status === "new").length,
      reviewing: inquiries.filter((item) => item.status === "reviewing").length,
      closed: inquiries.filter((item) => item.status === "closed").length,
      recentActivity: inquiries.slice(0, 8).map((item) => ({
        id: item.id,
        type: "inquiry",
        title: `${item.name} / ${item.company}`,
        createdAt: item.createdAt,
      })),
    };
  }

  const [
    { count: projectCount },
    { count: publishedCount },
    { count: draftCount },
    { count: inquiryCount },
    { count: newInquiryCount },
    { count: reviewingCount },
    { count: closedCount },
    { data: recentAudit },
  ] = await Promise.all([
    supabaseAdmin.from("projects").select("*", { count: "exact", head: true }),
    supabaseAdmin.from("projects").select("*", { count: "exact", head: true }).eq("status", "published"),
    supabaseAdmin.from("projects").select("*", { count: "exact", head: true }).eq("status", "draft"),
    supabaseAdmin.from("inquiries").select("*", { count: "exact", head: true }),
    supabaseAdmin.from("inquiries").select("*", { count: "exact", head: true }).eq("status", "new"),
    supabaseAdmin.from("inquiries").select("*", { count: "exact", head: true }).eq("status", "reviewing"),
    supabaseAdmin.from("inquiries").select("*", { count: "exact", head: true }).eq("status", "closed"),
    supabaseAdmin.from("audit_logs").select("*").order("created_at", { ascending: false }).limit(8),
  ]);

  return {
    projects: projectCount ?? 0,
    published: publishedCount ?? 0,
    drafts: draftCount ?? 0,
    inquiries: inquiryCount ?? 0,
    newInquiries: newInquiryCount ?? 0,
    reviewing: reviewingCount ?? 0,
    closed: closedCount ?? 0,
    recentActivity: recentAudit ?? [],
  };
}
