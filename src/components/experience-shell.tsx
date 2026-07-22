"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Volume2, VolumeX, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useExperienceStore } from "@/store/experience-store";

const navigation = [
  { href: "/", label: "Index", number: "01" },
  { href: "/work", label: "Work", number: "02" },
  { href: "/studio", label: "Studio", number: "03" },
  { href: "/dashboard", label: "Control Room", number: "04" },
  { href: "/contact", label: "Contact", number: "05" },
];

export function ExperienceShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { menu, sound, setMenu, toggleSound } = useExperienceStore();

  useEffect(() => {
    setMenu(false);
  }, [pathname, setMenu]);

  useEffect(() => {
    document.documentElement.style.overflow = menu ? "hidden" : "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [menu]);

  return (
    <>
      {children}
      <div className="fixed bottom-5 left-5 z-[70]">
        <button
          type="button"
          aria-label={sound ? "Disable sound" : "Enable sound"}
          onClick={toggleSound}
          className="flex items-center gap-2 rounded-full border hairline bg-black/40 px-4 py-2 text-[10px] uppercase tracking-[.18em] backdrop-blur"
        >
          {sound ? <Volume2 size={14} /> : <VolumeX size={14} />}
          {sound ? "Sound on" : "Sound off"}
        </button>
      </div>

      <AnimatePresence>
        {menu && (
          <motion.aside
            className="fixed inset-0 z-[95] bg-[var(--acid)] text-black"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="container-x flex h-20 items-center justify-between border-b border-black/20">
              <strong className="text-2xl tracking-[-.06em]">ATELIER/X</strong>
              <button onClick={() => setMenu(false)} aria-label="Close menu" className="grid h-11 w-11 place-items-center rounded-full border border-black/25">
                <X size={19} />
              </button>
            </div>

            <nav className="container-x flex min-h-[calc(100vh-80px)] flex-col justify-center py-12">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href} className="group grid grid-cols-[46px_1fr_auto] items-center border-t border-black/20 py-4 md:py-5">
                  <span className="text-xs">{item.number}</span>
                  <span className="text-[clamp(3.5rem,10vw,9rem)] font-bold leading-[.78] tracking-[-.075em] transition-transform duration-500 group-hover:translate-x-5">
                    {item.label}
                  </span>
                  <span className="hidden text-xs uppercase tracking-[.18em] md:block">Open</span>
                </Link>
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
