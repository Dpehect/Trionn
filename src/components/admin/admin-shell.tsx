import Link from "next/link";
import { LayoutDashboard, FolderKanban, Inbox, Images, Settings } from "lucide-react";

const items = [
  ["/admin", "Overview", LayoutDashboard],
  ["/admin/projects", "Projects", FolderKanban],
  ["/admin/inquiries", "Inquiries", Inbox],
  ["/admin/media", "Media", Images],
  ["/admin/settings", "Settings", Settings],
] as const;

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--surface-base)]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r hairline bg-[var(--surface-raised)] lg:block">
        <div className="flex h-20 items-center border-b hairline px-6">
          <Link href="/" className="text-2xl font-black tracking-[-.06em]">ATELIER/X</Link>
        </div>
        <nav className="grid gap-2 p-4">
          {items.map(([href, label, Icon]) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-[var(--radius-sm)] px-4 py-3 text-sm text-[var(--text-secondary)] transition-colors hover:bg-white/5 hover:text-[var(--text-primary)]"
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b hairline bg-[color:rgba(8,9,8,.8)] px-5 backdrop-blur-xl md:px-8">
          <p className="eyebrow">Administration</p>
          <Link href="/" className="btn-secondary">View site</Link>
        </header>
        <main className="p-5 md:p-8">{children}</main>
      </div>
    </div>
  );
}
