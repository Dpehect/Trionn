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
    gsap.from("[data-service-row]", { y: 60, opacity: 0, duration: .9, stagger: .1, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 72%" } });
  }, { scope: root });

  return (
    <section ref={root} id="services" className="py-28 md:py-44">
      <div className="container-shell">
        <SectionLabel index="04" label="Capabilities" />
        <div className="mt-16 grid gap-10 lg:grid-cols-[1.25fr_.75fr]">
          <div>{services.map((service, index) => (
            <Link data-service-row href={`/services/${service.slug}`} onMouseEnter={() => setActive(index)} key={service.slug} className="group grid gap-3 border-b hairline py-7 md:grid-cols-[55px_1fr_auto] md:items-center">
              <span className="font-mono text-[10px] text-black/42">{service.index}</span>
              <div><h3 className="text-4xl font-semibold tracking-[-.055em] md:text-6xl">{service.title}</h3><p className="mt-3 max-w-xl text-sm leading-relaxed text-black/55">{service.short}</p></div>
              <span className="grid size-11 place-items-center rounded-full border hairline transition duration-500 group-hover:rotate-45 group-hover:bg-foreground group-hover:text-background"><ArrowUpRight size={17} /></span>
            </Link>
          ))}</div>
          <aside className="relative hidden min-h-[520px] overflow-hidden rounded-[2rem] bg-[#153c4f] lg:block">
            <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.2)_1px,transparent_1px)] [background-size:52px_52px]" />
            <div key={active} className="absolute inset-0 animate-[servicePulse_.7s_var(--ease)] p-8 text-white">
              <span className="font-mono text-xs text-aurora">{services[active].index}</span>
              <div className="absolute bottom-8 left-8 right-8"><p className="text-sm text-white/55">Current capability</p><p className="mt-3 text-5xl font-semibold leading-[.9] tracking-[-.055em]">{services[active].title}</p></div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
