"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./site-navbar.module.css";

const FI_PREFIX = "/fi";

function removeFinnishPrefix(pathname: string) {
  const stripped = pathname.replace(/^\/fi(?=\/|$)/, "");
  return stripped || "/";
}

function localizePath(pathname: string, href: string, isFinnish: boolean) {
  if (!isFinnish) return href;

  if (href.startsWith("mailto:") || href.startsWith("http")) {
    return href;
  }

  return `${FI_PREFIX}${href === "/" ? "" : href}`;
}

export function SiteNavbar() {
  const pathname = usePathname();
  const isFinnish =
    pathname === FI_PREFIX || pathname.startsWith(`${FI_PREFIX}/`);

  const englishPath = removeFinnishPrefix(pathname);
  const finnishPath = isFinnish
    ? pathname
    : `${FI_PREFIX}${pathname === "/" ? "" : pathname}`;

  return (
    <>
      <div className={styles.spacer} aria-hidden="true" />
      <header className={styles.shell}>
        <nav className={styles.nav} aria-label="Primary navigation">
          <Link
            className={styles.brand}
            href={isFinnish ? "/fi" : "/"}
            aria-label="SoftBridge Solutions Finland home"
          >
            <span className={styles.wordmark}>
              SOFTBRIDGE SOLUTIONS FINLAND
            </span>
          </Link>

          <div className={styles.desktopLinks}>
            <Link href={localizePath(pathname, "/#cases", isFinnish)}>
              Cases
            </Link>
            <Link
              href={localizePath(
                pathname,
                "/services/software-development-finland",
                isFinnish,
              )}
            >
              Services
            </Link>
            <Link href={localizePath(pathname, "/about", isFinnish)}>
              About
            </Link>
            <Link
              href={localizePath(
                pathname,
                "/insights/how-to-choose-software-development-company-finland",
                isFinnish,
              )}
            >
              Insights
            </Link>
          </div>

          <div className={styles.actions}>
            <div
              className={styles.languageSwitch}
              aria-label="Language selection"
              data-no-fi-translate
            >
              <Link
                href={englishPath}
                className={!isFinnish ? styles.activeLanguage : undefined}
                hrefLang="en-FI"
              >
                EN
              </Link>
              <span aria-hidden="true">/</span>
              <Link
                href={finnishPath}
                className={isFinnish ? styles.activeLanguage : undefined}
                hrefLang="fi"
              >
                FI
              </Link>
            </div>

            <Link
              className={styles.cta}
              href="mailto:hello@softbridge-solutions.com"
            >
              Let&apos;s talk
            </Link>
          </div>

          <details className={styles.mobileMenu}>
            <summary aria-label="Open navigation">
              <span />
              <span />
            </summary>
            <div className={styles.mobilePanel}>
              <Link href={localizePath(pathname, "/#cases", isFinnish)}>
                Cases
              </Link>
              <Link
                href={localizePath(
                  pathname,
                  "/services/software-development-finland",
                  isFinnish,
                )}
              >
                Services
              </Link>
              <Link href={localizePath(pathname, "/about", isFinnish)}>
                About
              </Link>
              <Link
                href={localizePath(
                  pathname,
                  "/insights/how-to-choose-software-development-company-finland",
                  isFinnish,
                )}
              >
                Insights
              </Link>

              <div
                className={styles.mobileLanguages}
                data-no-fi-translate
              >
                <Link
                  href={englishPath}
                  className={!isFinnish ? styles.activeLanguage : undefined}
                  hrefLang="en-FI"
                >
                  English
                </Link>
                <Link
                  href={finnishPath}
                  className={isFinnish ? styles.activeLanguage : undefined}
                  hrefLang="fi"
                >
                  Suomi
                </Link>
              </div>

              <a href="mailto:hello@softbridge-solutions.com">
                Let&apos;s talk
              </a>
            </div>
          </details>
        </nav>
      </header>
    </>
  );
}
