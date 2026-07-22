"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types/commerce";

export type CartLine = { product: Product; size: string; color: string; quantity: number };
type CartState = { items: CartLine[]; add: (line: CartLine) => void; remove: (id: string, size: string) => void; updateQuantity: (id: string, size: string, quantity: number) => void; clear: () => void };
export const useCartStore = create<CartState>()(persist((set) => ({
  items: [],
  add: (line) => set((state) => {
    const index = state.items.findIndex((item) => item.product.id === line.product.id && item.size === line.size && item.color === line.color);
    if (index === -1) return { items: [...state.items, line] };
    return { items: state.items.map((item, i) => i === index ? { ...item, quantity: item.quantity + line.quantity } : item) };
  }),
  remove: (id, size) => set((state) => ({ items: state.items.filter((item) => !(item.product.id === id && item.size === size)) })),
  updateQuantity: (id, size, quantity) => set((state) => ({ items: state.items.map((item) => item.product.id === id && item.size === size ? { ...item, quantity: Math.max(1, quantity) } : item) })),
  clear: () => set({ items: [] }),
}), { name: "sable-cart" }));
