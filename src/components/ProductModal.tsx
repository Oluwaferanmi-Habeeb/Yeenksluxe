'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useStore } from '../context/StoreContext';

const colourNames: Record<string, string> = {
  '#000000': 'Black', '#ffffff': 'White', '#111111': 'Washed black', '#1a1a1a': 'Charcoal',
  '#333333': 'Slate', '#f5f2eb': 'Bone', '#6b705c': 'Olive',
};

export default function ProductModal() {
  const { selectedProduct, setSelectedProduct, chosenSize, setChosenSize, chosenColor, setChosenColor, addToCart, formatCurrency } = useStore();
  const [imageIndex, setImageIndex] = useState(0);
  const [detailsOpen, setDetailsOpen] = useState<'details' | 'size' | 'delivery'>('details');

  const gallery = useMemo(() => selectedProduct ? [selectedProduct.image, ...(selectedProduct.gallery || [])] : [], [selectedProduct]);

  useEffect(() => {
    if (!selectedProduct) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setImageIndex(0);
        setDetailsOpen('details');
        setSelectedProduct(null);
      }
    };
    document.body.classList.add('modal-open');
    window.addEventListener('keydown', close);
    return () => { document.body.classList.remove('modal-open'); window.removeEventListener('keydown', close); };
  }, [selectedProduct, setSelectedProduct]);

  if (!selectedProduct) return null;
  const label = selectedProduct.name.replace(/YĒĒNKSLUXÉ\s*x\s*/gi, '').replace(/[‘’']?26 Edition\s*/gi, '');
  const close = () => { setImageIndex(0); setDetailsOpen('details'); setSelectedProduct(null); };

  return (
    <div className="modal-overlay" onMouseDown={event => { if (event.target === event.currentTarget) close(); }}>
      <section className="product-modal" role="dialog" aria-modal="true" aria-labelledby="product-modal-title">
        <button className="modal-close" onClick={close} aria-label="Close product details">Close <span>×</span></button>
        <div className="modal-gallery">
          <div className="modal-main-image">
            <Image src={gallery[imageIndex]} alt={`${label}, view ${imageIndex + 1}`} fill className="modal-product-image" sizes="(max-width: 850px) 100vw, 55vw" />
            <span className="modal-image-counter">{String(imageIndex + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}</span>
          </div>
          {gallery.length > 1 && <div className="modal-thumbnails">{gallery.map((image, index) => <button key={image} className={imageIndex === index ? 'active' : ''} onClick={() => setImageIndex(index)} aria-label={`View image ${index + 1}`}><Image src={image} alt="" fill className="modal-thumb-image" sizes="72px" /></button>)}</div>}
        </div>

        <div className="modal-details">
          <p className="eyebrow">{selectedProduct.category} · SS26</p>
          <h2 id="product-modal-title">{label}</h2>
          <p className="modal-price">{formatCurrency(selectedProduct.price)}</p>
          <p className="modal-description">{selectedProduct.description || 'A YEENKSLUXE piece.'}</p>

          {!!selectedProduct.colors?.length && <fieldset className="product-options"><legend>Colour <span>{selectedProduct.colorNames?.[chosenColor] || colourNames[chosenColor] || 'Selected'}</span></legend><div className="colour-options">{selectedProduct.colors.map(colour => <button key={colour} className={chosenColor === colour ? 'active' : ''} style={{ '--swatch': colour } as React.CSSProperties} onClick={() => setChosenColor(colour)} aria-label={selectedProduct.colorNames?.[colour] || colourNames[colour] || colour} aria-pressed={chosenColor === colour} />)}</div></fieldset>}

          {!!selectedProduct.sizes?.length && <fieldset className="product-options"><legend>Choose size</legend><div className="size-options">{selectedProduct.sizes.map(size => <button key={size} className={chosenSize === size ? 'active' : ''} onClick={() => setChosenSize(size)} aria-pressed={chosenSize === size}>{size}</button>)}</div></fieldset>}

          <button className="add-to-cart" onClick={() => addToCart(selectedProduct, chosenSize, chosenColor)}>Add to bag <span>{formatCurrency(selectedProduct.price)}</span></button>
          <a className="fit-help" href={`https://wa.me/2349033364994?text=${encodeURIComponent(`Hi YEENKSLUXE! I need sizing help with ${label}.`)}`} target="_blank" rel="noopener noreferrer">Unsure about your size? Ask us on WhatsApp ↗</a>

          <div className="product-accordions">
            <ProductAccordion title="Details & care" open={detailsOpen === 'details'} onClick={() => setDetailsOpen('details')}>
              <ul>{(selectedProduct.features?.length ? selectedProduct.features : ['Limited release', selectedProduct.fit || 'Relaxed fit']).map(item => <li key={item}>{item}</li>)}</ul>
              {!!selectedProduct.care?.length && <p>{selectedProduct.care.join(' · ')}</p>}
            </ProductAccordion>
            <ProductAccordion title="Size guide" open={detailsOpen === 'size'} onClick={() => setDetailsOpen('size')}>
              <p>Use your usual size for a relaxed fit. Size down for a closer fit. Exact garment measurements should be confirmed with our team before dispatch.</p>
            </ProductAccordion>
            <ProductAccordion title="Delivery & exchanges" open={detailsOpen === 'delivery'} onClick={() => setDetailsOpen('delivery')}>
              <p>Lagos: 1 to 3 business days. Other Nigerian locations: 3 to 7 business days. Unworn pieces with original tags can be exchanged within 7 days, subject to availability.</p>
            </ProductAccordion>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProductAccordion({ title, open, onClick, children }: { title: string; open: boolean; onClick: () => void; children: React.ReactNode }) {
  return <div className={`product-accordion ${open ? 'open' : ''}`}><button onClick={onClick} aria-expanded={open}><span>{title}</span><span>{open ? '−' : '+'}</span></button><div>{children}</div></div>;
}
