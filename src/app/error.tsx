"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="container-x grid min-h-screen place-items-center text-center">
      <div>
        <p className="eyebrow">Unexpected error</p>
        <h1 className="mt-6 text-7xl tracking-[-.07em]">SYSTEM INTERRUPTED</h1>
        <button onClick={reset} className="mt-10 rounded-full bg-[var(--acid)] px-7 py-4 text-xs uppercase tracking-[.16em] text-black">
          Try again
        </button>
      </div>
    </main>
  );
}
