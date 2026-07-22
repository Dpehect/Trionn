import { supabaseAdmin } from "@/lib/supabase-admin";
import type { ProjectAdminInput } from "@/lib/project-admin-schema";

export const projectAdminRepository = {
  async list() {
    if (!supabaseAdmin) return [];

    const { data, error } = await supabaseAdmin
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) throw error;
    return data ?? [];
  },

  async create(input: ProjectAdminInput) {
    if (!supabaseAdmin) {
      return {
        id: crypto.randomUUID(),
        ...input,
        created_at: new Date().toISOString(),
      };
    }

    const { data, error } = await supabaseAdmin
      .from("projects")
      .insert({
        title: input.title,
        slug: input.slug,
        summary: input.summary,
        category_id: null,
        year: input.year,
        client: input.client || null,
        accent_color: input.accentColor,
        services: input.services,
        metric: input.metric || null,
        status: input.status,
        featured: input.featured,
        seo_title: input.seoTitle || null,
        seo_description: input.seoDescription || null,
      })
      .select("*")
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, input: ProjectAdminInput) {
    if (!supabaseAdmin) return { id, ...input };

    const { data, error } = await supabaseAdmin
      .from("projects")
      .update({
        title: input.title,
        slug: input.slug,
        summary: input.summary,
        year: input.year,
        client: input.client || null,
        accent_color: input.accentColor,
        services: input.services,
        metric: input.metric || null,
        status: input.status,
        featured: input.featured,
        seo_title: input.seoTitle || null,
        seo_description: input.seoDescription || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select("*")
      .single();

    if (error) throw error;
    return data;
  },

  async remove(id: string) {
    if (!supabaseAdmin) return true;
    const { error } = await supabaseAdmin.from("projects").delete().eq("id", id);
    if (error) throw error;
    return true;
  },
};
