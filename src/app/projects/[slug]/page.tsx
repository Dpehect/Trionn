import Link from "next/link";
import { notFound } from "next/navigation";
import { MotionLayer } from "@/components/motion/motion-layer";
import { SiteNavigation } from "@/components/navigation/site-navigation";
import { projects } from "@/lib/site-data";

export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const style = { "--c1": project.palette[0], "--c2": project.palette[1], "--c3": project.palette[2] } as React.CSSProperties;

  return <main className="case-study case-study--rev" style={style}>
    <MotionLayer />
    <header className="topbar topbar--page case-study__nav">
      <Link className="back-button" href="/projects" aria-label="Back to projects">←</Link>
      <SiteNavigation />
    </header>

    <section className="case-intro">
      <p className="eyebrow" data-motion-reveal>SELECTED WORK / {project.year}</p>
      <h1 data-motion-reveal>{project.title}</h1>
      <div className="case-intro__foot" data-motion-reveal>
        <p>{project.summary}</p>
        <dl>
          <div><dt>CLIENT</dt><dd>{project.client}</dd></div>
          <div><dt>ROLE</dt><dd>{project.role}</dd></div>
          <div><dt>DISCIPLINE</dt><dd>{project.discipline}</dd></div>
        </dl>
      </div>
    </section>

    <section className="case-cover" data-cursor>
      <div className="case-cover__grid" />
      <div className="case-cover__object"><span>{project.index}</span><b>{project.title}</b></div>
      <p>SCROLL TO EXPLORE</p>
    </section>

    <section className="case-statement">
      <p className="eyebrow">THE PROJECT</p>
      <h2>{project.challenge}</h2>
      <p>{project.solution}</p>
    </section>

    <section className="case-media case-media--split">
      <div className="case-frame case-frame--tall" data-cursor><span>01</span><div className="case-sculpture" /></div>
      <div className="case-frame case-frame--copy"><span>02</span><strong>{project.title.slice(0, 1)}</strong><p>Identity, interface and motion designed as one continuous system.</p></div>
    </section>

    <section className="case-marquee" aria-label={project.title}>
      <div>{project.title} — {project.title} — {project.title} —</div>
    </section>

    <section className="case-media case-media--wide">
      <div className="case-frame case-frame--landscape" data-cursor>
        <span>03</span><div className="case-window"><i /><i /><i /></div>
      </div>
    </section>

    <section className="case-services case-services--rev">
      <p className="eyebrow">CONTRIBUTION</p>
      <ol>{project.services.map((service, serviceIndex) => <li key={service}><span>0{serviceIndex + 1}</span><strong>{service}</strong></li>)}</ol>
    </section>

    <Link className="next-project next-project--rev" href={`/projects/${next.slug}`} data-cursor>
      <span>NEXT PROJECT / {next.index}</span><strong>{next.title}</strong><i>↗</i>
    </Link>
  </main>;
}
