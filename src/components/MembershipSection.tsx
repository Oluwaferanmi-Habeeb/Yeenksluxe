'use client';

import { useAccount } from '../context/AccountContext';

export default function MembershipSection() {
  const { setAccountOpen } = useAccount();
  return (
    <section className="membership-section reveal-on-scroll">
      <div className="membership-word" aria-hidden="true">INSIDE</div>
      <div className="container membership-inner">
        <p className="eyebrow">First access · direct line</p>
        <h2>Join the inner circle.</h2>
        <p>Get drop alerts, restock updates and personal sizing help directly from the YEENKSLUXE team.</p>
        <button className="button button-light" onClick={() => setAccountOpen(true)}>Create your YNL Account <span>↗</span></button>
        <small>Save your pieces, fit and delivery details. No unnecessary noise.</small>
      </div>
    </section>
  );
}
