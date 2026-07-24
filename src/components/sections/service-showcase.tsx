"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/content/services";
import { SectionLabel } from "@/components/ui/section-label";

export function ServiceShowcase() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  useGSAP(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.from("[data-service-row]", { y: 70, opacity: 0, duration: 1, stagger: .1, ease: "power4.out", scrollTrigger: { trigger: root.current, start: "top 70%" } });
    gsap.to("[data-service-visual]", { rotate: 3.5, yPercent: 15, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 1 } });
  }, { scope: root });

  return <section ref={root} id="services" className="relative overflow-hidden bg-paper py-28 md:py-44">
    <div className="container-shell"><SectionLabel index="04" label="Capabilities"/>
      <div className="mt-16 grid gap-14 lg:grid-cols-[.72fr_1.28fr]">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <h2 data-kinetic-title className="text-[clamp(3.2rem,6vw,6.5rem)] font-medium leading-[.86] tracking-[-.065em]">One senior team.<br/>Four connected disciplines.</h2>
          <div data-service-visual className="relative mt-10 aspect-[4/3] overflow-hidden bg-foreground text-background will-change-transform">
            <div className="absolute inset-0 opacity-20 [background:repeating-linear-gradient(90deg,transparent_0,transparent_12%,white_12.15%,transparent_12.3%)]"/>
            <div className="relative flex h-full flex-col justify-between p-7"><span className="index-number text-signal">{services[active].index}</span><div><p className="eyebrow text-white/40">Active discipline</p><p className="mt-3 text-[clamp(2rem,4vw,4rem)] font-medium leading-[.9] tracking-[-.055em]">{services[active].title}</p></div></div>
          </div>
        </div>
        <div className="border-t hairline">{services.map((service,index)=><Link data-service-row href={`/services/${service.slug}`} key={service.slug} onMouseEnter={()=>setActive(index)} onFocus={()=>setActive(index)} className="group grid gap-4 border-b hairline py-7 transition-colors duration-500 hover:bg-signal md:grid-cols-[60px_1fr_1fr_auto] md:items-center md:px-4"><span className="index-number text-black/40">{service.index}</span><h3 className="text-3xl font-medium tracking-[-.045em] md:text-5xl">{service.title}</h3><p className="max-w-md text-sm leading-relaxed text-black/52 group-hover:text-black/70">{service.short}</p><ArrowUpRight size={19} className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:rotate-45"/></Link>)}</div>
      </div>
    </div>
  </section>;
}
