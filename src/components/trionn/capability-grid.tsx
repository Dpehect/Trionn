const items=[
 ["01","POSITIONING","The strategic premise that makes every later decision inevitable."],
 ["02","ART DIRECTION","Visual worlds with a point of view, not interchangeable moodboards."],
 ["03","MOTION SYSTEMS","Movement designed as product behavior rather than page decoration."],
 ["04","CREATIVE CODE","High-performance interfaces, WebGL and experimental interaction."],
 ["05","DIGITAL PRODUCTS","Complex tools made direct, expressive and operationally robust."],
 ["06","LAUNCH SYSTEMS","Campaign, content and product touchpoints aligned as one release."],
];
export function CapabilityGrid(){return <section className="capability-section">
 <div className="cap-intro"><p>CAPABILITIES / 02</p><h2>ONE TEAM.<br/>NO HAND-OFFS.</h2></div>
 <div className="cap-grid">{items.map(([n,t,b])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{b}</p></article>)}</div>
 </section>}
