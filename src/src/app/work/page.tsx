import { SiteHeader } from "@/components/site-header";
import { WorkIndex } from "@/components/work-index";
import { projects } from "@/data/projects";

export const metadata = { title: "Work" };

export default function WorkPage() {
  return (
    <main>
      <SiteHeader />
      <section className="container-x min-h-screen pb-24 pt-40">
        <p className="eyebrow">Selected work / 2025–2026</p>
        <h1 className="display-xl mt-8">WORK</h1>
        <WorkIndex projects={projects} />
      </section>
    </main>
  );
}
