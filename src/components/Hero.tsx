'use client';

import Image from 'next/image';
import { useStore } from '../context/StoreContext';

export default function Hero() {
  const { scrollToShop } = useStore();

  return (
    <header className="hero" aria-labelledby="hero-title">
      <div className="hero-stage">
        <Image
          src="/images/ynl-hero-duo.jpeg"
          alt="Two people wearing YEENKSLUXE graphic tees"
          fill
          priority
          className="hero-image active"
          sizes="(max-width: 780px) 100vw, 58vw"
        />
        <div className="hero-shade" />
        <div className="hero-noise" aria-hidden="true" />
      </div>
      <div className="container hero-content">
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
