import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyPage } from "@/components/case-study-page";
import { caseStudies, getCaseStudy } from "@/data/cases";

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

  if (!study) {
    return {
      title: "Case Study Not Found | SoftBridge Solutions",
    };
  }

  return {
    title: `${study.title} | SoftBridge Solutions Finland`,
    description: `${study.intro} Concept case by SoftBridge Solutions for Finland, the Nordics and Europe.`,
    alternates: {
      canonical: `/cases/${study.slug}`,
    },
    openGraph: {
      title: `${study.title} | SoftBridge Solutions Finland`,
      description: study.intro,
      images: [
        {
          url: study.hero,
          alt: `${study.title} concept case by SoftBridge Solutions`,
        },
      ],
    },
  };
}

export default async function CasePage({ params }: CasePageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    notFound();
  }

  return <CaseStudyPage study={study} />;
}
