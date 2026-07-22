import { NextResponse } from "next/server";
import { log } from "@/lib/logger";

export async function POST(request:Request){
  const metric=await request.json().catch(()=>null);
  if(metric) log("info","web-vital",metric);
  return NextResponse.json({ok:true});
}
