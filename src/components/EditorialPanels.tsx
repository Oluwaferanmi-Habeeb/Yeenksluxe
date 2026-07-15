'use client';

import Image from 'next/image';
import { useStore } from '../context/StoreContext';

export default function EditorialPanels() {
  const { setSelectedCategory, scrollToShop } = useStore();

  return (
    <section className="editorial-section reveal-on-scroll">
      <div className="editorial-grid">
        <div className="editorial-panel" style={{ position: 'relative' }}
          onClick={() => { setSelectedCategory('Shirts'); scrollToShop(); }}>
          <Image src="/images/snaptik_7625367276497292565_2_v2.jpeg" alt="New Arrivals Apparel" fill className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw" />
          <div className="editorial-panel-overlay"></div>
          <div className="editorial-caption">
            <h3>NEW STREETWEAR ARRIVALS</h3>
            <p>Heavyweight hoodies, campaign tees & restocks landing weekly</p>
            <span className="editorial-btn">EXPLORE</span>
          </div>
        </div>
        <div className="editorial-panel" style={{ position: 'relative' }}
          onClick={() => { setSelectedCategory('Accessories'); scrollToShop(); }}>
          <Image src="/images/snaptik_7621552137285192981_1_v2.jpeg" alt="Accessories Collection" fill className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw" />
          <div className="editorial-panel-overlay"></div>
          <div className="editorial-caption">
            <h3>CURATED ACCESSORIES</h3>
            <p>Luxury beanies, tactical utility bags & premium calfskin leather belts</p>
            <span className="editorial-btn">EXPLORE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
