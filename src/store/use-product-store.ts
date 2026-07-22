"use client";

import { create } from "zustand";

export type ProductMode = "signal" | "system" | "launch";

type ProductState = {
  activeMode: ProductMode;
  tourIndex: number;
  requestOpen: boolean;
  setActiveMode: (mode: ProductMode) => void;
  setTourIndex: (index: number) => void;
  setRequestOpen: (open: boolean) => void;
};

export const useProductStore = create<ProductState>((set) => ({
  activeMode: "signal",
  tourIndex: 0,
  requestOpen: false,
  setActiveMode: (activeMode) => set({ activeMode }),
  setTourIndex: (tourIndex) => set({ tourIndex }),
  setRequestOpen: (requestOpen) => set({ requestOpen }),
}));
