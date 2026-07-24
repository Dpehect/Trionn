import Link from "next/link";

export default function NotFound() {
  return <section className="grid min-h-screen place-items-center bg-lavender px-5 text-center"><div><p className="eyebrow text-forest/45">404</p><h1 className="display-lg mt-6">This path stops here.</h1><Link href="/" className="magnetic-button button-dark mt-8">Return home</Link></div></section>;
}
