import { NextResponse } from "next/server";
import { blockCollectionSchema } from "@/lib/case-study-block-schema";
import { requireApiRole } from "@/server/api-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function PUT(request:Request,{params}:{params:Promise<{id:string}>}){
  const auth=await requireApiRole(["admin","editor"]);
  if(!auth.ok) return NextResponse.json(auth,{status:auth.error.code==="FORBIDDEN"?403:401});
  if(!supabaseAdmin) return NextResponse.json({error:"DATABASE_NOT_CONFIGURED"},{status:503});
  const {id}=await params;
  const body=await request.json().catch(()=>null);
  const parsed=blockCollectionSchema.safeParse(body);
  if(!parsed.success) return NextResponse.json({error:"VALIDATION_ERROR"},{status:400});

  await supabaseAdmin.from("project_blocks").delete().eq("project_id",id);
  if(parsed.data.length){
    const rows=parsed.data.map((block,index)=>({
      project_id:id,block_type:block.type,content:block,sort_order:index
    }));
    const {error}=await supabaseAdmin.from("project_blocks").insert(rows);
    if(error) return NextResponse.json({error:"SAVE_FAILED"},{status:500});
  }
  return NextResponse.json({ok:true});
}
