import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-5">
      <div className="max-w-2xl text-center">
        <p className="mb-5 text-xs uppercase tracking-[0.22em] text-white/45">404 / Route not found</p>
        <h1 className="text-5xl font-semibold tracking-[-0.05em] md:text-8xl">This page does not exist.</h1>
        <Link href="/" className="mt-8 inline-flex rounded-full border border-white/15 bg-white px-5 py-3 text-sm font-medium text-black">
          Return home
        </Link>
      </div>
    </main>
  );
}
