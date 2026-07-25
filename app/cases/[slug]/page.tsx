import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyPage } from "@/components/case-study-page";
import {
  caseStudies,
  getCaseSeoProfile,
  getCaseStudy,
} from "@/data/cases";

type CasePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  const seo = getCaseSeoProfile(slug);

  if (!study || !seo) {
    return {
      title: "Case Study Not Found | SoftBridge Solutions",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: seo.seoTitle,
    description: seo.metaDescription,
    keywords: seo.keywords,
    alternates: {
      canonical: `/cases/${study.slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "en_FI",
      title: seo.seoTitle,
      description: seo.metaDescription,
      images: [
        {
          url: study.hero,
          width: 1200,
          height: 630,
          alt: `${seo.serviceName} by SoftBridge Solutions`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.seoTitle,
      description: seo.metaDescription,
      images: [study.hero],
    },
  };
}

export default async function CasePage({ params }: CasePageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  const seo = getCaseSeoProfile(slug);

  if (!study || !seo) {
    notFound();
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: seo.serviceName,
    serviceType: seo.serviceType,
    description: seo.metaDescription,
    provider: {
      "@type": "Organization",
      name: "SoftBridge Solutions",
      url: "/",
    },
    areaServed: seo.areaServed.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Companies, startups, scale-ups and enterprise teams",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: seo.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: study.title,
        item: `/cases/${study.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CaseStudyPage study={study} />
    </>
  );
}
