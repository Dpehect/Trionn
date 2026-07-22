import Link from "next/link";
export function Footer() { return <footer className="mt-24 border-t bg-[var(--foreground)] text-[var(--background)]">
  <div className="container-shell grid gap-12 py-14 md:grid-cols-[2fr_1fr_1fr]">
    <div><p className="display !text-[clamp(3rem,8vw,7rem)]">SABLE</p><p className="mt-6 max-w-md text-sm leading-6 opacity-70">Independent clothing shaped by proportion, movement and long-term use.</p></div>
    <div><p className="eyebrow mb-5 opacity-60">Explore</p><div className="grid gap-3 text-sm"><Link href="/shop">Shop all</Link><Link href="/collections">Collections</Link><Link href="/lookbook">Lookbook</Link><Link href="/journal">Journal</Link></div></div>
    <div><p className="eyebrow mb-5 opacity-60">Information</p><div className="grid gap-3 text-sm"><Link href="/about">Studio</Link><Link href="/contact">Contact</Link><Link href="/account">Account</Link><Link href="/admin">Admin demo</Link></div></div>
  </div>
  <div className="container-shell flex flex-col gap-3 border-t border-white/20 py-5 text-xs opacity-60 sm:flex-row sm:justify-between"><span>© 2026 SABLE</span><span>Designed as a production-ready reference build.</span></div>
</footer>; }
