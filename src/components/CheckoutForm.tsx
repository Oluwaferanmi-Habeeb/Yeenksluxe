'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useStore } from '../context/StoreContext';

export default function CheckoutForm() {
  const { checkoutForm, setCheckoutForm, handlePlaceOrder, setCheckoutStep, cart, formatCurrency, cartSubtotal } = useStore();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const sanitize = (value: string) => value.replace(/[<>\u0000-\u001F\u007F]/g, '').slice(0, 220);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!checkoutForm.name.trim()) next.name = 'Enter your full name';
    if (!/^\+?[0-9\s-]{7,15}$/.test(checkoutForm.phone)) next.phone = 'Enter a valid phone number';
    if (!checkoutForm.address.trim()) next.address = 'Enter your delivery address';
    if (!checkoutForm.city.trim()) next.city = 'Enter your city and state';
    if (checkoutForm.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(checkoutForm.email)) next.email = 'Enter a valid email address';
    setErrors(next);
    if (!Object.keys(next).length) handlePlaceOrder(event);
  };

  if (!cart.length) return <div className="container checkout-empty"><p className="eyebrow">Your bag</p><h1>Nothing to check out yet.</h1><button className="button button-dark" onClick={() => setCheckoutStep('shop')}>Return to the collection</button></div>;

  const field = (key: 'name'|'email'|'phone'|'address'|'city', label: string, placeholder: string, type = 'text') => (
    <label className={`checkout-field ${key === 'address' ? 'full' : ''}`}><span>{label}</span><input type={type} value={checkoutForm[key]} placeholder={placeholder} onChange={event => setCheckoutForm({ ...checkoutForm, [key]: sanitize(event.target.value) })} aria-invalid={!!errors[key]} />{errors[key] && <small>{errors[key]}</small>}</label>
  );

  return (
    <section className="checkout-page">
      <div className="container">
        <button className="checkout-back" onClick={() => setCheckoutStep('shop')}>← Continue shopping</button>
        <div className="checkout-progress"><span className="active">Bag</span><i/><span className="active">Delivery</span><i/><span>Confirmation</span></div>
        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={submit} noValidate>
            <p className="eyebrow">Step 02</p><h1>Where should we send it?</h1><p className="checkout-lead">Enter your delivery details. You will review and confirm availability with our team on WhatsApp before making payment.</p>
            <div className="checkout-fields">
              {field('name', 'Full name *', 'Your full name')}
              {field('phone', 'Phone number *', '+234 800 000 0000', 'tel')}
              {field('email', 'Email address', 'you@example.com', 'email')}
              {field('city', 'City / State *', 'Ikeja, Lagos')}
              {field('address', 'Delivery address *', 'House number, street and area')}
              <label className="checkout-field full"><span>Order note</span><textarea rows={3} value={checkoutForm.notes} placeholder="Optional delivery or sizing note" onChange={event => setCheckoutForm({ ...checkoutForm, notes: sanitize(event.target.value) })}/></label>
            </div>
            <div className="whatsapp-checkout-note"><span>WA</span><div><strong>Order securely through WhatsApp</strong><p>Your order summary and delivery details will open in a chat with our official number. No payment is taken on this website.</p></div></div>
            <button className="button button-dark checkout-submit" type="submit">Review order on WhatsApp <span>↗</span></button>
            <p className="checkout-consent">By continuing, you agree that the details above will be included in your WhatsApp order message.</p>
          </form>

          <aside className="order-summary">
            <div className="order-summary-heading"><h2>Order summary</h2><span>{cart.reduce((sum, item) => sum + item.quantity, 0)} items</span></div>
            <div className="summary-products">{cart.map(item => <article key={`${item.product.id}-${item.selectedSize}`}><div className="summary-image"><Image src={item.product.image} alt="" fill className="product-image" sizes="72px"/><span>{item.quantity}</span></div><div><h3>{item.product.name.replace(/YĒĒNKSLUXÉ\s*x\s*/gi, '').replace(/[‘’']?26 Edition\s*/gi, '')}</h3><p>Size {item.selectedSize}</p></div><strong>{formatCurrency(item.product.price * item.quantity)}</strong></article>)}</div>
            <dl><div><dt>Subtotal</dt><dd>{formatCurrency(cartSubtotal)}</dd></div><div><dt>Delivery</dt><dd>Free</dd></div><div className="summary-total"><dt>Total</dt><dd>{formatCurrency(cartSubtotal)}</dd></div></dl>
          </aside>
        </div>
      </div>
    </section>
  );
}
