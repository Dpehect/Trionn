'use client';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { jobs } from '@/data/jobs';
export function CareersSection(){return <section id="careers" className="careers-section section-shell">
 <div className="section-heading-grid"><div><p className="section-eyebrow">Careers / Helsinki + remote</p><p className="section-note">Small senior teams. Real ownership. No theatre.</p></div><h2 className="display-section">Build products people can depend on.</h2></div>
 <div className="culture-grid"><article><span>01</span><h3>Craft with purpose</h3><p>We care about the invisible details that make software clearer, faster and more dependable.</p></article><article><span>02</span><h3>Work in the open</h3><p>Design, engineering and strategy sit together. Decisions stay visible and explainable.</p></article><article><span>03</span><h3>Protect deep work</h3><p>Fewer meetings, stronger briefs and enough time to solve the actual problem.</p></article></div>
 <div className="jobs-list">{jobs.map((job,i)=><Link href={`/careers/${job.slug}`} className="job-row" key={job.slug}><span>{String(i+1).padStart(2,'0')}</span><div><p>{job.discipline}</p><h3>{job.title}</h3></div><div><p>{job.location}</p><p>{job.type}</p></div><ArrowUpRight/></Link>)}</div>
 </section>}
