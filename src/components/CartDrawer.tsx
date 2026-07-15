'use client';

import Image from 'next/image';
import { useStore } from '../context/StoreContext';

export default function CartDrawer() {
  const {
    cartOpen, setCartOpen, cart, updateCartQty, removeCartItem,
    cartItemCount, setCheckoutStep, formatCurrency
  } = useStore();

  if (!cartOpen) return null;

  return (
    <>
      <div className="cart-drawer-backdrop" onClick={() => setCartOpen(false)}></div>
      <div className="cart-drawer">
        <div className="cart-header">
          <h3 className="cart-title">YOUR CART</h3>
          <button className="close-cart-btn" onClick={() => setCartOpen(false)} aria-label="Close Cart">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {cart.length > 0 && (
          <div className="cart-progress-bar-container" style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-color)', background: 'rgba(200, 169, 110, 0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em' }}>
              <span style={{ color: 'var(--accent)' }}>FREE DOMESTIC DELIVERY EN ROUTE</span>
              <span>100%</span>
            </div>
            <div style={{ width: '100%', height: '3px', background: 'var(--border-color)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', background: 'var(--accent)' }}></div>
            </div>
          </div>
        )}

        <div className="cart-items-container">
          {cart.length === 0 ? (
            <div className="empty-cart-message">
              <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <span>YOUR SHOPPING CART IS EMPTY</span>
            </div>
          ) : (
            cart.map((item, index) => (
              <div key={index} className="cart-item">
                <div style={{ position: 'relative', width: '70px', height: '90px', flexShrink: 0 }}>
                  <Image src={item.product.image} alt={item.product.name} fill className="cart-item-img object-cover" sizes="70px" />
                </div>
                <div className="cart-item-details">
                  <h4 className="cart-item-name">{item.product.name}</h4>
                  <span className="cart-item-meta">
                    Size: {item.selectedSize} {item.selectedColor && `| Color: ${item.selectedColor}`}
                  </span>
                  <div className="cart-item-controls">
                    <div className="quantity-selector">
                      <button className="qty-btn" onClick={() => updateCartQty(index, -1)}>-</button>
                      <span className="qty-val">{item.quantity}</span>
                      <button className="qty-btn" onClick={() => updateCartQty(index, 1)}>+</button>
                    </div>
                    <button className="remove-item-btn" onClick={() => removeCartItem(index)}>REMOVE</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary-row">
              <span>Shipping</span>
              <span style={{ color: 'var(--accent)', fontWeight: 600 }}>FREE DELIVERY</span>
            </div>
            <button className="checkout-btn" onClick={() => { setCartOpen(false); setCheckoutStep('checkout'); }}>
              SECURE CHECKOUT
            </button>
          </div>
        )}
      </div>
    </>
  );
}
