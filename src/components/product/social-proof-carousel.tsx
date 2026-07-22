"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const stories = [
  {
    quote: "Trionn replaced three disconnected rituals with one product narrative the whole team could actually use.",
    name: "Mina Aksoy",
    role: "VP Product / Northstar",
    metric: "31% fewer alignment meetings",
  },
  {
    quote: "The interface system stopped being a library and became a live map of why the product behaves the way it does.",
    name: "David Ren",
    role: "Design Director / Relay",
    metric: "42 states synchronized",
  },
  {
    quote: "Launch readiness finally became visible before the final week. Risks had owners, evidence and a clear decision trail.",
    name: "Ari Williams",
    role: "Head of Engineering / Common",
    metric: "2.4× faster release review",
  },
  {
    quote: "It feels less like operating a dashboard and more like moving through the product itself.",
    name: "Selin Kaya",
    role: "Founder / Formline",
    metric: "18 signals connected",
  },
];

export function SocialProofCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true, skipSnaps: false });
  const [selected, setSelected] = useState(0);
  const previous = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const update = () => setSelected(emblaApi.selectedScrollSnap());
    update();
    emblaApi.on("select", update);
    emblaApi.on("reInit", update);
    return () => {
      emblaApi.off("select", update);
      emblaApi.off("reInit", update);
    };
  }, [emblaApi]);

  return (
    <section className="proof-carousel section-shell">
      <div className="section-index">09 / PROOF</div>
      <div className="proof-carousel-head">
        <div><p className="section-eyebrow">Product teams in motion</p><h2>Less coordination theatre. More shared product truth.</h2></div>
        <div className="carousel-controls"><button type="button" onClick={previous} aria-label="Previous story"><ArrowLeft size={18} /></button><button type="button" onClick={next} aria-label="Next story"><ArrowRight size={18} /></button></div>
      </div>
      <div className="embla" ref={emblaRef}>
        <div className="embla-track">
          {stories.map((story, index) => (
            <article className={`story-card ${selected === index ? "is-selected" : ""}`} key={story.name}>
              <div className="story-card-top"><Quote size={25} strokeWidth={1.4} /><span>{String(index + 1).padStart(2, "0")}</span></div>
              <blockquote>{story.quote}</blockquote>
              <div className="story-person"><div><strong>{story.name}</strong><span>{story.role}</span></div><b>{story.metric}</b></div>
            </article>
          ))}
        </div>
      </div>
      <div className="carousel-progress">{stories.map((story, index) => <button type="button" key={story.name} className={selected === index ? "is-active" : ""} aria-label={`Open story ${index + 1}`} onClick={() => emblaApi?.scrollTo(index)} />)}</div>
    </section>
  );
}
