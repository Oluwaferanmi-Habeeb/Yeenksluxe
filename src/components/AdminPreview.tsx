import Link from 'next/link';
import { products as starterProducts } from '../data/products';

export default function AdminPreview() {
  const product = starterProducts[0];
  const liveCount = starterProducts.filter(item => item.published !== false).length;

  return <main className="admin-page admin-preview-page">
    <header className="admin-header">
      <Link href="/" className="admin-wordmark">YEENKSLUXE®</Link>
      <span className="admin-preview-label">Read-only preview</span>
    </header>
    <section className="admin-intro">
      <div>
        <p className="eyebrow">CEO workspace preview</p>
        <h1>Catalogue desk.</h1>
        <p>This is how the product-management workspace will look for the CEO. No product or customer data can be changed here.</p>
      </div>
      <div className="admin-stats"><strong>{liveCount}</strong><span>live pieces</span><strong>{starterProducts.length}</strong><span>total products</span></div>
    </section>
    <section className="admin-layout">
      <aside className="admin-products">
        <div className="admin-list-head"><h2>Products</h2><span>Preview only</span></div>
        {starterProducts.slice(0, 8).map((item, index) => <article key={item.id} className={index === 0 ? 'active' : ''}>
          <div><span>{item.published === false ? 'Draft' : 'Live'}</span><strong>{item.name}</strong><small>₦{item.price.toLocaleString('en-NG')}</small></div>
        </article>)}
      </aside>
      <section className="admin-editor">
        <div className="admin-editor-head"><div><p className="eyebrow">Edit product</p><h2>{product.name}</h2></div><span className="admin-publish">Live in store</span></div>
        <div className="admin-fields">
          <div className="admin-field full"><span>Product name</span><strong>{product.name}</strong></div>
          <div className="admin-field"><span>Price in Naira</span><strong>₦{product.price.toLocaleString('en-NG')}</strong></div>
          <div className="admin-field"><span>Category</span><strong>{product.category}</strong></div>
          <div className="admin-field"><span>Sizes</span><strong>{(product.sizes || []).join(', ') || 'Not set'}</strong></div>
          <div className="admin-field"><span>Colours</span><strong>{(product.colors || []).join(', ') || 'Not set'}</strong></div>
          <div className="admin-field full"><span>Short description</span><strong>{product.description || 'Product description'}</strong></div>
        </div>
        <div className="admin-images"><div><span>Primary image</span><img src={product.image} alt={product.name} /></div><div><span>Extra images</span><p className="admin-image-empty">Additional campaign or product views appear here.</p></div></div>
        <div className="admin-actions"><span className="button button-dark">Save changes <span>↗</span></span><Link className="button button-outline" href="/admin">Open secure dashboard</Link></div>
      </section>
    </section>
  </main>;
}
