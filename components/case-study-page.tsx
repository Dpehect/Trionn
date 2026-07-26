"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { getCaseSeoProfile, type CaseStudy } from "@/data/cases";
import styles from "./case-study-page.module.css";
import { ArcCarouselSection } from "./arc-carousel-section";
import { SiteNavbar } from "./site-navbar";
import { VideoReferencePreloader } from "./video-reference-preloader";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const softBridgeLogo =
  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' rx='14' fill='%23F0642F'/%3E%3Cpath d='M13 31V17h8.2c4.2 0 6.8 2 6.8 5.2 0 1.8-.8 3.2-2.4 4 2.1.7 3.3 2.3 3.3 4.5 0 3.8-3 5.3-7.4 5.3H13Zm5-8.4h3c1.5 0 2.3-.6 2.3-1.8 0-1.1-.8-1.7-2.3-1.7h-3v3.5Zm0 8h3.6c1.8 0 2.7-.7 2.7-2 0-1.3-.9-2-2.7-2H18v4Z' fill='white'/%3E%3C/svg%3E";

type FeaturedItem = {
  category: string;
  description: string;
  audience: string;
  client: string;
  logo: string;
  image: string;
  href: string;
};

type ServiceGroup = {
  number: string;
  title: string;
  rows: { label: string; image: string }[];
};

type CaseProfile = {
  manifesto: string;
  featured: Omit<FeaturedItem, "client" | "logo" | "href" | "image">[];
  services: {
    title: string;
    rows: string[];
  }[];
};

