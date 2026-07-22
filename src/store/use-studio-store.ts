import { create } from "zustand";

type StudioState = {
  activeProject: string | null;
  focusLocked: boolean;
  cursorLabel: string;
  setActiveProject: (slug: string | null) => void;
  setFocusLocked: (value: boolean) => void;
  setCursorLabel: (value: string) => void;
};

export const useStudioStore = create<StudioState>((set) => ({
  activeProject: null,
  focusLocked: false,
  cursorLabel: "",
  setActiveProject: (activeProject) => set({ activeProject }),
  setFocusLocked: (focusLocked) => set({ focusLocked }),
  setCursorLabel: (cursorLabel) => set({ cursorLabel }),
}));
