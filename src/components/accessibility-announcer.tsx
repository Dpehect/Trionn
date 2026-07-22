"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function AccessibilityAnnouncer() {
  const pathname = usePathname();
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage(`Navigated to ${pathname === "/" ? "home" : pathname.replaceAll("/"," ")}`);
  }, [pathname]);

  return <div aria-live="polite" aria-atomic="true" className="sr-only">{message}</div>;
}
