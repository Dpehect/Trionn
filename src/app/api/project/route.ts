import { NextResponse } from "next/server";
import { projectSchema } from "@/lib/project-schema";
export async function POST(request: Request){
  const body = await request.json().catch(()=>null);
  const parsed = projectSchema.safeParse(body);
  if(!parsed.success) return NextResponse.json({ok:false,issues:parsed.error.flatten()},{status:400});
  return NextResponse.json({ok:true,id:crypto.randomUUID(),receivedAt:new Date().toISOString()},{status:201});
}
