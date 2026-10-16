'use client';

import Image from 'next/image';
import { useStore } from '../context/StoreContext';

const looks = [
  { image: '/images/client_fit_1.jpg', productId: 'steezy-tees', styleId: 'hoodie-2', caption: 'Steezy Graphic Tee' },
  { image: '/images/client_fit_2.jpg', productId: 'steezy-tanks', styleId: 'shirt-3', color: '#c9b99d', caption: 'Signature Tank' },
  { image: '/images/client_fit_4.jpeg', productId: 'drop3-25', caption: 'Signature Headwear' },
  { image: '/images/snaptik_7625367276497292565_2_v2.jpeg', productId: 'steezy-tees', styleId: 'hoodie-2', caption: 'Lagos fit' },
];

export default function CommunityShowcase() {
  const { openQuickView, catalog } = useStore();
  return (
    <section className="community-section reveal-on-scroll" aria-labelledby="community-title">
      <div className="container">
        <div className="community-heading">
          <div><p className="eyebrow">Seen in the city</p><h2 id="community-title">Worn your way.</h2></div>
          <p>Real people. Real styling. Tag <a href="https://www.instagram.com/yeenks_official/" target="_blank" rel="noopener noreferrer">@yeenks_official</a> to be featured.</p>
        </div>
        <div className="community-grid">
          {looks.map((look, index) => (
            <button className={`community-card community-card-${index + 1}`} key={look.image} onClick={() => {
              const group = catalog.find(candidate => candidate.id === look.productId);
              const groupedProduct = catalog.find(candidate => candidate.styleVariants?.some(variant => variant.id === (look.styleId || look.productId)));
              const product = group || groupedProduct || catalog.find(candidate => candidate.id === (look.styleId || look.productId));
              if (product) openQuickView(product, look.styleId || (groupedProduct ? look.productId : undefined), 'color' in look ? look.color : undefined);
            }}>
              <Image src={look.image} alt={`${look.caption} styled by the YEENKSLUXE community`} fill className="community-image" sizes="(max-width: 700px) 50vw, 25vw" />
              <span><small>Shop the look</small>{look.caption}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

