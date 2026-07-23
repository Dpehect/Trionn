"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Bot, Boxes, CloudCog, Code2, Layers3, Palette, Smartphone, Wrench } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { title:"Custom Software Development", short:"Software", copy:"Reliable business-critical systems shaped around your workflows, users and growth model.", tags:["Next.js","TypeScript","APIs"], color:"#5577ff", icon:Code2 },
  { title:"Web Applications", short:"Web apps", copy:"Fast, accessible and scalable applications with product-grade interaction and engineering quality.", tags:["App Router","Design systems","Performance"], color:"#9d66ff", icon:Layers3 },
  { title:"Mobile Applications", short:"Mobile", copy:"Native-feeling mobile products designed for focused journeys, retention and maintainable delivery.", tags:["iOS","Android","Cross-platform"], color:"#ff765e", icon:Smartphone },
  { title:"AI Automation and Agents", short:"AI systems", copy:"Practical AI agents and automations that remove operational friction and make teams measurably faster.", tags:["LLMs","Agents","Workflows"], color:"#c6ee58", icon:Bot },
  { title:"SaaS Product Development", short:"SaaS", copy:"From product strategy to architecture, billing-ready platforms and continuous product evolution.", tags:["MVP","Multi-tenant","Scale"], color:"#d8c0ff", icon:Boxes },
  { title:"UI/UX and Product Design", short:"Design", copy:"Research-led interfaces and design systems that make complex software feel clear and distinctive.", tags:["UX strategy","Prototyping","Systems"], color:"#ff9d86", icon:Palette },
  { title:"Cloud and API Integrations", short:"Cloud", copy:"Secure integrations, cloud architecture and data flows that connect the systems your business depends on.", tags:["Cloud","REST","Webhooks"], color:"#8ddbea", icon:CloudCog },
  { title:"Maintenance and Scaling", short:"Scale", copy:"Ongoing product engineering, performance work and technical stewardship after launch.", tags:["Observability","Refactoring","Growth"], color:"#e2ef91", icon:Wrench },
];

export function ServicesExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [openMobile, setOpenMobile] = useState<number | null>(0);

  useGSAP(() => {
    const items = gsap.utils.toArray<HTMLElement>("[data-service-item]");
    items.forEach((item, index) => {
      ScrollTrigger.create({ trigger:item, start:"top 55%", end:"bottom 45%", onEnter:()=>setActive(index), onEnterBack:()=>setActive(index) });
    });
    return () => ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.trigger && sectionRef.current?.contains(trigger.trigger as Node)) trigger.kill();
    });
  }, { scope: sectionRef });

  const current = services[active];
  const CurrentIcon = current.icon;

  return (
    <section id="services" ref={sectionRef} className="services-experience">
      <header className="services-experience__header">
        <div><p className="section-eyebrow">Capabilities / 03</p><h2>Senior teams for difficult digital work.</h2></div>
        <p>Eight focused capabilities. One integrated product team from strategy through launch and scale.</p>
      </header>

      <div className="services-experience__desktop">
        <aside className="service-preview" style={{"--service-color":current.color} as React.CSSProperties}>
          <div className="service-preview__top"><span>{String(active+1).padStart(2,"0")}</span><CurrentIcon size={28}/></div>
          <AnimatePresence mode="wait">
            <motion.div key={current.title} initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-18}} transition={{duration:.34,ease:[.22,1,.36,1]}}>
              <p className="section-eyebrow">{current.short}</p><h3>{current.title}</h3><p>{current.copy}</p>
              <div className="service-preview__tags">{current.tags.map(tag=><span key={tag}>{tag}</span>)}</div>
            </motion.div>
          </AnimatePresence>
          <div className="service-preview__object" aria-hidden="true"><span/><span/><span/></div>
        </aside>

        <div className="service-list">
          {services.map((service,index)=><article key={service.title} data-service-item className={active===index?"is-active":""} onMouseEnter={()=>setActive(index)}>
            <span>{String(index+1).padStart(2,"0")}</span><h3>{service.title}</h3><ArrowUpRight size={20}/>
          </article>)}
        </div>
      </div>

      <div className="services-experience__mobile">
        {services.map((service,index)=>{ const Icon=service.icon; const isOpen=openMobile===index; return <article key={service.title} style={{"--service-color":service.color} as React.CSSProperties}>
          <button type="button" onClick={()=>setOpenMobile(isOpen?null:index)} aria-expanded={isOpen}><span>{String(index+1).padStart(2,"0")}</span><h3>{service.title}</h3><Icon size={20}/></button>
          <AnimatePresence initial={false}>{isOpen&&<motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} className="service-mobile-copy"><p>{service.copy}</p><div>{service.tags.map(tag=><span key={tag}>{tag}</span>)}</div></motion.div>}</AnimatePresence>
        </article>})}
      </div>
    </section>
  );
}
