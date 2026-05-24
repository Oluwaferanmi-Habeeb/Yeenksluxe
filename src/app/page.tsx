'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Script from 'next/script';
import { products, Product, categories } from '../data/products';
import { getShopifyCheckoutUrl } from '../utils/shopify';

interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

const heroSlides = [
  {
    image: "/images/snaptik_7625367276497292565_0_v2.jpeg",
    eyebrow: "SS26 PRE-RELEASE COLLECTION",
    title: "YEENKSLUXE APPAREL",
    subtitle: "Where streetwear meets luxury. Designed for those who move different.",
  },
  {
    image: "/images/snaptik_7621552137285192981_0_v2.jpeg",
    eyebrow: "EXHIBIT 02 / CAMPAIGN",
    title: "RAW SILHOUETTES",
    subtitle: "Heavyweight garments structured for modern daily movement. Engineered in Lagos.",
  },
  {
    image: "/images/snaptik_7625367276497292565_2_v2.jpeg",
    eyebrow: "EXHIBIT 03 / EDITORIAL",
    title: "STREET TAILORING",
    subtitle: "High-density embroidery, luxury hardware, and drop-shoulder forms that command attention.",
  }
];

const upperDisplaySlides = [
  {
    image: "/images/a3548e8a-a0bd-4271-ae46-c588155d8144.jpg",
    heading: "MADE FOR THE ONES WHO RUN THE CITY",
    sub: "untouchable. built to take over",
    btnText: "SECURE THE drip",
    category: "Hoodies",
    trans: "zoom"
  },
  {
    image: "/images/snaptik_7621552137285192981_2_v2.jpeg",
    heading: "DISTINCTIVE SILHOUETTES & SHAPES",
    sub: "designed for movement. crafted for luxury",
    btnText: "SHOP SHIRTS",
    category: "Shirts",
    trans: "slideLeft"
  },
  {
    image: "/images/snaptik_7625367276497292565_3_v2.jpeg",
    heading: "SS26 CAMPAIGN CAPS & ACCS",
    sub: "limited rotation. wear the difference",
    btnText: "SHOP HATS",
    category: "Hats",
    trans: "slideUp"
  }
];

