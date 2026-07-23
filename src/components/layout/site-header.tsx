import Link from "next/link";
import { Magnetic } from "@/components/motion/magnetic";

const links = ["Services", "Work", "Careers", "Contact"];

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 md:px-8">
      <Link href="/" className="text-sm font-semibold tracking-[-0.02em]">Softbridge Finland</Link>
      <nav className="hidden items-center gap-7 text-xs uppercase tracking-[0.18em] text-white/60 md:flex">
        {links.map((label) => (
          <Magnetic key={label}><Link href={`#${label.toLowerCase()}`}>{label}</Link></Magnetic>
        ))}
      </nav>
      <Magnetic><Link href="#contact" className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs">Start a project</Link></Magnetic>
    </header>
  );
}
