'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useStore } from '../context/StoreContext';

const colourNames: Record<string, string> = {
  '#000000': 'Black', '#ffffff': 'White', '#111111': 'Washed black', '#1a1a1a': 'Charcoal',
  '#333333': 'Slate', '#f5f2eb': 'Bone', '#6b705c': 'Olive',
};

export default function ProductModal() {
  const { selectedProduct, setSelectedProduct, selectedStyleId, setSelectedStyleId, chosenSize, setChosenSize, chosenColor, setChosenColor, addToCart, formatCurrency } = useStore();
  const [imageSelection, setImageSelection] = useState({ key: '', index: 0 });
  const imageKey = `${selectedProduct?.id || ''}:${selectedStyleId}:${chosenColor}`;
  const imageIndex = imageSelection.key === imageKey ? imageSelection.index : 0;
  const setImageIndex = (index: number) => setImageSelection({ key: imageKey, index });
  const [detailsSelection, setDetailsSelection] = useState({ key: '', open: 'details' as 'details' | 'size' | 'delivery' });
  const detailsOpen = detailsSelection.key === imageKey ? detailsSelection.open : 'details';
  const setDetailsOpen = (open: 'details' | 'size' | 'delivery') => setDetailsSelection({ key: imageKey, open });

  const gallery = useMemo(() => {
    if (!selectedProduct) return [];
    const activeProduct = selectedProduct.styleVariants?.find(variant => variant.id === selectedStyleId) || selectedProduct.styleVariants?.[0] || selectedProduct;
    const primary = activeProduct.colorImages?.[chosenColor] || activeProduct.image;
    const additionalViews = activeProduct.colorGalleries?.[chosenColor] ?? activeProduct.gallery ?? [];
    return [primary, ...additionalViews.filter(image => image !== primary)];
  }, [selectedProduct, selectedStyleId, chosenColor]);

  useEffect(() => {
    if (!selectedProduct) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setImageSelection(current => ({ ...current, index: 0 }));
        setDetailsSelection(current => ({ ...current, open: 'details' }));
        setSelectedProduct(null);
      }
    };
    document.body.classList.add('modal-open');
    window.addEventListener('keydown', close);
    return () => { document.body.classList.remove('modal-open'); window.removeEventListener('keydown', close); };
  }, [selectedProduct, setSelectedProduct]);

  if (!selectedProduct) return null;
  const activeProduct = selectedProduct.styleVariants?.find(variant => variant.id === selectedStyleId) || selectedProduct.styleVariants?.[0] || selectedProduct;
  const label = activeProduct.name.replace(/YĒĒNKSLUXÉ\s*x\s*/gi, '').replace(/[‘’']?26 Edition\s*/gi, '');
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
          {activeProduct.video && <ProductMotion source={activeProduct.video} poster={activeProduct.image} />}
          {gallery.length > 1 && <div className="modal-thumbnails">{gallery.map((image, index) => <button key={image} className={imageIndex === index ? 'active' : ''} onClick={() => setImageIndex(index)} aria-label={`View image ${index + 1}`}><Image src={image} alt="" fill className="modal-thumb-image" sizes="72px" /></button>)}</div>}
        </div>

        <div className="modal-details">
          <p className="eyebrow">{activeProduct.category}</p>
          <h2 id="product-modal-title">{label}</h2>
          <p className="modal-price">{formatCurrency(activeProduct.price)}</p>
          <p className="modal-description">{activeProduct.description || 'A YEENKSLUXE piece.'}</p>

          {!!selectedProduct.styleVariants?.length && <label className="product-options style-option"><span>Style</span><select value={activeProduct.id} onChange={event => {
            const next = selectedProduct.styleVariants?.find(variant => variant.id === event.target.value);
            if (!next) return;
            setSelectedStyleId(next.id);
            setChosenSize(next.sizes?.[0] || 'One Size');
            setChosenColor(next.colors?.[0] || '');
            setImageIndex(0);
          }}>{selectedProduct.styleVariants.map(variant => <option key={variant.id} value={variant.id}>{variant.name.replace(/YĒĒNKSLUXÉ\s*x\s*/gi, '').replace(/[‘’']?26 Edition\s*/gi, '')}</option>)}</select></label>}

          {!!activeProduct.colors?.length && <fieldset className="product-options"><legend>Colour <span>{activeProduct.colorNames?.[chosenColor] || colourNames[chosenColor] || 'Selected'}</span></legend><div className="colour-options">{activeProduct.colors.map(colour => <button key={colour} className={chosenColor === colour ? 'active' : ''} style={{ '--swatch': colour } as React.CSSProperties} onClick={() => { setImageIndex(0); setChosenColor(colour); }} aria-label={activeProduct.colorNames?.[colour] || colourNames[colour] || colour} aria-pressed={chosenColor === colour} />)}</div></fieldset>}

          {!!activeProduct.sizes?.length && <fieldset className="product-options"><legend>Choose size</legend><div className="size-options">{activeProduct.sizes.map(size => <button key={size} className={chosenSize === size ? 'active' : ''} onClick={() => setChosenSize(size)} aria-pressed={chosenSize === size}>{size}</button>)}</div></fieldset>}

          <button className="add-to-cart" onClick={() => addToCart(activeProduct, chosenSize, chosenColor)}>Add to bag <span>{formatCurrency(activeProduct.price)}</span></button>
          <a className="fit-help" href={`https://wa.me/2349033364994?text=${encodeURIComponent(`Hi YEENKSLUXE! I need sizing help with ${label}.`)}`} target="_blank" rel="noopener noreferrer">Unsure about your size? Ask us on WhatsApp ↗</a>

          <div className="product-accordions">
            <ProductAccordion title="Details & care" open={detailsOpen === 'details'} onClick={() => setDetailsOpen('details')}>
              <ul>{(activeProduct.features?.length ? activeProduct.features : ['Limited release', activeProduct.fit || 'Relaxed fit']).map(item => <li key={item}>{item}</li>)}</ul>
              {!!activeProduct.care?.length && <p>{activeProduct.care.join(' · ')}</p>}
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

function ProductMotion({ source, poster }: { source: string; poster: string }) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    let objectUrl: string | null = null;
    fetch(source)
      .then(response => {
        if (!response.ok) throw new Error('Video unavailable');
        return response.text();
      })
      .then(encoded => {
        const binary = window.atob(encoded.trim());
        const bytes = new Uint8Array(binary.length);
        for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
        objectUrl = URL.createObjectURL(new Blob([bytes], { type: 'video/mp4' }));
        if (active) setVideoUrl(objectUrl);
      })
      .catch(() => { if (active) setVideoUrl(null); });
    return () => {
      active = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [source]);

  if (!videoUrl) return null;
  return <div className="product-motion"><p>See it in motion</p><video controls muted playsInline preload="metadata" poster={poster} src={videoUrl}>Your browser does not support this video.</video></div>;
}

