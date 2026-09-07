'use client';

import Image from 'next/image';
import { useStore } from '../context/StoreContext';

export default function CartDrawer() {
  const { cartOpen, setCartOpen, cart, updateCartQty, removeCartItem, setCheckoutStep, formatCurrency, cartSubtotal, scrollToShop } = useStore();
  if (!cartOpen) return null;

  const checkout = () => { setCartOpen(false); setCheckoutStep('checkout'); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const continueShopping = () => { setCartOpen(false); setCheckoutStep('shop'); window.setTimeout(scrollToShop, 30); };

  return (
    <div className="drawer-layer" role="presentation">
      <button className="drawer-backdrop" onClick={() => setCartOpen(false)} aria-label="Close shopping bag" />
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="bag-title">
        <div className="cart-header"><div><p className="eyebrow">Your selection</p><h2 id="bag-title">Shopping bag <span>({cart.reduce((sum, item) => sum + item.quantity, 0)})</span></h2></div><button onClick={() => setCartOpen(false)} aria-label="Close shopping bag">×</button></div>
        <div className="cart-items">
          {cart.length === 0 ? <div className="empty-bag"><span>01</span><h3>Your bag is waiting.</h3><p>Explore the latest limited pieces and build your rotation.</p><button className="button button-dark" onClick={continueShopping}>Shop the collection</button></div> : cart.map((item, index) => (
            <article className="cart-item" key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}>
              <div className="cart-item-image"><Image src={item.product.image} alt={item.product.name} fill className="product-image" sizes="96px" /></div>
              <div className="cart-item-copy"><div><p>{item.product.category}</p><h3>{item.product.name.replace(/YĒĒNKSLUXÉ\s*x\s*/gi, '').replace(/[‘’']?26 Edition\s*/gi, '')}</h3><span>Size {item.selectedSize}</span></div><strong>{formatCurrency(item.product.price * item.quantity)}</strong><div className="cart-item-controls"><div><button onClick={() => updateCartQty(index, -1)} aria-label="Decrease quantity">−</button><span>{item.quantity}</span><button onClick={() => updateCartQty(index, 1)} aria-label="Increase quantity">+</button></div><button onClick={() => removeCartItem(index)}>Remove</button></div></div>
            </article>
          ))}
        </div>

        {cart.length > 0 && <div className="cart-footer"><div><span>Subtotal</span><strong>{formatCurrency(cartSubtotal)}</strong></div><p>Final pricing and availability are confirmed on WhatsApp.</p><button className="button button-light" onClick={checkout}>Continue to checkout <span>→</span></button><button className="cart-continue" onClick={continueShopping}>Continue shopping</button></div>}
      </aside>
    </div>
  );
}
