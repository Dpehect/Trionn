import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div><a href="#instagram">IG</a><span> / </span><a href="#linkedin">LI</a></div>
      <Link href="/">Studio Freight</Link>
      <div><span>©2026</span><span> / </span><Link href="/info">Terms</Link></div>
    </footer>
  );
}
