"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Magnetic } from "@/components/cursor/magnetic";

function HelsinkiClock() {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const update = () => {
      setTime(new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Helsinki",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date()));
    };
    update();
    const id = window.setInterval(update, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return <span>{time} EET</span>;
}

export function SiteFooter() {
  return (
    <footer className="footer-shell">
      <div className="footer-marquee" aria-hidden="true">
        <div>
          <span>BUILD BETTER SYSTEMS</span><i>●</i><span>SHIP WITH CLARITY</span><i>●</i><span>DESIGN FOR MOMENTUM</span><i>●</i>
          <span>BUILD BETTER SYSTEMS</span><i>●</i><span>SHIP WITH CLARITY</span><i>●</i><span>DESIGN FOR MOMENTUM</span><i>●</i>
        </div>
      </div>
      <div className="site-container footer-grid">
        <div>
          <p className="footer-kicker">Have a complex digital problem?</p>
          <h2>LET&apos;S MAKE<br />THE NEXT MOVE.</h2>
        </div>
        <div className="footer-links">
          <Magnetic><a href="mailto:hello@softbridgesolutions.com" data-cursor="link">hello@softbridgesolutions.com <ArrowUpRight size={16} /></a></Magnetic>
          <div>
            <Link href="/about">About</Link><Link href="/careers">Careers</Link><Link href="/contact">Contact</Link><Link href="/privacy">Privacy</Link>
          </div>
        </div>
        <div className="footer-meta">
          <p><span>Helsinki</span><HelsinkiClock /></p>
          <p><span>Availability</span><strong><i /> Accepting Q4 projects</strong></p>
          <p><span>Network</span><a href="https://www.linkedin.com" rel="noreferrer" target="_blank">LinkedIn ↗</a></p>
        </div>
      </div>
      <div className="site-container footer-bottom">
        <span>© {new Date().getFullYear()} Softbridge Solutions Finland</span>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Back to top ↑</button>
      </div>
    </footer>
  );
}
