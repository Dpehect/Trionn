const names=["Nordic Health","Arc Systems","Konekt","Vanta Labs","Northline","Polar Works"];
export function Partners(){return <section className="section bg-white"><div className="container">
 <div className="reveal grid gap-8 lg:grid-cols-[.75fr_1.25fr]"><div><p className="kicker text-ink/40">Trusted environments</p><h2 className="h2 mt-6">Built for teams where reliability matters.</h2></div><p className="body-lg max-w-xl text-ink/60">From operational software to AI-enabled workflows, we work best where product quality and ownership are visible.</p></div>
 <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">{names.map(n=><div key={n} className="grid min-h-28 place-items-center rounded-[1.5rem] border border-ink/10 bg-paper px-4 text-center font-black tracking-[-.03em]">{n}</div>)}</div>
 </div></section>}
