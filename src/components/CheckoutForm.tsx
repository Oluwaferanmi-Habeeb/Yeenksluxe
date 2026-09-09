'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useStore } from '../context/StoreContext';
import { containsUnsafeText, fieldError, safeEmail, safeLocation, safeName, safePhone, safeText } from '../utils/validation';

export default function CheckoutForm() {
  const { checkoutForm, setCheckoutForm, handlePlaceOrder, setCheckoutStep, cart, formatCurrency, cartSubtotal } = useStore();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const updateField = (key: 'name'|'email'|'phone'|'address'|'city'|'notes', value: string) => {
    if (containsUnsafeText(value)) {
      setErrors(current => ({ ...current, [key]: 'For security, use plain text only.' }));
      return;
    }
    setErrors(current => ({ ...current, [key]: '' }));
    setCheckoutForm({ ...checkoutForm, [key]: value.slice(0, key === 'email' ? 254 : key === 'address' ? 160 : key === 'notes' ? 220 : 80) });
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const next: Record<string, string> = {};
    next.name = fieldError(() => safeName(checkoutForm.name, true));
    next.phone = fieldError(() => safePhone(checkoutForm.phone, true));
    next.address = fieldError(() => safeLocation(checkoutForm.address, 'Delivery address', 160, true));
    next.city = fieldError(() => safeLocation(checkoutForm.city, 'City / State', 80, true));
    next.email = fieldError(() => safeEmail(checkoutForm.email, false));
    next.notes = fieldError(() => safeText(checkoutForm.notes, 220, 'Order note'));
    Object.keys(next).forEach(key => { if (!next[key]) delete next[key]; });
    setErrors(next);
    if (!Object.keys(next).length) handlePlaceOrder(event);
  };

  if (!cart.length) return <div className="container checkout-empty"><p className="eyebrow">Your bag</p><h1>Nothing to check out yet.</h1><button className="button button-dark" onClick={() => setCheckoutStep('shop')}>Return to the collection</button></div>;

  const field = (key: 'name'|'email'|'phone'|'address'|'city', label: string, placeholder: string, type = 'text') => (
    <label className={`checkout-field ${key === 'address' ? 'full' : ''}`}><span>{label}</span><input type={type} value={checkoutForm[key]} placeholder={placeholder} onChange={event => updateField(key, event.target.value)} aria-invalid={!!errors[key]} required={key !== 'email'} maxLength={key === 'email' ? 254 : key === 'address' ? 160 : 80} autoComplete={key === 'name' ? 'name' : key === 'email' ? 'email' : key === 'phone' ? 'tel' : key === 'address' ? 'street-address' : 'address-level2'} inputMode={key === 'phone' ? 'tel' : key === 'email' ? 'email' : 'text'} />{errors[key] && <small>{errors[key]}</small>}</label>
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
              <label className="checkout-field full"><span>Order note</span><textarea rows={3} value={checkoutForm.notes} maxLength={220} placeholder="Optional delivery or sizing note" onChange={event => updateField('notes', event.target.value)} aria-invalid={!!errors.notes}/>{errors.notes && <small>{errors.notes}</small>}</label>
            </div>
            <div className="whatsapp-checkout-note"><span>WA</span><div><strong>Order securely through WhatsApp</strong><p>Your order summary and delivery details will open in a chat with our official number. No payment is taken on this website.</p></div></div>
            <button className="button button-dark checkout-submit" type="submit">Review order on WhatsApp <span>↗</span></button>
            <p className="checkout-consent">By continuing, you agree that the details above will be included in your WhatsApp order message.</p>
          </form>

          <aside className="order-summary">
            <div className="order-summary-heading"><h2>Order summary</h2><span>{cart.reduce((sum, item) => sum + item.quantity, 0)} items</span></div>
            <div className="summary-products">{cart.map(item => <article key={`${item.product.id}-${item.selectedSize}`}><div className="summary-image"><Image src={item.product.image} alt="" fill className="product-image" sizes="72px"/><span>{item.quantity}</span></div><div><h3>{item.product.name.replace(/YĒĒNKSLUXÉ\s*x\s*/gi, '').replace(/[‘’']?26 Edition\s*/gi, '')}</h3><p>Size {item.selectedSize}</p></div><strong>{formatCurrency(item.product.price * item.quantity)}</strong></article>)}</div>
            <dl><div><dt>Item subtotal</dt><dd>{formatCurrency(cartSubtotal)}</dd></div><div><dt>Delivery</dt><dd>Confirmed in chat</dd></div><div className="summary-total"><dt>Items</dt><dd>{formatCurrency(cartSubtotal)}</dd></div></dl>
          </aside>
        </div>
      </div>
    </section>
  );
}
