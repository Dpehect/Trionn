"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const KEY = "softbridge-cookie-consent";

type Consent = "essential" | "all";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setVisible(!window.localStorage.getItem(KEY)); }, []);

  function choose(value: Consent) {
    window.localStorage.setItem(KEY, value);
    window.dispatchEvent(new CustomEvent("softbridge:consent", { detail: value }));
    setVisible(false);
  }

  if (!visible) return null;
  return <aside role="dialog" aria-label="Cookie preferences" aria-live="polite" className="fixed inset-x-3 bottom-3 z-[100] mx-auto max-w-3xl rounded-[1.5rem] border border-white/15 bg-[#0c1412] p-5 text-white shadow-2xl sm:p-6">
    <div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-end">
      <div><p className="font-semibold">Privacy-respectful by default</p><p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/60">Essential storage keeps the site functional. Optional analytics will only run after consent and should be configured before launch. Read the <Link className="underline underline-offset-4" href="/cookies">cookie notice</Link>.</p></div>
      <div className="flex flex-wrap gap-2"><button onClick={()=>choose("essential")} className="rounded-full border border-white/25 px-4 py-2.5 text-sm">Essential only</button><button onClick={()=>choose("all")} className="rounded-full bg-aurora px-4 py-2.5 text-sm font-semibold text-black">Allow analytics</button></div>
    </div>
  </aside>;
}