const profiles: Record<string, CaseProfile> = {
  "ai-software-development-finland": {
    manifesto:
      "",
    featured: [
      {
        category: "AI Discovery",
        description:
          "Finding the highest-value automation opportunities before engineering begins. The solution is designed for Finnish and Nordic companies that need secure AI integration, governed access to business data and production-ready automation across European operations.",
        audience: "Operations leaders · Product teams · Innovation units · Finland · Nordics",
      },
      {
        category: "LLM Workflows",
        description:
          "Secure language-model workflows connected to real company knowledge and business rules. The solution is designed for Finnish and Nordic companies that need secure AI integration, governed access to business data and production-ready automation across European operations.",
        audience: "SaaS teams · Service companies · Knowledge businesses · Finland · Nordics",
      },
      {
        category: "Automation Systems",
        description:
          "Orchestrated agents and integrations that remove repetitive work from critical processes. The solution is designed for Finnish and Nordic companies that need secure AI integration, governed access to business data and production-ready automation across European operations.",
        audience: "Logistics · Finance · Manufacturing · Healthcare · Finland · Nordics",
      },
      {
        category: "AI Operations",
        description:
          "Observable, controlled AI infrastructure built for production reliability and continuous improvement. The solution is designed for Finnish and Nordic companies that need secure AI integration, governed access to business data and production-ready automation across European operations.",
        audience: "Enterprise IT · Data teams · Scale-ups · Finland · Nordics",
      },
    ],
    services: [
      { title: "AI Strategy", rows: ["Opportunity Mapping", "Workflow Research", "Data Readiness", "AI Roadmap"] },
      { title: "Model & Product", rows: ["LLM Applications", "RAG Systems", "Agent Design", "Human Review"] },
      { title: "Engineering", rows: ["API Integration", "Automation", "Evaluation", "Security"] },
      { title: "Operations", rows: ["Monitoring", "Cost Control", "Governance", "Continuous Tuning"] },
    ],
  },
  "enterprise-saas-platform": {
    manifesto:
      "We build enterprise SaaS platforms that simplify complex operations, support multiple teams and remain clear as the business scales.",
    featured: [
      {
        category: "Product Architecture",
        description:
          "A modular foundation that keeps permissions, workflows and business logic maintainable. This approach supports Finnish, Nordic and European B2B organizations that need scalable SaaS architecture, multi-market delivery and maintainable enterprise software.",
        audience: "B2B SaaS · Enterprise teams · Multi-market companies · Finland · Nordics · Europe",
      },
      {
        category: "Enterprise UX",
        description:
          "Role-aware interfaces that reduce cognitive load and make critical actions easy to find. This approach supports Finnish, Nordic and European B2B organizations that need scalable SaaS architecture, multi-market delivery and maintainable enterprise software.",
        audience: "Operations · Finance · Customer success · Management · Finland · Nordics · Europe",
      },
      {
        category: "Data & Reporting",
        description:
          "Decision-ready dashboards that connect operational activity with measurable outcomes. This approach supports Finnish, Nordic and European B2B organizations that need scalable SaaS architecture, multi-market delivery and maintainable enterprise software.",
        audience: "Executives · Analysts · Regional teams · Finland · Nordics · Europe",
      },
      {
        category: "Platform Scale",
        description:
          "Cloud-native delivery, observability and integration patterns for long-term expansion. This approach supports Finnish, Nordic and European B2B organizations that need scalable SaaS architecture, multi-market delivery and maintainable enterprise software.",
        audience: "Nordic scale-ups · International SaaS providers",
      },
    ],
    services: [
      { title: "Product Strategy", rows: ["SaaS Roadmap", "User Roles", "Business Rules", "Feature Prioritization"] },
      { title: "Experience Design", rows: ["Enterprise UX", "Design Systems", "Dashboard Design", "Accessibility"] },
      { title: "Platform Build", rows: ["Frontend Systems", "Backend Services", "Permissions", "Integrations"] },
      { title: "Scale & Reliability", rows: ["Cloud Architecture", "Observability", "Performance", "Release Systems"] },
    ],
  },
  "healthcare-software-nordics": {
    manifesto:
      "We create secure healthcare software that reduces administrative friction and supports clearer coordination between patients and clinical teams.",
    featured: [
      {
        category: "Care Journeys",
        description:
          "Patient and clinician workflows designed around clarity, urgency and reduced administrative burden. The platform is shaped for Nordic healthcare providers and European digital-health teams that require accessible workflows, privacy-aware design and dependable clinical software.",
        audience: "Clinics · Care providers · Digital health teams · Nordic healthcare · Europe",
      },
      {
        category: "Secure Access",
        description:
          "Privacy-aware access patterns that make sensitive information understandable and controlled. The platform is shaped for Nordic healthcare providers and European digital-health teams that require accessible workflows, privacy-aware design and dependable clinical software.",
        audience: "Clinical staff · Administrators · Patients · Nordic healthcare · Europe",
      },
      {
        category: "Clinical Operations",
        description:
          "Shared dashboards that surface appointments, tasks and operational priorities in real time. The platform is shaped for Nordic healthcare providers and European digital-health teams that require accessible workflows, privacy-aware design and dependable clinical software.",
        audience: "Healthcare operations · Multi-site organizations · Nordic healthcare · Europe",
      },
      {
        category: "Connected Care",
        description:
          "Interoperable services designed to connect communication, scheduling and clinical systems. The platform is shaped for Nordic healthcare providers and European digital-health teams that require accessible workflows, privacy-aware design and dependable clinical software.",
        audience: "Health platforms · Public providers · Nordic clinics",
      },
    ],
    services: [
      { title: "Care Strategy", rows: ["Journey Mapping", "Clinical Research", "Service Design", "Workflow Priorities"] },
      { title: "Health UX", rows: ["Patient Portals", "Clinician UX", "Accessibility", "Design Systems"] },
      { title: "Secure Software", rows: ["Identity", "Permissions", "Audit Trails", "Data Protection"] },
      { title: "Interoperability", rows: ["API Design", "System Integration", "Notifications", "Operational Reporting"] },
    ],
  },
  "logistics-software-europe": {
    manifesto:
      "We design logistics platforms that make fleet movement, route performance and operational exceptions visible in one actionable system.",
    featured: [
      {
        category: "Fleet Visibility",
        description:
          "Live views that connect vehicles, routes and operational status across regions. It supports logistics companies in Finland and across Europe with clearer fleet operations, regional scalability, connected data and faster operational decision-making.",
        audience: "Fleet managers · Dispatch teams · Logistics operators · Finland · European operations",
      },
      {
        category: "Route Intelligence",
        description:
          "Contextual routing and performance insight for faster, better-informed decisions. It supports logistics companies in Finland and across Europe with clearer fleet operations, regional scalability, connected data and faster operational decision-making.",
        audience: "Transport planners · Regional operations · Finland · European operations",
      },
      {
        category: "Exception Control",
        description:
          "Priority alerts and workflows that prevent small disruptions becoming expensive delays. It supports logistics companies in Finland and across Europe with clearer fleet operations, regional scalability, connected data and faster operational decision-making.",
        audience: "Control rooms · Customer operations · Management · Finland · European operations",
      },
      {
        category: "Network Scale",
        description:
          "Multi-region architecture for growing logistics networks and partner integrations. It supports logistics companies in Finland and across Europe with clearer fleet operations, regional scalability, connected data and faster operational decision-making.",
        audience: "European carriers · 3PL providers · Distribution networks",
      },
    ],
    services: [
      { title: "Operations Strategy", rows: ["Fleet Mapping", "Route Research", "Exception Models", "KPI Definition"] },
      { title: "Control Experience", rows: ["Live Maps", "Alert Design", "Driver Workflows", "Operations Dashboards"] },
      { title: "Platform Engineering", rows: ["Tracking APIs", "Event Processing", "Integrations", "Mobile Tools"] },
      { title: "Network Performance", rows: ["Observability", "Regional Scaling", "Data Quality", "Automation"] },
    ],
  },
  "manufacturing-ai-solutions": {
    manifesto:
      "We transform machine and production data into predictive insight that helps industrial teams improve uptime, quality and operational control.",
    featured: [
      {
        category: "Signal Intelligence",
        description:
          "Normalizing machine and process signals into a dependable operational data layer. The system is built for manufacturers in Finland, the Nordics and Europe that need Industry 4.0 analytics, predictive maintenance and measurable production visibility.",
        audience: "Plant managers · Engineering teams · Industry 4.0 leaders · Finland · Nordic industry",
      },
      {
        category: "Predictive Maintenance",
        description:
          "Early-warning models that help maintenance teams act before equipment failure. The system is built for manufacturers in Finland, the Nordics and Europe that need Industry 4.0 analytics, predictive maintenance and measurable production visibility.",
        audience: "Maintenance · Reliability engineering · Production · Finland · Nordic industry",
      },
      {
        category: "Quality Analytics",
        description:
          "Clear quality indicators connecting production conditions with measurable outcomes. The system is built for manufacturers in Finland, the Nordics and Europe that need Industry 4.0 analytics, predictive maintenance and measurable production visibility.",
        audience: "Quality teams · Process engineers · Operations · Finland · Nordic industry",
      },
      {
        category: "Factory Operations",
        description:
          "Shared production views that align uptime, throughput and maintenance priorities. The system is built for manufacturers in Finland, the Nordics and Europe that need Industry 4.0 analytics, predictive maintenance and measurable production visibility.",
        audience: "Manufacturers · Industrial groups · Smart factories · Finland · Nordic industry",
      },
    ],
    services: [
      { title: "Industrial Discovery", rows: ["Process Mapping", "Data Assessment", "Failure Analysis", "Value Roadmap"] },
      { title: "Predictive AI", rows: ["Anomaly Detection", "Forecasting", "Quality Models", "Model Evaluation"] },
      { title: "Factory Software", rows: ["Operations UI", "Machine Integration", "Alerts", "Reporting"] },
      { title: "Production Scale", rows: ["Edge & Cloud", "Monitoring", "Security", "Continuous Learning"] },
    ],
  },
  "cloud-application-development": {
    manifesto:
      "We engineer resilient cloud applications with clear service boundaries, reliable deployments and operational visibility built into the product.",
    featured: [
      {
        category: "Cloud Architecture",
        description:
          "Scalable service boundaries and infrastructure choices aligned with product growth. This cloud-native approach helps Finnish and European product teams improve scalability, observability, deployment reliability and long-term software performance.",
        audience: "SaaS providers · Enterprise IT · Product engineering · Finland · Europe",
      },
      {
        category: "Delivery Systems",
        description:
          "Automated CI/CD pipelines that make releases faster, safer and repeatable. This cloud-native approach helps Finnish and European product teams improve scalability, observability, deployment reliability and long-term software performance.",
        audience: "Engineering teams · DevOps · Platform teams · Finland · Europe",
      },
      {
        category: "Observability",
        description:
          "Unified health, performance and incident context for dependable operations. This cloud-native approach helps Finnish and European product teams improve scalability, observability, deployment reliability and long-term software performance.",
        audience: "SRE teams · Technical leaders · Support operations · Finland · Europe",
      },
      {
        category: "Cloud Reliability",
        description:
          "Recovery, scaling and security patterns designed for business-critical software. This cloud-native approach helps Finnish and European product teams improve scalability, observability, deployment reliability and long-term software performance.",
        audience: "Scale-ups · Enterprise platforms · European SaaS",
      },
    ],
    services: [
      { title: "Cloud Strategy", rows: ["Architecture Review", "Migration Planning", "Service Boundaries", "Cost Modeling"] },
      { title: "Platform Engineering", rows: ["Containers", "Infrastructure as Code", "API Platforms", "Data Services"] },
      { title: "Delivery", rows: ["CI/CD", "Release Automation", "Environment Design", "Testing"] },
      { title: "Reliability", rows: ["Observability", "Incident Response", "Security", "Performance"] },
    ],
  },
  "mobile-app-development-finland": {
    manifesto:
      "We design and build mobile products that make everyday tasks fast, clear and consistent across iOS, Android and connected services.",
    featured: [
      {
        category: "Mobile Strategy",
        description:
          "Defining the smallest, strongest product experience around real user priorities. The product is designed for companies in Finland and the Nordics that need high-quality iOS, Android and cross-platform mobile experiences connected to reliable backend services.",
        audience: "Startups · Product teams · Digital service providers · Finland · Nordics",
      },
      {
        category: "Product UX",
        description:
          "Clear navigation and interaction patterns optimized for everyday mobile contexts. The product is designed for companies in Finland and the Nordics that need high-quality iOS, Android and cross-platform mobile experiences connected to reliable backend services.",
        audience: "Consumers · Field teams · Service customers · Finland · Nordics",
      },
      {
        category: "Cross-Platform Build",
        description:
          "Reusable mobile architecture for reliable delivery across iOS and Android. The product is designed for companies in Finland and the Nordics that need high-quality iOS, Android and cross-platform mobile experiences connected to reliable backend services.",
        audience: "Growing products · Multi-platform businesses · Finland · Nordics",
      },
      {
        category: "Mobile Growth",
        description:
          "Analytics, release systems and product iteration designed for long-term adoption. The product is designed for companies in Finland and the Nordics that need high-quality iOS, Android and cross-platform mobile experiences connected to reliable backend services.",
        audience: "FinTech · HealthTech · Retail · Travel · Finland · Nordics",
      },
    ],
    services: [
      { title: "Mobile Product", rows: ["Product Scope", "User Research", "Feature Roadmap", "Prototype Testing"] },
      { title: "Experience", rows: ["Mobile UX", "Interface Design", "Design Systems", "Accessibility"] },
      { title: "App Development", rows: ["iOS", "Android", "Flutter", "API Integration"] },
      { title: "Product Operations", rows: ["Analytics", "Release Management", "Performance", "Continuous Improvement"] },
    ],
  },
  "retail-ai-automation": {
    manifesto:
      "We connect retail data, customer behavior and automation to help commerce teams respond faster to demand and improve operational decisions.",
    featured: [
      {
        category: "Demand Intelligence",
        description:
          "Combining product, sales and behavioral signals to reveal changing demand patterns. The solution supports Finnish and European retail teams with commerce intelligence, customer-data integration, operational automation and scalable digital growth.",
        audience: "Retail planners · Merchandising · E-commerce teams · Finland · European retail",
      },
      {
        category: "Commerce Automation",
        description:
          "Rule-based and AI-assisted workflows for repetitive merchandising and operational tasks. The solution supports Finnish and European retail teams with commerce intelligence, customer-data integration, operational automation and scalable digital growth.",
        audience: "Digital commerce · Operations · Category managers · Finland · European retail",
      },
      {
        category: "Customer Insight",
        description:
          "Actionable segmentation and journey insight focused on conversion and retention. The solution supports Finnish and European retail teams with commerce intelligence, customer-data integration, operational automation and scalable digital growth.",
        audience: "Marketing · CRM · Customer experience · Finland · European retail",
      },
      {
        category: "Retail Operations",
        description:
          "A shared decision layer for inventory, conversion and channel performance. The solution supports Finnish and European retail teams with commerce intelligence, customer-data integration, operational automation and scalable digital growth.",
        audience: "Retailers · Marketplaces · Omnichannel brands · Finland · European retail",
      },
    ],
    services: [
      { title: "Commerce Strategy", rows: ["Demand Mapping", "Customer Journeys", "Automation Audit", "Growth Priorities"] },
      { title: "Retail Intelligence", rows: ["Forecasting", "Segmentation", "Recommendations", "Performance Models"] },
      { title: "Commerce Systems", rows: ["Dashboard UX", "Workflow Automation", "Platform Integration", "Data Pipelines"] },
      { title: "Growth Operations", rows: ["Experimentation", "Conversion Insight", "Inventory Signals", "Continuous Optimization"] },
    ],
  },
  "digital-transformation-platform": {
    manifesto:
      "We modernize enterprise systems without losing operational clarity, connecting legacy processes with focused digital services and measurable adoption.",
    featured: [
      {
        category: "Transformation Strategy",
        description:
          "Aligning business priorities, technology constraints and organizational change in one roadmap. This model helps Finnish, Nordic and European organizations modernize legacy workflows, connect business systems and deliver measurable digital transformation without unnecessary disruption.",
        audience: "Executive teams · Transformation offices · Enterprise IT · Finland · Nordics · Europe",
      },
      {
        category: "Service Modernization",
        description:
          "Replacing fragmented processes with clear, connected digital service journeys. This model helps Finnish, Nordic and European organizations modernize legacy workflows, connect business systems and deliver measurable digital transformation without unnecessary disruption.",
        audience: "Operations · Employees · Customer service · Finland · Nordics · Europe",
      },
      {
        category: "Platform Integration",
        description:
          "Connecting new product layers with essential legacy systems and data sources. This model helps Finnish, Nordic and European organizations modernize legacy workflows, connect business systems and deliver measurable digital transformation without unnecessary disruption.",
        audience: "Architecture teams · Product groups · System owners · Finland · Nordics · Europe",
      },
      {
        category: "Adoption Systems",
        description:
          "Interfaces, feedback and rollout patterns that help teams move confidently into new workflows. This model helps Finnish, Nordic and European organizations modernize legacy workflows, connect business systems and deliver measurable digital transformation without unnecessary disruption.",
        audience: "Nordic enterprises · Public organizations · Multi-team companies",
      },
    ],
    services: [
      { title: "Transformation", rows: ["Operating Model", "Digital Roadmap", "Stakeholder Alignment", "Value Priorities"] },
      { title: "Service Design", rows: ["Process Redesign", "Employee UX", "Customer Journeys", "Design Systems"] },
      { title: "Modern Engineering", rows: ["Legacy Integration", "API Layers", "Cloud Services", "Data Platforms"] },
      { title: "Adoption", rows: ["Rollout Planning", "Training Flows", "Usage Analytics", "Continuous Improvement"] },
    ],
  },
};

