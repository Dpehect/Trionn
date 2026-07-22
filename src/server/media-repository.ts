import { supabaseAdmin } from "@/lib/supabase-admin";

export const mediaRepository = {
  async list() {
    if (!supabaseAdmin) return [];

    const { data, error } = await supabaseAdmin
      .from("media")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data ?? [];
  },

  async create(input: {
    storagePath: string;
    mimeType: string;
    altText: string;
  }) {
    if (!supabaseAdmin) {
      return {
        id: crypto.randomUUID(),
        storage_path: input.storagePath,
        mime_type: input.mimeType,
        alt_text: input.altText,
        created_at: new Date().toISOString(),
      };
    }

    const { data, error } = await supabaseAdmin
      .from("media")
      .insert({
        storage_path: input.storagePath,
        mime_type: input.mimeType,
        alt_text: input.altText,
      })
      .select("*")
      .single();

    if (error) throw error;
    return data;
  },

  async remove(id: string, storagePath: string) {
    if (!supabaseAdmin) return true;

    await supabaseAdmin.storage.from("project-media").remove([storagePath]);
    const { error } = await supabaseAdmin.from("media").delete().eq("id", id);
    if (error) throw error;
    return true;
  },
};
