"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/content/services";
import { SectionLabel } from "@/components/ui/section-label";

export function ServiceShowcase() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    gsap.from("[data-service-row]", { y: 55, opacity: 0, duration: .9, stagger: .09, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 74%" } });
  }, { scope: root });

  return (
    <section ref={root} id="services" className="bg-paper py-28 md:py-44">
      <div className="container-shell">
        <SectionLabel index="04" label="Capabilities" />
        <div className="mt-16 grid gap-12 lg:grid-cols-[.55fr_1.45fr]">
          <div>
            <h2 className="text-[clamp(3.2rem,6vw,6.5rem)] font-medium leading-[.86] tracking-[-.065em]">One senior team.<br/>Four connected disciplines.</h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-black/55">Strategy, design and engineering are shaped together, so the final product feels coherent rather than assembled.</p>
          </div>
          <div className="border-t hairline">
            {services.map((service) => (
              <Link data-service-row href={`/services/${service.slug}`} key={service.slug} className="group grid gap-4 border-b hairline py-7 md:grid-cols-[60px_1fr_1fr_auto] md:items-center">
                <span className="index-number text-black/40">{service.index}</span>
                <h3 className="text-3xl font-medium tracking-[-.045em] md:text-5xl">{service.title}</h3>
                <p className="max-w-md text-sm leading-relaxed text-black/52">{service.short}</p>
                <ArrowUpRight size={19} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
