import { create } from "zustand";

export type GarmentColor = "black" | "cream" | "olive";
export type GarmentSize = "S" | "M" | "L" | "XL";

interface GarmentState {
  color: GarmentColor;
  size: GarmentSize;
  hotspotsVisible: boolean;
  setColor: (color: GarmentColor) => void;
  setSize: (size: GarmentSize) => void;
  setHotspotsVisible: (visible: boolean) => void;
}

export const useGarmentStore = create<GarmentState>((set) => ({
  color: "black",
  size: "M",
  hotspotsVisible: false,
  setColor: (color) => set({ color }),
  setSize: (size) => set({ size }),
  setHotspotsVisible: (hotspotsVisible) => set({ hotspotsVisible }),
}));
