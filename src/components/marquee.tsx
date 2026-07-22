export function Marquee() {
  const text = "CREATIVE TECHNOLOGY — MOTION SYSTEMS — DIGITAL PRODUCTS — ";
  return (
    <div className="overflow-hidden border-y hairline py-5">
      <div className="marquee-track whitespace-nowrap text-4xl font-semibold tracking-[-.04em] md:text-7xl">
        {text.repeat(4)}
      </div>
    </div>
  );
}
