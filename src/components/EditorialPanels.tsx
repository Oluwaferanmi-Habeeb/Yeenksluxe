'use client';

import Image from 'next/image';
import { useStore } from '../context/StoreContext';

export default function EditorialPanels() {
  const { setSelectedCategory, scrollToShop } = useStore();
  const shop = (category: string) => { setSelectedCategory(category); window.setTimeout(scrollToShop, 20); };
  return (
    <section className="campaign-section reveal-on-scroll" id="campaign" aria-labelledby="campaign-title">
      <div className="campaign-visual campaign-visual-main">
        <Image src="/images/hero_campaign.png" alt="YEENKSLUXE campaign, styled in Lagos" fill className="campaign-image" sizes="(max-width: 800px) 100vw, 55vw" />
        <span className="image-credit">YEENKSLUXE / LAGOS</span>
      </div>
      <div className="campaign-content">
        <p className="eyebrow">A Lagos point of view</p>
        <h2 id="campaign-title">Rooted<br/>in Lagos.</h2>
        <p>Independent design. A presence that travels.</p>
        <button className="text-link" onClick={() => shop('Shirts')}>Shop tees <span>↗</span></button>
        <div className="campaign-inset">
          <Image src="/images/new_prod_1.jpg" alt="YEENKSLUXE signature cap" fill className="campaign-image" sizes="(max-width: 800px) 50vw, 25vw" />
        </div>
      </div>
    </section>
  );
}

