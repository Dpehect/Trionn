import { create } from "zustand";

type ExperienceState = {
  sound: boolean;
  menu: boolean;
  transition: boolean;
  setSound: (value: boolean) => void;
  toggleSound: () => void;
  setMenu: (value: boolean) => void;
  setTransition: (value: boolean) => void;
};

export const useExperienceStore = create<ExperienceState>((set) => ({
  sound: false,
  menu: false,
  transition: false,
  setSound: (sound) => set({ sound }),
  toggleSound: () => set((state) => ({ sound: !state.sound })),
  setMenu: (menu) => set({ menu }),
  setTransition: (transition) => set({ transition }),
}));
