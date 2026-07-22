import { create } from "zustand";

export type QualityLevel = "low" | "medium" | "high";

type ExperienceState = {
  sound: boolean;
  menu: boolean;
  transition: boolean;
  hydrated: boolean;
  reducedMotion: boolean;
  quality: QualityLevel;
  setSound: (value: boolean) => void;
  toggleSound: () => void;
  setMenu: (value: boolean) => void;
  setTransition: (value: boolean) => void;
  setHydrated: (value: boolean) => void;
  setReducedMotion: (value: boolean) => void;
  setQuality: (value: QualityLevel) => void;
};

export const useExperienceStore = create<ExperienceState>((set) => ({
  sound: false,
  menu: false,
  transition: false,
  hydrated: false,
  reducedMotion: false,
  quality: "high",
  setSound: (sound) => set({ sound }),
  toggleSound: () => set((state) => ({ sound: !state.sound })),
  setMenu: (menu) => set({ menu }),
  setTransition: (transition) => set({ transition }),
  setHydrated: (hydrated) => set({ hydrated }),
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),
  setQuality: (quality) => set({ quality }),
}));
