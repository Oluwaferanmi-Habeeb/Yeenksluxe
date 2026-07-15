'use client';

import Image from 'next/image';
import { products } from '../data/products';

export default function LookbookFilmstrip() {
  const uniqueImages = products.reduce<{ image: string; name: string }[]>((acc, p) => {
    if (!acc.some((item) => item.image === p.image)) {
      acc.push({ image: p.image, name: p.name });
    }
    return acc;
  }, []);

  return (
    <section className="lookbook-filmstrip reveal-on-scroll" style={{ padding: '8rem 0' }}>
      <div className="filmstrip-header">
        <span className="section-eyebrow">DIGITAL LOOKBOOK</span>
        <h2 className="section-title">SS26 CAMPAIGN EDITORIALS</h2>
      </div>

      <div className="filmstrip-container" style={{ marginBottom: '4rem' }}>
        <div className="filmstrip-track">
          {[...uniqueImages, ...uniqueImages].map((item, idx) => (
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
  );
}
