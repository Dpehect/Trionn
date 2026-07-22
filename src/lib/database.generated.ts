export type Json =
  | string | number | boolean | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: { id:string; email:string; full_name:string|null; role:"admin"|"editor"|"viewer"; avatar_url:string|null; created_at:string; updated_at:string };
        Insert: { id:string; email:string; full_name?:string|null; role?:"admin"|"editor"|"viewer"; avatar_url?:string|null; created_at?:string; updated_at?:string };
        Update: { email?:string; full_name?:string|null; role?:"admin"|"editor"|"viewer"; avatar_url?:string|null; updated_at?:string };
        Relationships: [];
      };
      projects: {
        Row: { id:string; slug:string; title:string; subtitle:string|null; summary:string; category_id:string|null; year:string; client:string|null; accent_color:string|null; cover_media_id:string|null; services:Json; metric:string|null; status:"draft"|"published"|"archived"; featured:boolean; sort_order:number; seo_title:string|null; seo_description:string|null; published_at:string|null; created_at:string; updated_at:string };
        Insert: { slug:string; title:string; summary:string; year:string; subtitle?:string|null; category_id?:string|null; client?:string|null; accent_color?:string|null; cover_media_id?:string|null; services?:Json; metric?:string|null; status?:"draft"|"published"|"archived"; featured?:boolean; sort_order?:number; seo_title?:string|null; seo_description?:string|null; published_at?:string|null };
        Update: { slug?:string; title?:string; summary?:string; year?:string; subtitle?:string|null; category_id?:string|null; client?:string|null; accent_color?:string|null; cover_media_id?:string|null; services?:Json; metric?:string|null; status?:"draft"|"published"|"archived"; featured?:boolean; sort_order?:number; seo_title?:string|null; seo_description?:string|null; published_at?:string|null; updated_at?:string };
        Relationships: [];
      };
      project_blocks: {
        Row: { id:string; project_id:string; block_type:string; content:Json; sort_order:number; created_at:string; updated_at:string };
        Insert: { project_id:string; block_type:string; content:Json; sort_order?:number };
        Update: { block_type?:string; content?:Json; sort_order?:number; updated_at?:string };
        Relationships: [];
      };
      media: {
        Row: { id:string; storage_path:string; mime_type:string; width:number|null; height:number|null; duration:number|null; alt_text:string|null; blur_hash:string|null; created_at:string };
        Insert: { storage_path:string; mime_type:string; width?:number|null; height?:number|null; duration?:number|null; alt_text?:string|null; blur_hash?:string|null };
        Update: { alt_text?:string|null; blur_hash?:string|null };
        Relationships: [];
      };
      inquiries: {
        Row: { id:string; name:string; email:string; company:string; budget:string; message:string; status:"new"|"reviewing"|"closed"; project_type:string|null; timeline:string|null; services:Json; attachments:Json; assigned_to:string|null; created_at:string; updated_at:string };
        Insert: { name:string; email:string; company:string; budget:string; message:string; status?:"new"|"reviewing"|"closed"; project_type?:string|null; timeline?:string|null; services?:Json; attachments?:Json; assigned_to?:string|null };
        Update: { status?:"new"|"reviewing"|"closed"; assigned_to?:string|null; updated_at?:string };
        Relationships: [];
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  };
};
