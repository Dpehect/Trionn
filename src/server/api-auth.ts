import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { AppRole } from "@/lib/auth-roles";
import { failure, success } from "@/lib/result";

export async function requireApiRole(allowed: AppRole[]) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return failure("UNAUTHORIZED", "Authentication is not configured.");

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return failure("UNAUTHORIZED", "Sign in required.");

  const { data: profile } = await supabase
    .from("profiles")
    .select("id,email,full_name,role")
    .eq("id", user.id)
    .single();

  if (!profile) return failure("UNAUTHORIZED", "Profile not found.");
  if (!allowed.includes(profile.role)) return failure("FORBIDDEN", "Insufficient role.");

  return success(profile);
}
