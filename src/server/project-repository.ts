import { projects as fallbackProjects } from "@/data/projects";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const projectRepository = {
  async listPublished() {
    if (!supabaseAdmin) return fallbackProjects;

    const { data, error } = await supabaseAdmin
      .from("projects")
      .select("*, project_blocks(*)")
      .eq("status", "published")
      .order("sort_order", { ascending: true });

    if (error) throw error;
    return data ?? [];
  },

  async getBySlug(slug: string) {
    if (!supabaseAdmin) {
      return fallbackProjects.find((project) => project.slug === slug) ?? null;
    }

    const { data, error } = await supabaseAdmin
      .from("projects")
      .select("*, project_blocks(*)")
      .eq("slug", slug)
      .single();

    if (error) return null;
    return data;
  },
};
