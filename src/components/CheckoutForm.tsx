"use client";

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PaymentMethod } from '../types';
// @ts-ignore next-line: optional dependency; install `next-auth` to enable auth flow
import { useSession, signIn, signOut } from 'next-auth/react';

export default function CheckoutForm() {
  const {
    checkoutForm, setCheckoutForm, paymentMethod, setPaymentMethod,
    handlePlaceOrder, setCheckoutStep, cart, formatUSD, formatNGN, cartSubtotal, currency, showToast
  } = useStore();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const paystackEnabled = false; // Paystack currently under review by CEO
  const { data: session } = useSession();
  const canUsePaystack = paystackEnabled && !!session;

  const sanitize = (s: string) => s.replace(/[\u0000-\u001F\u007F<>]/g, '').trim().slice(0, 200);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!checkoutForm.name || !checkoutForm.name.trim()) errs.name = 'Full name is required';
    if (!checkoutForm.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(checkoutForm.email)) errs.email = 'Enter a valid email address';
    if (!checkoutForm.phone || !/^\+?[0-9\s\-]{7,15}$/.test(checkoutForm.phone)) errs.phone = 'Enter a valid phone number';
    if (!checkoutForm.address || !checkoutForm.address.trim()) errs.address = 'Delivery address is required';
    if (!checkoutForm.city || !checkoutForm.city.trim()) errs.city = 'City / State is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (paymentMethod === 'paystack') {
      if (!paystackEnabled) {
        showToast('Paystack is currently under review. Please use WhatsApp checkout for now.');
        return;
      }
      if (!session) {
        showToast('Please sign in to continue with Paystack checkout.');
        signIn();
        return;
      }
    }
    handlePlaceOrder(e);
  };

  return (
    <div className="container">
      <div className="checkout-container">
        <div className="checkout-form-panel">
          <div>
            <h2 className="checkout-step-title">DELIVERY DETAILS</h2>
            <form onSubmit={onSubmit} className="form-grid" noValidate>
              <div className="form-field form-group-full">
                <label className="form-label">Full Name *</label>
                <input type="text" required placeholder="John Doe" className="form-input"
                  value={checkoutForm.name} onChange={(e) => setCheckoutForm({...checkoutForm, name: sanitize(e.target.value)})}
                  aria-invalid={!!errors.name} />
                {errors.name && <div style={{ color: '#ff6b6b', fontSize: '0.85rem', marginTop: '0.35rem' }}>{errors.name}</div>}
              </div>
              <div className="form-field">
                <label className="form-label">Email Address *</label>
                <input type="email" required placeholder="john@example.com" className="form-input"
                  value={checkoutForm.email} onChange={(e) => setCheckoutForm({...checkoutForm, email: sanitize(e.target.value)})}
                  aria-invalid={!!errors.email} />
                {errors.email && <div style={{ color: '#ff6b6b', fontSize: '0.85rem', marginTop: '0.35rem' }}>{errors.email}</div>}
              </div>
              <div className="form-field">
                <label className="form-label">Phone Number *</label>
                <input type="tel" required placeholder="e.g. +234 903 336 4994" className="form-input"
                  value={checkoutForm.phone} onChange={(e) => setCheckoutForm({...checkoutForm, phone: sanitize(e.target.value)})}
                  aria-invalid={!!errors.phone} />
                {errors.phone && <div style={{ color: '#ff6b6b', fontSize: '0.85rem', marginTop: '0.35rem' }}>{errors.phone}</div>}
              </div>
              <div className="form-field form-group-full">
                <label className="form-label">Delivery Address *</label>
                <input type="text" required placeholder="Apartment, Street Name, Area" className="form-input"
                  value={checkoutForm.address} onChange={(e) => setCheckoutForm({...checkoutForm, address: sanitize(e.target.value)})}
                  aria-invalid={!!errors.address} />
                {errors.address && <div style={{ color: '#ff6b6b', fontSize: '0.85rem', marginTop: '0.35rem' }}>{errors.address}</div>}
              </div>
              <div className="form-field form-group-full">
                <label className="form-label">City / State *</label>
                <input type="text" required placeholder="Lagos, Ikeja" className="form-input"
                  value={checkoutForm.city} onChange={(e) => setCheckoutForm({...checkoutForm, city: sanitize(e.target.value)})}
                  aria-invalid={!!errors.city} />
                {errors.city && <div style={{ color: '#ff6b6b', fontSize: '0.85rem', marginTop: '0.35rem' }}>{errors.city}</div>}
              </div>
              <div className="form-field form-group-full">
                <label className="form-label">Order Notes (Optional)</label>
                <textarea rows={3} placeholder="Specific delivery times, size preferences, etc." className="form-input"
                  value={checkoutForm.notes} onChange={(e) => setCheckoutForm({...checkoutForm, notes: e.target.value})}
                  style={{ resize: 'vertical' }} />
              </div>

              <div className="form-field form-group-full" style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>
                <label className="form-label" style={{ display: 'block', marginBottom: '0.75rem' }}>Payment Gateway / Method *</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.75rem' }}>
                  {['paystack', 'whatsapp'].map((method) => {
                    const isPaystack = method === 'paystack';
                    const disabled = isPaystack && !paystackEnabled;
                    return (
                      <div key={method}
                        onClick={() => {
                          if (disabled) return showToast('Paystack is currently under review.');
                          setPaymentMethod(method as PaymentMethod);
                        }}
                        style={{
                          border: `1px solid ${paymentMethod === method ? 'var(--accent)' : 'var(--border-color)'}`,
                          padding: '1rem', cursor: disabled ? 'not-allowed' : 'pointer',
                          background: paymentMethod === method ? 'rgba(200, 169, 110, 0.05)' : 'var(--bg-tertiary)',
                          opacity: disabled ? 0.6 : 1, transition: 'all 0.3s ease', textAlign: 'center'
                        }}>
                        <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em',
                          color: paymentMethod === method ? 'white' : 'var(--text-secondary)' }}>
                          {isPaystack ? 'SECURE CHECKOUT' : 'MANUAL ORDER'}
                        </div>
                        <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--accent)', marginTop: '0.25rem' }}>
                          {isPaystack ? `Paystack${disabled ? ' (Under review)' : ''}` : 'WhatsApp Order'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="form-group-full">
                <button type="submit" className="place-order-btn">
                  {paymentMethod === 'paystack' ? (paystackEnabled ? 'PAY SECURELY WITH PAYSTACK' : 'PAYSTACK (UNDER REVIEW)') : 'PLACE ORDER ON WHATSAPP'}
                </button>
                <button type="button" className="home-btn" onClick={() => setCheckoutStep('shop')}
                  style={{ width: '100%', marginTop: '0.75rem' }}>BACK TO STORE</button>
              </div>
            </form>
          </div>
        </div>

        <div className="checkout-order-summary">
          <h3 className="summary-title">ORDER SUMMARY</h3>
          <div className="summary-divider"></div>
          <div className="summary-items">
            {cart.map((item, index) => (
              <div key={index} className="summary-item-row" style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                  <span style={{ color: 'var(--text-primary)' }}>{item.product.name}</span>
                  <div className="price-block" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <span className={`price-ngn ${currency === 'NGN' ? 'active' : ''}`}>{formatNGN(item.product.price)}</span>
                    <span className="price-divider" style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>|</span>
                    <span className={`price-usd ${currency === 'USD' ? 'active' : ''}`}>{formatUSD(item.product.price)}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <span>Qty: {item.quantity} | Size: {item.selectedSize} {item.selectedColor && `| Color: ${item.selectedColor}`}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="summary-divider" style={{ margin: '1rem 0' }}></div>
          <div className="summary-item-row" style={{ fontWeight: 700, fontSize: '0.95rem' }}>
            <span>Total</span>
            <div className="price-block" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span className={`price-ngn ${currency === 'NGN' ? 'active' : ''}`} style={{ color: 'var(--accent)' }}>{formatNGN(cartSubtotal)}</span>
              <span className="price-divider" style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>|</span>
              <span className={`price-usd ${currency === 'USD' ? 'active' : ''}`} style={{ color: 'var(--accent)' }}>{formatUSD(cartSubtotal)}</span>
            </div>
          </div>
          <div className="summary-divider" style={{ margin: '1rem 0' }}></div>
          <div className="summary-item-row">
            <span>Shipping</span>
            <span style={{ color: 'var(--accent)', fontWeight: 600 }}>FREE DELIVERY</span>
          </div>
        </div>
      </div>
    </div>
  );
}
