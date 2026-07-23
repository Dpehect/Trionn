'use client';
import Link from 'next/link';
import { ArrowUpRight, BriefcaseBusiness, CalendarClock, Code2, HeartHandshake, Laptop2, Sparkles, GitPullRequest, MessageSquareText, Rocket } from 'lucide-react';
import { jobs } from '@/data/jobs';
const culture=[
 {icon:Code2,index:'01',title:'Craft with purpose',copy:'Senior engineers and designers own outcomes, not isolated tickets.',meta:'Small autonomous squads'},
 {icon:HeartHandshake,index:'02',title:'Work in the open',copy:'Product, design and engineering decisions stay visible, documented and explainable.',meta:'Shared product context'},
 {icon:Laptop2,index:'03',title:'Protect deep work',copy:'Clear briefs, focused collaboration windows and fewer status meetings.',meta:'Remote-friendly rhythm'}
];
export function CareersSection(){return <section id="careers" className="careers-section section-shell">
 <div className="section-heading-grid"><div><p className="section-eyebrow">Talent network / Europe</p><p className="section-note">Small senior teams. Real ownership. No theatre.</p></div><div><h2 className="display-section">Work with us when the right engagement appears.</h2><div className="careers-proof"><span><BriefcaseBusiness size={16}/> Product ownership</span><span><CalendarClock size={16}/> Protected focus time</span><span><Sparkles size={16}/> High craft bar</span></div></div></div>
 <div className="culture-grid culture-grid--professional">{culture.map(({icon:Icon,...item})=><article key={item.index}><div className="culture-card__top"><span>{item.index}</span><Icon size={22}/></div><h3>{item.title}</h3><p>{item.copy}</p><div className="culture-card__workflow"><span><GitPullRequest size={13}/> Brief</span><i/><span><MessageSquareText size={13}/> Review</span><i/><span><Rocket size={13}/> Ship</span></div><strong>{item.meta}</strong></article>)}</div>
 <div className="careers-openings-head"><div><p className="section-eyebrow">Talent network</p><h3>Future collaboration, clearly labelled.</h3></div><p>These profiles describe people we regularly collaborate with or may engage for upcoming work. They are not guaranteed active vacancies.</p></div>
 <div className="jobs-list">{jobs.map((job,i)=><Link href={`/careers/${job.slug}`} className="job-row" key={job.slug}><span>{String(i+1).padStart(2,'0')}</span><div><p>{job.discipline}</p><h3>{job.title}</h3></div><div><p>{job.location}</p><p>{job.type}</p></div><span className="job-row__status">Network</span><ArrowUpRight/></Link>)}</div>
 </section>}
