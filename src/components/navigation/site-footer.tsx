import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-lead"><span className="wordmark-symbol">T/</span><p>Independent clothing and footwear objects from Istanbul.</p></div>
      <div className="footer-links"><div><span>Shop</span><Link href="/shop">All products</Link><Link href="/shop?collection=Clothing">Clothing</Link><Link href="/shop?collection=Shoes">Shoes</Link></div><div><span>Studio</span><Link href="/#collections">Collections</Link><Link href="/#style-intelligence">Style intelligence</Link><Link href="/contact">Contact</Link></div><div><span>Service</span><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><a href="mailto:hello@trionn.example">Email</a></div></div>
      <div className="footer-bottom"><span>© 2026 TRIONN</span><span>ISTANBUL / WORLDWIDE</span><span>WEBGL LIGHT / NO 3D MODELS</span></div>
    </footer>
  );
}
