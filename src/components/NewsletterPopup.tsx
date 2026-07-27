'use client';

import { useState, useEffect } from 'react';

const POPUP_STORAGE_KEY = 'ynks_popup_shown';

export default function NewsletterPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const alreadyShown = localStorage.getItem(POPUP_STORAGE_KEY);
    if (!alreadyShown) {
      // Show popup after 3 seconds
      const timer = setTimeout(() => setVisible(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    localStorage.setItem(POPUP_STORAGE_KEY, 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    localStorage.setItem(POPUP_STORAGE_KEY, 'true');
    setTimeout(() => setVisible(false), 2000);
  };

  if (!visible) return null;

  return (
    <div className="popup-overlay" onClick={dismiss}>
      <div className="popup-card" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={dismiss} aria-label="Close popup">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="popup-content">
          <span className="popup-badge">WELCOME OFFER</span>
          <h2 className="popup-title">JOIN THE<br />INNER CIRCLE</h2>
          <p className="popup-subtitle">
            Subscribe and receive <strong>10% off</strong> your first order. Be first to know about limited drops, exclusive collections, and private sales.
          </p>

          {submitted ? (
            <div className="popup-success">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span>YOU&rsquo;RE IN. CHECK YOUR INBOX FOR YOUR CODE.</span>
            </div>
          ) : (
            <form className="popup-form" onSubmit={handleSubmit}>
              <input
                type="email"
                required
                placeholder="YOUR EMAIL ADDRESS"
                className="popup-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="popup-submit">GET 10% OFF</button>
            </form>
          )}

          <p className="popup-disclaimer">No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    </div>
  );
}
