'use client';

import { useStore } from '../context/StoreContext';

export default function MembershipSection() {
  const { checkoutStep } = useStore();

  if (checkoutStep !== 'shop') return null;

  return (
    <section className="membership-section reveal-on-scroll">
      <div className="container">
        <div className="membership-grid">
          <div className="membership-col">
            <h3 className="membership-title">JOIN THE INNER CIRCLE</h3>
            <p className="membership-subtitle">
              Sign up for our newsletter to receive private drop invitations, exclusive lookbooks, and priority release access.
            </p>
            <form className="membership-form" onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing to the YEENKSLUXE inner circle!'); }}>
              <input type="email" placeholder="ENTER YOUR EMAIL" className="membership-input" required />
              <button type="submit" className="membership-submit">SUBSCRIBE</button>
            </form>
          </div>
          <div className="membership-col">
            <h3 className="membership-title">WHATSAPP VIP CLUB</h3>
            <p className="membership-subtitle">
              Get immediate restock alerts, collection notifications, and direct access to our personal shopping assistants.
            </p>
            <form className="membership-form" onSubmit={(e) => { e.preventDefault(); window.open('https://wa.me/2349033364994?text=Please%20add%20me%20to%20the%20YEENKSLUXE%20broadcast%20list%20to%20receive%20updates.'); }}>
              <input type="tel" placeholder="YOUR PHONE NUMBER" className="membership-input" required />
              <button type="submit" className="membership-submit whatsapp-submit">JOIN NOW</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
