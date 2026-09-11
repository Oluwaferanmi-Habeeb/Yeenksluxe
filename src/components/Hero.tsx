'use client';

import Image from 'next/image';
import { useStore } from '../context/StoreContext';

export default function Hero() {
  const { scrollToShop } = useStore();
  return (
    <header className="hero" aria-labelledby="hero-title">
      <Image
        src="/images/ynl-hero-duo.svg"
        alt="Two people wearing YEENKSLUXE graphic tees beside a car in Lagos"
        fill
        priority
        className="hero-image"
        sizes="100vw"
      />
      <div className="hero-shade" />
      <div className="hero-noise" aria-hidden="true" />
      <div className="container hero-content">
        <p className="eyebrow hero-eyebrow">YEENKSLUXE / SS26 / LAGOS</p>
        <h1 id="hero-title">The new<br /><em>drop.</em></h1>
        <p className="hero-copy">Graphic tees, hoodies and caps from YEENKSLUXE.</p>
        <div className="hero-actions">
          <button className="button button-light" onClick={scrollToShop}>Shop the latest drop</button>
          <a className="text-link text-link-light" href="#campaign">See the looks <span>↘</span></a>
        </div>
      </div>
      <div className="hero-index" aria-hidden="true"><span>YNL / 026</span><span>LAGOS</span></div>
    </header>
  );
}
