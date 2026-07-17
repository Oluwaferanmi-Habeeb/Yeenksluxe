'use client';

import Image from 'next/image';
import { useStore } from '../context/StoreContext';

export default function ProductModal() {
  const {
    selectedProduct, setSelectedProduct, chosenSize, setChosenSize,
    chosenColor, setChosenColor, activeDossierTab, setActiveDossierTab,
    fitHeight, setFitHeight, fitWeight, setFitWeight, addToCart, formatCurrency, formatUSD
  } = useStore();

  if (!selectedProduct) return null;

  const getFitSuggestion = () => {
    const h = parseInt(fitHeight);
    const w = parseInt(fitWeight);
    if (!h || !w) return null;
    if (h >= 185 && w >= 85) return { size: 'XXL', reason: 'Based on your height and weight, XXL provides the best balance of length and room.' };
    if (h >= 175 && w >= 75) return { size: 'XL', reason: 'Your measurements suggest XL for a comfortable oversized fit.' };
    if (h >= 170 && w >= 65) return { size: 'L', reason: 'Large is recommended for your build — roomy without being baggy.' };
    return { size: 'M', reason: 'Medium should fit you well based on these proportions.' };
  };

  const fitResult = getFitSuggestion();

  const getColorName = (hex: string) => {
    return selectedProduct.colorNames?.[hex] || hex;
  };

  return (
    <div className="modal-overlay" onClick={() => { setSelectedProduct(null); setActiveDossierTab('info'); }}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal-btn" onClick={() => { setSelectedProduct(null); setActiveDossierTab('info'); }} aria-label="Close modal">
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="modal-gallery">
          {selectedProduct.video ? (
            <video src={selectedProduct.video} autoPlay loop muted controls playsInline
              style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          ) : (
            <div style={{ position: 'relative', width: '100%', height: '440px' }}>
              <Image src={selectedProduct.image} alt={selectedProduct.name} fill className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
          )}
        </div>

        <div className="modal-details">
          <span className="modal-category">{selectedProduct.category}</span>
          <h2 className="modal-title">{selectedProduct.name}</h2>

          {/* Price */}
          <div className="modal-price">{formatCurrency(selectedProduct.price)} <span className="product-price-usd">{formatUSD(selectedProduct.price)}</span></div>

          {/* Tagline */}
          {selectedProduct.description && (
            <p className="modal-tagline">{selectedProduct.description}</p>
          )}

          <div className="modal-divider"></div>

          {/* Dossier Tabs */}
          <div className="dossier-tabs">
            {(['info', 'fit', 'specs'] as const).map((tab) => (
              <button key={tab}
                className={`dossier-tab-btn ${activeDossierTab === tab ? 'active' : ''}`}
                onClick={() => setActiveDossierTab(tab)}>
                {tab === 'info' ? 'DETAILS' : tab === 'fit' ? 'FIT FINDER' : 'CARE & SPECS'}
              </button>
            ))}
          </div>

          <div className="dossier-tab-content">
            {activeDossierTab === 'info' && (
              <div className="tab-pane-fade">
                {/* Features */}
                {selectedProduct.features && selectedProduct.features.length > 0 && (
                  <div style={{ marginBottom: '1.25rem' }}>
                    <h4 className="selector-title">KEY FEATURES</h4>
                    <ul className="modal-features-list">
                      {selectedProduct.features.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Color Selection with Names */}
                {selectedProduct.colors && selectedProduct.colors.length > 0 && (
                  <div style={{ marginBottom: '1.25rem' }}>
                    <h4 className="selector-title">AVAILABLE COLORS</h4>
                    <div className="modal-color-grid">
                      {selectedProduct.colors.map((clr) => (
                        <button key={clr}
                          className={`modal-color-option ${chosenColor === clr ? 'active' : ''}`}
                          onClick={() => setChosenColor(clr)}>
                          <div className="modal-color-swatch" style={{ background: clr }}></div>
                          <span className="modal-color-name">{getColorName(clr)}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selection */}
                {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
                  <div style={{ marginBottom: '1.25rem' }}>
                    <h4 className="selector-title">SELECT SIZE</h4>
                    <div className="size-grid">
                      {selectedProduct.sizes.map((sz) => (
                        <button key={sz}
                          className={`size-btn ${chosenSize === sz ? 'active' : ''}`}
                          onClick={() => setChosenSize(sz)}>{sz}</button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="modal-actions">
                  <button className="add-to-cart-btn"
                    onClick={() => addToCart(selectedProduct, chosenSize, chosenColor)}>
                    ADD TO CART — {formatCurrency(selectedProduct.price)}
                  </button>
                </div>
              </div>
            )}

            {activeDossierTab === 'fit' && (
              <div className="tab-pane-fade">
                <div className="fit-finder-container">
                  <h4 className="fit-finder-title">FIT FINDER</h4>
                  <p className="fit-finder-desc">Enter your height (cm) and weight (kg) for a personalized size recommendation.</p>
                  <div className="fit-finder-form">
                    <div className="fit-input-field">
                      <label>HEIGHT (CM)</label>
                      <input type="number" placeholder="e.g. 180" value={fitHeight}
                        onChange={(e) => setFitHeight(e.target.value)} />
                    </div>
                    <div className="fit-input-field">
                      <label>WEIGHT (KG)</label>
                      <input type="number" placeholder="e.g. 75" value={fitWeight}
                        onChange={(e) => setFitWeight(e.target.value)} />
                    </div>
                  </div>
                  {fitResult && (
                    <div className="fit-finder-result">
                      <span className="result-size">{fitResult.size}</span>
                      <span className="result-reason">{fitResult.reason}</span>
                    </div>
                  )}
                  {!fitResult && <p className="result-prompt">Enter your stats above to get a recommendation.</p>}
                </div>

                {/* Fit Description */}
                {selectedProduct.fit && (
                  <div style={{ marginTop: '1.25rem' }}>
                    <h4 className="specs-title-sub">FIT DETAILS</h4>
                    <p className="modal-fit-info">{selectedProduct.fit}</p>
                  </div>
                )}
              </div>
            )}

            {activeDossierTab === 'specs' && (
              <div className="tab-pane-fade">
                <div className="specs-container">
                  {/* Care Instructions */}
                  {selectedProduct.care && selectedProduct.care.length > 0 && (
                    <div>
                      <h4 className="specs-title-sub">CARE INSTRUCTIONS</h4>
                      <ul className="modal-care-list">
                        {selectedProduct.care.map((instruction, i) => (
                          <li key={i}>{instruction}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Fabric & Construction */}
                  <div>
                    <h4 className="specs-title-sub">FABRIC & CONSTRUCTION</h4>
                    <ul className="specs-list">
                      <li><strong>Material:</strong> Premium heavyweight cotton jersey</li>
                      <li><strong>Weight:</strong> 280–400 GSM depending on style</li>
                      <li><strong>Fit:</strong> {selectedProduct.fit || 'Relaxed / Drop-shoulder silhouette'}</li>
                      <li><strong>Hardware:</strong> Gold-toned custom YKK zippers</li>
                    </ul>
                  </div>

                  {/* Care Rating */}
                  <div>
                    <h4 className="specs-title-sub">QUALITY RATING</h4>
                    <div className="fit-ratings">
                      <div className="rating-row"><span>Durability</span><span>★★★★★</span></div>
                      <div className="rating-row"><span>Comfort</span><span>★★★★★</span></div>
                      <div className="rating-row"><span>Shrinkage Resistance</span><span>★★★★☆</span></div>
                      <div className="rating-row"><span>Color Fastness</span><span>★★★★★</span></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
