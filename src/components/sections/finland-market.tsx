"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SectionLabel } from "@/components/ui/section-label";

const cities = [
  { name: "Helsinki", role: "Brand, product and growth partnerships", coordinate: "60.1699° N" },
  { name: "Espoo", role: "Technology and B2B product companies", coordinate: "60.2055° N" },
  { name: "Tampere", role: "Industrial and digital transformation", coordinate: "61.4978° N" },
  { name: "Turku", role: "Commerce, culture and maritime innovation", coordinate: "60.4518° N" }
];

export function FinlandMarket() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.from("[data-city]", { xPercent: 16, opacity: 0, stagger: .12, duration: 1, ease: "power4.out", scrollTrigger: { trigger: root.current, start: "top 70%" } });
    gsap.to("[data-finland-title]", { yPercent: -18, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 1 } });
  }, { scope: root });
  return <section ref={root} className="overflow-hidden py-28 md:py-44"><div className="container-shell"><SectionLabel index="06" label="Finland focus"/><div className="mt-16 grid gap-16 lg:grid-cols-2"><div><h2 data-finland-title className="text-[clamp(3.4rem,7vw,7rem)] font-semibold leading-[.86] tracking-[-.07em] will-change-transform">Close to the market.<br/>Open to the world.</h2><p className="mt-8 max-w-xl text-lg leading-relaxed text-black/58">Softbridge works with companies building in Finland and expanding internationally. The operating model is remote-first, transparent and designed for focused collaboration across borders.</p></div><div>{cities.map((city,index)=><div data-city key={city.name} className="group grid grid-cols-[42px_1fr_auto] gap-4 border-t hairline py-5 transition-all duration-500 hover:bg-foreground hover:px-5 hover:text-background"><span className="font-mono text-[10px] opacity-45">0{index+1}</span><div><p className="text-2xl font-semibold tracking-[-.035em]">{city.name}</p><p className="mt-1 text-sm opacity-55">{city.role}</p></div><span className="font-mono text-[10px] opacity-45">{city.coordinate}</span></div>)}</div></div></div></section>;
}
