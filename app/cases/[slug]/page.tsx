import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CaseStudyPage } from "@/components/case-study-page";
import { caseStudies, getCaseStudy } from "@/data/cases";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  return {
    title: `${study.title} | SoftBridge Solutions Finland`,
    description: `${study.intro} Concept case by SoftBridge Solutions for Finland, the Nordics and Europe.`,
  };
}

export default async function Page(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return <CaseStudyPage study={study} />;
}
