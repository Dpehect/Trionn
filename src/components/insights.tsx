import Image from "next/image";
const items=[
 ["Product decisions before roadmaps","https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=85"],
 ["Where AI workflows fail in production","https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=85"],
 ["Owning software after launch","https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=85"]
];
export function Insights(){return <section id="insights" className="section bg-lav"><div className="container"><div className="reveal flex flex-wrap items-end justify-between gap-6"><div><p className="kicker text-ink/40">Studio notes</p><h2 className="h2 mt-6">Thinking behind the work.</h2></div><a href="#contact" className="pill bg-white">All insights →</a></div><div className="mt-14 grid gap-5 md:grid-cols-3">{items.map(([t,img])=><article key={t} className="card-lift overflow-hidden rounded-[2rem] bg-white"><div className="relative h-60"><Image src={img} alt="" fill className="object-cover"/></div><div className="p-6"><p className="kicker text-ink/35">Insight</p><h3 className="mt-5 text-2xl tracking-[-.04em]">{t}</h3><p className="mt-7 text-sm font-bold">Read note →</p></div></article>)}</div></div></section>}
