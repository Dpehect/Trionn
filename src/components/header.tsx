"use client";
import Link from "next/link";
import { Menu, ArrowUpRight } from "lucide-react";
import { useState } from "react";

const links = [["Studio","#studio"],["Capabilities","#capabilities"],["Work","#work"],["Insights","#insights"],["Contact","#contact"]];

export function Header() {
  const [open,setOpen]=useState(false);
  return (
    <>
      <header className="fixed left-1/2 top-4 z-50 w-[min(1200px,calc(100%-24px))] -translate-x-1/2 rounded-full bg-white/95 px-5 py-3 shadow-soft backdrop-blur">
        <div className="flex items-center justify-between gap-5">
          <Link href="/" className="text-xl font-black tracking-[-.05em]">softbridge</Link>
          <nav className="hidden items-center gap-7 text-xs font-bold md:flex">
            {links.map(([label,href])=><a key={label} href={href}>{label}</a>)}
          </nav>
          <div className="flex items-center gap-2">
            <a href="#contact" className="pill bg-rose text-white">Start a project <ArrowUpRight size={14}/></a>
            <button aria-label="Open menu" className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 md:hidden" onClick={()=>setOpen(!open)}><Menu size={18}/></button>
          </div>
        </div>
      </header>
      {open && <div className="fixed inset-0 z-40 grid place-items-center bg-paper px-6 md:hidden"><div className="grid gap-8 text-center text-4xl">{links.map(([label,href])=><a key={label} href={href} onClick={()=>setOpen(false)}>{label}</a>)}</div></div>}
    </>
  );
}