export default function Home() {
  // Storefront states
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'shop' | 'checkout' | 'success'>('shop');
  const [paymentMethod, setPaymentMethod] = useState<'flutterwave' | 'shopify' | 'whatsapp'>('flutterwave');
  const [mounted, setMounted] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const [udIndex, setUdIndex] = useState(0);

  // Hero slideshow timer
  useEffect(() => {
    if (checkoutStep !== 'shop') return;
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [checkoutStep]);

  // Upper Display slider timer
  useEffect(() => {
    if (checkoutStep !== 'shop') return;
    const interval = setInterval(() => {
      setUdIndex((prev) => (prev + 1) % upperDisplaySlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [checkoutStep]);

  // Intersection Observer for scroll-driven viewport reveals
  useEffect(() => {
    if (checkoutStep !== 'shop') return;
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
            }
          });
        },
        { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
      );
      document.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }, 100);
    return () => clearTimeout(timer);
  }, [checkoutStep, selectedCategory, searchQuery]);

  // Modal customization selection
  const [chosenSize, setChosenSize] = useState<string>('');
  const [chosenColor, setChosenColor] = useState<string>('');

  // Dossier states
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

  // Load cart and theme on client mount
  useEffect(() => {
    setMounted(true);
    const savedCart = localStorage.getItem('ynks_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    }
    const savedTheme = localStorage.getItem('ynks_theme') as 'dark' | 'light';
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Sync theme changes to document html element
  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('ynks_theme', theme);
    }
  }, [theme, mounted]);

  // Sync cart changes to local storage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('ynks_cart', JSON.stringify(cart));
    }
  }, [cart, mounted]);

  // Calculate cart metrics
  const cartItemCount = useMemo(() => {
    if (!mounted) return 0;
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart, mounted]);

  const cartSubtotal = useMemo(() => {
    if (!mounted) return 0;
    return cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  }, [cart, mounted]);

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

    if (paymentMethod === 'whatsapp') {
      setCheckoutStep('success');
      const waLink = getWhatsAppLink();
      window.open(waLink, '_blank');
    } else if (paymentMethod === 'shopify') {
      const shopifyItems = cart.map(item => ({
        variantId: item.product.shopifyVariantId,
        quantity: item.quantity
      }));
      const checkoutUrl = getShopifyCheckoutUrl(shopifyItems);
      window.open(checkoutUrl, '_blank');
      setCheckoutStep('success');
    } else if (paymentMethod === 'flutterwave') {
      // Flutterwave Checkout Flow
      const FlutterwaveCheckout = (window as any).FlutterwaveCheckout;
      if (!FlutterwaveCheckout) {
        alert('Payment gateway script loading. Please try again in a moment.');
        return;
      }
      
      FlutterwaveCheckout({
        public_key: 'a8c75c71b8e2a69f5e6a877fce04b48b',
        tx_ref: 'YNKS-' + Math.floor(Math.random() * 1000000000 + 1),
        amount: cartSubtotal,
        currency: 'NGN',
        payment_options: 'card, banktransfer, ussd',
        customer: {
          email: checkoutForm.email || 'customer@yeenksluxe.com',
          phone_number: checkoutForm.phone,
          name: checkoutForm.name,
        },
        customizations: {
          title: 'YEENKSLUXE APPAREL',
          description: 'Payment for luxury streetwear garments',
          logo: window.location.origin + '/images/logoo.jpg',
        },
        callback: function(data: any){
          console.log("payment callback:", data);
          if (data.status === "successful" || data.status === "completed") {
            alert('Payment Successful! Transaction Reference: ' + (data.tx_ref || data.transaction_id));
            setCheckoutStep('success');
          } else {
            alert('Payment was not completed successfully. Status: ' + data.status);
          }
        },
        onclose: function(){
          alert('Transaction closed.');
        }
      });
    }
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
          <div className="logo-container" onClick={() => { setCheckoutStep('shop'); setSelectedCategory('All'); }} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="logo" style={{ position: 'relative', width: '54px', height: '54px', flexShrink: 0 }}>
              <Image 
                src="/images/logoo.jpg" 
                alt="YEENKSLUXE" 
                fill 
                priority 
                className="logo-img object-contain" 
                sizes="54px"
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-primary)', fontFamily: 'var(--font-display)', lineHeight: '1.1' }}>YEENKSLUXE</span>
              <span className="logo-tagline" style={{ marginTop: '0.15rem' }}>Where streetwear meets luxury. Designed for those who move different</span>
            </div>
          </div>

          {checkoutStep === 'shop' && (
            <div className="nav-links">
              {['All', ...categories].map((cat) => (
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

            {/* Custom B/W Theme Toggle */}
            <button 
              className="theme-toggle-btn" 
              onClick={() => setTheme((prev) => prev === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle Theme"
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                background: 'transparent',
                transition: 'var(--transition-fast)'
              }}
            >
              {theme === 'dark' ? (
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              ) : (
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
            </button>

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
      </nav>      <div className="main-content">
        {/* VIEW 1: SHOP / STOREFRONT */}
        {checkoutStep === 'shop' && (
          <>
            {/* HERO COMPOSITION - Immersive Full-Screen Campaign Visual */}
            <header className="hero">
              <div className="hero-bg-media">
                <div className="hero-slideshow">
                  {heroSlides.map((slide, idx) => (
                    <div 
                      key={idx} 
                      className={`hero-slide ${heroIndex === idx ? 'active' : ''}`}
                    >
                      <Image 
                        src={slide.image} 
                        alt={slide.title} 
                        fill 
                        priority={idx === 0} 
                        className="hero-bg-image object-cover" 
                        sizes="100vw" 
                      />
                    </div>
                  ))}
                </div>
                <div className="hero-vignette"></div>
              </div>

              {/* Overlay Content */}
              <div className="hero-overlay-content container">
                <div className="hero-brand-card">
                  <span className="hero-eyebrow">{heroSlides[heroIndex].eyebrow}</span>
                  <h1 className="hero-title">{heroSlides[heroIndex].title}</h1>
                  <p className="hero-subtitle">{heroSlides[heroIndex].subtitle}</p>
                  <div className="hero-cta-group">
                    <button className="hero-cta-btn" onClick={scrollToShop}>
                      SHOP THE LOOKS
                    </button>
                  </div>
                </div>

                <div className="hero-meta-grid">
                  <div className="hero-meta-cell">
                    <span className="meta-label">Season</span>
                    <span className="meta-value">SS26 Collection</span>
                  </div>
                  <div className="hero-meta-cell">
                    <span className="meta-label">Origin</span>
                    <span className="meta-value">Lagos, Nigeria</span>
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

            {/* UPPER DISPLAY SLIDER */}
            <section className="upper-display reveal-on-scroll" id="upperDisplay">
              <div className="upper-display-inner">
                {/* Text Side: displays the active slide's copy */}
                <div className="upper-display-text">
                  <h2 className="upper-display-heading">
                    {upperDisplaySlides[udIndex].heading}
                  </h2>
                  <p className="upper-display-sub">
                    {upperDisplaySlides[udIndex].sub}
                  </p>
                  <button 
                    className="upper-display-btn"
                    onClick={() => {
                      setSelectedCategory(upperDisplaySlides[udIndex].category);
                      scrollToShop();
                    }}
                  >
                    {upperDisplaySlides[udIndex].btnText}
                  </button>
                  
                  <div className="ud-dots">
                    {upperDisplaySlides.map((_, dotIdx) => (
                      <button 
                        key={dotIdx}
                        className={`ud-dot ${udIndex === dotIdx ? 'active' : ''}`}
                        onClick={() => setUdIndex(dotIdx)}
                        aria-label={`Go to slide ${dotIdx + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Image Side: all images stacked, active image transitions */}
                <div className="upper-display-imgstack">
                  {upperDisplaySlides.map((slide, imgIdx) => (
                    <Image 
                      key={imgIdx}
                      src={slide.image}
                      alt={slide.heading}
                      fill
                      priority={imgIdx === 0}
                      sizes="(max-width: 768px) 100vw, 460px"
                      className={`object-cover ud-trans-${slide.trans} ${udIndex === imgIdx ? 'ud-img-active' : ''}`}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* CATALOG SECTION */}
            <section className="shop-section reveal-on-scroll" id="shop-catalog">
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
                  {['All', ...categories].map((cat) => (
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
                        <div className="product-card" onClick={() => openQuickView(product)}>
                          <div className="card-img-wrapper" style={{ position: 'relative' }}>
                            {product.badge && (
                              <span className={`product-badge ${product.badge === 'Sale' ? 'badge-sale' : ''}`}>
                                {product.badge}
                              </span>
                            )}
                            <Image 
                              src={product.image} 
                              alt={product.name} 
                              fill
                              className="card-img card-img-primary object-cover" 
                              sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                            {product.gallery && product.gallery.length > 0 && (
                              <Image 
                                src={product.gallery[0]} 
                                alt={product.name} 
                                fill
                                className="card-img card-img-secondary object-cover" 
                                sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              />
                            )}
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
            <section className="editorial-section reveal-on-scroll">
              <div className="editorial-grid">
                <div className="editorial-panel" style={{ position: 'relative' }} onClick={() => { setSelectedCategory('Shirts'); scrollToShop(); }}>
                  <Image src="/images/snaptik_7625367276497292565_2_v2.jpeg" alt="New Arrivals Apparel" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                  <div className="editorial-panel-overlay"></div>
                  <div className="editorial-caption">
                    <h3>NEW STREETWEAR ARRIVALS</h3>
                    <p>Heavyweight hoodies, campaign tees & restocks landing weekly</p>
                    <span className="editorial-btn">EXPLORE</span>
                  </div>
                </div>
                <div className="editorial-panel" style={{ position: 'relative' }} onClick={() => { setSelectedCategory('Accessories'); scrollToShop(); }}>
                  <Image src="/images/snaptik_7621552137285192981_1_v2.jpeg" alt="Accessories Collection" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                  <div className="editorial-panel-overlay"></div>
                  <div className="editorial-caption">
                    <h3>CURATED ACCESSORIES</h3>
                    <p>Luxury beanies, tactical utility bags & premium calfskin leather belts</p>
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
                  <a href="https://instagram.com/yeenksluxe" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <svg viewBox="0 0 24 24">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                  <a href="https://twitter.com/yeenksluxe" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <svg viewBox="0 0 24 24">
                      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                    </svg>
                  </a>
                  <a href="https://tiktok.com/@yeenksluxe" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                    <svg viewBox="0 0 24 24">
                      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                    </svg>
                  </a>
                </div>
              </div>
            </section>

            {/* MEMBERSHIP DRAWERS */}
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

                    <div className="form-field form-group-full" style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>
                      <label className="form-label" style={{ display: 'block', marginBottom: '0.75rem' }}>Payment Gateway / Method *</label>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem' }}>
                        <div 
                          onClick={() => setPaymentMethod('flutterwave')}
                          style={{
                            border: `1px solid ${paymentMethod === 'flutterwave' ? 'var(--accent)' : 'var(--border-color)'}`,
                            padding: '1rem',
                            cursor: 'pointer',
                            background: paymentMethod === 'flutterwave' ? 'rgba(200, 169, 110, 0.05)' : 'var(--bg-tertiary)',
                            transition: 'all 0.3s ease',
                            textAlign: 'center'
                          }}
                        >
                          <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em', color: paymentMethod === 'flutterwave' ? 'white' : 'var(--text-secondary)' }}>NAIRA CHECKOUT</div>
                          <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--accent)', marginTop: '0.25rem' }}>Flutterwave</div>
                        </div>
                        <div 
                          onClick={() => setPaymentMethod('shopify')}
                          style={{
                            border: `1px solid ${paymentMethod === 'shopify' ? 'var(--accent)' : 'var(--border-color)'}`,
                            padding: '1rem',
                            cursor: 'pointer',
                            background: paymentMethod === 'shopify' ? 'rgba(200, 169, 110, 0.05)' : 'var(--bg-tertiary)',
                            transition: 'all 0.3s ease',
                            textAlign: 'center'
                          }}
                        >
                          <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em', color: paymentMethod === 'shopify' ? 'white' : 'var(--text-secondary)' }}>INTL CHECKOUT</div>
                          <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--accent)', marginTop: '0.25rem' }}>Shopify Checkout</div>
                        </div>
                        <div 
                          onClick={() => setPaymentMethod('whatsapp')}
                          style={{
                            border: `1px solid ${paymentMethod === 'whatsapp' ? 'var(--accent)' : 'var(--border-color)'}`,
                            padding: '1rem',
                            cursor: 'pointer',
                            background: paymentMethod === 'whatsapp' ? 'rgba(200, 169, 110, 0.05)' : 'var(--bg-tertiary)',
                            transition: 'all 0.3s ease',
                            textAlign: 'center'
                          }}
                        >
                          <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em', color: paymentMethod === 'whatsapp' ? 'white' : 'var(--text-secondary)' }}>VIP MANUAL</div>
                          <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--accent)', marginTop: '0.25rem' }}>WhatsApp Order</div>
                        </div>
                      </div>
                    </div>

                    <div className="form-group-full">
                      <button type="submit" className="place-order-btn">
                        {paymentMethod === 'flutterwave' && 'PAY SECURELY WITH FLUTTERWAVE'}
                        {paymentMethod === 'shopify' && 'PROCEED TO SHOPIFY CHECKOUT'}
                        {paymentMethod === 'whatsapp' && 'PLACE ORDER ON WHATSAPP'}
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

      {/* SPOTTED IN YĒĒNKSLUXÉ / COMMUNITY SHOWCASE */}
      <section className="community-showcase reveal-on-scroll" style={{ padding: '6rem 0', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="shop-header" style={{ marginBottom: '3.5rem' }}>
            <div className="shop-title-area">
              <span className="section-eyebrow">AS WORN BY THE BOLD</span>
              <h2 className="section-title">SPOTTED IN YĒĒNKSLUXÉ</h2>
            </div>
          </div>
          
          <div className="bento-grid">
            <div className="bento-item item-large">
              <div className="bento-img-wrapper" style={{ position: 'relative' }}>
                <Image src="/images/client_fit_1.jpg" alt="Client Fit 1" fill className="bento-img object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                <div className="bento-overlay">
                  <div className="bento-tag">
                    <span className="bento-tag-eyebrow">SPOTTED WEARING</span>
                    <span className="bento-tag-title">YĒĒNKSLUXÉ x STEEZY ‘26 Edition Graphic Tee</span>
                    <button className="bento-shop-btn" onClick={() => {
                      const p = products.find(prod => prod.id === 'shirt-1') || products[0];
                      openQuickView(p);
                    }}>SHOP LOOK</button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bento-item item-square">
              <div className="bento-img-wrapper" style={{ position: 'relative' }}>
                <Image src="/images/client_fit_2.jpg" alt="Client Fit 2" fill className="bento-img object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
                <div className="bento-overlay">
                  <div className="bento-tag">
                    <span className="bento-tag-eyebrow">SPOTTED WEARING</span>
                    <span className="bento-tag-title">YĒĒNKSLUXÉ x STEEZY ‘26 Edition Hoodie</span>
                    <button className="bento-shop-btn" onClick={() => {
                      const p = products.find(prod => prod.id === 'hoodie-1') || products[0];
                      openQuickView(p);
                    }}>SHOP LOOK</button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bento-item item-square">
              <div className="bento-img-wrapper" style={{ position: 'relative' }}>
                <Image src="/images/client_fit_3.jpg" alt="Client Fit 3" fill className="bento-img object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
                <div className="bento-overlay">
                  <div className="bento-tag">
                    <span className="bento-tag-eyebrow">SPOTTED WEARING</span>
                    <span className="bento-tag-title">YĒĒNKSLUXÉ x STEEZY ‘26 Edition Rhinestone Tee</span>
                    <button className="bento-shop-btn" onClick={() => {
                      const p = products.find(prod => prod.id === 'shirt-5') || products[0];
                      openQuickView(p);
                    }}>SHOP LOOK</button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bento-item item-tall">
              <div className="bento-img-wrapper" style={{ position: 'relative' }}>
                <Image src="/images/client_fit_4.jpeg" alt="Client Fit 4" fill className="bento-img object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
                <div className="bento-overlay">
                  <div className="bento-tag">
                    <span className="bento-tag-eyebrow">SPOTTED WEARING</span>
                    <span className="bento-tag-title">Urban Knit Beanie</span>
                    <button className="bento-shop-btn" onClick={() => {
                      const p = products.find(prod => prod.id === 'acc-2') || products[0];
                      openQuickView(p);
                    }}>SHOP LOOK</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOOKBOOK FILMSTRIP */}
      <section className="lookbook-filmstrip reveal-on-scroll" style={{ padding: '6rem 0' }}>
        <div className="filmstrip-header">
          <span className="section-eyebrow">DIGITAL LOOKBOOK</span>
          <h2 className="section-title">SS26 CAMPAIGN EDITORIALS</h2>
        </div>
        
        {/* Track 1: SS26 Editorials (Scrolls Left) */}
        <div className="filmstrip-container" style={{ marginBottom: '4rem' }}>
          <div className="filmstrip-track">
            {((arr) => [...arr, ...arr])(
              products.reduce<{ image: string; name: string }[]>((acc, p) => {
                if (!acc.some((item) => item.image === p.image)) {
                  acc.push({ image: p.image, name: p.name });
                }
                return acc;
              }, [])
            ).map((item, idx) => (
              <div className="filmstrip-item" key={idx}>
                <Image src={item.image} alt={item.name} fill className="filmstrip-image" sizes="260px" />
                <div className="filmstrip-caption">
                  <span className="filmstrip-caption-title">{item.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <div className="footer-brand">
              <div className="footer-logo-container" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div className="footer-logo" style={{ position: 'relative', width: '54px', height: '54px', flexShrink: 0 }}>
                  <Image 
                    src="/images/logoo.jpg" 
                    alt="YEENKSLUXE" 
                    fill 
                    className="logo-img object-contain" 
                    sizes="54px"
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-primary)', fontFamily: 'var(--font-display)', lineHeight: '1.1' }}>YEENKSLUXE</span>
                </div>
              </div>
              <p className="footer-description">
                Where streetwear meets luxury. Designed for those who move different.
              </p>
            </div>

            <div className="footer-links-col">
              <h4 className="footer-col-title">COLLECTIONS</h4>
              <div className="footer-links">
                <a href="#" onClick={(e) => { e.preventDefault(); setSelectedCategory('Shirts'); setCheckoutStep('shop'); scrollToShop(); }}>SHIRTS</a>
                <a href="#" onClick={(e) => { e.preventDefault(); setSelectedCategory('Hoodies'); setCheckoutStep('shop'); scrollToShop(); }}>HOODIES</a>
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
              <a href="https://instagram.com/yeenksluxe" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                <svg viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://twitter.com/yeenksluxe" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">
                <svg viewBox="0 0 24 24">
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                </svg>
              </a>
              <a href="https://tiktok.com/@yeenksluxe" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="TikTok">
                <svg viewBox="0 0 24 24">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
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
                    <div style={{ position: 'relative', width: '70px', height: '90px', flexShrink: 0 }}>
                      <Image src={item.product.image} alt={item.product.name} fill className="cart-item-img object-cover" sizes="70px" />
                    </div>
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
                <div style={{ position: 'relative', width: '100%', height: '440px' }}>
                  <Image src={selectedProduct.image} alt={selectedProduct.name} fill className="object-contain" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
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
                        

                        if (selectedProduct.category === 'Shirts' || selectedProduct.category === 'Hoodies') {
                          let rec = 'M';
                          if (h < 170 && w < 65) rec = 'S';
                          else if (h < 178 && w < 78) rec = 'M';
                          else if (h < 185 && w < 90) rec = 'L';
                          else if (h >= 185 || w >= 90) rec = 'XL';
                          if (w > 85 && rec !== 'XL') rec = 'XL';
                          if (w >= 98 && selectedProduct.sizes?.includes('XXL')) rec = 'XXL';
                          
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
                            <p className="result-reason">This item is designed as adjustable or one-size fit.</p>
                          </div>
                        );
                      })()}
                    </div>

                    {/* Sizing Chart Table */}
                    <div className="size-chart-table-wrapper">
                      <h4 className="specs-title-sub" style={{ fontSize: '0.65rem', letterSpacing: '0.12em', color: 'var(--text-secondary)' }}>SIZE CHART (INCHES)</h4>
                      <table className="size-chart-table">
                        <thead>
                          <tr>
                            <th>SIZE</th>
                            <th>CHEST</th>
                            <th>LENGTH</th>
                            <th>SHOULDER</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(() => {
                            if (selectedProduct.category === 'Shirts' || selectedProduct.category === 'Hoodies') {
                              const name = selectedProduct.name.toLowerCase();
                              const isSleeveless = name.includes('armless') || name.includes('tank') || name.includes('raw cut');
                              const isOuterwear = name.includes('hoodie') || name.includes('sweater') || name.includes('jacket') || name.includes('windbreaker') || name.includes('tracksuit');
                              
                              if (isSleeveless) {
                                return (
                                  <>
                                    <tr><td>S</td><td>38&quot;</td><td>26&quot;</td><td>SLEEVELESS</td></tr>
                                    <tr><td>M</td><td>40&quot;</td><td>27&quot;</td><td>SLEEVELESS</td></tr>
                                    <tr><td>L</td><td>42&quot;</td><td>28&quot;</td><td>SLEEVELESS</td></tr>
                                    <tr><td>XL</td><td>44&quot;</td><td>29&quot;</td><td>SLEEVELESS</td></tr>
                                  </>
                                );
                              } else if (isOuterwear) {
                                return (
                                  <>
                                    <tr><td>S</td><td>46&quot;</td><td>26.5&quot;</td><td>24&quot; (SLEEVE)</td></tr>
                                    <tr><td>M</td><td>48&quot;</td><td>27.5&quot;</td><td>25&quot; (SLEEVE)</td></tr>
                                    <tr><td>L</td><td>50&quot;</td><td>28.5&quot;</td><td>26&quot; (SLEEVE)</td></tr>
                                    <tr><td>XL</td><td>52&quot;</td><td>29.5&quot;</td><td>27&quot; (SLEEVE)</td></tr>
                                    {selectedProduct.sizes?.includes('XXL') && <tr><td>XXL</td><td>54&quot;</td><td>30.5&quot;</td><td>28&quot; (SLEEVE)</td></tr>}
                                  </>
                                );
                              } else {
                                return (
                                  <>
                                    <tr><td>S</td><td>44&quot;</td><td>27&quot;</td><td>20&quot; (DROP)</td></tr>
                                    <tr><td>M</td><td>46&quot;</td><td>28&quot;</td><td>21&quot; (DROP)</td></tr>
                                    <tr><td>L</td><td>48&quot;</td><td>29&quot;</td><td>22&quot; (DROP)</td></tr>
                                    <tr><td>XL</td><td>50&quot;</td><td>30&quot;</td><td>23&quot; (DROP)</td></tr>
                                    {selectedProduct.sizes?.includes('XXL') && <tr><td>XXL</td><td>52&quot;</td><td>31&quot;</td><td>24&quot; (DROP)</td></tr>}
                                  </>
                                );
                              }
                            }
                            return (
                              <tr>
                                <td colSpan={4} style={{ textAlign: 'center', padding: '1rem 0', color: 'var(--text-muted)' }}>
                                  ONE SIZE / ADJUSTABLE PROFILE
                                </td>
                              </tr>
                            );
                          })()}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeDossierTab === 'specs' && (
                  <div className="tab-pane-fade specs-container">
                    <div className="specs-section">
                      <h4 className="specs-title-sub">FABRIC PROFILE</h4>
                      <ul className="specs-list">
                         <li><strong>Fabric:</strong> {(selectedProduct.category === 'Shirts' || selectedProduct.category === 'Hoodies') ? '100% Organic Heavyweight Cotton (280GSM)' : 'Heavy-Duty Technical Canvas'}</li>
                        <li><strong>Weave:</strong> Loopback pre-shrunk luxury weave</li>
                        <li><strong>Origin:</strong> Crafted in Lagos</li>
                        <li><strong>Graphics:</strong> Custom eco-friendly high-density screenprint</li>
                      </ul>
                    </div>
                    
                    <div className="specs-section" style={{ marginTop: '1.25rem' }}>
                      <h4 className="specs-title-sub">FIT RATINGS</h4>
                      <div className="fit-ratings">
                        <div className="rating-row">
                          <span>Fit Style:</span>
                           <span style={{ color: 'white', fontWeight: 600 }}>{(selectedProduct.category === 'Shirts' || selectedProduct.category === 'Hoodies') ? 'Boxy / Oversized' : 'True to Size'}</span>
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

      {/* Flutterwave Inline SDK */}
      <Script 
        src="https://checkout.flutterwave.com/v3.js" 
        strategy="lazyOnload" 
      />
    </div>
  );
}
