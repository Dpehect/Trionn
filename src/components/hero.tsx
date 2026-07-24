import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function Hero(){
  return <section className="relative min-h-[96svh] overflow-hidden bg-lav pt-28">
    <div className="container relative grid min-h-[calc(96svh-7rem)] items-center gap-8 lg:grid-cols-[.92fr_1.08fr]">
      <div className="relative z-10 pb-12">
        <p className="kicker mb-6 text-ink/55">Product engineering · Helsinki + Türkiye</p>
        <h1 className="h1 max-w-[10ch]">We build software systems people can rely on.</h1>
        <p className="body-lg mt-7 max-w-xl text-ink/68">One senior team for product strategy, experience, AI and platform delivery. Clear decisions before code.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#contact" className="pill bg-rose text-white">Talk to the studio <ArrowUpRight size={15}/></a>
          <a href="#work" className="pill border border-ink/25 bg-white">See selected work</a>
        </div>
      </div>
      <div className="relative h-[58vh] min-h-[470px] overflow-hidden rounded-[2.4rem] shadow-soft lg:h-[72vh]" data-parallax>
        <Image src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=85" alt="Senior product team collaborating around a large screen" fill priority className="object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent"/>
        <div className="absolute bottom-5 left-5 rounded-2xl bg-white/95 p-4 backdrop-blur">
          <p className="kicker text-ink/45">Current focus</p>
          <p className="mt-2 max-w-[18rem] text-sm font-bold">Operational software, AI workflows and digital products with real ownership.</p>
        </div>
      </div>
    </div>
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-[.18em] text-ink/45">Scroll to follow the system ↓</div>
  </section>
}
