import { promises as fs } from "node:fs";
import path from "node:path";
import type { Inquiry, InquiryInput } from "@/lib/inquiry-schema";

const dataPath = path.join(process.cwd(), "src", "data", "inquiries.json");

async function readAll(): Promise<Inquiry[]> {
  try {
    const raw = await fs.readFile(dataPath, "utf8");
    return JSON.parse(raw) as Inquiry[];
  } catch {
    return [];
  }
}

async function writeAll(items: Inquiry[]) {
  if (process.env.VERCEL) return;
  await fs.writeFile(dataPath, JSON.stringify(items, null, 2), "utf8");
}

export const inquiryRepository = {
  async list() {
    return readAll();
  },
  async create(input: InquiryInput): Promise<Inquiry> {
    const current = await readAll();
    const created: Inquiry = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      status: "new",
    };
    current.unshift(created);
    await writeAll(current);
    return created;
  },
};
