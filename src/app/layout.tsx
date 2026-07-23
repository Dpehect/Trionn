import type { Metadata } from 'next';
import { Geist, Space_Grotesk } from 'next/font/google';
import './globals.css';

const body = Geist({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-display', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://softbridge.fi'),
  title: { default: 'Softbridge — Senior Product Engineering & AI Systems', template: '%s · Softbridge' },
  description: 'Independent product engineering studio delivering senior software teams, AI systems and scalable digital products across Helsinki, Finland and Europe.',
  alternates: { canonical: '/' },
  openGraph: { title: 'Softbridge — Senior teams for software that cannot fail quietly.', description: 'Senior product engineering and AI systems. Helsinki client strategy, Türkiye engineering delivery.', url: 'https://softbridge.fi', siteName: 'Softbridge', locale: 'en_FI', type: 'website' },
  twitter: { card: 'summary_large_image', title: 'Softbridge — Senior Product Engineering', description: 'Senior software and AI delivery across Finland and Europe.' },
  robots: { index: true, follow: true },
};

const organization = {
  '@context': 'https://schema.org', '@type': ['Organization','ProfessionalService'], name: 'Softbridge', url: 'https://softbridge.fi', email: 'hello@softbridge.fi',
  description: 'Independent product engineering studio with client strategy in Helsinki and senior engineering delivery in Türkiye.',
  areaServed: ['Helsinki','Finland','Nordic countries','European Union'],
  knowsAbout: ['Product engineering','AI systems','Product design','Cloud platforms','Software development'],
  address: { '@type': 'PostalAddress', addressLocality: 'Helsinki', addressCountry: 'FI' },
  hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Product engineering services', itemListElement: ['Product Engineering','Product Experience','AI Systems','Platform Engineering'].map(name => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } })) }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-FI" className={`${body.variable} ${display.variable}`}><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}/>{children}</body></html>;
}
