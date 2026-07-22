import { TrionnHeader } from "@/components/trionn/header";
import { Hero } from "@/components/trionn/hero";
import { ProjectRail } from "@/components/trionn/project-rail";
import { Manifesto } from "@/components/trionn/manifesto";
import { CapabilityGrid } from "@/components/trionn/capability-grid";
import { TrionnFooter } from "@/components/trionn/footer";

export default function Home(){
  return <main className="trionn-site">
    <TrionnHeader />
    <Hero />
    <ProjectRail />
    <Manifesto />
    <CapabilityGrid />
    <TrionnFooter />
  </main>;
}
