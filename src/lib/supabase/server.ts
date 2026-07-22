import "server-only";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { Database } from "@/lib/database";
import { env, getSupabasePublicKey } from "@/lib/env";

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  const publicKey = getSupabasePublicKey();

  if (!env.NEXT_PUBLIC_SUPABASE_URL || !publicKey) {
    return null;
  }

  return createServerClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    publicKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Server Components may not be able to set cookies.
          }
        },
      },
    }
  );
}
