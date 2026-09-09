'use client';

import { useState, useEffect } from 'react';
import { InputValidationError, safeEmail } from '../utils/validation';

const POPUP_STORAGE_KEY = 'ynks_popup_shown';

export default function NewsletterPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const alreadyShown = localStorage.getItem(POPUP_STORAGE_KEY);
    if (!alreadyShown) {
      // Show popup after 10 seconds or when user scrolls past 50% of page
      const timer = setTimeout(() => setVisible(true), 10000);
      
      const handleScroll = () => {
        const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        if (scrollPercent > 0.5) {
          setVisible(true);
          window.removeEventListener('scroll', handleScroll);
        }
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      
      return () => {
        clearTimeout(timer);
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    localStorage.setItem(POPUP_STORAGE_KEY, 'true');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('');
    try {
      const address = safeEmail(email);
      setSubmitting(true);
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 10_000);
      try {
        const body = new URLSearchParams({ 'form-name': 'newsletter', email: address, 'bot-field': '' });
        const response = await fetch('/__forms.html', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: body.toString(),
          signal: controller.signal,
        });
        if (!response.ok) throw new Error('Newsletter submission failed.');
      } finally {
        window.clearTimeout(timeout);
      }
      setSubmitted(true);
      localStorage.setItem(POPUP_STORAGE_KEY, 'true');
      window.setTimeout(() => setVisible(false), 2000);
    } catch (error) {
      setStatus(error instanceof InputValidationError ? error.message : 'We could not add you right now. Nothing was saved — please retry.');
    } finally {
      setSubmitting(false);
    }
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
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2.5">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span>YOU&rsquo;RE IN. CHECK YOUR INBOX FOR YOUR CODE.</span>
            </div>
          ) : (
            <form className="popup-form" name="newsletter" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit}>
              <input type="hidden" name="form-name" value="newsletter" />
              <label className="sr-only">Leave this blank if you are human<input name="bot-field" tabIndex={-1} autoComplete="off" /></label>
              <input
                type="email"
                name="email"
                required
                placeholder="YOUR EMAIL ADDRESS"
                className="popup-input"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setStatus(''); }}
                maxLength={254}
                autoComplete="email"
              />
              <button type="submit" className="popup-submit" disabled={submitting}>{submitting ? 'JOINING…' : 'GET 10% OFF'}</button>
            </form>
          )}
          {status && <p className="popup-error" role="alert">{status}</p>}

          <p className="popup-disclaimer">No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    </div>
  );
}
