'use client';

import Image from 'next/image';
import { useStore } from '../context/StoreContext';

export default function Footer() {
  const { setSelectedCategory, setCheckoutStep, scrollToShop } = useStore();

  const navTo = (cat: string) => {
    setSelectedCategory(cat);
    setCheckoutStep('shop');
    scrollToShop();
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="footer-logo-container" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div className="footer-logo" style={{ position: 'relative', width: '54px', height: '54px', flexShrink: 0 }}>
                <Image src="/images/logoo.jpg" alt="YEENKSLUXE" fill className="logo-img object-contain" sizes="54px" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-primary)', fontFamily: 'var(--font-display)', lineHeight: '1.1' }}>YEENKSLUXE</span>
              </div>
            </div>
            <p className="footer-description">Where streetwear meets luxury.</p>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-col-title">COLLECTIONS</h4>
            <div className="footer-links">
              <a href="#" onClick={(e) => { e.preventDefault(); navTo('Shirts'); }}>SHIRTS</a>
              <a href="#" onClick={(e) => { e.preventDefault(); navTo('Hoodies'); }}>HOODIES</a>
              <a href="#" onClick={(e) => { e.preventDefault(); navTo('Hats'); }}>HATS</a>
              <a href="#" onClick={(e) => { e.preventDefault(); navTo('Accessories'); }}>ACCESSORIES</a>
            </div>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-col-title">SUPPORT</h4>
            <div className="footer-links">
              <a href="#" onClick={(e) => e.preventDefault()}>SHIPPING INFO</a>
              <a href="#" onClick={(e) => e.preventDefault()}>RETURNS & REFUNDS</a>
              <a href="#" onClick={(e) => e.preventDefault()}>SIZE GUIDES</a>
              <a href="#" onClick={(e) => e.preventDefault()}>FAQ</a>
            </div>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-col-title">GET IN TOUCH</h4>
            <div className="footer-contact-info">
              <p>Chat with us on WhatsApp for rapid support & custom order sizing details.</p>
              <p style={{ color: 'var(--accent)', fontWeight: 700 }}>
                <a href="https://wa.me/2349033364994" target="_blank" rel="noopener noreferrer">+234 903 336 4994</a>
              </p>
              <p>Lagos, Nigeria</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} YEENKSLUXE. All Rights Reserved.</p>
          <div className="social-links">
            <a href="https://instagram.com/yeenksluxe" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
              <svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="https://twitter.com/yeenksluxe" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">
              <svg viewBox="0 0 24 24"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
            </a>
            <a href="https://tiktok.com/@yeenksluxe" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="TikTok">
              <svg viewBox="0 0 24 24"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
            </a>
          </div>
        </div>
        <div className="footer-watermark">YEENKSLUXE</div>
      </div>
    </footer>
  );
}
