import { NextResponse } from "next/server";
export async function GET(){
  return NextResponse.json({
    version:process.env.VERCEL_GIT_COMMIT_SHA?.slice(0,7) || "local",
    environment:process.env.VERCEL_ENV || "development",
    deployedAt:process.env.BUILD_TIMESTAMP || null,
  });
}
