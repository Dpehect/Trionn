import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-forest px-3 pb-4 pt-6 text-white md:px-5">
      <div className="rounded-stage overflow-hidden border border-white/10 bg-[#082f23] px-5 py-12 md:px-10 md:py-16">
        <div className="grid gap-14 lg:grid-cols-[1.35fr_1fr]">
          <div>
            <p className="eyebrow text-white/50">A useful first conversation</p>
            <h2 className="heading-xl mt-8 max-w-[10ch] text-lime">Build software people can rely on.</h2>
            <Link href="/contact" className="magnetic-button button-lime mt-9">Start a project <ArrowUpRight size={16} /></Link>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm md:grid-cols-3">
            <div>
              <p className="eyebrow text-white/40">Explore</p>
              <div className="mt-5 grid gap-3">
                <Link href="/services">Services</Link>
                <Link href="/work">Work</Link>
                <Link href="/studio">Studio</Link>
              </div>
            </div>
            <div>
              <p className="eyebrow text-white/40">Contact</p>
              <div className="mt-5 grid gap-3">
                <a href="mailto:hello@softbridge.fi">hello@softbridge.fi</a>
                <span>Helsinki, Finland</span>
                <span>EET / EEST</span>
              </div>
            </div>
            <div>
              <p className="eyebrow text-white/40">Model</p>
              <div className="mt-5 grid gap-3 text-white/70">
                <span>Helsinki strategy</span>
                <span>Türkiye delivery</span>
                <span>One senior team</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-white/15 pt-6 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Softbridge. Independent product engineering studio.</p>
          <div className="flex gap-5"><Link href="/contact">Privacy</Link><a href="#main-content">Back to top ↑</a></div>
        </div>
      </div>
    </footer>
  );
}
