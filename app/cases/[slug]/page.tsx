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
    openGraph: {
      type: "website",
      locale: "en_FI",
      title: seo.seoTitle,
      description: seo.metaDescription,
      images: [{ url: study.hero, width: 1200, height: 630 }],
    },
  };
}

export default async function CasePage({ params }: CasePageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  const seo = getCaseSeoProfile(slug);

  if (!study || !seo) notFound();

  return <CaseStudyPage study={study} />;
}
