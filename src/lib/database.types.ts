export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          role: "admin" | "editor" | "viewer";
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      projects: {
        Row: {
          id: string;
          slug: string;
          title: string;
          subtitle: string | null;
          summary: string;
          category_id: string | null;
          year: string;
          client: string | null;
          accent_color: string | null;
          cover_media_id: string | null;
          services: Json;
          metric: string | null;
          status: "draft" | "published" | "archived";
          featured: boolean;
          sort_order: number;
          seo_title: string | null;
          seo_description: string | null;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      project_blocks: {
        Row: {
          id: string;
          project_id: string;
          block_type: string;
          content: Json;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
      };
      inquiries: {
        Row: {
          id: string;
          name: string;
          email: string;
          company: string;
          budget: string;
          message: string;
          status: "new" | "reviewing" | "closed";
          project_type: string | null;
          timeline: string | null;
          services: Json;
          attachments: Json;
          assigned_to: string | null;
          created_at: string;
          updated_at: string;
        };
      };
    };
  };
};