function buildCaseContent(study: CaseStudy) {
  const profile = profiles[study.slug] ?? profiles["ai-software-development-finland"];
  const images = [
    study.editorialHero,
    study.editorialHero,
    study.editorialHero,
    study.editorialHero,
  ];

  const featuredItems: FeaturedItem[] = profile.featured.map((item, index) => ({
    ...item,
    client: "SoftBridge Solutions",
    logo: softBridgeLogo,
    image: images[index],
    href: `/cases/${study.slug}`,
  }));

  const serviceImages = [
    study.editorialHero,
    "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&fm=jpg&q=82&w=1400",
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&fm=jpg&q=82&w=1400",
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&fm=jpg&q=82&w=1400",
    "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&fm=jpg&q=82&w=1400",
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&fm=jpg&q=82&w=1400",
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&fm=jpg&q=82&w=1400",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&fm=jpg&q=82&w=1400",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&fm=jpg&q=82&w=1400",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&fm=jpg&q=82&w=1400",
    "https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&fm=jpg&q=82&w=1400",
    "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&fm=jpg&q=82&w=1400",
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&fm=jpg&q=82&w=1400",
    "https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?auto=format&fit=crop&fm=jpg&q=82&w=1400",
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&fm=jpg&q=82&w=1400",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&fm=jpg&q=82&w=1400",
  ];

  const serviceGroups: ServiceGroup[] = profile.services.map((group, index) => ({
    number: String(index + 1).padStart(2, "0"),
    title: group.title,
    rows: group.rows.map((label, rowIndex) => {
      const absoluteRowIndex = index * 4 + rowIndex;

      return {
        label,
        image: serviceImages[absoluteRowIndex % serviceImages.length],
      };
    }),
  }));

  return { ...profile, featuredItems, serviceGroups };
}

