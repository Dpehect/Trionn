import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
const work=[
 {title:"Operations control platform",sector:"Industrial software",copy:"A role-aware operating system replacing fragmented coordination and spreadsheet-led decisions.",img:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85",bg:"bg-blue"},
 {title:"Evidence-first AI workspace",sector:"Regulated knowledge",copy:"A permission-aware retrieval workflow with source citations and human approval checkpoints.",img:"https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85",bg:"bg-lav"},
];
export function Work(){return <section id="work" className="section bg-paper"><div className="container">
 <div className="reveal grid gap-8 lg:grid-cols-[.7fr_1.3fr]"><div><p className="kicker text-ink/40">Selected work</p><h2 className="h2 mt-6">Proof, with context.</h2></div><p className="body-lg max-w-xl text-ink/60">Every case study separates what is verified, anonymised and representative.</p></div>
 <div className="mt-14 grid gap-6">{work.map((x,i)=><article key={x.title} className={`${x.bg} overflow-hidden rounded-[2.4rem] p-4 lg:grid lg:grid-cols-[1.2fr_.8fr] lg:gap-8 lg:p-5`}>
   <div className="relative min-h-[420px] overflow-hidden rounded-[1.8rem]"><Image src={x.img} alt="" fill className="object-cover"/></div>
   <div className="flex flex-col justify-between p-5 lg:p-8"><div><p className="kicker text-ink/40">{i===0?"Anonymised":"Representative"} · {x.sector}</p><h3 className="mt-7 text-[clamp(2.3rem,4vw,5rem)] leading-[.95] tracking-[-.06em]">{x.title}</h3><p className="body-lg mt-6 text-ink/62">{x.copy}</p></div><a className="pill mt-10 w-fit bg-ink text-white" href="#contact">Read the case <ArrowUpRight size={15}/></a></div>
  </article>)}</div>
 </div></section>}
