export function MetricStrip(){
 const items=[["12+","senior specialists"],["4","integrated capabilities"],["2","delivery locations"],["1","shared backlog"]];
 return <section className="bg-white py-6"><div className="container grid grid-cols-2 gap-3 lg:grid-cols-4">{items.map(([a,b],i)=><article key={b} className={`rounded-[1.8rem] p-6 ${i===1?"bg-mint":i===2?"bg-blue":i===3?"bg-lav":"bg-paper"}`}><p className="text-5xl tracking-[-.06em]">{a}</p><p className="mt-3 text-sm text-ink/55">{b}</p></article>)}</div></section>
}
