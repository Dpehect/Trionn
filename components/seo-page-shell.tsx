import Link from "next/link";
import type { ReactNode } from "react";
import styles from "@/app/seo-pages.module.css";

type SeoPageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function SeoPageShell({
  eyebrow,
  title,
  description,
  children,
}: SeoPageShellProps) {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <nav className={styles.topbar} aria-label="Primary">
          <Link href="/" className={styles.brand}>
            SoftBridge Solutions
          </Link>
          <div className={styles.toplinks}>
            <Link href="/services/software-development-finland">Services</Link>
            <Link href="/locations/helsinki">Finland</Link>
            <Link href="/insights/how-to-choose-software-development-company-finland">
              Insights
            </Link>
            <Link href="/faq">FAQ</Link>
          </div>
        </nav>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h1>{title}</h1>
          <p className={styles.lead}>{description}</p>
        </div>
      </header>
      {children}
      <footer className={styles.footer}>
        <div>
          <strong>SoftBridge Solutions</strong>
          <p>AI, software and digital products for Finland and Europe.</p>
        </div>
        <div className={styles.footerLinks}>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/faq">FAQ</Link>
          <a href="mailto:hello@softbridge-solutions.com">Contact</a>
        </div>
      </footer>
    </main>
  );
}
