'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { useStore } from '../context/StoreContext';
import { categories, Product } from '../data/products';
import { useAccount } from '../context/AccountContext';

const shortName = (product: Product) => product.name
  .replace(/YĒĒNKSLUXÉ\s*x\s*/gi, '')
  .replace(/YEENKSLUXE\s*x\s*/gi, '')
  .replace(/STEEZY\s*x\s*/gi, '')
  .replace(/[‘’']?26\s+Edition\s*/gi, '')
  .replace(/\s{2,}/g, ' ')
  .trim();

type SortOption = 'featured' | 'low' | 'high';

export default function ProductGrid() {
  const { filteredProducts, selectedCategory, setSelectedCategory, openQuickView, formatCurrency, searchQuery, mounted } = useStore();
  const { user, savedProductIds, toggleSavedProduct } = useAccount();
  const [sort, setSort] = useState<SortOption>('featured');
  const [limit, setLimit] = useState(12);

  const sortedProducts = useMemo(() => {
    const next = [...filteredProducts];
    if (sort === 'low') next.sort((a, b) => a.price - b.price);
    if (sort === 'high') next.sort((a, b) => b.price - a.price);
    return next;
  }, [filteredProducts, sort]);

  return (
    <section className="shop-section reveal-on-scroll" id="shop-catalog" aria-labelledby="catalogue-title">
      <div className="container">
        <div className="shop-heading-row">
          <div>
            <p className="eyebrow">The latest release</p>
            <h2 id="catalogue-title">Shop the drop.</h2>
          </div>
          <p className="shop-intro">Tees, hoodies and caps.</p>
        </div>

        <div className="shop-toolbar">
          <div className="category-filters" aria-label="Filter by category">
            {['All', ...categories].map(category => (
              <button key={category} className={selectedCategory === category ? 'active' : ''} onClick={() => { setSelectedCategory(category); setLimit(12); }}>
                {category === 'All' ? 'All pieces' : category}
              </button>
            ))}
          </div>
          <div className="sort-control">
            <label htmlFor="product-sort">Sort</label>
            <select id="product-sort" value={sort} onChange={e => { setSort(e.target.value as SortOption); setLimit(12); }}>
              <option value="featured">Featured</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
            </select>
          </div>
        </div>

        <p className="result-count">{sortedProducts.length} {sortedProducts.length === 1 ? 'piece' : 'pieces'}{searchQuery ? ` matching “${searchQuery}”` : ''}</p>

        {!mounted ? (
          <div className="product-grid">{Array.from({ length: 8 }).map((_, i) => <div className="skeleton-card" key={i}><div className="skeleton-image"/><div className="skeleton-line"/></div>)}</div>
        ) : sortedProducts.length === 0 ? (
          <div className="empty-state"><span>Nothing here yet.</span><p>Try another category or clear your search.</p><button className="button button-dark" onClick={() => setSelectedCategory('All')}>View all pieces</button></div>
        ) : (
          <>
            <div className="product-grid">
              {sortedProducts.slice(0, limit).map((product, index) => (
                <article className="product-card" key={product.id}>
                  <div className="product-image-wrap">
                    <button className="product-image-button" onClick={() => openQuickView(product)} aria-label={`View ${shortName(product)}`}>
                      <Image src={product.image} alt={shortName(product)} fill className="product-image" sizes="(max-width: 600px) 50vw, (max-width: 1000px) 33vw, 25vw" />
                      {product.badge && <span className="product-badge">{product.badge}</span>}
                      <span className="product-index">{String(index + 1).padStart(2, '0')}</span>
                      <span className="product-view">View piece <span>↗</span></span>
                    </button>
                    <button className={`save-piece ${savedProductIds.includes(product.id) ? 'saved' : ''}`} onClick={() => { toggleSavedProduct(product.id).catch(() => undefined); }} aria-label={savedProductIds.includes(product.id) ? `Remove ${shortName(product)} from saved pieces` : user ? `Save ${shortName(product)}` : `Sign in to save ${shortName(product)}`} aria-pressed={savedProductIds.includes(product.id)}><span aria-hidden="true">{savedProductIds.includes(product.id) ? '♥' : '♡'}</span></button>
                  </div>
                  <div className="product-info">
                    <div><p>{product.category} · SS26</p><h3>{shortName(product)}</h3></div>
                    <strong>{formatCurrency(product.price)}</strong>
                  </div>
                  <div className="product-meta">
                    <span>{product.colors?.length || 1} {(product.colors?.length || 1) === 1 ? 'colour' : 'colours'}</span>
                    <button onClick={() => openQuickView(product)}>Select options</button>
                  </div>
                </article>
              ))}
            </div>
            {limit < sortedProducts.length && <div className="load-more"><button className="button button-outline" onClick={() => setLimit(sortedProducts.length)}>View all {sortedProducts.length} pieces</button></div>}
          </>
        )}
      </div>
    </section>
  );
}
