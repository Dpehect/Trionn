"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import type { CaseStudy } from "@/data/cases";
import styles from "./case-study-page.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const featuredItems = [
  { category: "Branding", client: "Vakeso", logo: "https://cdn.prod.website-files.com/6a1865808036c41f27ddd715/6a216554894abd7ab54f31f6_logo-vakeso.png", image: "https://cdn.prod.website-files.com/6a1865808036c41f27ddd715/6a2291003b9fe4985cd42349_vakeso.avif", href: "/projects/vakeso" },
  { category: "Web", client: "SoundCloud", logo: "https://cdn.prod.website-files.com/6a1865808036c41f27ddd715/6a21654ec9611c64ea764636_logo-soundcloud.png", image: "https://cdn.prod.website-files.com/6a1865808036c41f27ddd715/6a2290f9df6c01a0603a8645_soundcloud.avif", href: "/projects/soundcloud-website" },
  { category: "Mobile", client: "Sona", logo: "https://cdn.prod.website-files.com/6a1865808036c41f27ddd715/6a21655bce06dc884f5a1e7a_logo-sona.png", image: "https://cdn.prod.website-files.com/6a1865808036c41f27ddd715/6a2290ac5bcedfea95e9c0f1_sona.avif", href: "/projects/sona-ai" },
  { category: "Motion", client: "Vault Bank", logo: "https://cdn.prod.website-files.com/6a1865808036c41f27ddd715/6a4d047bed23f5e522210f34_logo-vault.png", image: "https://cdn.prod.website-files.com/6a1865808036c41f27ddd715/6a4cfe6149932a0f324d1e58_Vault%20Card%20Cover%20Be%20edit2%20copy.png", href: "/projects/vault" },
] as const;

export function CaseStudyPage({ study: _study }: { study: CaseStudy }) {
  const root = useRef<HTMLElement>(null);

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
        end: "+=390%",
        pin: `.${styles.workSticky}`,
        scrub: 1.05,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    featuredItems.forEach((_, index) => {
      if (index === 0) return;
      const previous = index - 1;
      const at = index - .12;
      gsap.set(media[index], { zIndex: index + 2 });
      timeline
        .to(titles[previous], { autoAlpha: 0, y: -32, duration: .36, ease: "power2.inOut" }, at)
        .fromTo(titles[index], { autoAlpha: 0, y: 32 }, { autoAlpha: 1, y: 0, duration: .48, ease: "power3.out" }, at + .2)
        .to(clients[previous], { autoAlpha: 0, x: 32, duration: .34, ease: "power2.inOut" }, at)
        .fromTo(clients[index], { autoAlpha: 0, x: -32 }, { autoAlpha: 1, x: 0, duration: .46, ease: "power3.out" }, at + .18)
        .to(media[previous], { autoAlpha: 0, scale: 1.035, pointerEvents: "none", duration: .4, ease: "power2.inOut" }, at)
        .fromTo(media[index], { autoAlpha: 0, scale: 1.035, pointerEvents: "none" }, { autoAlpha: 1, scale: 1, pointerEvents: "auto", duration: .56, ease: "power3.out" }, at + .16);
    });

    timeline.fromTo(`.${styles.cta}`, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: .48, ease: "power3.out" }, 3.72);
    gsap.fromTo(`.${styles.introText}`, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: .8, ease: "power3.out" });
  }, { scope: root });

  return (
    <main ref={root} className={styles.page}>
      <section className={styles.workSection}>
        <div className={styles.workSticky}>
          <div className={styles.container}>
            <div className={styles.introGrid}>
              <div className={styles.introText}>We design, build and grow brands and digital products for the world&apos;s biggest companies and boldest new ones</div>
            </div>

            <div className={styles.workGrid}>
              <div className={styles.workContent}>
                <div className={styles.featuredLabel}>Featured work</div>
                <div className={styles.featuredTitleGroup}>
                  {featuredItems.map((item) => <div className={styles.featuredTitle} key={item.category}>{item.category}</div>)}
                </div>
                <div className={styles.clientGroup}>
                  {featuredItems.map((item) => (
                    <div className={styles.clientItem} key={item.client}>
                      <div className={styles.clientLogo}><img src={item.logo} alt={item.client} /></div>
                      <div className={styles.clientText}><div className={styles.clientLabel}>Client</div><div className={styles.clientName}>{item.client}</div></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.mediaArea}>
                {featuredItems.map((item) => (
                  <a key={item.category} aria-label={item.client} href={item.href} className={styles.mediaItem}>
                    <img src={item.image} alt={item.client} />
                  </a>
                ))}
              </div>
            </div>

            <div className={styles.ctaRow}>
              <div className={styles.cta}><Link href="/#cases"><span>See all work</span><ArrowRight size={18} /></Link></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
