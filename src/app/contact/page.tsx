"use client";

import { FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/navigation/site-footer";
import { CartDrawer } from "@/components/commerce/cart-drawer";

export default function ContactPage() {
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); event.currentTarget.reset(); toast.success("Mesajın hazırlandı", { description: "Demo formu bir e-posta veya CRM endpointine bağlanabilir." }); };
  return <div className="product-site"><SiteHeader /><main className="contact-page"><Link href="/"><ArrowLeft size={17} /> Ana sayfa</Link><div className="contact-layout"><div><p className="section-eyebrow">CONTACT / ISTANBUL</p><h1>Talk to the boutique.</h1><p>Sipariş, beden, styling veya iş birliği için bize yaz.</p></div><form onSubmit={submit}><label>Ad<input name="name" required /></label><label>E-posta<input type="email" name="email" required /></label><label>Konu<select name="topic" defaultValue="Sizing"><option>Sizing</option><option>Order</option><option>Styling</option><option>Collaboration</option></select></label><label>Mesaj<textarea name="message" required /></label><button className="button button-primary" type="submit">Gönder</button></form></div></main><SiteFooter /><CartDrawer /></div>;
}
