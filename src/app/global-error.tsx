"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <main className="grid min-h-screen place-items-center bg-[#090909] px-6 text-center text-[#eeeade]">
          <div>
            <p className="text-xs uppercase tracking-[.2em] text-[#a39f94]">
              Fatal application error
            </p>
            <h1 className="mt-6 text-6xl font-bold tracking-[-.07em] md:text-9xl">
              RECOVER
            </h1>
            <button
              onClick={reset}
              className="mt-10 rounded-full bg-[#d8ff61] px-7 py-4 text-xs uppercase tracking-[.16em] text-black"
            >
              Reload experience
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
