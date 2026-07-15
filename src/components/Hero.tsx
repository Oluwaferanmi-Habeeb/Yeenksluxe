'use client';

import Image from 'next/image';
import { useStore } from '../context/StoreContext';

const heroSlides = [
  { image: "/images/snaptik_7625367276497292565_0_v2.jpeg", eyebrow: "SS26 PRE-RELEASE COLLECTION", title: "YEENKSLUXE APPAREL", subtitle: "Where streetwear meets luxury." },
  { image: "/images/snaptik_7621552137285192981_0_v2.jpeg", eyebrow: "EXHIBIT 02 / CAMPAIGN", title: "RAW SILHOUETTES", subtitle: "Heavyweight garments structured for modern daily movement. Engineered in Lagos." },
  { image: "/images/snaptik_7625367276497292565_2_v2.jpeg", eyebrow: "EXHIBIT 03 / EDITORIAL", title: "STREET TAILORING", subtitle: "High-density embroidery, luxury hardware, and drop-shoulder forms that command attention." }
];

export default function Hero() {
  const { heroIndex, scrollToShop } = useStore();

  return (
    <header className="hero">
      <div className="hero-bg-media">
        <div className="hero-slideshow">
          {heroSlides.map((slide, idx) => (
            <div key={idx} className={`hero-slide ${heroIndex === idx ? 'active' : ''}`}>
              <Image src={slide.image} alt={slide.title} fill priority={idx === 0}
                className="hero-bg-image object-cover" sizes="100vw" />
            </div>
          ))}
        </div>
        <div className="hero-vignette"></div>
      </div>

      <div className="hero-overlay-content container">
        <div key={heroIndex} className="hero-brand-card animate-fade-in-up">
          <span className="hero-eyebrow">{heroSlides[heroIndex].eyebrow}</span>
          <h1 className="hero-title">{heroSlides[heroIndex].title}</h1>
          <p className="hero-subtitle">{heroSlides[heroIndex].subtitle}</p>
          <div className="hero-cta-group">
            <button className="hero-cta-btn" onClick={scrollToShop}>SHOP THE LOOKS</button>
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
  );
}
