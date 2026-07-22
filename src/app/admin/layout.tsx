import { AdminShell } from "@/components/admin/admin-shell";
import { requireRole } from "@/server/auth-session";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole(["admin", "editor", "viewer"]);
  return <AdminShell>{children}</AdminShell>;
}
