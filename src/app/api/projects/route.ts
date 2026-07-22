import { NextResponse } from "next/server";
import { projects } from "@/data/projects";

export async function GET() {
  return NextResponse.json({
    items: projects,
    count: projects.length,
    generatedAt: new Date().toISOString(),
  });
}
