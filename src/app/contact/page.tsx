import { SiteHeader } from "@/components/site-header";
import { ProjectForm } from "@/components/project-form";
export default function Contact(){
 return <main><SiteHeader/><section className="container-x min-h-screen pt-40 pb-24">
  <p className="eyebrow">Start a project</p><h1 className="text-6xl md:text-[10rem] leading-[.8] tracking-[-.075em] font-bold mt-8">MAKE THE<br/>NEXT MOVE.</h1>
  <div className="mt-20 grid md:grid-cols-[.45fr_1fr] gap-12"><p className="text-[var(--muted)] max-w-sm">Tell us what must change, what success means and where the difficult part begins.</p><ProjectForm/></div>
 </section></main>
}
