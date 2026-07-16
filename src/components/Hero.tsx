'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useStore } from '../context/StoreContext';

const heroSlides = [
  { image: "/images/snaptik_7625367276497292565_0_v2.jpeg", eyebrow: "SS26 PRE-RELEASE COLLECTION", title: "YEENKSLUXE", subtitle: "Where streetwear meets luxury. Engineered in Lagos. Worn by the bold." },
  { image: "/images/snaptik_7621552137285192981_0_v2.jpeg", eyebrow: "EXHIBIT 02 / CAMPAIGN", title: "RAW SILHOUETTES", subtitle: "Heavyweight garments structured for modern daily movement. Premium craftsmanship." },
  { image: "/images/snaptik_7625367276497292565_2_v2.jpeg", eyebrow: "EXHIBIT 03 / EDITORIAL", title: "STREET TAILORING", subtitle: "High-density embroidery, luxury hardware, and drop-shoulder forms that command attention." }
];

export default function Hero() {
  const { heroIndex, setHeroIndex, scrollToShop } = useStore();
  const parallaxRef = useRef<HTMLDivElement>(null);

  // Parallax scroll effect with requestAnimationFrame throttling
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (parallaxRef.current) {
            const scrollY = window.scrollY;
            const heroHeight = window.innerHeight;
            if (scrollY <= heroHeight) {
              const progress = scrollY / heroHeight;
              parallaxRef.current.style.transform = `translateY(${progress * 30}px) scale(${1 + progress * 0.02})`;
              parallaxRef.current.style.filter = `brightness(${0.9 - progress * 0.15})`;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="hero">
      {/* Parallax background layer */}
      <div className="hero-parallax-layer" ref={parallaxRef}>
        <div className="hero-bg-media">
          <div className="hero-slideshow">
            {heroSlides.map((slide, idx) => (
              <div key={idx} className={`hero-slide ${heroIndex === idx ? 'active' : ''}`}>
                <Image src={slide.image} alt={slide.title} fill priority={idx === 0}
                  className="hero-bg-image" sizes="100vw" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Multi-layer vignette for depth */}
      <div className="hero-vignette"></div>
      <div className="hero-vignette-secondary"></div>

      {/* Content */}
      <div className="hero-overlay-content">
        <div className="hero-content-inner container">
          <div key={heroIndex} className="hero-brand-card animate-fade-in-up">
            <span className="hero-eyebrow">{heroSlides[heroIndex].eyebrow}</span>
            <h1 className="hero-title">
              <span className="hero-title-line">{heroSlides[heroIndex].title.split(' ')[0]}</span>
              {heroSlides[heroIndex].title.split(' ').slice(1).join(' ') && (
                <span className="hero-title-sub">{heroSlides[heroIndex].title.split(' ').slice(1).join(' ')}</span>
              )}
            </h1>
            <p className="hero-subtitle">{heroSlides[heroIndex].subtitle}</p>
            <div className="hero-cta-group">
              <button className="hero-cta-btn" onClick={scrollToShop}>
                <span className="hero-cta-text">SHOP THE COLLECTION</span>
                <svg className="hero-cta-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Slide navigation dots */}
          <div className="hero-slide-dots">
            {heroSlides.map((_, idx) => (
              <button key={idx}
                className={`hero-dot ${heroIndex === idx ? 'active' : ''}`}
                onClick={() => setHeroIndex(idx)}
                aria-label={`Slide ${idx + 1}`} />
            ))}
          </div>
        </div>

        {/* Meta strip at bottom */}
        <div className="hero-meta-strip">
          <div className="container hero-meta-strip-inner">
            <div className="hero-meta-cell">
              <span className="meta-label">Season</span>
              <span className="meta-value">SS26 Collection</span>
            </div>
            <div className="hero-meta-divider"></div>
            <div className="hero-meta-cell">
              <span className="meta-label">Origin</span>
              <span className="meta-value">Lagos, Nigeria</span>
            </div>
            <div className="hero-meta-divider"></div>
            <div className="hero-meta-cell">
              <span className="meta-label">Release</span>
              <span className="meta-value">Limited Drop</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator" onClick={scrollToShop} style={{ cursor: 'pointer' }}>
        <span>Scroll</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
    </header>
  );
}
