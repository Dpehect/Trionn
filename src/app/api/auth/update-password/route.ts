import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const schema=z.object({password:z.string().min(12).max(128)});
export async function POST(request:Request){
  const body=await request.json().catch(()=>null);
  const parsed=schema.safeParse(body);
  if(!parsed.success) return NextResponse.json({error:"VALIDATION_ERROR"},{status:400});
  const supabase=await createSupabaseServerClient();
  if(!supabase) return NextResponse.json({error:"AUTH_NOT_CONFIGURED"},{status:503});
  const {error}=await supabase.auth.updateUser({password:parsed.data.password});
  return error ? NextResponse.json({error:"UPDATE_FAILED"},{status:400}) : NextResponse.json({ok:true});
}
