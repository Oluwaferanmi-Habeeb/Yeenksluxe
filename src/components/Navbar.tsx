'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useStore } from '../context/StoreContext';
import { categories } from '../data/products';

export default function Navbar() {
  const {
    scrolled, checkoutStep, setCheckoutStep, setSelectedCategory,
    selectedCategory, scrollToShop, searchQuery, setSearchQuery,
    theme, setTheme, cartAnimated, setCartOpen, cartItemCount,
    currency, setCurrency
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (cat: string) => {
    setSelectedCategory(cat);
    scrollToShop();
    setMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    setCheckoutStep('shop');
    setSelectedCategory('All');
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-inner">
        <div className="logo-container" onClick={handleLogoClick} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="logo" style={{ position: 'relative', width: '54px', height: '54px', flexShrink: 0 }}>
            <Image src="/images/logoo.jpg" alt="YEENKSLUXE" fill priority className="logo-img object-contain" sizes="54px" />
          </div>
          <div className="logo-text-group" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-primary)', fontFamily: 'var(--font-display)', lineHeight: '1.1' }}>YEENKSLUXE</span>
            <span className="logo-tagline" style={{ marginTop: '0.15rem' }}>Where streetwear meets luxury</span>
          </div>
        </div>

        {checkoutStep === 'shop' && (
          <div className="nav-links">
            {['All', ...categories].map((cat) => (
              <div key={cat} className={`nav-link ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => handleNavClick(cat)}>
                {cat}
              </div>
            ))}
          </div>
        )}

        <div className="nav-actions">
          {checkoutStep === 'shop' && (
            <div className="search-bar-container">
              <input type="text" placeholder="SEARCH..." className="search-input"
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              <svg className="search-icon" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
          )}

          {/* Currency Toggle — Clean NGN | USD pill */}
          <div className="currency-toggle" onClick={() => setCurrency(currency === 'NGN' ? 'USD' : 'NGN')}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', border: '1px solid var(--border-color)', height: '28px', borderRadius: '4px', overflow: 'hidden', transition: 'var(--transition-fast)' }}>
            <span className={`currency-opt ${currency === 'NGN' ? 'active' : ''}`}
              style={{ padding: '0 0.6rem', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.05em', fontFamily: 'var(--font-mono)', transition: 'var(--transition-fast)', color: currency === 'NGN' ? '#000' : 'var(--text-muted)', background: currency === 'NGN' ? 'var(--accent)' : 'transparent', height: '100%', display: 'flex', alignItems: 'center' }}>
              NGN
            </span>
            <span className={`currency-opt ${currency === 'USD' ? 'active' : ''}`}
              style={{ padding: '0 0.6rem', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.05em', fontFamily: 'var(--font-mono)', transition: 'var(--transition-fast)', color: currency === 'USD' ? '#000' : 'var(--text-muted)', background: currency === 'USD' ? 'var(--accent)' : 'transparent', height: '100%', display: 'flex', alignItems: 'center' }}>
              USD
            </span>
          </div>

          <button className="theme-toggle-btn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle Theme"
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', border: '1px solid var(--border-color)', color: 'var(--text-primary)', background: 'transparent', transition: 'var(--transition-fast)' }}>
            {theme === 'dark' ? (
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button className="hamburger-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle Menu">
            <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
          </button>

          <button className={`cart-trigger ${cartAnimated ? 'cart-pop-animation' : ''}`}
            onClick={() => setCartOpen(true)} aria-label="Open Cart">
            <svg className="cart-icon-svg" viewBox="0 0 24 24">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6z" />
              <line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {checkoutStep === 'shop' && (
        <div className={`mobile-menu ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}>
          <div className="mobile-menu-inner">
            <div className="mobile-menu-search">
              <input type="text" placeholder="SEARCH..." className="mobile-search-input"
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <div className="mobile-menu-links">
              {['All', ...categories].map((cat) => (
                <div key={cat} className={`mobile-nav-link ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => handleNavClick(cat)}>
                  {cat}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
