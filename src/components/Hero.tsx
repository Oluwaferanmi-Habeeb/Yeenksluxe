'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useStore } from '../context/StoreContext';

const slides = [
  { src: '/images/ynl-hero-duo.svg', label: 'Two people wearing YEENKSLUXE graphic tees' },
  { src: '/images/ynl-hoodie-pair.svg', label: 'Two people wearing YEENKSLUXE hoodies in Lagos' },
];

export default function Hero() {
  const { scrollToShop } = useStore();
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setActiveSlide(current => (current + 1) % slides.length), 8000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <header className="hero" aria-labelledby="hero-title">
      <div className="hero-stage">
        {slides.map((slide, index) => (
          <Image key={slide.src} src={slide.src} alt="" aria-hidden={index !== activeSlide} fill priority={index === 0} className={`hero-image ${index === activeSlide ? 'active' : ''}`} sizes="(max-width: 780px) 100vw, 56vw" />
        ))}
        <div className="hero-shade" />
        <div className="hero-noise" aria-hidden="true" />
        <div className="hero-pagination" aria-label="Hero images">
          {slides.map((slide, index) => <button key={slide.src} type="button" className={index === activeSlide ? 'active' : ''} onClick={() => setActiveSlide(index)} aria-label={`Show image ${index + 1}: ${slide.label}`} aria-pressed={index === activeSlide} />)}
        </div>
      </div>
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
