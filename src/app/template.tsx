import { RouteReveal } from "@/components/motion/route-reveal";

export default function Template({ children }: { children: React.ReactNode }) {
  return <RouteReveal>{children}</RouteReveal>;
}
