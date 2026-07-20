'use client';

import Image from 'next/image';
import { useStore } from '../context/StoreContext';

const slides = [
  { image: "/images/a3548e8a-a0bd-4271-ae46-c588155d8144.jpg", heading: "MADE FOR THE ONES WHO RUN THE CITY", sub: "born in Lagos. built for the world.", btnText: "SHOP ALL", category: "Hoodies", trans: "zoom" },
  { image: "/images/snaptik_7621552137285192981_2_v2.jpeg", heading: "DISTINCTIVE SILHOUETTES & SHAPES", sub: "designed for movement. crafted for luxury.", btnText: "SHOP SHIRTS", category: "Shirts", trans: "slideLeft" },
  { image: "/images/snaptik_7625367276497292565_3_v2.jpeg", heading: "SS26 CAMPAIGN CAPS & ACCS", sub: "limited rotation. wear the difference.", btnText: "SHOP HATS", category: "Hats", trans: "slideUp" }
];

export default function UpperDisplay() {
  const { udIndex, setUdIndex, setSelectedCategory, scrollToShop } = useStore();

  return (
    <section className="upper-display reveal-on-scroll" id="upperDisplay">
      <div className="upper-display-inner">
        <div className="upper-display-text">
          <div key={udIndex} className="animate-fade-in-up">
            <h2 className="upper-display-heading">{slides[udIndex].heading}</h2>
            <p className="upper-display-sub">{slides[udIndex].sub}</p>
            <button className="upper-display-btn" onClick={() => { setSelectedCategory(slides[udIndex].category); scrollToShop(); }}>
              {slides[udIndex].btnText}
            </button>
          </div>
          <div className="ud-dots">
            {slides.map((_, i) => (
              <button key={i} className={`ud-dot ${udIndex === i ? 'active' : ''}`}
                onClick={() => setUdIndex(i)} aria-label={`Go to slide ${i + 1}`} />
            ))}
          </div>
        </div>
        <div className="upper-display-imgstack">
          {slides.map((slide, i) => (
            <Image key={i} src={slide.image} alt={slide.heading} fill priority={i === 0}
              sizes="(max-width: 768px) 100vw, 460px"
              className={`object-cover ud-trans-${slide.trans} ${udIndex === i ? 'ud-img-active' : ''}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
