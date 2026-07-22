"use client";

import { type MutableRefObject } from "react";
import type { GarmentHandle } from "@/components/canvas/Garment";
import {
  type GarmentColor,
  type GarmentSize,
  useGarmentStore,
} from "@/store/useGarmentStore";

interface OverlayProps {
  garmentRef: MutableRefObject<GarmentHandle | null>;
}

const colorOptions: Array<{
  id: GarmentColor;
  label: string;
  value: string;
}> = [
  { id: "black", label: "Black", value: "#171717" },
  { id: "cream", label: "Cream", value: "#d8cfbd" },
  { id: "olive", label: "Olive", value: "#596149" },
];

const sizes: GarmentSize[] = ["S", "M", "L", "XL"];

export function Overlay({
  garmentRef: _garmentRef,
}: OverlayProps) {
  const color = useGarmentStore((state) => state.color);
  const size = useGarmentStore((state) => state.size);
  const setColor = useGarmentStore((state) => state.setColor);
  const setSize = useGarmentStore((state) => state.setSize);

  return (
    <main className="overlay-shell">
      <section
        id="hero"
        className="relative flex min-h-screen items-end px-6 pb-10 pt-28 lg:px-12"
      >
        <div className="pointer-events-none absolute inset-x-6 top-6 flex justify-between text-[10px] uppercase tracking-[0.24em] lg:inset-x-12">
          <span>AURA / 001</span>
          <span>Heavyweight System</span>
        </div>

        <div className="grid w-full gap-8 lg:grid-cols-[1fr_340px] lg:items-end">
          <div className="pointer-events-none">
            <p className="mb-5 text-xs uppercase tracking-[0.25em]">
              Limited garment study
            </p>

            <h1 className="hero-title max-w-[9ch] font-medium uppercase">
              AURA /
              <br />
              Heavyweight
              <br />
              Hoodie
            </h1>
          </div>

          <div className="pointer-events-none max-w-sm pb-2">
            <p className="editorial-copy text-2xl leading-tight">
              Scroll to explore craft, material and construction.
            </p>

            <div className="mt-8 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em]">
              <span className="h-px w-10 bg-aura-ink" />
              <span>Scroll to enter</span>
            </div>
          </div>
        </div>
      </section>

      <section
        id="details"
        className="relative flex min-h-screen items-center px-6 py-24 lg:px-12"
      >
        <div className="max-w-xl">
          <p
            data-detail-card
            className="mb-6 text-xs uppercase tracking-[0.25em] opacity-0"
          >
            Craftsmanship / 02
          </p>

          <h2
            data-detail-card
            className="editorial-copy max-w-[11ch] text-5xl leading-[0.92] tracking-[-0.045em] opacity-0 sm:text-7xl"
          >
            Density you can see. Structure you can feel.
          </h2>

          <div className="mt-10 grid gap-4 border-t border-aura-ink/20 pt-5 text-sm uppercase tracking-[0.12em] sm:grid-cols-3">
            <article data-detail-card className="opacity-0">
              <strong className="block text-base">450 GSM</strong>
              <span className="mt-2 block text-aura-ink/55">
                Organic Japanese cotton
              </span>
            </article>

            <article data-detail-card className="opacity-0">
              <strong className="block text-base">DWR Finish</strong>
              <span className="mt-2 block text-aura-ink/55">
                Water-repellent surface
              </span>
            </article>

            <article data-detail-card className="opacity-0">
              <strong className="block text-base">Double Needle</strong>
              <span className="mt-2 block text-aura-ink/55">
                Reinforced construction
              </span>
            </article>
          </div>
        </div>
      </section>

      <section
        id="variants"
        className="relative flex min-h-screen items-end px-6 pb-10 pt-24 lg:px-12"
      >
        <div
          data-variant-panel
          className="pointer-events-auto ml-auto w-full max-w-xl border border-aura-ink/20 bg-aura-paper/90 p-6 opacity-0 backdrop-blur-xl sm:p-8"
        >
          <div className="flex items-start justify-between gap-8 border-b border-aura-ink/20 pb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.22em]">
                AURA / 001
              </p>
              <h2 className="editorial-copy mt-3 text-4xl leading-none">
                Heavyweight Hoodie
              </h2>
            </div>

            <p className="editorial-copy text-2xl">€240</p>
          </div>

          <div className="mt-7">
            <p className="mb-3 text-xs uppercase tracking-[0.18em]">
              Color / {color}
            </p>

            <div className="flex flex-wrap gap-3">
              {colorOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={color === option.id}
                  onClick={() => setColor(option.id)}
                  className={`pointer-events-auto flex items-center gap-2 border px-3 py-2 text-xs uppercase tracking-[0.12em] transition ${
                    color === option.id
                      ? "border-aura-ink bg-aura-ink text-aura-paper"
                      : "border-aura-ink/20 hover:border-aura-ink"
                  }`}
                >
                  <span
                    className="h-3 w-3 rounded-full border border-black/10"
                    style={{
                      backgroundColor: option.value,
                    }}
                  />
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-7">
            <p className="mb-3 text-xs uppercase tracking-[0.18em]">
              Size / {size}
            </p>

            <div className="grid grid-cols-4 gap-2">
              {sizes.map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={size === option}
                  onClick={() => setSize(option)}
                  className={`pointer-events-auto border px-4 py-3 text-sm transition ${
                    size === option
                      ? "border-aura-ink bg-aura-ink text-aura-paper"
                      : "border-aura-ink/20 hover:border-aura-ink"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="pointer-events-auto mt-8 flex w-full items-center justify-between bg-aura-acid px-5 py-5 text-sm font-medium uppercase tracking-[0.18em]"
          >
            <span>Add to cart</span>
            <span aria-hidden>↗</span>
          </button>
        </div>
      </section>
    </main>
  );
}
