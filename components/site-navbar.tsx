"use client";

import Link from "next/link";
import styles from "./site-navbar.module.css";

export function SiteNavbar() {
  return (
    <>
      <div className={styles.spacer} aria-hidden="true" />
      <header className={styles.shell}>
      <nav className={styles.nav} aria-label="Primary navigation">
        <Link className={styles.brand} href="/" aria-label="SoftBridge Solutions home">
          <span className={styles.mark} aria-hidden="true">
            <svg viewBox="0 0 36 36" role="presentation">
              <path d="M7 23.5V12.8c0-2 1.6-3.6 3.6-3.6h3.2c2 0 3.6 1.6 3.6 3.6v10.7" />
              <path d="M18.6 23.5V12.8c0-2 1.6-3.6 3.6-3.6h3.2c2 0 3.6 1.6 3.6 3.6v10.7" />
              <path d="M7 18h22" />
              <path d="M10.5 26.8h15" />
            </svg>
          </span>
          <span className={styles.wordmark}>SoftBridge</span>
        </Link>

        <div className={styles.desktopLinks}>
          <Link href="/#cases">Cases</Link>
          <Link href="/services/software-development-finland">Services</Link>
          <Link href="/about">About</Link>
          <Link href="/insights/how-to-choose-software-development-company-finland">
            Insights
          </Link>
        </div>

        <Link className={styles.cta} href="mailto:hello@softbridge-solutions.com">
          Let&apos;s talk
        </Link>

        <details className={styles.mobileMenu}>
          <summary aria-label="Open navigation">
            <span />
            <span />
          </summary>
          <div className={styles.mobilePanel}>
            <Link href="/#cases">Cases</Link>
            <Link href="/services/software-development-finland">Services</Link>
            <Link href="/about">About</Link>
            <Link href="/insights/how-to-choose-software-development-company-finland">
              Insights
            </Link>
            <a href="mailto:hello@softbridge-solutions.com">Let&apos;s talk</a>
          </div>
        </details>
      </nav>
      </header>
    </>
  );
}
