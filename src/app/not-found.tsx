import Link from "next/link";
export default function NotFound() {
  return (
    <main className="container-x grid min-h-screen place-items-center text-center">
      <div>
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-6 text-[clamp(6rem,22vw,18rem)] font-bold leading-[.7] tracking-[-.09em]">LOST</h1>
        <Link className="mt-12 inline-block rounded-full bg-[var(--acid)] px-7 py-4 text-xs uppercase tracking-[.16em] text-black" href="/">Return home</Link>
      </div>
    </main>
  );
}
