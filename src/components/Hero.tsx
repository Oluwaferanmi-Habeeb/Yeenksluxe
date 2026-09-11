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
        <p className="eyebrow hero-eyebrow">SS26 · LIMITED RELEASE · LAGOS</p>
        <h1 id="hero-title">Built for the ones<br /><em>who move different.</em></h1>
        <p className="hero-copy">Statement silhouettes and limited pieces created where street culture meets considered design.</p>
        <div className="hero-actions">
          <button className="button button-light" onClick={scrollToShop}>Shop the latest drop</button>
          <a className="text-link text-link-light" href="#campaign">Explore the campaign <span>↘</span></a>
        </div>
      </div>
      <div className="hero-index" aria-hidden="true"><span>YNL / 026</span><span>LAGOS → WORLD</span></div>
    </header>
  );
}
