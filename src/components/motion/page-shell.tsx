"use client";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
export function PageShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return <motion.main key={pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .35 }}>{children}</motion.main>;
}
