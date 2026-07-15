'use client';

import { useStore } from '../context/StoreContext';

export default function CheckoutForm() {
  const {
    checkoutForm, setCheckoutForm, paymentMethod, setPaymentMethod,
    handlePlaceOrder, setCheckoutStep, cart, formatCurrency
  } = useStore();

  return (
    <div className="container">
      <div className="checkout-container">
        <div className="checkout-form-panel">
          <div>
            <h2 className="checkout-step-title">DELIVERY DETAILS</h2>
            <form onSubmit={handlePlaceOrder} className="form-grid">
              <div className="form-field form-group-full">
                <label className="form-label">Full Name *</label>
                <input type="text" required placeholder="John Doe" className="form-input"
                  value={checkoutForm.name} onChange={(e) => setCheckoutForm({...checkoutForm, name: e.target.value})} />
              </div>
              <div className="form-field">
                <label className="form-label">Email Address *</label>
                <input type="email" required placeholder="john@example.com" className="form-input"
                  value={checkoutForm.email} onChange={(e) => setCheckoutForm({...checkoutForm, email: e.target.value})} />
              </div>
              <div className="form-field">
                <label className="form-label">Phone Number *</label>
                <input type="tel" required placeholder="e.g. +234 903 336 4994" className="form-input"
                  value={checkoutForm.phone} onChange={(e) => setCheckoutForm({...checkoutForm, phone: e.target.value})} />
              </div>
              <div className="form-field form-group-full">
                <label className="form-label">Delivery Address *</label>
                <input type="text" required placeholder="Apartment, Street Name, Area" className="form-input"
                  value={checkoutForm.address} onChange={(e) => setCheckoutForm({...checkoutForm, address: e.target.value})} />
              </div>
              <div className="form-field form-group-full">
                <label className="form-label">City / State *</label>
                <input type="text" required placeholder="Lagos, Ikeja" className="form-input"
                  value={checkoutForm.city} onChange={(e) => setCheckoutForm({...checkoutForm, city: e.target.value})} />
              </div>
              <div className="form-field form-group-full">
                <label className="form-label">Order Notes (Optional)</label>
                <textarea rows={3} placeholder="Specific delivery times, size preferences, etc." className="form-input"
                  value={checkoutForm.notes} onChange={(e) => setCheckoutForm({...checkoutForm, notes: e.target.value})}
                  style={{ resize: 'vertical' }} />
              </div>

              <div className="form-field form-group-full" style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>
                <label className="form-label" style={{ display: 'block', marginBottom: '0.75rem' }}>Payment Gateway / Method *</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem' }}>
                  {['flutterwave', 'shopify', 'whatsapp'].map((method) => (
                    <div key={method} onClick={() => setPaymentMethod(method as any)}
                      style={{
                        border: `1px solid ${paymentMethod === method ? 'var(--accent)' : 'var(--border-color)'}`,
                        padding: '1rem', cursor: 'pointer',
                        background: paymentMethod === method ? 'rgba(200, 169, 110, 0.05)' : 'var(--bg-tertiary)',
                        transition: 'all 0.3s ease', textAlign: 'center'
                      }}>
                      <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em',
                        color: paymentMethod === method ? 'white' : 'var(--text-secondary)' }}>
                        {method === 'flutterwave' ? 'NAIRA CHECKOUT' : method === 'shopify' ? 'INTL CHECKOUT' : 'VIP MANUAL'}
                      </div>
                      <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--accent)', marginTop: '0.25rem' }}>
                        {method === 'flutterwave' ? 'Flutterwave' : method === 'shopify' ? 'Shopify Checkout' : 'WhatsApp Order'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group-full">
                <button type="submit" className="place-order-btn">
                  {paymentMethod === 'flutterwave' && 'PAY SECURELY WITH FLUTTERWAVE'}
                  {paymentMethod === 'shopify' && 'PROCEED TO SHOPIFY CHECKOUT'}
                  {paymentMethod === 'whatsapp' && 'PLACE ORDER ON WHATSAPP'}
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
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Qty: {item.quantity} | Size: {item.selectedSize} {item.selectedColor && `| Color: ${item.selectedColor}`}
                </div>
              </div>
            ))}
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
