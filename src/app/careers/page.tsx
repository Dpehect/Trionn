import type { Metadata } from 'next';
import { CareersSection } from '@/components/careers/careers-section';
import { SiteFooter } from '@/components/layout/site-footer';
export const metadata:Metadata={title:'Careers — Softbridge Solutions Finland',description:'Join Softbridge Solutions Finland across engineering, product design and AI automation roles.'};
export default function CareersPage(){return <main className="standalone-page"><header className="standalone-nav"><a href="/">Softbridge Finland</a><a href="/">Back to studio</a></header><CareersSection/><SiteFooter/></main>}
