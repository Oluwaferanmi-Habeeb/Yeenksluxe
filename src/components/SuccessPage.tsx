'use client';

import { useStore } from '../context/StoreContext';

export default function SuccessPage() {
  const { getWhatsAppLink, setCart, setCheckoutStep } = useStore();

  return (
    <div className="container">
      <div className="success-card">
        <div className="success-icon">
          <svg viewBox="0 0 24 24">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h2 className="success-title">ORDER INITIALIZED</h2>

        <p className="success-message">
          Thank you for shopping with <strong>YEENKSLUXE</strong>. Your order summary has been generated. To complete your delivery payment and finalize the order, click the button below to connect with us on WhatsApp.
        </p>

        <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="whatsapp-btn">
          <svg viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.453L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.449 5.4 0 9.794-4.392 9.797-9.793.001-2.618-1.01-5.08-2.848-6.92C16.328 2.05 13.872 1.04 11.266 1.04c-5.4 0-9.794 4.393-9.797 9.794-.001 1.704.453 3.328 1.347 4.79L1.83 20.6l5.033-1.316-1.216-.13z" />
          </svg>
          SEND ORDER ON WHATSAPP
        </a>

        <button className="home-btn" onClick={() => { setCart([]); setCheckoutStep('shop'); }} style={{ width: '100%' }}>
          RETURN TO HOMEPAGE
        </button>
      </div>
    </div>
  );
}
