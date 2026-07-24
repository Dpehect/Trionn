import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cases } from "@/lib/data";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected Softbridge product, software and AI work with clear disclosure labels.",
};

export default function WorkPage() {
  return (
    <>
      <section className="bg-lavender pb-20 pt-40 md:pb-28">
        <div className="container-site">
          <p className="eyebrow text-forest/45">Selected work</p>
          <h1 className="display-lg mt-7 max-w-[10ch]">Proof without blurred disclosure.</h1>
          <p className="body-lg mt-8 max-w-2xl text-forest/65">Verified means the result can be substantiated. Anonymised protects the client while preserving the delivery facts. Representative is a reference design, not a client claim.</p>
        </div>
      </section>

      <section className="section-space bg-cream">
        <div className="container-site grid gap-6">
          {cases.map((item, index) => (
            <article key={item.slug} className={`rounded-stage grid overflow-hidden ${item.color} lg:grid-cols-2`}>
              <div className={`relative min-h-[420px] ${index % 2 === 1 ? "lg:order-2" : ""}`}><Image src={item.art} alt="" fill className="object-cover" /></div>
              <div className="flex flex-col justify-between p-7 md:p-11">
                <div><div className="flex justify-between gap-4 border-b border-forest/20 pb-5"><span className="eyebrow text-forest/50">{item.label}</span><span className="eyebrow text-forest/50">{item.sector}</span></div><h2 className="heading-lg mt-8">{item.title}</h2><p className="body-lg mt-6 text-forest/65">{item.summary}</p></div>
                <div className="mt-12 border-t border-forest/20 pt-6"><p className="font-bold">{item.result}</p><Link href="/contact" className="link-line mt-7">Discuss a related problem ↗</Link></div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="container-site grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div><p className="eyebrow text-forest/45">Evidence standard</p><h2 className="heading-xl mt-6 max-w-[9ch]">What we will not imply.</h2></div>
          <div className="grid gap-3">
            {[
              "A representative concept is never presented as client delivery.",
              "A result is not published without a defensible source or client permission.",
              "An anonymised case retains the real constraints, contribution and outcome boundary.",
              "Technology lists are secondary to the product and operational result.",
            ].map((text, index) => <div key={text} className="grid grid-cols-[45px_1fr] gap-4 border-t border-forest/20 py-5"><span className="eyebrow text-forest/40">0{index + 1}</span><p className="body-lg">{text}</p></div>)}
          </div>
        </div>
      </section>
    </>
  );
}
