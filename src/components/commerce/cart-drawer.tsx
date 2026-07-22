"use client";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { Drawer } from "vaul";
import { useCartStore } from "@/store/cart-store";
import { useUIStore } from "@/store/ui-store";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
export function CartDrawer() {
  const open = useUIStore((s) => s.cartOpen); const close = useUIStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items); const remove = useCartStore((s) => s.remove); const update = useCartStore((s) => s.updateQuantity);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  return <Drawer.Root direction="right" open={open} onOpenChange={(value) => !value && close()}><Drawer.Portal><Drawer.Overlay className="fixed inset-0 z-50 bg-black/35"/><Drawer.Content className="fixed bottom-0 right-0 top-0 z-50 w-full max-w-lg overflow-y-auto bg-[var(--background)] p-6 outline-none">
    <div className="flex items-center justify-between border-b pb-5"><Drawer.Title className="text-xl">Your bag</Drawer.Title><button aria-label="Close cart" onClick={close}><X/></button></div>
    <div className="divide-y">{items.length === 0 ? <div className="py-20 text-center"><p className="text-lg">Your bag is empty.</p><Button asChild className="mt-6"><Link href="/shop" onClick={close}>Explore shop</Link></Button></div> : items.map((item) => <div key={`${item.product.id}-${item.size}-${item.color}`} className="grid grid-cols-[92px_1fr] gap-4 py-5"><Image src={item.product.image} alt={item.product.name} width={92} height={122}/><div><div className="flex justify-between gap-4"><div><p className="font-medium">{item.product.name}</p><p className="mt-1 text-xs text-[var(--muted)]">{item.color} / {item.size}</p></div><button aria-label="Remove item" onClick={() => remove(item.product.id, item.size)}><Trash2 size={16}/></button></div><div className="mt-6 flex items-end justify-between"><div className="flex items-center border"><button className="p-2" onClick={() => update(item.product.id, item.size, item.quantity-1)}><Minus size={13}/></button><span className="min-w-7 text-center text-sm">{item.quantity}</span><button className="p-2" onClick={() => update(item.product.id, item.size, item.quantity+1)}><Plus size={13}/></button></div><span className="text-sm">{formatPrice(item.product.price * item.quantity)}</span></div></div></div>)}</div>
    {items.length ? <div className="sticky bottom-0 mt-8 border-t bg-[var(--background)] pt-5"><div className="flex justify-between text-lg"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div><p className="mt-2 text-xs text-[var(--muted)]">Taxes and shipping calculated at checkout.</p><Button asChild className="mt-5 w-full"><Link href="/checkout" onClick={close}>Checkout</Link></Button></div> : null}
  </Drawer.Content></Drawer.Portal></Drawer.Root>;
}
