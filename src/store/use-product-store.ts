"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartLine, Product } from "@/types/commerce";

type ProductState = {
  activeProduct: Product | null;
  cartOpen: boolean;
  cart: CartLine[];
  wishlist: string[];
  setActiveProduct: (product: Product | null) => void;
  setCartOpen: (open: boolean) => void;
  addToCart: (line: CartLine) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  toggleWishlist: (productId: string) => void;
};

export const useProductStore = create<ProductState>()(persist((set) => ({
  activeProduct: null,
  cartOpen: false,
  cart: [],
  wishlist: [],
  setActiveProduct: (activeProduct) => set({ activeProduct }),
  setCartOpen: (cartOpen) => set({ cartOpen }),
  addToCart: (line) => set((state) => {
    const match = state.cart.findIndex((item) => item.product.id === line.product.id && item.size === line.size && item.color === line.color);
    if (match === -1) return { cart: [...state.cart, line], cartOpen: true };
    return { cart: state.cart.map((item, index) => index === match ? { ...item, quantity: item.quantity + line.quantity } : item), cartOpen: true };
  }),
  removeFromCart: (productId, size, color) => set((state) => ({ cart: state.cart.filter((item) => !(item.product.id === productId && item.size === size && item.color === color)) })),
  updateQuantity: (productId, size, color, quantity) => set((state) => ({ cart: state.cart.map((item) => item.product.id === productId && item.size === size && item.color === color ? { ...item, quantity: Math.max(1, quantity) } : item) })),
  toggleWishlist: (productId) => set((state) => ({ wishlist: state.wishlist.includes(productId) ? state.wishlist.filter((id) => id !== productId) : [...state.wishlist, productId] })),
}), {
  name: "trionn-boutique-state",
  partialize: (state) => ({ cart: state.cart, wishlist: state.wishlist }),
}));
