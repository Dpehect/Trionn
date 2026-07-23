import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Selected Work — Softbridge Solutions Finland",
  description:
    "Selected software, AI automation, SaaS and digital product work by Softbridge Solutions Finland.",
};

const projects = [
  {
    index: "01",
    title: "Northstar AI",
    category: "AI Automation / SaaS",
    summary:
      "An intelligent operations platform that turns complex business workflows into measurable, automated systems.",
    gradient:
      "from-[#5b7cff] via-[#9b5cff] to-[#ff705f]",
  },
  {
    index: "02",
    title: "Aurora Commerce",
    category: "Commerce / Product Engineering",
    summary:
      "A high-performance commerce ecosystem designed for faster discovery, conversion and international growth.",
    gradient:
      "from-[#ff705f] via-[#ff9f68] to-[#c8ff4d]",
  },
  {
    index: "03",
    title: "Sisu Mobile",
    category: "Mobile / Digital Product",
    summary:
      "A focused mobile experience combining product strategy, native interaction patterns and scalable architecture.",
    gradient:
      "from-[#9b5cff] via-[#5b7cff] to-[#67e8f9]",
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen px-5 pb-20 pt-8 md:px-8 md:pb-28">
      <header className="mx-auto flex max-w-[1500px] items-center justify-between border-b border-white/10 pb-5">
        <Link
          href="/"
          className="text-sm font-semibold tracking-[-0.02em] transition-opacity hover:opacity-60"
        >
          Softbridge Finland
        </Link>
        <Link
          href="/#work"
          className="text-xs uppercase tracking-[0.18em] text-white/55 transition-colors hover:text-white"
        >
          Back to studio
        </Link>
      </header>

      <section className="mx-auto max-w-[1500px] pb-16 pt-20 md:pb-24 md:pt-28">
        <p className="mb-5 text-xs uppercase tracking-[0.22em] text-white/45">
          Selected work / 2026
        </p>
        <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
          <h1 className="max-w-5xl text-[clamp(3.25rem,7vw,7.5rem)] font-semibold leading-[0.92] tracking-[-0.055em]">
            Digital products built to create real momentum.
          </h1>
          <p className="max-w-md text-base leading-relaxed text-white/55 lg:pb-2">
            A selection of product engineering, AI automation and experience
            design engagements for ambitious teams in Finland and Europe.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1500px] gap-5 lg:grid-cols-12">
        {projects.map((project, index) => (
          <article
            key={project.title}
            className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 md:p-7 ${
              index === 0 ? "lg:col-span-7" : index === 1 ? "lg:col-span-5" : "lg:col-span-12"
            }`}
          >
            <div
              className={`relative mb-8 min-h-[320px] overflow-hidden rounded-[1.5rem] bg-gradient-to-br md:min-h-[430px] ${project.gradient}`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,.45),transparent_24%),linear-gradient(135deg,transparent,rgba(0,0,0,.38))]" />
              <div className="absolute -bottom-20 -right-16 size-72 rounded-full border border-white/35 bg-black/15 backdrop-blur-2xl transition-transform duration-700 will-change-transform group-hover:-translate-x-6 group-hover:-translate-y-6 group-hover:scale-110 md:size-96" />
              <div className="absolute left-6 top-6 rounded-full border border-white/30 bg-black/15 px-3 py-2 text-xs uppercase tracking-[0.18em] backdrop-blur-xl">
                {project.index}
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-[1fr_1fr] md:items-end">
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.18em] text-white/45">
                  {project.category}
                </p>
                <h2 className="text-3xl font-medium tracking-[-0.04em] md:text-5xl">
                  {project.title}
                </h2>
              </div>
              <p className="max-w-lg text-sm leading-relaxed text-white/55 md:justify-self-end md:text-base">
                {project.summary}
              </p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
