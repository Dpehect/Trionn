import { supabaseAdmin } from "@/lib/supabase-admin";

export async function writeAudit(input: {
  userId?: string | null;
  action: string;
  entityType: string;
  entityId?: string | null;
  payload?: Record<string, unknown>;
}) {
  if (!supabaseAdmin) return;
  await supabaseAdmin.from("audit_logs").insert({
    user_id: input.userId ?? null,
    action: input.action,
    entity_type: input.entityType,
    entity_id: input.entityId ?? null,
    payload: input.payload ?? {},
  });
}
