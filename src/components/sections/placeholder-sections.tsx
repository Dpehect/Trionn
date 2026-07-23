const sections = [
  ["about", "About + Stats"],
  ["services", "Services / Sticky Preview"],
  ["work", "Selected Work / Horizontal Slider"],
  ["careers", "Careers"],
  ["contact", "Contact + Footer"],
];

export function PlaceholderSections() {
  return (
    <>
      {sections.map(([id, title], index) => (
        <section key={id} id={id} className="min-h-[72vh] border-t border-white/10 px-5 py-24 md:px-8">
          <div className="mx-auto grid max-w-[1500px] gap-10 md:grid-cols-[220px_1fr]">
            <p className="text-xs uppercase tracking-[0.2em] text-white/40">0{index + 2}</p>
            <h2 className="max-w-4xl text-4xl font-medium tracking-[-0.04em] md:text-7xl">{title}</h2>
          </div>
        </section>
      ))}
    </>
  );
}
