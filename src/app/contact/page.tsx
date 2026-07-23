import type { Metadata } from 'next';
import Link from 'next/link';
import { ContactSection } from '@/components/contact/contact-section';
import { SiteFooter } from '@/components/layout/site-footer';
export const metadata:Metadata={title:'Start a Project — Softbridge Solutions Finland',description:'Discuss a software, SaaS, AI automation, mobile or digital product engagement with Softbridge Solutions Finland.'};
export default function ContactPage(){return <main className="standalone-page"><header className="standalone-nav"><Link href="/">Softbridge Finland</Link><Link href="/">Back to studio</Link></header><ContactSection/><SiteFooter/></main>}
