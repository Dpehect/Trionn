'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Check, Clock3, Code2, Database, Fingerprint, Gauge, Menu, ShieldCheck, Sparkles, X } from 'lucide-react';
import { gsap, ScrollTrigger, Flip, Observer, SplitText } from 'gsap/all';

const IntegratedSystemScene = dynamic(() => import('./integrated-system-scene').then(m => m.IntegratedSystemScene), { ssr: false });

gsap.registerPlugin(ScrollTrigger, Flip, Observer, SplitText);

type Capability = {
  id: string; label: string; title: string; statement: string; engagement: string; team: string; signals: string[]; outputs: string[]; tone: string;
};

const capabilities: Capability[] = [
  { id: 'product', label: 'Product', title: 'Build the product your next stage depends on.', statement: 'Turn a business opportunity into production software that can be shipped, measured and extended without rebuilding the foundation.', engagement: '10–18 weeks', team: 'Product lead · Tech lead · 2–4 engineers', signals: ['Release scope shaped in 2–3 weeks', 'One measurable outcome per engagement'], outputs: ['Product brief', 'Domain architecture', 'Production application'], tone: '#8f7af2' },
  { id: 'experience', label: 'Experience', title: 'Make complex software clear at first use.', statement: 'Design product journeys that reduce cognitive load, improve adoption and remain coherent as the surface area grows.', engagement: '6–14 weeks', team: 'Product designer · Frontend lead · Product engineer', signals: ['WCAG 2.2 AA minimum', 'Performance budget before build'], outputs: ['Journey architecture', 'Interactive prototype', 'Production design system'], tone: '#d9ef68' },
  { id: 'intelligence', label: 'Intelligence', title: 'Automate friction without removing control.', statement: 'Deploy traceable AI workflows with evaluation, human approval and clear escalation paths for material decisions.', engagement: '6–12 weeks', team: 'AI engineer · Integration lead · Product engineer', signals: ['Every action traceable', 'Human review for material decisions'], outputs: ['Workflow risk map', 'Agent orchestration', 'Evaluation framework'], tone: '#8bcde0' },
  { id: 'platform', label: 'Platform', title: 'Keep the system dependable as complexity grows.', statement: 'Create observable cloud, integration and release foundations that support growth without making every change dangerous.', engagement: '8–16 weeks or ongoing', team: 'Tech lead · Platform engineer · QA', signals: ['99.95% target availability where required', 'Defined recovery paths'], outputs: ['Integration architecture', 'Deployment pipeline', 'Reliability roadmap'], tone: '#ef8d78' },
];

const work = [
  { type: 'Verified client engagement', title: 'Operations platform for a European service company', problem: 'Onboarding moved through email, spreadsheets and repeated manual validation across four teams.', approach: 'One operational product, structured approval states and CRM synchronisation replaced fragmented handoffs.', outcome: ['38% less manual coordination', 'One source of operational truth'], color: '#8f7af2' },
  { type: 'Anonymised client engagement', title: 'AI-assisted document operations', problem: 'Specialists manually classified and routed a high volume of business documents.', approach: 'A human-controlled workflow now extracts, validates, escalates and records every material action.', outcome: ['Audit trail for every AI action', 'Human approval retained for exceptions'], color: '#8bcde0' },
  { type: 'Representative product study', title: 'Northstar Operations', problem: 'Automation products often hide context, uncertainty and exceptions from operators.', approach: 'A command layer combines orchestration, approvals, evidence and system health in one surface.', outcome: ['12 representative workflow patterns', 'Illustrative metrics, clearly labelled'], color: '#d9ef68' },
];

function MagneticLink({ href, children, secondary = false }: { href: string; children: React.ReactNode; secondary?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  return <motion.a ref={ref} href={href} className={`magnetic-cta ${secondary ? 'is-secondary' : ''}`} whileHover={{ y: -2 }} whileTap={{ scale: .98 }} onMouseMove={(e) => {
    const r = e.currentTarget.getBoundingClientRect();
    gsap.to(e.currentTarget, { x: (e.clientX - r.left - r.width / 2) * .08, y: (e.clientY - r.top - r.height / 2) * .08, duration: .35, overwrite: true });
  }} onMouseLeave={(e) => gsap.to(e.currentTarget, { x: 0, y: 0, duration: .55, ease: 'elastic.out(1,.45)' })}>{children}<ArrowUpRight size={17} /></motion.a>;
}

function DeliveryOS() {
  const [tab, setTab] = useState('Build');
  const data = useMemo(() => ({
    Scope: ['Outcome agreed', '14 requirements validated', '2 constraints unresolved'],
    Build: ['Identity workflow', 'CRM synchronisation', 'Admin decision queue'],
    Validate: ['6 user sessions', '0 critical defects', 'AA contrast verified'],
    Release: ['Release 07', '87% confidence', '0 critical blockers'],
  }[tab] ?? []), [tab]);
  return <motion.div className="delivery-os" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .5, duration: .8 }}>
    <div className="delivery-os__top"><div><i /><strong>Softbridge Delivery OS</strong><span>Release 07 · On track</span></div><span className="live-dot">Live engagement</span></div>
    <div className="delivery-os__tabs">{['Scope','Build','Validate','Release'].map(item => <button key={item} onClick={() => setTab(item)} className={tab === item ? 'is-active' : ''}>{item}</button>)}</div>
    <div className="delivery-os__objective"><span>Current objective</span><strong>Reduce onboarding from four days to under thirty minutes.</strong></div>
    <AnimatePresence mode="wait"><motion.div key={tab} className="delivery-os__grid" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: .22 }}>{data.map((item, i) => <div key={item}><span>0{i + 1}</span><strong>{item}</strong><Check size={14} /></div>)}</motion.div></AnimatePresence>
    <div className="delivery-os__footer"><span><Gauge size={14}/> 87% release confidence</span><span><ShieldCheck size={14}/> No critical blockers</span></div>
  </motion.div>;
}

