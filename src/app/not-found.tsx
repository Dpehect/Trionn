import Link from "next/link";

export default function NotFound() {
  return <main className="system-page"><p className="eyebrow">404 / LOST SIGNAL</p><h1>THIS ROUTE<br />DOES NOT EXIST.</h1><Link className="system-link" href="/">Return to index</Link></main>;
}
