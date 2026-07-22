"use client";
import { create } from "zustand";
type UIState = { cartOpen: boolean; menuOpen: boolean; searchOpen: boolean; openCart: () => void; closeCart: () => void; openMenu: () => void; closeMenu: () => void; openSearch: () => void; closeSearch: () => void };
export const useUIStore = create<UIState>((set) => ({
  cartOpen: false, menuOpen: false, searchOpen: false,
  openCart: () => set({ cartOpen: true }), closeCart: () => set({ cartOpen: false }),
  openMenu: () => set({ menuOpen: true }), closeMenu: () => set({ menuOpen: false }),
  openSearch: () => set({ searchOpen: true }), closeSearch: () => set({ searchOpen: false }),
}));
