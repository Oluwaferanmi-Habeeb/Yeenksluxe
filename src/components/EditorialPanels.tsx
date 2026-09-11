'use client';

import Image from 'next/image';
import { useStore } from '../context/StoreContext';

export default function EditorialPanels() {
  const { setSelectedCategory, scrollToShop } = useStore();
  const shop = (category: string) => { setSelectedCategory(category); window.setTimeout(scrollToShop, 20); };
  return (
    <section className="campaign-section reveal-on-scroll" id="campaign" aria-labelledby="campaign-title">
      <div className="campaign-visual campaign-visual-main">
        <Image src="/images/ynl-campaign-trunk.svg" alt="YEENKSLUXE cap and graphic tee styled in Lagos" fill className="campaign-image" sizes="(max-width: 800px) 100vw, 55vw" />
        <span className="image-credit">YNL / STREET NOTES</span>
      </div>
      <div className="campaign-content">
        <p className="eyebrow">YNL / STREET NOTES</p>
        <h2 id="campaign-title">Out in<br/>Lagos.</h2>
        <p>Pieces worn by people around the city.</p>
        <button className="text-link" onClick={() => shop('Shirts')}>Shop tees <span>↗</span></button>
        <div className="campaign-inset">
          <Image src="/images/ynl-cap-stack.svg" alt="Stacked YEENKSLUXE caps" fill className="campaign-image" sizes="(max-width: 800px) 50vw, 25vw" />
        </div>
      </div>
    </section>
  );
}
