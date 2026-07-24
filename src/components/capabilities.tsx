import Image from "next/image";
const items=[
 {n:"01",title:"Product",copy:"Frame the decision, validate the opportunity and define the smallest useful release.",img:"https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=900&q=85",bg:"bg-mint"},
 {n:"02",title:"Experience",copy:"Design clear interfaces for complex work, with accessibility and system thinking built in.",img:"https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=85",bg:"bg-blue"},
 {n:"03",title:"Intelligence",copy:"Build controlled AI workflows grounded in evidence, permissions and human review.",img:"https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=85",bg:"bg-lav"}
];
export function Capabilities(){
 return <section id="capabilities" className="section bg-paper"><div className="container">
  <div className="reveal grid gap-7 lg:grid-cols-[.7fr_1.3fr]"><div><p className="kicker text-ink/40">Capabilities</p><h2 className="h2 mt-6">Three connected disciplines.</h2></div><p className="body-lg max-w-2xl text-ink/60">Use one capability or combine all three in one senior product team.</p></div>
  <div className="mt-14 grid gap-4 lg:grid-cols-3">{items.map((x)=><article key={x.n} className={`${x.bg} card-lift overflow-hidden rounded-[2.2rem]`}>
   <div className="relative h-72"><Image src={x.img} alt="" fill className="object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent"/></div>
   <div className="p-6 md:p-8"><p className="kicker text-ink/40">{x.n}</p><h3 className="mt-8 text-5xl tracking-[-.06em]">{x.title}</h3><p className="mt-5 text-ink/62">{x.copy}</p></div>
  </article>)}</div>
 </div></section>
}
