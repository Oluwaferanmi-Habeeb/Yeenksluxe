'use client';

import { useStore } from '../context/StoreContext';

export default function Hero() {
  const { scrollToShop } = useStore();

  return (
    <header className="hero" aria-labelledby="hero-title">
      <div className="hero-stage">
        <div className="hero-image" role="img" aria-label="YEENKSLUXE campaign portrait" />
        <div className="hero-shade" />
        <div className="hero-noise" aria-hidden="true" />
      </div>
      <div className="container hero-content">
        <p className="eyebrow hero-eyebrow">Lagos, Nigeria · Collection 026</p>
        <h1 id="hero-title">Made to<br /><em>be seen.</em></h1>
        <p className="hero-copy">Considered streetwear. Made in Lagos, worn everywhere.</p>
        <div className="hero-actions">
          <button className="button button-light" onClick={scrollToShop}>Shop the latest drop</button>
          <a className="text-link text-link-light" href="#campaign">See the looks <span>↘</span></a>
        </div>
      </div>
      <div className="hero-index" aria-hidden="true"><span>YEENKSLUXE / 026</span><span>LAGOS, NIGERIA</span></div>
    </header>
  );
}

