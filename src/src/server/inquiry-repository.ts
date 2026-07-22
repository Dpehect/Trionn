import { promises as fs } from "node:fs";
import path from "node:path";
import type { Inquiry, InquiryInput } from "@/lib/inquiry-schema";
import { supabaseAdmin } from "@/lib/supabase-admin";

const dataPath = path.join(process.cwd(), "src", "data", "inquiries.json");

async function readLocal(): Promise<Inquiry[]> {
  try {
    const raw = await fs.readFile(dataPath, "utf8");
    return JSON.parse(raw) as Inquiry[];
  } catch {
    return [];
  }
}

async function writeLocal(items: Inquiry[]) {
  if (process.env.VERCEL) return;
  await fs.writeFile(dataPath, JSON.stringify(items, null, 2), "utf8");
}

export const inquiryRepository = {
  async list(): Promise<Inquiry[]> {
    if (supabaseAdmin) {
      const { data, error } = await supabaseAdmin
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      return (data ?? []).map((row) => ({
        id: row.id,
        name: row.name,
        email: row.email,
        company: row.company,
        budget: row.budget,
        message: row.message,
        status: row.status,
        createdAt: row.created_at,
      }));
    }

    return readLocal();
  },

  async create(input: InquiryInput): Promise<Inquiry> {
    if (supabaseAdmin) {
      const { data, error } = await supabaseAdmin
        .from("inquiries")
        .insert({
          name: input.name,
          email: input.email,
          company: input.company,
          budget: input.budget,
          message: input.message,
          status: "new",
        })
        .select("*")
        .single();

      if (error) throw error;

      return {
        id: data.id,
        name: data.name,
        email: data.email,
        company: data.company,
        budget: data.budget,
        message: data.message,
        status: data.status,
        createdAt: data.created_at,
      };
    }

    const current = await readLocal();
    const created: Inquiry = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      status: "new",
    };
    current.unshift(created);
    await writeLocal(current);
    return created;
  },

  async updateStatus(id: string, status: Inquiry["status"]) {
    if (!supabaseAdmin) {
      const current = await readLocal();
      const next = current.map((item) => (item.id === id ? { ...item, status } : item));
      await writeLocal(next);
      return next.find((item) => item.id === id) ?? null;
    }

    const { data, error } = await supabaseAdmin
      .from("inquiries")
      .update({ status })
      .eq("id", id)
      .select("*")
      .single();

    if (error) throw error;
    return data;
  },
};
