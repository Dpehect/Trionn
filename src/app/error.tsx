"use client";
import { Button } from "@/components/ui/button";
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) { return <main className="container-shell grid min-h-[70vh] place-items-center py-24 text-center"><div><p className="eyebrow">Unexpected interruption</p><h1 className="headline mt-6">The page could not be composed.</h1><Button onClick={reset} className="mt-8">Try again</Button></div></main> }
