import { contexts } from "@/lib/data";

export function TrustMarquee() {
  const items = [...contexts, ...contexts];
  return (
    <section className="overflow-hidden bg-forest py-6 text-white" aria-label="Selected client contexts">
      <div className="mb-4 px-5 text-center text-xs font-bold text-white/55">Built for teams where software carries operational weight.</div>
      <div className="marquee-track gap-12 pr-12 md:gap-20 md:pr-20">
        {items.map((item, index) => (
          <span key={`${item}-${index}`} className="whitespace-nowrap text-2xl font-black tracking-[-0.055em] md:text-4xl">
            {item}<span className="ml-12 text-lime md:ml-20">●</span>
          </span>
        ))}
      </div>
    </section>
  );
}
