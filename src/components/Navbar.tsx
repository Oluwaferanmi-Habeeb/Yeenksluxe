'use client';

import { useEffect, useState } from 'react';
import { useStore } from '../context/StoreContext';
import { categories } from '../data/products';

export default function Navbar() {
  const {
    scrolled, checkoutStep, setCheckoutStep, setSelectedCategory, selectedCategory,
    scrollToShop, searchQuery, setSearchQuery, cartAnimated, setCartOpen,
    cartItemCount, currency, setCurrency
  } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('menu-open', mobileMenuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [mobileMenuOpen]);

  const navigateTo = (category: string) => {
    setCheckoutStep('shop');
    setSelectedCategory(category);
    setMobileMenuOpen(false);
    window.setTimeout(scrollToShop, 30);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} aria-label="Main navigation">
      <div className="container navbar-inner">
        <button className="wordmark" onClick={() => { setCheckoutStep('shop'); setSelectedCategory('All'); }} aria-label="YEENKSLUXE home">
          YEENKSLUXE<span>®</span>
        </button>

        {checkoutStep === 'shop' && (
          <div className="nav-links" aria-label="Collections">
            {['All', ...categories].map(category => (
              <button key={category} className={selectedCategory === category ? 'active' : ''} onClick={() => navigateTo(category)}>
                {category === 'All' ? 'Shop all' : category}
              </button>
            ))}
          </div>
        )}

        <div className="nav-actions">
          {checkoutStep === 'shop' && (
            <button className="icon-button search-trigger" onClick={() => setSearchOpen(!searchOpen)} aria-label="Search products" aria-expanded={searchOpen}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>
            </button>
          )}
          <button className="currency-button" onClick={() => setCurrency(currency === 'NGN' ? 'USD' : 'NGN')} aria-label={`Prices shown in ${currency}`}>
            {currency}
          </button>
          <button className={`icon-button cart-trigger ${cartAnimated ? 'cart-pop-animation' : ''}`} onClick={() => setCartOpen(true)} aria-label={`Open cart, ${cartItemCount} items`}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></svg>
            <span className="cart-count">{cartItemCount}</span>
          </button>
          {checkoutStep === 'shop' && (
            <button className="menu-button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Open menu" aria-expanded={mobileMenuOpen}>
              <span/><span/>
            </button>
          )}
        </div>
      </div>

      {searchOpen && checkoutStep === 'shop' && (
        <div className="search-panel">
          <div className="container search-panel-inner">
            <label htmlFor="site-search">Search the collection</label>
            <input id="site-search" autoFocus value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Type a product name…" />
            <button onClick={() => { setSearchQuery(''); setSearchOpen(false); }} aria-label="Close search">Close</button>
          </div>
        </div>
      )}

      {mobileMenuOpen && checkoutStep === 'shop' && (
        <div className="mobile-menu">
          <div className="mobile-menu-links">
            {['All', ...categories].map((category, index) => (
              <button key={category} onClick={() => navigateTo(category)}><span>0{index + 1}</span>{category === 'All' ? 'Shop all' : category}</button>
            ))}
          </div>
          <div className="mobile-menu-footer"><span>Lagos, Nigeria</span><a href="https://instagram.com/yeenksluxe">Instagram ↗</a></div>
        </div>
      )}
    </nav>
  );
}
