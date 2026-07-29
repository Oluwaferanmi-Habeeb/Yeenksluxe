'use client';

import { useState } from 'react';
import { useStore } from '../context/StoreContext';

export default function MembershipSection() {
  const { checkoutStep, showToast } = useStore();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  if (checkoutStep !== 'shop') return null;

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    showToast('Welcome to the YEENKSLUXE Inner Circle!');
    setEmail('');
  };

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    window.open('https://wa.me/2349033364994?text=Please%20add%20me%20to%20the%20YEENKSLUXE%20broadcast%20list%20to%20receive%20updates.', '_blank');
    showToast('Opening WhatsApp — you\'ll be added to the VIP list!');
    setPhone('');
  };

  return (
    <section className="membership-section reveal-on-scroll">
      <div className="container">
        <div className="membership-grid">
          <div className="membership-col">
            <h3 className="membership-title">JOIN THE INNER CIRCLE</h3>
            <p className="membership-subtitle">
              Sign up for our newsletter to receive private drop invitations, exclusive lookbooks, and priority release access.
            </p>
            <form className="membership-form" onSubmit={handleNewsletter}>
              <input type="email" placeholder="ENTER YOUR EMAIL" className="membership-input" required
                value={email} onChange={(e) => setEmail(e.target.value)} />
              <button type="submit" className="membership-submit">SUBSCRIBE</button>
            </form>
          </div>
          <div className="membership-col">
            <h3 className="membership-title">WHATSAPP VIP CLUB</h3>
            <p className="membership-subtitle">
              Get immediate restock alerts, collection notifications, and direct access to our personal shopping assistants.
            </p>
            <form className="membership-form" onSubmit={handleWhatsApp}>
              <input type="tel" placeholder="YOUR PHONE NUMBER" className="membership-input" required
                value={phone} onChange={(e) => setPhone(e.target.value)} />
              <button type="submit" className="membership-submit whatsapp-submit">JOIN NOW</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
