"use client";

import {
  type MutableRefObject,
  useState,
} from "react";
import gsap from "gsap";
import type { GarmentHandle } from "@/components/canvas/Garment";
import { MagneticButton } from "@/components/dom/MagneticButton";
import {
  type GarmentColor,
  type GarmentSize,
  useGarmentStore,
} from "@/store/useGarmentStore";

interface OverlayProps {
  garmentRef: MutableRefObject<GarmentHandle | null>;
}

const colors: Array<{
  id: GarmentColor;
  label: string;
  swatch: string;
}> = [
  {
    id: "black",
    label: "Black",
    swatch: "#131313",
  },
  {
    id: "cream",
    label: "Cream",
    swatch: "#d7cdbb",
  },
  {
    id: "olive",
    label: "Olive",
    swatch: "#596148",
  },
];

const sizes: GarmentSize[] = [
  "S",
  "M",
  "L",
  "XL",
];

export function Overlay({
  garmentRef,
}: OverlayProps) {
  const color = useGarmentStore((state) => state.color);
  const size = useGarmentStore((state) => state.size);
  const setColor = useGarmentStore(
    (state) => state.setColor,
  );
  const setSize = useGarmentStore(
    (state) => state.setSize,
  );
  const [added, setAdded] = useState(false);

  const handleColorChange = (
    nextColor: GarmentColor,
  ): void => {
    setColor(nextColor);

    const material = garmentRef.current?.material;

    if (material) {
      gsap.fromTo(
        material,
        {
          roughness: 0.48,
        },
        {
          roughness: 0.68,
          duration: 0.9,
          ease: "power2.out",
        },
      );
    }
  };

  return (
    <main
      id="experience-root"
      className="overlay-shell"
    >
      <section className="relative flex min-h-screen items-end px-5 pb-8 pt-24 sm:px-8 lg:px-12">
        <div className="absolute left-5 top-5 flex w-[calc(100%-2.5rem)] items-center justify-between text-[10px] uppercase tracking-[0.22em] sm:left-8 sm:top-7 sm:w-[calc(100%-4rem)] lg:left-12 lg:w-[calc(100%-6rem)]">
          <span>AURA / 001</span>
          <span>Heavyweight System</span>
        </div>

        <div className="grid w-full gap-8 lg:grid-cols-[1fr_320px] lg:items-end">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.26em]">
              Limited garment study
            </p>

            <h1 className="hero-title max-w-[10ch] font-medium uppercase">
              AURA /
              <br />
              Heavyweight
              <br />
              Hoodie
            </h1>
          </div>

          <div className="max-w-sm pb-2">
            <p className="editorial-copy text-xl leading-tight sm:text-2xl">
              Scroll to explore craft, material and construction.
            </p>

            <div className="mt-8 flex items-center gap-3 text-[10px] uppercase tracking-[0.22em]">
              <span className="h-px w-10 bg-aura-ink" />
              <span>Scroll to enter</span>
            </div>
          </div>
        </div>
      </section>

      <section className="relative flex min-h-screen items-center px-5 py-24 sm:px-8 lg:px-12">
        <div className="max-w-xl">
          <p
            data-detail-copy
            className="mb-6 text-xs uppercase tracking-[0.26em] opacity-0"
          >
            Craftsmanship / 02
          </p>

          <h2
            data-detail-copy
            className="editorial-copy max-w-[12ch] text-5xl leading-[0.92] tracking-[-0.045em] opacity-0 sm:text-7xl"
          >
            Dense structure. Quiet surface.
          </h2>

          <div className="mt-10 grid gap-4 border-t border-aura-ink/20 pt-5 text-sm uppercase tracking-[0.12em] sm:grid-cols-3">
            <p data-detail-copy className="opacity-0">
              450 GSM Organic Japanese Cotton
            </p>
            <p data-detail-copy className="opacity-0">
              Water-repellent finish
            </p>
            <p data-detail-copy className="opacity-0">
              Reinforced double-needle stitching
            </p>
          </div>
        </div>
      </section>

      <section className="relative flex min-h-screen items-end px-5 pb-10 pt-24 sm:px-8 lg:px-12">
        <div
          data-buy-panel
          className="ml-auto w-full max-w-xl border border-aura-ink/20 bg-aura-paper/85 p-5 opacity-0 backdrop-blur-xl sm:p-8"
        >
          <div className="flex items-start justify-between gap-8 border-b border-aura-ink/20 pb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.24em]">
                AURA / 001
              </p>
              <h2 className="editorial-copy mt-3 text-4xl leading-none">
                Heavyweight Hoodie
              </h2>
            </div>

            <p className="editorial-copy text-2xl">
              €240
            </p>
          </div>

          <div className="mt-7">
            <p className="mb-3 text-xs uppercase tracking-[0.2em]">
              Color / {color}
            </p>

            <div className="flex flex-wrap gap-3">
              {colors.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={color === item.id}
                  onClick={() =>
                    handleColorChange(item.id)
                  }
                  className={`flex items-center gap-2 border px-3 py-2 text-xs uppercase tracking-[0.14em] transition ${
                    color === item.id
                      ? "border-aura-ink bg-aura-ink text-aura-paper"
                      : "border-aura-ink/20 hover:border-aura-ink"
                  }`}
                >
                  <span
                    className="h-3 w-3 rounded-full border border-black/15"
                    style={{
                      backgroundColor: item.swatch,
                    }}
                  />
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-7">
            <p className="mb-3 text-xs uppercase tracking-[0.2em]">
              Size / {size}
            </p>

            <div className="grid grid-cols-4 gap-2">
              {sizes.map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={size === item}
                  onClick={() => setSize(item)}
                  className={`border px-4 py-3 text-sm transition ${
                    size === item
                      ? "border-aura-ink bg-aura-ink text-aura-paper"
                      : "border-aura-ink/20 hover:border-aura-ink"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <MagneticButton
            type="button"
            onClick={() => {
              setAdded(true);
              window.setTimeout(
                () => setAdded(false),
                1800,
              );
            }}
            className="mt-8 flex w-full items-center justify-between bg-aura-acid px-5 py-5 text-sm font-medium uppercase tracking-[0.18em]"
          >
            <span>
              {added ? "Added to cart" : "Add to cart"}
            </span>
            <span aria-hidden>↗</span>
          </MagneticButton>

          <p className="mt-5 text-xs leading-relaxed text-aura-ink/60">
            Complimentary shipping within the EU. Returns accepted within 14 days.
          </p>
        </div>
      </section>
    </main>
  );
}
