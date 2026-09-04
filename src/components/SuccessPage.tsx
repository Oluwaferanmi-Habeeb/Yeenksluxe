'use client';

import { useStore } from '../context/StoreContext';

export default function SuccessPage() {
  const { setCheckoutStep, getWhatsAppLink } = useStore();
  return (
    <section className="success-page"><div className="success-card"><span className="success-mark">✓</span><p className="eyebrow">Order prepared</p><h1>Your selection is ready.</h1><p>Your WhatsApp conversation should now be open. Send the prepared message so our team can confirm stock, delivery and payment details.</p><a className="button button-dark" href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">Open WhatsApp again <span>↗</span></a><button className="text-link" onClick={() => setCheckoutStep('shop')}>Return to the collection <span>→</span></button></div></section>
  );
}
