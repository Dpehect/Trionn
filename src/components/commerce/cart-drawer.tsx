"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { Drawer } from "vaul";
import { formatPrice } from "@/data/catalog";
import { useProductStore } from "@/store/use-product-store";

export function CartDrawer() {
  const open = useProductStore((state) => state.cartOpen);
  const setOpen = useProductStore((state) => state.setCartOpen);
  const cart = useProductStore((state) => state.cart);
  const remove = useProductStore((state) => state.removeFromCart);
  const update = useProductStore((state) => state.updateQuantity);
  const subtotal = cart.reduce((sum, line) => sum + line.product.price * line.quantity, 0);

  return (
    <Drawer.Root direction="right" open={open} onOpenChange={setOpen}>
      <Drawer.Portal>
        <Drawer.Overlay className="cart-overlay" />
        <Drawer.Content className="cart-drawer" aria-describedby={undefined}>
          <div className="cart-head"><div><span>TRIONN / BAG</span><Drawer.Title>{cart.length ? `${cart.reduce((sum, line) => sum + line.quantity, 0)} parça` : "Sepetin boş"}</Drawer.Title></div><button type="button" onClick={() => setOpen(false)} aria-label="Sepeti kapat"><X /></button></div>
          <div className="cart-lines">
            {!cart.length ? (
              <div className="cart-empty"><ShoppingBag size={34} strokeWidth={1.2} /><h3>Yeni edit seni bekliyor.</h3><p>Kıyafet ve ayakkabı koleksiyonlarını keşfet.</p><Link className="button button-primary" href="/shop" onClick={() => setOpen(false)}>Mağazaya git</Link></div>
            ) : cart.map((line) => (
              <article className="cart-line" key={`${line.product.id}-${line.size}-${line.color}`}>
                <Image src={line.product.image} alt={line.product.name} width={112} height={148} />
                <div className="cart-line-copy"><div className="cart-line-top"><div><strong>{line.product.name}</strong><span>{line.color} / {line.size}</span></div><button type="button" onClick={() => remove(line.product.id, line.size, line.color)} aria-label="Ürünü sil"><Trash2 size={16} /></button></div><div className="cart-line-bottom"><div className="quantity-control"><button type="button" onClick={() => update(line.product.id, line.size, line.color, line.quantity - 1)} aria-label="Adedi azalt"><Minus size={13} /></button><span>{line.quantity}</span><button type="button" onClick={() => update(line.product.id, line.size, line.color, line.quantity + 1)} aria-label="Adedi artır"><Plus size={13} /></button></div><b>{formatPrice(line.product.price * line.quantity)}</b></div></div>
              </article>
            ))}
          </div>
          {cart.length ? <div className="cart-summary"><div><span>Ara toplam</span><strong>{formatPrice(subtotal)}</strong></div><p>Kargo ve vergiler ödeme adımında hesaplanır.</p><button className="button button-primary" type="button">Güvenli ödemeye geç</button></div> : null}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
