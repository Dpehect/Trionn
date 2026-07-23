"use client";
export default function ErrorPage({reset}:{reset:()=>void}){return <main className="system-page"><p>500 / Unexpected error</p><h1>SOMETHING<br />LOST SIGNAL.</h1><button onClick={reset}>Try again ↗</button></main>}
