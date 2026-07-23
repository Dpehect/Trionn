import type { MetadataRoute } from 'next';
import { caseStudies } from '@/data/case-studies';
import { jobs } from '@/data/jobs';
export default function sitemap():MetadataRoute.Sitemap{const base=process.env.NEXT_PUBLIC_SITE_URL??'https://softbridge.fi';const routes=['','/projects','/careers','/contact','/privacy'].map(path=>({url:`${base}${path}`,lastModified:new Date(),changeFrequency:'monthly' as const,priority:path===''?1:.7}));return [...routes,...caseStudies.map(p=>({url:`${base}/projects/${p.slug}`,lastModified:new Date(),changeFrequency:'monthly' as const,priority:.8})),...jobs.map(j=>({url:`${base}/careers/${j.slug}`,lastModified:new Date(),changeFrequency:'weekly' as const,priority:.6}))]}
