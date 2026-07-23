import Link from "next/link";
import { SiteNavigation } from "@/components/navigation/site-navigation";
import { ProjectsGallery } from "@/components/projects/projects-gallery";
export default function ProjectsPage(){return <main className="projects-page hiro-projects"><header className="topbar topbar--page"><Link className="hiro-back" href="/" aria-label="Back">←</Link><SiteNavigation/></header><section className="projects-intro hiro-projects-intro"><p>PROJECTS</p><h1>Projects that explore<br/>design, motion, 3D, and<br/>interactive front-end<br/>development.</h1></section><ProjectsGallery/></main>}
