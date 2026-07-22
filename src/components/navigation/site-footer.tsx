import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-lead">
        <span className="wordmark-symbol">T/</span>
        <p>One coherent product system from first signal to final release.</p>
      </div>
      <div className="footer-links">
        <div><span>Product</span><Link href="/#product">Overview</Link><Link href="/#workflow">Workflow</Link><Link href="/pricing">Pricing</Link></div>
        <div><span>Company</span><Link href="/changelog">Changelog</Link><Link href="/security">Security</Link><Link href="/contact">Contact</Link></div>
        <div><span>Legal</span><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><a href="mailto:hello@trionn.example">Email</a></div>
      </div>
      <div className="footer-bottom"><span>© 2026 TRIONN</span><span>Designed for ambitious product teams.</span><span>NO WEBGL / NO 3D</span></div>
    </footer>
  );
}