export function StudioSite() {
  const root = useRef<HTMLDivElement>(null);
  const capabilityStage = useRef<HTMLDivElement>(null);
  const [capability, setCapability] = useState(capabilities[0]);
  const [menu, setMenu] = useState(false);
  const [formState, setFormState] = useState<'idle'|'sending'|'sent'|'error'>('idle');
  const [time, setTime] = useState('--:--');

  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat('en-FI', { timeZone: 'Europe/Helsinki', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date()));
    update(); const timer = setInterval(update, 30000); return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!root.current) return;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const heroSplit = new SplitText('.hero-display', { type: 'lines,words', linesClass: 'split-line' });
      gsap.from(heroSplit.words, { yPercent: 110, opacity: 0, rotate: 1.2, stagger: .035, duration: .95, ease: 'power4.out', delay: .1 });
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => gsap.from(element, { y: 36, opacity: 0, duration: .85, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 84%', once: true } }));
      gsap.to('.hero-scene-wrap', { yPercent: 16, rotate: 2, scrollTrigger: { trigger: '.studio-hero', start: 'top top', end: 'bottom top', scrub: 1 } });
      Observer.create({ target: window, type: 'wheel,touch', tolerance: 30, onDown: () => document.documentElement.dataset.direction = 'down', onUp: () => document.documentElement.dataset.direction = 'up' });
    });
    return () => mm.revert();
  }, []);

  const changeCapability = (next: Capability) => {
    if (!capabilityStage.current) return setCapability(next);
    const state = Flip.getState(capabilityStage.current.children);
    setCapability(next);
    requestAnimationFrame(() => Flip.from(state, { duration: .55, ease: 'power3.inOut', absolute: false }));
  };

  async function submitBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setFormState('sending');
    const form = event.currentTarget; const payload = Object.fromEntries(new FormData(form));
    try { const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }); if (!response.ok) throw new Error(); setFormState('sent'); form.reset(); } catch { setFormState('error'); }
  }

  return <div ref={root} className="studio-site">
    <header className="studio-header"><Link href="#top" className="studio-brand"><span>S</span><div><strong>Softbridge</strong><small>Product engineering studio</small></div></Link><nav>{['Delivery','Expertise','Work','Approach','Talent'].map(item => <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>)}</nav><a href="#contact" className="header-brief">Start a project <ArrowUpRight size={15}/></a><button className="menu-button" onClick={() => setMenu(!menu)} aria-label="Toggle menu">{menu ? <X/> : <Menu/>}</button></header>
    <AnimatePresence>{menu && <motion.nav className="mobile-nav" initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} exit={{ clipPath: 'inset(0 0 100% 0)' }}>{['Delivery','Expertise','Work','Approach','Talent','Contact'].map(item => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenu(false)}>{item}<ArrowUpRight/></a>)}</motion.nav>}</AnimatePresence>

    <main id="top">
      <section className="studio-hero">
        <div className="hero-copy"><p className="eyebrow"><span/> Independent studio · Helsinki + Türkiye</p><h1 className="hero-display">Senior teams for software that cannot fail quietly.</h1><p className="hero-lede">We shape and build business-critical products, AI systems and scalable platforms for ambitious teams across Finland and Europe.</p><div className="hero-actions"><MagneticLink href="#contact">Start a project</MagneticLink><MagneticLink href="#work" secondary>See selected work</MagneticLink></div><div className="hero-trust">{[['6+','years building'],['4h+','daily overlap'],['Senior','led by default'],['02','selected slots']].map(([a,b]) => <div key={b}><strong>{a}</strong><span>{b}</span></div>)}</div></div>
        <div className="hero-scene-wrap"><IntegratedSystemScene/><DeliveryOS/></div>
      </section>

      <section id="delivery" className="delivery-section section-shell" data-reveal><div className="section-intro"><p className="eyebrow">Delivery model / 02</p><h2>Finland meets Türkiye. One team, not two vendors.</h2><p>Strategy and stakeholder context stay close to Helsinki. Senior product and engineering delivery runs from Türkiye through the same backlog, roadmap and definition of done.</p></div><div className="hub-system"><article><span>HEL</span><div><small>Helsinki hub</small><h3>Client strategy</h3><p>Discovery, product direction, stakeholder alignment and Nordic market proximity.</p></div></article><div className="hub-bridge"><i/><strong>Same working hours</strong><span>live decisions flow both ways</span></div><article><span>TR</span><div><small>Türkiye hub</small><h3>Senior delivery</h3><p>Product design, full-stack engineering, AI, quality assurance and continuous delivery.</p></div></article></div><div className="advantage-grid">{[['4+ hours','Guaranteed live overlap'],['100%','Senior-led engagements'],['1 backlog','One priority system'],['Lean shape','Budget reaches delivery']].map(([value,label]) => <article key={label}><strong>{value}</strong><span>{label}</span></article>)}</div></section>

      <section id="expertise" className="expertise-section section-shell" data-reveal><div className="section-intro"><p className="eyebrow">Expertise / 03</p><h2>Four capabilities. One accountable product team.</h2><p>We organise each engagement around a business outcome—not a list of disconnected deliverables.</p></div><div className="capability-tabs" role="tablist">{capabilities.map(item => <button role="tab" aria-selected={capability.id === item.id} className={capability.id === item.id ? 'is-active' : ''} key={item.id} onClick={() => changeCapability(item)}><span>{item.label}</span><i style={{ background: item.tone }}/></button>)}</div><div ref={capabilityStage} className="capability-stage" style={{ '--capability': capability.tone } as React.CSSProperties}><div className="capability-copy"><p>{capability.label}</p><h3>{capability.title}</h3><span>{capability.statement}</span><a href="#contact">Discuss this capability <ArrowUpRight size={16}/></a></div><div className="capability-system"><div className="capability-glyph"><span/><span/><span/></div><div className="capability-meta"><div><small>Typical engagement</small><strong>{capability.engagement}</strong></div><div><small>Team shape</small><strong>{capability.team}</strong></div></div><div className="capability-signals">{capability.signals.map(signal => <span key={signal}><Check size={14}/>{signal}</span>)}</div><div className="capability-outputs">{capability.outputs.map((output,index) => <div key={output}><span>0{index+1}</span><strong>{output}</strong></div>)}</div></div></div><p className="fine-print">Timelines and signals are representative planning ranges. Final scope, team and success measures are agreed during discovery.</p></section>

      <section id="work" className="work-section section-shell" data-reveal><div className="section-intro"><p className="eyebrow">Selected work / 04</p><h2>Proof where we can show it. Clear labels where we cannot.</h2><p>Every study distinguishes verified delivery, confidential work and representative product thinking.</p></div><div className="work-grid">{work.map((item,index) => <article className="work-case" key={item.title} style={{ '--work-tone': item.color } as React.CSSProperties}><div className="work-case__visual"><div className="work-machine"><span/><span/><span/><i/></div><small>0{index+1}</small></div><div className="work-case__copy"><p>{item.type}</p><h3>{item.title}</h3><div><small>Problem</small><span>{item.problem}</span></div><div><small>Approach</small><span>{item.approach}</span></div><ul>{item.outcome.map(outcome => <li key={outcome}><Check size={14}/>{outcome}</li>)}</ul><button>View case details <ArrowUpRight size={16}/></button></div></article>)}</div></section>

      <section id="approach" className="approach-section section-shell" data-reveal><div className="section-intro"><p className="eyebrow">How we work / 05</p><h2>The process is visible. Responsibility stays close.</h2></div><div className="principles-grid">{[['Craft with purpose','Outcome review','Outcome brief'],['Work in the open','Weekly decision review','Decision log'],['Protect deep work','Two collaboration windows','Async delivery update']].map(([title,ritual,artifact],index) => <article key={title}><span>0{index+1}</span><h3>{title}</h3><p>{index===0?'Every decision must support an agreed user or business outcome.':index===1?'Trade-offs, risks and ownership remain visible to everyone responsible for the product.':'Predictable collaboration leaves uninterrupted time for design, engineering and validation.'}</p><div><small>Ritual</small><strong>{ritual}</strong></div><div><small>Artifact</small><strong>{artifact}</strong></div></article>)}</div><div className="engagement-line">{['Discovery','Shape','Build','Validate','Release'].map((step,index) => <div key={step}><span>0{index+1}</span><strong>{step}</strong><small>{['Opportunity brief','Scope and architecture','Working releases','Evidence and decisions','Stewardship plan'][index]}</small></div>)}</div></section>

      <section id="trust" className="trust-section section-shell" data-reveal><div className="section-intro"><p className="eyebrow">Trust and transparency / 06</p><h2>No inflated team. No invented proof. No hidden delivery layer.</h2></div><div className="trust-grid">{[['Claims are labelled','Verified results, anonymised engagements, targets and studies are clearly distinguished.'],['Senior-led by default','You work directly with the people responsible for product and engineering decisions.'],['Confidentiality built in','Sensitive discussions are NDA-ready and limited to the working team.'],['Clear commercial scope','Assumptions, exclusions, team shape and change rules are documented before delivery.']].map(([title,copy]) => <article key={title}><ShieldCheck/><h3>{title}</h3><p>{copy}</p></article>)}</div><div className="disclosure"><Fingerprint/><div><small>Company disclosure</small><strong>Commercial documentation names the contracting legal entity, jurisdiction, registration details and data-processing terms before commitment.</strong></div></div></section>

      <section id="talent" className="talent-section section-shell" data-reveal><div className="section-intro"><p className="eyebrow">Talent network / 07</p><h2>Small teams need unusually dependable people.</h2><p>No permanent roles are open today. The network is for specialists we may contact when their expertise matches a confirmed engagement.</p></div><div className="talent-grid">{[['Product engineering','React · Next.js · Node.js · Cloud'],['AI systems','Python · TypeScript · RAG · Evaluation'],['Product design','Product strategy · UX · Design systems']].map(([title,stack]) => <article key={title}><Code2/><small>Contract · engagement-based</small><h3>{title}</h3><p>{stack}</p><a href="mailto:talent@softbridge.fi">Submit your profile <ArrowUpRight size={16}/></a></article>)}</div><p className="talent-note">No speculative unpaid assignments. Any practical evaluation is focused, time-boxed and agreed in advance.</p></section>

      <section id="contact" className="contact-section-new section-shell" data-reveal><div className="contact-copy"><p className="eyebrow">Start a project / 08</p><h2>Bring us the part that cannot afford to stay unclear.</h2><p>Share the problem, intended outcome and current constraint. A senior team member replies within two business days.</p><div className="contact-signals"><span><Clock3/> Helsinki · {time}</span><span><ShieldCheck/> NDA-ready</span><span><Database/> Clear commercial scope</span></div></div><form className="project-form" onSubmit={submitBrief}><label><span>Your name</span><input name="name" required placeholder="Aino Virtanen"/></label><label><span>Work email</span><input name="email" type="email" required placeholder="aino@company.com"/></label><label><span>Company or team</span><input name="company" required placeholder="Company name"/></label><label><span>What do you need?</span><select name="service" required defaultValue=""><option value="" disabled>Select the closest option</option>{capabilities.map(item => <option key={item.id}>{item.label}</option>)}<option>Not sure yet</option></select></label><label><span>Indicative investment</span><select name="budget" required defaultValue=""><option value="" disabled>Select range</option><option>€20k–€40k</option><option>€40k–€80k</option><option>€80k–€150k</option><option>€150k+</option></select></label><label><span>Preferred start</span><select name="timing" defaultValue=""><option value="">Not decided</option><option>Within 4 weeks</option><option>1–2 months</option><option>This quarter</option></select></label><label className="is-wide"><span>What needs to change?</span><textarea name="message" required minLength={20} maxLength={2000} rows={6} placeholder="Describe the problem, who experiences it, the intended outcome and important constraints."/><small>20–2,000 characters</small></label><label className="form-check"><input type="checkbox" name="confidential"/><span>This project includes confidential information.</span></label><button type="submit" disabled={formState === 'sending'}>{formState === 'sending' ? 'Sending brief…' : 'Send project brief'}<ArrowUpRight size={17}/></button>{formState === 'sent' && <p className="form-success">Brief received. A senior team member will reply within two business days.</p>}{formState === 'error' && <p className="form-error">The brief could not be sent. Try again or email hello@softbridge.fi.</p>}</form></section>
    </main>
    <footer className="studio-footer"><div><strong>Softbridge</strong><h2>Senior product engineering for ambitious European teams.</h2></div><nav><a href="#work">Work</a><a href="#expertise">Expertise</a><a href="#approach">Approach</a><a href="#talent">Talent</a><a href="/privacy">Privacy</a></nav><div><span><i/> Selected project conversations open</span><a href="mailto:hello@softbridge.fi">hello@softbridge.fi</a></div><small>© 2026 Softbridge. Legal entity details are disclosed in commercial documentation.</small></footer>
  </div>;
}
