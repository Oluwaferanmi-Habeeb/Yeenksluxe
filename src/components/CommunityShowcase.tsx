'use client';

import Image from 'next/image';
import { useStore } from '../context/StoreContext';
import { products } from '../data/products';

export default function CommunityShowcase() {
  const { openQuickView } = useStore();

  const showcaseItems = [
    { img: "/images/client_fit_1.jpg", label: "YĒĒNKSLUXÉ x STEEZY '26 Edition Graphic Tee", productId: 'shirt-1' },
    { img: "/images/client_fit_2.jpg", label: "YĒĒNKSLUXÉ x STEEZY '26 Edition Hoodie", productId: 'hoodie-1' },
    { img: "/images/client_fit_3.jpg", label: "YĒĒNKSLUXÉ x STEEZY '26 Edition Rhinestone Tee", productId: 'shirt-5' },
    { img: "/images/client_fit_4.jpeg", label: "Urban Knit Beanie", productId: 'acc-2' },
  ];

  return (
    <section className="community-showcase reveal-on-scroll" style={{ padding: '9rem 0', borderTop: '1px solid var(--border-color)' }}>
      <div className="container">
        <div className="shop-header" style={{ marginBottom: '3.5rem' }}>
          <div className="shop-title-area">
            <span className="section-eyebrow">AS WORN BY THE BOLD</span>
            <h2 className="section-title">SPOTTED IN YĒĒNKSLUXÉ</h2>
          </div>
        </div>

        <div className="showcase-grid-container">
          {showcaseItems.map((item, idx) => (
            <div key={idx} className="showcase-card">
              <div className="showcase-img-wrapper" style={{ position: 'relative' }}>
                <Image src={item.img} alt={`Client Fit ${idx + 1}`} fill className="showcase-img object-cover"
                  sizes="(max-width: 768px) 100vw, 25vw" />
                <div className="showcase-overlay">
                  <div className="showcase-tag">
                    <span className="showcase-tag-eyebrow">SPOTTED WEARING</span>
                    <span className="showcase-tag-title">{item.label}</span>
                    <button className="showcase-shop-btn" onClick={() => {
                      const p = products.find(prod => prod.id === item.productId) || products[0];
                      openQuickView(p);
                    }}>SHOP LOOK</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
