'use client';

import Image from 'next/image';
import { useStore } from '../context/StoreContext';
import { categories } from '../data/products';

export default function ProductGrid() {
  const { filteredProducts, selectedCategory, setSelectedCategory, openQuickView } = useStore();

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

        <div className="category-filters">
          {['All', ...categories].map((cat) => (
            <button key={cat} className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}>{cat}</button>
          ))}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="no-results">No products matches your selection. Try browsing another category.</div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card" onClick={() => openQuickView(product)}>
                <div className="card-img-wrapper" style={{ position: 'relative' }}>
                  {product.badge && (
                    <span className={`product-badge ${product.badge === 'Sale' ? 'badge-sale' : ''}`}>{product.badge}</span>
                  )}
                  <Image src={product.image} alt={product.name} fill className="card-img object-cover"
                    sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 33vw" />
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
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
