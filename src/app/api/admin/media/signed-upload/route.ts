import { NextResponse } from "next/server";
import { z } from "zod";
import { requireApiRole } from "@/server/api-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";

const schema=z.object({filename:z.string().min(1).max(180),folder:z.string().default("projects")});
export async function POST(request:Request){
  const auth=await requireApiRole(["admin","editor"]);
  if(!auth.ok) return NextResponse.json(auth,{status:401});
  if(!supabaseAdmin) return NextResponse.json({error:"STORAGE_NOT_CONFIGURED"},{status:503});
  const parsed=schema.safeParse(await request.json().catch(()=>null));
  if(!parsed.success) return NextResponse.json({error:"VALIDATION_ERROR"},{status:400});
  const safe=parsed.data.filename.toLowerCase().replace(/[^a-z0-9.-]+/g,"-");
  const path=`${parsed.data.folder}/${crypto.randomUUID()}-${safe}`;
  const {data,error}=await supabaseAdmin.storage.from("project-media").createSignedUploadUrl(path);
  return error ? NextResponse.json({error:"SIGNED_URL_FAILED"},{status:500}) : NextResponse.json({ok:true,path,...data});
}
