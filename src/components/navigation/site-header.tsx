import Image from "next/image";
import Link from "next/link";

const middleLinks = [
  ["Work", "/work"], ["Info", "/info"], ["News", "/news"], ["Aeon", "/aeon"],
] as const;

export function SiteHeader() {
  return (
    <header className="site-header" aria-label="Primary navigation">
      <Link className="brand-mark" href="/" aria-label="Studio Freight home">
        <Image src="/brand-mark.svg" alt="" width={54} height={54} priority />
      </Link>
      <Link className="home-link" href="/"><span aria-hidden>•</span> Home</Link>
      <nav className="middle-nav">
        {middleLinks.map(([label, href], index) => (
          <span key={href}><Link href={href}>{label}</Link>{index < middleLinks.length - 1 ? "," : ""}</span>
        ))}
      </nav>
      <Link className="contact-link" href="/contact">Contact</Link>
    </header>
  );
}
