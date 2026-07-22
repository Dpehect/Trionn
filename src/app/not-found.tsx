import Link from "next/link";
export default function NotFound() {
  return <main className="content-page"><div className="content-grid"><p className="content-kicker">404</p><h1 className="content-heading">This mission moved elsewhere.</h1><p className="content-copy"><Link className="back-link" href="/">Return home</Link></p></div></main>;
}
