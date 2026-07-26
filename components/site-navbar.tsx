"use client";

import Link from "next/link";
import styles from "./site-navbar.module.css";

export function SiteNavbar() {
  return (
    <>
      <div className={styles.spacer} aria-hidden="true" />
      <header className={styles.shell}>
      <nav className={styles.nav} aria-label="Primary navigation">
        <Link className={styles.brand} href="/" aria-label="SoftBridge Solutions Finland home">
          <span className={styles.wordmark}>SOFTBRIDGE SOLUTIONS FINLAND</span>
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