export function CaseStudyPage({ study }: { study: CaseStudy }) {
  const root = useRef<HTMLElement>(null);
  const { manifesto, featuredItems, serviceGroups } = buildCaseContent(study);
  const seo = getCaseSeoProfile(study.slug);

  useGSAP(() => {
    const titles = gsap.utils.toArray<HTMLElement>(`.${styles.featuredTitle}`);
    const clients = gsap.utils.toArray<HTMLElement>(`.${styles.clientItem}`);
    const media = gsap.utils.toArray<HTMLElement>(`.${styles.mediaItem}`);

    gsap.set(titles, { autoAlpha: 0, y: 32 });
    gsap.set(clients, { autoAlpha: 0, x: -32 });
    gsap.set(media, { autoAlpha: 0, scale: 1.035, pointerEvents: "none" });
    gsap.set(titles[0], { autoAlpha: 1, y: 0 });
    gsap.set(clients[0], { autoAlpha: 1, x: 0 });
    gsap.set(media[0], { autoAlpha: 1, scale: 1, pointerEvents: "auto", zIndex: 2 });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: `.${styles.workSection}`,
        start: "top top",
        end: () => `+=${Math.round(window.innerHeight * 3.25)}`,
        pin: `.${styles.workSticky}`,
        pinSpacing: true,
        scrub: .9,
        anticipatePin: 1,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
      },
    });

    featuredItems.forEach((_, index) => {
      if (index === 0) return;
      const previous = index - 1;
      const at = (index - 1) * 1.0 + .08;
      gsap.set(media[index], { zIndex: index + 2 });

      timeline
        .to(titles[previous], { autoAlpha: 0, y: -32, duration: .36, ease: "power2.inOut" }, at)
        .fromTo(titles[index], { autoAlpha: 0, y: 32 }, { autoAlpha: 1, y: 0, duration: .48, ease: "power3.out" }, at + .2)
        .to(clients[previous], { autoAlpha: 0, x: 32, duration: .34, ease: "power2.inOut" }, at)
        .fromTo(clients[index], { autoAlpha: 0, x: -32 }, { autoAlpha: 1, x: 0, duration: .46, ease: "power3.out" }, at + .18)
        .to(media[previous], { autoAlpha: 0, scale: 1.035, pointerEvents: "none", duration: .4, ease: "power2.inOut" }, at)
        .fromTo(media[index], { autoAlpha: 0, scale: 1.035, pointerEvents: "none" }, { autoAlpha: 1, scale: 1, pointerEvents: "auto", duration: .56, ease: "power3.out" }, at + .16);
    });

    timeline.fromTo(
      `.${styles.cta}`,
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: .42, ease: "power3.out" },
      2.78,
    );

    gsap.fromTo(
      `.${styles.introText}`,
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: .8, ease: "power3.out" },
    );

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh, { once: true });
    requestAnimationFrame(refresh);

    gsap.utils.toArray<HTMLElement>(`.${styles.serviceGroup}`).forEach((group) => {
      const header = group.querySelector(`.${styles.serviceHeader}`);
      const rows = group.querySelectorAll(`.${styles.serviceRow}`);

      gsap.fromTo(
        header,
        { autoAlpha: 0, y: 38 },
        {
          autoAlpha: 1,
          y: 0,
          duration: .85,
          ease: "power3.out",
          scrollTrigger: { trigger: group, start: "top 82%" },
        },
      );

      gsap.fromTo(
        rows,
        { autoAlpha: 0, y: 18 },
        {
          autoAlpha: 1,
          y: 0,
          duration: .62,
          stagger: .07,
          ease: "power3.out",
          scrollTrigger: { trigger: group, start: "top 72%" },
        },
      );
    });
  }, { scope: root, dependencies: [study.slug] });

  return (
    <main ref={root} className={`${styles.page} ${styles.titaniumTheme}`}>
      <VideoReferencePreloader />
      <SiteNavbar />
      <section className={styles.workSection}>
        <div className={styles.workSticky}>
          <div className={styles.container}>
            <div className={styles.introGrid}>
              <div className={styles.introText}>{manifesto}</div>
            </div>

            <div className={styles.workGrid}>
              <div className={styles.workContent}>
                

                <div className={styles.featuredTitleGroup}>
                  {featuredItems.map((item) => (
                    <div className={styles.featuredTitle} key={item.category}>
                      <strong>{item.category}</strong>
                      <p>{item.description}</p>
                      <span>{item.audience}</span>
                    </div>
                  ))}
                </div>

                <div className={styles.clientGroup}>
                  {featuredItems.map((item) => (
                    <div className={styles.clientItem} key={item.category}>
                      <div className={styles.clientLogo}>
                        <img src={item.logo} alt="SoftBridge Solutions" />
                      </div>
                      <div className={styles.clientText}>
                        
                        <div className={styles.clientName}>{item.client}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.mediaArea}>
                {featuredItems.map((item) => (
                  <a
                    key={item.category}
                    aria-label={`${study.title}: ${item.category}`}
                    href={item.href}
                    className={styles.mediaItem}
                  >
                    <img src={item.image} alt={`${study.title} — ${item.category}`} />
                  </a>
                ))}
              </div>
            </div>

            <div className={styles.ctaRow}>
              <div className={styles.cta}>
                <Link href="/#cases">
                  <span>See all work</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.servicesSection} aria-label={`${study.title} services`}>
        <div className={styles.servicesContainer}>
          {serviceGroups.map((group) => (
            <article className={styles.serviceGroup} key={group.number}>
              <header className={styles.serviceHeader}>
                <span className={styles.serviceNumber}>{group.number}</span>
                <h2 className={styles.serviceTitle}>{group.title}</h2>
              </header>

              <div className={styles.serviceRows}>
                {group.rows.map((row) => (
                  <div className={styles.serviceRow} key={row.label}>
                    <span className={styles.serviceRowLabel}>{row.label}</span>

                    <div className={styles.serviceHoverLayer} aria-hidden="true">
                      <div className={styles.marqueeTrack}>
                        {[0, 1].map((copy) => (
                          <div className={styles.marqueeGroup} key={copy}>
                            {[0, 1, 2, 3, 4].map((item) => (
                              <span key={item}>
                                <i>✣</i> {row.label}
                              </span>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={styles.servicePreview} aria-hidden="true">
                      <img src={row.image} alt="" />
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <ArcCarouselSection currentSlug={study.slug} />

      {seo ? (
        <section className={styles.seoSection} aria-labelledby="case-seo-heading">
          <div className={styles.seoContainer}>
            <div className={styles.seoIntro}>
              <div>
                <p className={styles.seoKicker}>{seo.serviceName}</p>
                <h2 id="case-seo-heading" className={styles.seoHeading}>
                  Built for measurable business impact across Finland, the Nordics and Europe
                </h2>
              </div>
              <p className={styles.seoLead}>{seo.geoSummary}</p>
            </div>

            <div className={styles.seoValueGrid}>
              <article className={styles.seoValueCard}>
                <span>Business clarity</span>
                <h3>Clear scope, priorities and decision-ready delivery</h3>
                <p>
                  Product strategy, UX and engineering decisions are aligned with operational
                  goals, user needs and long-term maintainability.
                </p>
              </article>
              <article className={styles.seoValueCard}>
                <span>Technical resilience</span>
                <h3>Reliable architecture for real production environments</h3>
                <p>
                  Secure integrations, scalable cloud foundations and observable systems reduce
                  operational risk as the platform grows.
                </p>
              </article>
              <article className={styles.seoValueCard}>
                <span>Regional delivery</span>
                <h3>Finland-focused collaboration with European reach</h3>
                <p>
                  Delivery is shaped for Finnish, Nordic and European organizations that need
                  dependable software, AI automation and digital product engineering.
                </p>
              </article>
            </div>

            <div className={styles.seoFaqGrid}>
              {seo.faqs.map((faq) => (
                <details className={styles.seoFaqItem} key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>

            <div className={styles.seoProofRow} aria-label="Delivery principles">
              <span>Accessible UX</span>
              <span>GDPR-aware engineering</span>
              <span>Scalable architecture</span>
              <span>Finland · Nordics · Europe</span>
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
