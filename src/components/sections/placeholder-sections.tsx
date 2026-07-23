const sections = [
  { id: "about", eyebrow: "Studio", title: "Nordic clarity. Global product thinking.", copy: "A distributed software studio combining strategy, design and engineering to turn complex ideas into useful digital products.", tone: "blue" },
  { id: "services", eyebrow: "Capabilities", title: "From product strategy to scalable software.", copy: "Custom platforms, AI automation, SaaS products, mobile apps and high-performance web experiences.", tone: "violet" },
  { id: "work", eyebrow: "Selected work", title: "Digital systems designed to create momentum.", copy: "Explore product and engineering engagements built for ambitious companies in Finland and Europe.", tone: "coral" },
  { id: "careers", eyebrow: "Careers", title: "Build meaningful products with a curious team.", copy: "We are building a cross-border studio for engineers, designers and product thinkers who care about craft.", tone: "lime" },
  { id: "contact", eyebrow: "Contact", title: "Have a difficult digital problem? Good.", copy: "Tell us what you are building. We will help shape the product, technology and path to launch.", tone: "purple" },
];

export function PlaceholderSections() {
  return (
    <div className="creative-sections">
      {sections.map((section, index) => (
        <section key={section.id} id={section.id} className={`creative-section creative-section--${section.tone}`}>
          <span className="section-index">0{index + 2}</span>
          <div>
            <p className="section-eyebrow">{section.eyebrow}</p>
            <h2>{section.title}</h2>
            <p className="section-copy">{section.copy}</p>
          </div>
          <div className="section-sculpture"><span /><span /><span /></div>
        </section>
      ))}
    </div>
  );
}
