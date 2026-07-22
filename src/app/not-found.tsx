import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function NotFound(){ return <main className="container-shell grid min-h-[70vh] place-items-center py-24 text-center"><div><p className="eyebrow">404 / Lost form</p><h1 className="display mt-6">Not found.</h1><Button asChild className="mt-10"><Link href="/">Return home</Link></Button></div></main> }
