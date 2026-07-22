import type { ProductMode } from "@/store/use-product-store";

export const productModes: Array<{
  id: ProductMode;
  label: string;
  eyebrow: string;
  title: string;
  copy: string;
  stat: string;
  progress: number;
}> = [
  {
    id: "signal",
    label: "01 / Signal",
    eyebrow: "Research intelligence",
    title: "Turn scattered evidence into product direction.",
    copy: "Capture research, customer evidence and team decisions in one living context map before execution turns signal into noise.",
    stat: "18 insights connected",
    progress: 64,
  },
  {
    id: "system",
    label: "02 / System",
    eyebrow: "Interface intelligence",
    title: "Build the interface and its operating logic together.",
    copy: "Connect flows, interface states, validation rules and ownership without losing context between design and engineering.",
    stat: "42 interface states aligned",
    progress: 82,
  },
  {
    id: "launch",
    label: "03 / Launch",
    eyebrow: "Operational intelligence",
    title: "Ship through a launch room that stays current.",
    copy: "Readiness, owners, risks and release decisions update in real time, replacing stale spreadsheets and status meetings.",
    stat: "7 launch gates complete",
    progress: 91,
  },
];
