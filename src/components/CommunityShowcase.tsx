'use client';

import Image from 'next/image';
import { useStore } from '../context/StoreContext';
import { products } from '../data/products';

const looks = [
  { image: '/images/client_fit_1.jpg', productId: 'shirt-1', caption: 'Steezy Graphic Tee' },
  { image: '/images/client_fit_2.jpg', productId: 'hoodie-1', caption: 'Steezy Sleeveless Tee' },
  { image: '/images/client_fit_4.jpeg', productId: 'acc-1', caption: 'Signature Headwear' },
  { image: '/images/snaptik_7625367276497292565_2_v2.jpeg', productId: 'shirt-16', caption: 'SS26 Campaign' },
];

export default function CommunityShowcase() {
  const { openQuickView } = useStore();
  return (
    <section className="community-section reveal-on-scroll" aria-labelledby="community-title">
      <div className="container">
        <div className="community-heading">
          <div><p className="eyebrow">Seen in the city</p><h2 id="community-title">Worn your way.</h2></div>
          <p>Real people. Real styling. Tag <a href="https://instagram.com/yeenksluxe" target="_blank" rel="noopener noreferrer">@yeenksluxe</a> to be featured.</p>
        </div>
        <div className="community-grid">
          {looks.map((look, index) => (
            <button className={`community-card community-card-${index + 1}`} key={look.image} onClick={() => openQuickView(products.find(product => product.id === look.productId) || products[0])}>
              <Image src={look.image} alt={`${look.caption} styled by the YEENKSLUXE community`} fill className="community-image" sizes="(max-width: 700px) 50vw, 25vw" />
              <span><small>Shop the look</small>{look.caption}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
