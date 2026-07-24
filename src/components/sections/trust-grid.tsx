import { capabilities, principles } from "@/content/trust";

export function TrustGrid() {
  return (
    <section className="py-28 md:py-40">
      <div className="container-shell">
        <div className="grid gap-14 lg:grid-cols-[.7fr_1.3fr]">
          <div><p className="eyebrow text-black/45">Why Softbridge</p><h2 className="mt-8 max-w-xl text-5xl font-medium leading-[.9] tracking-[-.06em] md:text-7xl">Trust is designed into the delivery model.</h2></div>
          <div className="border-t hairline">
            {capabilities.map((item, index) => (
              <article key={item.value} className="grid gap-5 border-b hairline py-8 md:grid-cols-[70px_.75fr_1fr] md:items-start">
                <span className="index-number text-black/35">0{index + 1}</span>
                <h3 className="text-2xl font-medium tracking-[-.04em]">{item.label}</h3>
                <p className="max-w-lg leading-relaxed text-black/55">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="mt-24 grid border-t hairline md:grid-cols-4">{principles.map((item, index) => <div key={item} className="border-b hairline py-5 md:border-r md:px-5 md:first:pl-0 md:last:border-r-0"><span className="index-number mr-4 text-black/35">0{index + 1}</span><span className="text-sm">{item}</span></div>)}</div>
      </div>
    </section>
  );
}
