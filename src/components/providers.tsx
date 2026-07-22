"use client";
import { Toaster } from "sonner";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { CartDrawer } from "@/components/commerce/cart-drawer";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { SearchOverlay } from "@/components/commerce/search-overlay";
import { Analytics } from "@/components/analytics";
import { TransitionOverlay } from "@/components/motion/transition-overlay";
export function Providers({ children }: { children: React.ReactNode }) {
  return <SmoothScroll><TransitionOverlay/>{children}<CartDrawer/><MobileMenu/><SearchOverlay/><Analytics/><Toaster position="bottom-right" richColors/></SmoothScroll>;
}
