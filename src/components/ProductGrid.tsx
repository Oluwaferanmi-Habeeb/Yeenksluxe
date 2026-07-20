'use client';

import Image from 'next/image';
import { useStore } from '../context/StoreContext';
import { categories, products } from '../data/products';

export default function ProductGrid() {
  const {
    filteredProducts, selectedCategory, setSelectedCategory,
    openQuickView, formatCurrency, formatUSD, searchQuery
  } = useStore();



  return (
    <section className="shop-section reveal-on-scroll" id="shop-catalog">
      <div className="container">
        <div className="shop-header">
          <div className="shop-title-area">
            <span className="section-eyebrow">OUR SELECTIONS</span>
            <h2 className="section-title">THE LOOKBOOK</h2>
          </div>
          <div className="shop-all-link" onClick={() => { setSelectedCategory('All'); }}>
            <span>View All</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Category Filter Tabs with underline style */}
        <div className="category-filters">
          {['All', ...categories].map((cat) => {
            const count = cat === 'All'
              ? products.length
              : products.filter(p => p.category === cat).length;
            return (
              <button key={cat} className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}>
                {cat}
                <span className="filter-count">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Product count & active filter indicator */}
        <div className="shop-meta-bar">
          <span className="shop-result-count">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="no-results">
            <span className="no-results-icon">∅</span>
            <p>No products match your selection.</p>
            <button className="filter-btn" onClick={() => setSelectedCategory('All')}>View All Products</button>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card" onClick={() => openQuickView(product)}>
                <div className="card-img-wrapper" style={{ position: 'relative' }}>
                  {product.badge && (
                    <span className={`product-badge ${product.badge === 'Sale' ? 'badge-sale' : ''}`}>{product.badge}</span>
                  )}
                  <Image src={product.image} alt={product.name} fill className="card-img object-cover"
                    sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, 25vw" />
                  <div className="card-overlay">
                    <button className="quick-view-btn" onClick={(e) => { e.stopPropagation(); openQuickView(product); }}>
                      QUICK VIEW
                    </button>
                  </div>
                </div>
                <div className="card-info">
                  <div>
                    <span className="product-category">{product.category}</span>
                    <h3 className="product-name">{product.name}</h3>
                  </div>
                  <div className="card-footer">
                    <span className="product-price">{formatCurrency(product.price)} <span className="product-price-usd">{formatUSD(product.price)}</span></span>
                    {/* Color swatch dots */}
                    {product.colors && product.colors.length > 1 && (
                      <div className="card-color-dots">
                        {product.colors.slice(0, 3).map((c) => (
                          <span key={c} className="card-color-dot" style={{ background: c }}></span>
                        ))}
                        {product.colors.length > 3 && (
                          <span className="card-color-more">+{product.colors.length - 3}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
