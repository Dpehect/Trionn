import { create } from "zustand";

type ScrollState = {
  progress: number;
  velocity: number;
  direction: 1 | -1;
  setScrollState: (payload: Omit<ScrollState, "setScrollState">) => void;
};

export const useScrollStore = create<ScrollState>((set) => ({
  progress: 0,
  velocity: 0,
  direction: 1,
  setScrollState: (payload) => set(payload),
}));
