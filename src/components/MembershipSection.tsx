'use client';

import { useAccount } from '../context/AccountContext';

export default function MembershipSection() {
  const { setAccountOpen } = useAccount();
  return (
    <section className="membership-section reveal-on-scroll">
      <div className="membership-word" aria-hidden="true">INSIDE</div>
      <div className="container membership-inner">
        <p className="eyebrow">YNL ACCOUNT</p>
        <h2>Keep your<br/>details saved.</h2>
        <p>Save your fit and delivery details for your next order.</p>
        <button className="button button-light" onClick={() => setAccountOpen(true)}>Create your YNL Account <span>↗</span></button>
        <small>Only account and order details.</small>
      </div>
    </section>
  );
}
