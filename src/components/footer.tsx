import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t hairline">
      <div className="container-x section-space">
        <div className="grid gap-12 md:grid-cols-[1fr_.35fr] md:items-end">
          <div>
            <p className="eyebrow">Start a project</p>
            <Link href="/contact" className="display-lg mt-6 block transition-transform duration-500 hover:translate-x-3">
              MAKE THE
              <br />
              NEXT MOVE.
            </Link>
          </div>

          <div className="grid gap-8 text-sm text-[var(--text-secondary)]">
            <div>
              <p className="eyebrow">Location</p>
              <p className="mt-3">Istanbul / Remote</p>
            </div>
            <div>
              <p className="eyebrow">Contact</p>
              <a className="mt-3 block text-[var(--text-primary)]" href="mailto:hello@example.com">
                hello@example.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-24 flex flex-wrap items-center justify-between gap-6 border-t hairline pt-6 text-xs uppercase tracking-[.16em] text-[var(--text-secondary)]">
          <span>Independent digital studio</span>
          <div className="flex gap-6">
            <a href="#" aria-label="Instagram">Instagram</a>
            <a href="#" aria-label="LinkedIn">LinkedIn</a>
            <a href="#" aria-label="Behance">Behance</a>
          </div>
          <span>© 2026</span>
        </div>
      </div>
    </footer>
  );
}
