import { NextResponse } from "next/server";
import type { Result } from "@/lib/result";

export function toResponse<T>(result: Result<T>, status = 200) {
  if (result.ok) return NextResponse.json(result, { status });

  const map = {
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    VALIDATION_ERROR: 400,
    CONFLICT: 409,
    INTERNAL_ERROR: 500,
  } as const;

  return NextResponse.json(result, { status: map[result.error.code] });
}
