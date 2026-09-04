'use client';

import Image from 'next/image';
import { useStore } from '../context/StoreContext';

export default function EditorialPanels() {
  const { setSelectedCategory, scrollToShop } = useStore();
  const shop = (category: string) => { setSelectedCategory(category); window.setTimeout(scrollToShop, 20); };
  return (
    <section className="campaign-section reveal-on-scroll" id="campaign" aria-labelledby="campaign-title">
      <div className="campaign-visual campaign-visual-main">
        <Image src="/images/client_fit_3.jpg" alt="YEENKSLUXE cap and graphic tee styled by a customer" fill className="campaign-image" sizes="(max-width: 800px) 100vw, 55vw" />
        <span className="image-credit">YNL COMMUNITY / LAGOS</span>
      </div>
      <div className="campaign-content">
        <p className="eyebrow">The campaign · Issue 01</p>
        <h2 id="campaign-title">Not made to<br/>blend in.</h2>
        <p>YEENKSLUXE is a Lagos-born label creating expressive streetwear for people who wear confidence before they wear clothes.</p>
        <button className="text-link" onClick={() => shop('Shirts')}>Explore the collection <span>↗</span></button>
        <div className="campaign-inset">
          <Image src="/images/new_prod_5.jpg" alt="YEENKSLUXE signature tiger hoodie artwork" fill className="campaign-image" sizes="(max-width: 800px) 50vw, 25vw" />
        </div>
      </div>
    </section>
  );
}
