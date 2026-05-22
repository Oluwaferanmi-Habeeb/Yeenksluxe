'use client';

import React, { useState, useMemo } from 'react';
import { products, Product } from '../data/products';

interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export default function Home() {
  // Storefront states
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'shop' | 'checkout' | 'success'>('shop');

  // Modal customization selection
  const [chosenSize, setChosenSize] = useState<string>('');
  const [chosenColor, setChosenColor] = useState<string>('');

  // Cinematic and Dossier states
  const [isCinematicOpen, setIsCinematicOpen] = useState(false);
  const [activeDossierTab, setActiveDossierTab] = useState<'info' | 'fit' | 'specs'>('info');
  
  // Fit Finder Calculator state
  const [fitHeight, setFitHeight] = useState('');
  const [fitWeight, setFitWeight] = useState('');

  // Checkout form state
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    notes: ''
  });

  // Calculate cart metrics
  const cartItemCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const cartSubtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  }, [cart]);

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Quick View helper
  const openQuickView = (product: Product) => {
    setSelectedProduct(product);
    setChosenSize(product.sizes ? product.sizes[0] : 'One Size');
    setChosenColor(product.colors ? product.colors[0] : '');
    setActiveDossierTab('info');
    setFitHeight('');
    setFitWeight('');
  };

  // Add to cart helper
  const addToCart = (product: Product, size: string, color: string, qty = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => 
          item.product.id === product.id && 
          item.selectedSize === size && 
          item.selectedColor === color
      );

      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += qty;
        return newCart;
      } else {
        return [...prevCart, { product, quantity: qty, selectedSize: size, selectedColor: color }];
      }
    });

    // Automatically trigger cart drawer slide-in for micro-animation feedback
    setCartOpen(true);
  };

  // Update item quantity in cart
  const updateCartQty = (index: number, delta: number) => {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      const newQty = newCart[index].quantity + delta;
      
      if (newQty <= 0) {
        newCart.splice(index, 1);
      } else {
        newCart[index].quantity = newQty;
      }
      return newCart;
    });
  };

  // Remove item completely
  const removeCartItem = (index: number) => {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      newCart.splice(index, 1);
      return newCart;
    });
  };

  // Handle placing order and generating WhatsApp link
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutForm.name || !checkoutForm.phone || !checkoutForm.address) {
      alert('Please fill out all required shipping fields.');
      return;
    }
    setCheckoutStep('success');
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return '₦' + amount.toLocaleString('en-NG');
  };

  // WhatsApp Redirect text generator
  const getWhatsAppLink = () => {
    const phoneNum = '2349033364994'; // Store contact info
    const orderLines = cart.map(
      (item) => `- ${item.product.name} (Qty: ${item.quantity}, Size: ${item.selectedSize}${item.selectedColor ? `, Color: ${item.selectedColor}` : ''})`
    ).join('\n');

    const message = `Hello YEENKSLUXE,\n\nI would like to place an order:\n\n*Order Details:*\n${orderLines}\n\n*Total:* ${formatCurrency(cartSubtotal)}\n\n*Customer Info:*\n- Name: ${checkoutForm.name}\n- Phone: ${checkoutForm.phone}\n- Delivery Address: ${checkoutForm.address}, ${checkoutForm.city}\n- Notes: ${checkoutForm.notes || 'None'}\n\nPlease confirm availability and payment details. Thank you!`;
    
    return `https://wa.me/${phoneNum}?text=${encodeURIComponent(message)}`;
  };

  const scrollToShop = () => {
    const el = document.getElementById('shop-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-container">
      {/* HEADER NAVBAR */}
      <nav className="navbar">
        <div className="container navbar-inner">
          <div className="logo" onClick={() => { setCheckoutStep('shop'); setSelectedCategory('All'); }} style={{ cursor: 'pointer' }}>
            YEENKS<span>LUXE</span>
          </div>

          {checkoutStep === 'shop' && (
            <div className="nav-links">
              {['All', 'Shoes', 'Shirts', 'Hats', 'Accessories'].map((cat) => (
                <div
                  key={cat}
                  className={`nav-link ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedCategory(cat);
                    scrollToShop();
                  }}
                >
                  {cat}
                </div>
              ))}
            </div>
          )}

          <div className="nav-actions">
            {checkoutStep === 'shop' && (
              <div className="search-bar-container">
                <input
                  type="text"
                  placeholder="SEARCH..."
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg className="search-icon" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
            )}

            <button className="cart-trigger" onClick={() => setCartOpen(true)} aria-label="Open Cart">
              <svg className="cart-icon-svg" viewBox="0 0 24 24">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
            </button>
          </div>
        </div>
      </nav>

      <div className="main-content">
        {/* VIEW 1: SHOP / STOREFRONT */}
        {checkoutStep === 'shop' && (
          <>
            {/* HERO COMPOSITION — Immersive Full-Screen Campaign Visual */}
            <header className="hero">
              <div className="hero-bg-media">
                <img src="/images/hero_campaign.png" alt="YEENKSLUXE SS26 Campaign" className="hero-bg-image" />
                <div className="hero-vignette"></div>
              </div>

              {/* Shoppable Hotspots */}
              <div className="hero-hotspots-layer">
                {/* Hotspot 1: Campaign Tee */}
                <div className="hero-hotspot" style={{ top: '42%', left: '48%' }}>
                  <div className="hotspot-pin"></div>
                  <div className="hotspot-tooltip">
                    <span className="hotspot-tooltip-cat">Shirts</span>
                    <span className="hotspot-tooltip-name">Editorial Campaign Tee</span>
                    <span className="hotspot-tooltip-price">₦95,000</span>
                    <button 
                      className="hotspot-tooltip-btn" 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        const prod = products.find(p => p.id === 'shirt-3'); 
                        if (prod) openQuickView(prod); 
                      }}
                    >
                      QUICK VIEW
                    </button>
                  </div>
                </div>

                {/* Hotspot 2: Chrome Sneakers */}
                <div className="hero-hotspot" style={{ top: '78%', left: '47%' }}>
                  <div className="hotspot-pin"></div>
                  <div className="hotspot-tooltip">
                    <span className="hotspot-tooltip-cat">Shoes</span>
                    <span className="hotspot-tooltip-name">Chrome Luxury Sneakers</span>
                    <span className="hotspot-tooltip-price">₦155,000</span>
                    <button 
                      className="hotspot-tooltip-btn" 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        const prod = products.find(p => p.id === 'shoe-1'); 
                        if (prod) openQuickView(prod); 
                      }}
                    >
                      QUICK VIEW
                    </button>
                  </div>
                </div>
              </div>

              {/* Overlay Content */}
              <div className="hero-overlay-content container">
                <div className="hero-brand-card">
                  <span className="hero-eyebrow">SYSTEM 01 / SS26</span>
                  <h1 className="hero-title">YEENKSLUXE</h1>
                  <p className="hero-subtitle">
                    Form. Material. Purpose. Elevating raw street aesthetics into modern structural silhouettes. Built for those who move in silence.
                  </p>
                  <div className="hero-cta-group">
                    <button className="hero-cta-btn" onClick={scrollToShop}>
                      SHOP THE LOOKS
                    </button>
                    <button className="hero-reel-btn" onClick={() => setIsCinematicOpen(true)}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                      WATCH REEL
                    </button>
                  </div>
                </div>

                <div className="hero-meta-grid">
                  <div className="hero-meta-cell">
                    <span className="meta-label">Season</span>
                    <span className="meta-value">System 01 / SS26</span>
                  </div>
                  <div className="hero-meta-cell">
                    <span className="meta-label">Origin</span>
                    <span className="meta-value">Lagos / Milan</span>
                  </div>
                  <div className="hero-meta-cell">
                    <span className="meta-label">Release</span>
                    <span className="meta-value">Limited Drop</span>
                  </div>
                </div>
              </div>

              <div className="hero-scroll-indicator" onClick={scrollToShop} style={{ cursor: 'pointer' }}>
                <span>Scroll</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M19 12l-7 7-7-7" />
                </svg>
              </div>
            </header>

            {/* FEATURED PRODUCT HIGHLIGHT */}
            <section className="featured-section">
              <div className="container">
                <div className="featured-inner">
                  <div className="featured-image">
                    <img src="/images/sneakers_spotlight.png" alt="Featured Chrome Luxury Sneakers" />
                  </div>
                  <div className="featured-info">
                    <span className="featured-badge">NEW SEASON HERO</span>
                    <h2 className="featured-name">Chrome Luxury Sneakers</h2>
                    <p className="featured-price">₦155,000</p>
                    <p className="featured-description">
                      Elite luxury sneakers featuring signature gold chrome eyelets and top-grade Italian calfskin leather. Crafted for elevated street style, with a cushioned contour midsole for peak daily comfort.
                    </p>
                    
                    <div className="featured-spec-sheet">
                      <div className="spec-row">
                        <span className="spec-label">Product Class</span>
                        <span className="spec-value">Luxury Street Footwear</span>
                      </div>
                      <div className="spec-row">
                        <span className="spec-label">Origin</span>
                        <span className="spec-value">Handcrafted in Italy</span>
                      </div>
                      <div className="spec-row">
                        <span className="spec-label">Materials</span>
                        <span className="spec-value">Italian Calfskin & Chrome Plated Brass</span>
                      </div>
                      <div className="spec-row">
                        <span className="spec-label">Sole Unit</span>
                        <span className="spec-value">Cushioned Midsole / Heavy Lug Rubber</span>
                      </div>
                      <div className="spec-row">
                        <span className="spec-label">Edition Size</span>
                        <span className="spec-value">100 Pieces Worldwide</span>
                      </div>
                    </div>

                    <button 
                      className="featured-cta"
                      onClick={() => {
                        const prod = products.find(p => p.id === 'shoe-1');
                        if (prod) openQuickView(prod);
                      }}
                    >
                      QUICK VIEW
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* CATALOG SECTION */}
            <section className="shop-section" id="shop-catalog">
              <div className="container">
                <div className="shop-header">
                  <div className="shop-title-area">
                    <span className="section-eyebrow">OUR SELECTIONS</span>
                    <h2 className="section-title">THE LOOKBOOK</h2>
                  </div>

                  <div className="shop-all-link" onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}>
                    <span>View All</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                <div className="category-filters">
                  {['All', 'Shoes', 'Shirts', 'Hats', 'Accessories'].map((cat) => (
                    <button
                      key={cat}
                      className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {filteredProducts.length === 0 ? (
                  <div className="no-results">
                    No products matches your selection. Try browsing another category.
                  </div>
                ) : (
                  <div className="product-grid">
                    {filteredProducts.map((product, idx) => (
                      <React.Fragment key={product.id}>
                        {idx === 1 && (
                          <div className="manifesto-card">
                            <div className="manifesto-watermark">YNKS</div>
                            <p className="manifesto-text">
                              "We do not build for the masses. We build for the ones who move in silence, defined by form, material, and purpose."
                            </p>
                            <span className="manifesto-author">YEENKSLUXE Manifesto</span>
                          </div>
                        )}
                        <div className="product-card" onClick={() => openQuickView(product)}>
                          <div className="card-img-wrapper">
                            {product.badge && (
                              <span className={`product-badge ${product.badge === 'Sale' ? 'badge-sale' : ''}`}>
                                {product.badge}
                              </span>
                            )}
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              className="card-img" 
                              loading="lazy"
                            />
                            <div className="card-overlay">
                              <button className="quick-view-btn" onClick={(e) => { e.stopPropagation(); openQuickView(product); }}>
                                QUICK VIEW
                              </button>
                            </div>
                          </div>

                          <div className="card-info">
                            <div>
                              <span className="product-category">{product.category}</span>
                              <h3 className="product-name">{product.name}</h3>
                            </div>
                            
                            <div className="card-footer">
                              <span className="product-price">{formatCurrency(product.price)}</span>
                            </div>
                          </div>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* EDITORIAL LIFESTYLE PANELS */}
            <section className="editorial-section">
              <div className="editorial-grid">
                <div className="editorial-panel" onClick={() => { setSelectedCategory('Shirts'); scrollToShop(); }}>
                  <img src="/images/WhatsApp Image 2026-05-12 at 11.02.55 AM.jpeg" alt="New Arrivals Apparel" />
                  <div className="editorial-panel-overlay"></div>
                  <div className="editorial-caption">
                    <h3>NEW STREETWEAR ARRIVALS</h3>
                    <p>Heavyweight hoodies, campaign tees & restocks landing weekly</p>
                    <span className="editorial-btn">EXPLORE</span>
                  </div>
                </div>
                <div className="editorial-panel" onClick={() => { setSelectedCategory('Shoes'); scrollToShop(); }}>
                  <img src="/images/WhatsApp Image 2026-05-12 at 10.30.44 AM.jpeg" alt="Footwear Collection" />
                  <div className="editorial-panel-overlay"></div>
                  <div className="editorial-caption">
                    <h3>PREMIUM FOOTWEAR</h3>
                    <p>Luxury slides, calfskin sneakers & Monolith loafers designed for standout looks</p>
                    <span className="editorial-btn">EXPLORE</span>
                  </div>
                </div>
              </div>
            </section>

            {/* BRAND STORY STRIP */}
            <section className="brand-strip">
              <div className="brand-strip-content container">
                <p className="brand-strip-tagline">PREMIUM STREETWEAR. WORN BY THE BOLD.</p>
                <div className="brand-strip-socials">
                  <a href="https://instagram.com/yeenksluxe" target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
                  <a href="https://twitter.com/yeenksluxe" target="_blank" rel="noopener noreferrer">TWITTER</a>
                  <a href="https://tiktok.com/@yeenksluxe" target="_blank" rel="noopener noreferrer">TIKTOK</a>
                </div>
              </div>
            </section>

            {/* MEMBERSHIP DRAWERS */}
            <section className="membership-section">
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
          </>
        )}

        {/* VIEW 2: CHECKOUT PAGE */}
        {checkoutStep === 'checkout' && (
          <div className="container">
            <div className="checkout-container">
              {/* Delivery Details Form */}
              <div className="checkout-form-panel">
                <div>
                  <h2 className="checkout-step-title">DELIVERY DETAILS</h2>
                  <form onSubmit={handlePlaceOrder} className="form-grid">
                    <div className="form-field form-group-full">
                      <label className="form-label">Full Name *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="John Doe" 
                        className="form-input"
                        value={checkoutForm.name}
                        onChange={(e) => setCheckoutForm({...checkoutForm, name: e.target.value})}
                      />
                    </div>
                    
                    <div className="form-field">
                      <label className="form-label">Email Address *</label>
                      <input 
                        type="email" 
                        required 
                        placeholder="john@example.com" 
                        className="form-input"
                        value={checkoutForm.email}
                        onChange={(e) => setCheckoutForm({...checkoutForm, email: e.target.value})}
                      />
                    </div>

                    <div className="form-field">
                      <label className="form-label">Phone Number *</label>
                      <input 
                        type="tel" 
                        required 
                        placeholder="e.g. +234 903 336 4994" 
                        className="form-input"
                        value={checkoutForm.phone}
                        onChange={(e) => setCheckoutForm({...checkoutForm, phone: e.target.value})}
                      />
                    </div>

                    <div className="form-field form-group-full">
                      <label className="form-label">Delivery Address *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="Apartment, Street Name, Area" 
                        className="form-input"
                        value={checkoutForm.address}
                        onChange={(e) => setCheckoutForm({...checkoutForm, address: e.target.value})}
                      />
                    </div>

                    <div className="form-field form-group-full">
                      <label className="form-label">City / State *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="Lagos, Ikeja" 
                        className="form-input"
                        value={checkoutForm.city}
                        onChange={(e) => setCheckoutForm({...checkoutForm, city: e.target.value})}
                      />
                    </div>

                    <div className="form-field form-group-full">
                      <label className="form-label">Order Notes (Optional)</label>
                      <textarea 
                        rows={3} 
                        placeholder="Specific delivery times, size preferences, etc." 
                        className="form-input"
                        value={checkoutForm.notes}
                        onChange={(e) => setCheckoutForm({...checkoutForm, notes: e.target.value})}
                        style={{ resize: 'vertical' }}
                      />
                    </div>

                    <div className="form-group-full" style={{ marginTop: '1.5rem' }}>
                      <button type="submit" className="place-order-btn">
                        PLACE ORDER ON WHATSAPP
                      </button>
                      <button 
                        type="button" 
                        className="home-btn" 
                        onClick={() => setCheckoutStep('shop')}
                        style={{ width: '100%', marginTop: '0.75rem' }}
                      >
                        BACK TO STORE
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Summary panel */}
              <div className="checkout-order-summary">
                <h3 className="summary-title">ORDER SUMMARY</h3>
                <div className="summary-divider"></div>
                <div className="summary-items">
                  {cart.map((item, index) => (
                    <div key={index} className="summary-item-row" style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                        <span style={{ color: 'white' }}>{item.product.name}</span>
                        <span>{formatCurrency(item.product.price * item.quantity)}</span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Qty: {item.quantity} | Size: {item.selectedSize} {item.selectedColor && `| Color: ${item.selectedColor}`}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="summary-divider" style={{ margin: '1rem 0' }}></div>
                
                <div className="summary-item-row">
                  <span>Subtotal</span>
                  <span>{formatCurrency(cartSubtotal)}</span>
                </div>
                <div className="summary-item-row">
                  <span>Shipping</span>
                  <span style={{ color: 'var(--accent)', fontWeight: 600 }}>FREE DELIVERY</span>
                </div>
                
                <div className="summary-divider" style={{ margin: '1rem 0' }}></div>
                
                <div className="summary-total-row">
                  <span>Total</span>
                  <span>{formatCurrency(cartSubtotal)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: SUCCESS PAGE */}
        {checkoutStep === 'success' && (
          <div className="container">
            <div className="success-card">
              <div className="success-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <h2 className="success-title">ORDER INITIALIZED</h2>
              
              <p className="success-message">
                Thank you for shopping with <strong>YEENKSLUXE</strong>. Your order summary has been generated. To complete your delivery payment and finalize the order, click the button below to connect with us on WhatsApp.
              </p>

              <div className="success-meta">
                TOTAL AMOUNT: {formatCurrency(cartSubtotal)}
              </div>

              <a 
                href={getWhatsAppLink()} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="whatsapp-btn"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.453L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.449 5.4 0 9.794-4.392 9.797-9.793.001-2.618-1.01-5.08-2.848-6.92C16.328 2.05 13.872 1.04 11.266 1.04c-5.4 0-9.794 4.393-9.797 9.794-.001 1.704.453 3.328 1.347 4.79L1.83 20.6l5.033-1.316-1.216-.13z" />
                </svg>
                SEND ORDER ON WHATSAPP
              </a>

              <button 
                className="home-btn" 
                onClick={() => {
                  setCart([]);
                  setCheckoutStep('shop');
                }}
                style={{ width: '100%' }}
              >
                RETURN TO HOMEPAGE
              </button>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <div className="footer-brand">
              <h3 className="footer-logo">YEENKS<span>LUXE</span></h3>
              <p className="footer-description">
                The ultimate destination for premium urban fashion, high-end sneakers, slides, and luxury streetwear aesthetics.
              </p>
            </div>

            <div className="footer-links-col">
              <h4 className="footer-col-title">COLLECTIONS</h4>
              <div className="footer-links">
                <a href="#" onClick={(e) => { e.preventDefault(); setSelectedCategory('Shoes'); setCheckoutStep('shop'); scrollToShop(); }}>SHOES</a>
                <a href="#" onClick={(e) => { e.preventDefault(); setSelectedCategory('Shirts'); setCheckoutStep('shop'); scrollToShop(); }}>SHIRTS</a>
                <a href="#" onClick={(e) => { e.preventDefault(); setSelectedCategory('Hats'); setCheckoutStep('shop'); scrollToShop(); }}>HATS</a>
                <a href="#" onClick={(e) => { e.preventDefault(); setSelectedCategory('Accessories'); setCheckoutStep('shop'); scrollToShop(); }}>ACCESSORIES</a>
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
                  <a href="https://wa.me/2349033364994" target="_blank" rel="noopener noreferrer">
                    +234 903 336 4994
                  </a>
                </p>
                <p>Lagos, Nigeria</p>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} YEENKSLUXE. All Rights Reserved.</p>
            <div className="social-links">
              <a href="https://instagram.com/yeenksluxe" target="_blank" rel="noopener noreferrer" className="social-link">INSTAGRAM</a>
              <a href="https://twitter.com/yeenksluxe" target="_blank" rel="noopener noreferrer" className="social-link">TWITTER</a>
              <a href="https://tiktok.com/@yeenksluxe" target="_blank" rel="noopener noreferrer" className="social-link">TIKTOK</a>
            </div>
          </div>
          <div className="footer-watermark">
            YEENKSLUXE
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON */}
      <a href="https://wa.me/2349033364994" target="_blank" rel="noopener noreferrer" className="whatsapp-float" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.453L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.449 5.4 0 9.794-4.392 9.797-9.793.001-2.618-1.01-5.08-2.848-6.92C16.328 2.05 13.872 1.04 11.266 1.04c-5.4 0-9.794 4.393-9.797 9.794-.001 1.704.453 3.328 1.347 4.79L1.83 20.6l5.033-1.316-1.216-.13z" />
        </svg>
      </a>

      {/* SHOPPING CART DRAWER SLIDE-OUT */}
      {cartOpen && (
        <>
          <div className="cart-drawer-backdrop" onClick={() => setCartOpen(false)}></div>
          <div className="cart-drawer">
            <div className="cart-header">
              <h3 className="cart-title">YOUR CART</h3>
              <button className="close-cart-btn" onClick={() => setCartOpen(false)} aria-label="Close Cart">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="cart-items-container">
              {cart.length === 0 ? (
                <div className="empty-cart-message">
                  <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  <span>YOUR SHOPPING CART IS EMPTY</span>
                </div>
              ) : (
                cart.map((item, index) => (
                  <div key={index} className="cart-item">
                    <img src={item.product.image} alt={item.product.name} className="cart-item-img" />
                    <div className="cart-item-details">
                      <h4 className="cart-item-name">{item.product.name}</h4>
                      <span className="cart-item-meta">
                        Size: {item.selectedSize} {item.selectedColor && `| Color: ${item.selectedColor}`}
                      </span>
                      <span className="cart-item-price">{formatCurrency(item.product.price)}</span>
                      
                      <div className="cart-item-controls">
                        <div className="quantity-selector">
                          <button className="qty-btn" onClick={() => updateCartQty(index, -1)}>-</button>
                          <span className="qty-val">{item.quantity}</span>
                          <button className="qty-btn" onClick={() => updateCartQty(index, 1)}>+</button>
                        </div>
                        <button className="remove-item-btn" onClick={() => removeCartItem(index)}>REMOVE</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="cart-footer">
                <div className="cart-summary-row">
                  <span>Shipping</span>
                  <span style={{ color: 'var(--accent)', fontWeight: 600 }}>FREE DELIVERY</span>
                </div>
                <div className="cart-summary-row">
                  <span>Subtotal</span>
                  <span className="cart-summary-total">{formatCurrency(cartSubtotal)}</span>
                </div>
                <button 
                  className="checkout-btn" 
                  onClick={() => {
                    setCartOpen(false);
                    setCheckoutStep('checkout');
                  }}
                >
                  SECURE CHECKOUT
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* QUICK VIEW PRODUCT DETAIL MODAL */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => { setSelectedProduct(null); setActiveDossierTab('info'); }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => { setSelectedProduct(null); setActiveDossierTab('info'); }} aria-label="Close modal">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="modal-gallery">
              {selectedProduct.video ? (
                <video 
                  src={selectedProduct.video} 
                  autoPlay 
                  loop 
                  muted 
                  controls 
                  playsInline 
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              ) : (
                <img src={selectedProduct.image} alt={selectedProduct.name} />
              )}
            </div>

            <div className="modal-details">
              <span className="modal-category">{selectedProduct.category}</span>
              <h2 className="modal-title">{selectedProduct.name}</h2>
              <span className="modal-price">{formatCurrency(selectedProduct.price)}</span>
              
              <div className="modal-divider"></div>

              {/* Dossier Tabs */}
              <div className="dossier-tabs">
                <button 
                  className={`dossier-tab-btn ${activeDossierTab === 'info' ? 'active' : ''}`}
                  onClick={() => setActiveDossierTab('info')}
                >
                  INFO
                </button>
                <button 
                  className={`dossier-tab-btn ${activeDossierTab === 'fit' ? 'active' : ''}`}
                  onClick={() => setActiveDossierTab('fit')}
                >
                  FIT FINDER
                </button>
                <button 
                  className={`dossier-tab-btn ${activeDossierTab === 'specs' ? 'active' : ''}`}
                  onClick={() => setActiveDossierTab('specs')}
                >
                  FABRIC & SIZE
                </button>
              </div>
              
              <div className="dossier-tab-content">
                {activeDossierTab === 'info' && (
                  <div className="tab-pane-fade">
                    <p className="modal-description">{selectedProduct.description}</p>
                    
                    {/* Size Selector */}
                    {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
                      <div style={{ marginTop: '1.25rem' }}>
                        <h4 className="selector-title">SELECT SIZE</h4>
                        <div className="size-grid">
                          {selectedProduct.sizes.map((sz) => (
                            <button
                              key={sz}
                              className={`size-btn ${chosenSize === sz ? 'active' : ''}`}
                              onClick={() => setChosenSize(sz)}
                            >
                              {sz}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Color Selector */}
                    {selectedProduct.colors && selectedProduct.colors.length > 0 && (
                      <div style={{ marginTop: '1.25rem' }}>
                        <h4 className="selector-title">SELECT COLOR</h4>
                        <div className="color-options">
                          {selectedProduct.colors.map((colorHex) => (
                            <button
                              key={colorHex}
                              className={`color-dot ${chosenColor === colorHex ? 'active' : ''}`}
                              style={{ backgroundColor: colorHex }}
                              onClick={() => setChosenColor(colorHex)}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeDossierTab === 'fit' && (
                  <div className="tab-pane-fade fit-finder-container">
                    <h3 className="fit-finder-title">STREETWEAR FIT FINDER</h3>
                    <p className="fit-finder-desc">
                      Streetwear fits vary by design. Enter your measurements below to get a recommended size for this specific item.
                    </p>
                    
                    <div className="fit-finder-form">
                      <div className="fit-input-field">
                        <label>Your Height (cm)</label>
                        <input 
                          type="number" 
                          placeholder="e.g. 175" 
                          value={fitHeight}
                          onChange={(e) => setFitHeight(e.target.value)} 
                        />
                      </div>
                      <div className="fit-input-field">
                        <label>Your Weight (kg)</label>
                        <input 
                          type="number" 
                          placeholder="e.g. 75" 
                          value={fitWeight}
                          onChange={(e) => setFitWeight(e.target.value)} 
                        />
                      </div>
                    </div>

                    <div className="fit-finder-result">
                      {(() => {
                        const h = parseFloat(fitHeight);
                        const w = parseFloat(fitWeight);
                        if (!h || !w) return <span className="result-prompt">Enter measurements to calculate custom recommendation.</span>;
                        
                        if (selectedProduct.category === 'Shoes') {
                          return (
                            <div>
                              <span className="result-size">TRUE TO SIZE</span>
                              <p className="result-reason">This footwear fits true to standard dimensions. We recommend choosing your standard size.</p>
                            </div>
                          );
                        }
                        
                        if (selectedProduct.category === 'Shirts') {
                          let rec = 'M';
                          if (h < 170 && w < 65) rec = 'S';
                          else if (h < 178 && w < 78) rec = 'M';
                          else if (h < 185 && w < 90) rec = 'L';
                          else if (h >= 185 || w >= 90) rec = 'XL';
                          if (w > 85 && rec !== 'XL') rec = 'XL';
                          
                          return (
                            <div>
                              <span className="result-size">RECOMMENDED: {rec}</span>
                              <p className="result-reason">Calculated for our signature boxy drop-shoulder cut. Order size {rec} for the intended fit.</p>
                            </div>
                          );
                        }

                        return (
                          <div>
                            <span className="result-size">ONE SIZE</span>
                            <p className="result-reason">This accessory is designed to fit all profiles with adjustable canvas strap.</p>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                )}

                {activeDossierTab === 'specs' && (
                  <div className="tab-pane-fade specs-container">
                    <div className="specs-section">
                      <h4 className="specs-title-sub">FABRIC PROFILE</h4>
                      <ul className="specs-list">
                        <li><strong>Fabric:</strong> {selectedProduct.category === 'Shirts' ? '100% Organic Heavyweight Cotton (280GSM)' : selectedProduct.category === 'Shoes' ? 'Italian Calfskin Leather / Suede Blend' : 'Heavy-Duty Technical Canvas'}</li>
                        <li><strong>Weave:</strong> Loopback pre-shrunk luxury weave</li>
                        <li><strong>Origin:</strong> Crafted in Lagos / Milan</li>
                        <li><strong>Graphics:</strong> Custom eco-friendly high-density screenprint</li>
                      </ul>
                    </div>
                    
                    <div className="specs-section" style={{ marginTop: '1.25rem' }}>
                      <h4 className="specs-title-sub">FIT RATINGS</h4>
                      <div className="fit-ratings">
                        <div className="rating-row">
                          <span>Fit Style:</span>
                          <span style={{ color: 'white', fontWeight: 600 }}>{selectedProduct.category === 'Shirts' ? 'Boxy / Oversized' : 'True to Size'}</span>
                        </div>
                        <div className="rating-row">
                          <span>Stitch Work:</span>
                          <span style={{ color: 'white', fontWeight: 600 }}>Reinforced Double Needle Stitching</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="modal-divider"></div>

              <div className="modal-actions">
                <button 
                  className="add-to-cart-btn"
                  onClick={() => {
                    addToCart(selectedProduct, chosenSize, chosenColor);
                    setSelectedProduct(null);
                    setActiveDossierTab('info');
                  }}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CINEMATIC CAMPAIGN REEL MODAL */}
      {isCinematicOpen && (
        <div className="cinematic-overlay" onClick={() => setIsCinematicOpen(false)}>
          <button className="close-cinematic-btn" onClick={() => setIsCinematicOpen(false)} aria-label="Close cinematic reel">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <div className="cinematic-video-wrapper" onClick={(e) => e.stopPropagation()}>
            <video 
              src="/images/WhatsApp Video 2026-05-12 at 10.35.08 AM.mp4" 
              autoPlay 
              loop 
              controls 
              playsInline
            />
          </div>
        </div>
      )}
    </div>
  );
}
