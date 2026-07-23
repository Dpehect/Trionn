export type MotionPreference = "full" | "reduced";

export interface ScrollState {
  progress: number;
  velocity: number;
  direction: 1 | -1;
}
