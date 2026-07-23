import Link from "next/link";
import { SiteNavigation } from "@/components/navigation/site-navigation";
import { ProjectsGallery } from "@/components/projects/projects-gallery";

export default function ProjectsPage() {
  return (
    <main className="projects-page">
      <header className="topbar topbar--page">
        <Link className="back-button" href="/" aria-label="Back to index">←</Link>
        <SiteNavigation />
      </header>
      <section className="projects-intro">
        <p>SELECTED WORK / 2024—2026</p>
        <h1>Projects built at the intersection of design, code and motion.</h1>
        <div className="projects-intro__note"><span>06 PROJECTS</span><span>SCROLL / DRAG</span></div>
      </section>
      <ProjectsGallery />
    </main>
  );
}
