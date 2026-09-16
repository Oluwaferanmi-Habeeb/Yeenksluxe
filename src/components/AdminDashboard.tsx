'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { products as starterProducts, type Product } from '../data/products';
import { useAccount } from '../context/AccountContext';
import AccountPanel from './AccountPanel';

const categories: Product['category'][] = ['Shirts', 'Hoodies', 'Hats', 'Accessories'];
const blankProduct = (): Product => ({
  id: `piece-${Date.now()}`,
  shopifyVariantId: `ceo-${Date.now()}`,
  name: '',
  price: 35000,
  category: 'Shirts',
  image: '',
  sizes: ['S', 'M', 'L', 'XL'],
  colors: ['#000000'],
  published: false,
});

function slug(value: string) {
  return value.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 56);
}

function readList(value: string, maxLength = 20) {
  return value.split(',').map(item => item.trim().slice(0, maxLength)).filter(Boolean).slice(0, 12);
}

export default function AdminDashboard() {
  const { user, ready, identityEnabled, setAccountOpen, signOut } = useAccount();
  const isAdmin = user?.role === 'admin' || user?.roles?.includes('admin');
  const [catalog, setCatalog] = useState<Product[]>(starterProducts);
  const [draft, setDraft] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!isAdmin) return;
    let active = true;
    fetch('/api/admin/products', { headers: { Accept: 'application/json' } })
      .then(async response => {
        const body = await response.json() as { products?: Product[]; error?: string };
        if (!response.ok) throw new Error(body.error || 'Could not load the catalogue.');
        if (active && Array.isArray(body.products) && body.products.length) setCatalog(body.products);
      })
      .catch(error => active && setMessage(error instanceof Error ? error.message : 'Could not load the catalogue.'))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [isAdmin]);

  const publishedCount = useMemo(() => catalog.filter(product => product.published !== false).length, [catalog]);

  const persist = async (nextCatalog: Product[], successMessage: string) => {
    setSaving(true); setMessage('');
    try {
      const response = await fetch('/api/admin/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products: nextCatalog }),
      });
      const body = await response.json() as { products?: Product[]; error?: string };
      if (!response.ok || !body.products) throw new Error(body.error || 'Could not save the catalogue.');
      setCatalog(body.products);
      setDraft(null);
      setMessage(successMessage);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not save the catalogue.');
    } finally { setSaving(false); }
  };

  const saveDraft = async () => {
    if (!draft) return;
    const name = draft.name.trim();
    const id = slug(draft.id || name);
    if (!name || !id || !draft.image) return setMessage('Add a name and a primary image before saving.');
    const next = { ...draft, id, shopifyVariantId: draft.shopifyVariantId || `ceo-${id}`, name };
    const exists = catalog.some(product => product.id === draft.id);
    await persist(exists ? catalog.map(product => product.id === draft.id ? next : product) : [next, ...catalog], exists ? 'Product updated.' : 'Product added as a draft.');
  };

  const removeProduct = async (id: string) => {
    const product = catalog.find(item => item.id === id);
    if (!product || !window.confirm(`Remove “${product.name}” from the catalogue?`)) return;
    await persist(catalog.filter(item => item.id !== id), 'Product removed.');
  };

  const uploadImage = async (file: File, destination: 'image' | 'gallery') => {
    if (!draft) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 4 * 1024 * 1024) {
      setMessage('Use a JPG, PNG or WebP image below 4 MB.'); return;
    }
    setUploading(true); setMessage('');
    try {
      const data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result).split(',')[1] || '');
        reader.onerror = () => reject(new Error('Could not read that image.'));
        reader.readAsDataURL(file);
      });
      const response = await fetch('/api/admin/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mimeType: file.type, data }) });
      const body = await response.json() as { path?: string; error?: string };
      if (!response.ok || !body.path) throw new Error(body.error || 'Image upload failed.');
      const uploadedPath = body.path;
      setDraft(current => !current ? current : destination === 'image'
        ? { ...current, image: uploadedPath }
        : { ...current, gallery: [...(current.gallery || []), uploadedPath].slice(0, 8) });
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Image upload failed.'); }
    finally { setUploading(false); }
  };

  if (!ready) return <main className="admin-page"><p className="admin-loading">Loading secure workspace…</p></main>;

  if (!user) return <main className="admin-page"><section className="admin-gate"><p className="eyebrow">YEENKSLUXE</p><h1>Catalogue desk.</h1><p>Sign in with the CEO account to manage products, pricing and product images.</p>{identityEnabled ? <button className="button button-dark" onClick={() => setAccountOpen(true)}>Sign in <span>↗</span></button> : <p className="admin-notice">Netlify Identity needs to be enabled before this workspace can be used.</p>}</section><AccountPanel /></main>;

  if (!isAdmin) return <main className="admin-page"><section className="admin-gate"><p className="eyebrow">Access restricted</p><h1>Administrator role required.</h1><p>{user.email} is signed in, but is not allowed to manage the catalogue.</p><p className="admin-notice">In Netlify: Project configuration → Identity → Users. Open the CEO account and add the <strong>admin</strong> role.</p><button className="button button-outline" onClick={() => signOut()}>Sign out</button></section></main>;

  return <main className="admin-page">
    <header className="admin-header"><Link href="/" className="admin-wordmark">YEENKSLUXE®</Link><div><span>{user.email}</span><button onClick={() => signOut()}>Sign out</button></div></header>
    <section className="admin-intro"><div><p className="eyebrow">CEO workspace</p><h1>Catalogue desk.</h1><p>Update products here. Saved changes appear in the store without a code edit.</p></div><div className="admin-stats"><strong>{publishedCount}</strong><span>live pieces</span><strong>{catalog.length}</strong><span>total products</span></div></section>
    {message && <p className="admin-flash" role="status">{message}</p>}
    <section className="admin-layout">
      <aside className="admin-products"><div className="admin-list-head"><h2>Products</h2><button onClick={() => { setDraft(blankProduct()); setMessage(''); }}>Add product</button></div>{loading ? <p>Loading catalogue…</p> : catalog.map(product => <article key={product.id} className={draft?.id === product.id ? 'active' : ''}><button onClick={() => { setDraft({ ...product, gallery: [...(product.gallery || [])], sizes: [...(product.sizes || [])], colors: [...(product.colors || [])] }); setMessage(''); }}><span>{product.published === false ? 'Draft' : 'Live'}</span><strong>{product.name}</strong><small>₦{product.price.toLocaleString('en-NG')}</small></button><button className="admin-delete" onClick={() => removeProduct(product.id)} aria-label={`Remove ${product.name}`}>×</button></article>)}</aside>
      <section className="admin-editor">{draft ? <>
        <div className="admin-editor-head"><div><p className="eyebrow">{catalog.some(product => product.id === draft.id) ? 'Edit product' : 'New product'}</p><h2>{draft.name || 'Untitled piece'}</h2></div><label className="admin-publish"><input type="checkbox" checked={draft.published !== false} onChange={event => setDraft({ ...draft, published: event.target.checked })} /> Live in store</label></div>
        <div className="admin-fields">
          <label className="admin-field full"><span>Product name</span><input value={draft.name} maxLength={140} onChange={event => setDraft({ ...draft, name: event.target.value })} placeholder="e.g. Steezy Graphic Tee" /></label>
          <label className="admin-field"><span>Price in Naira</span><input type="number" min="0" step="500" value={draft.price} onChange={event => setDraft({ ...draft, price: Number(event.target.value) || 0 })} /></label>
          <label className="admin-field"><span>Category</span><select value={draft.category} onChange={event => setDraft({ ...draft, category: event.target.value as Product['category'] })}>{categories.map(category => <option key={category}>{category}</option>)}</select></label>
          <label className="admin-field"><span>Sizes, separated by commas</span><input value={(draft.sizes || []).join(', ')} onChange={event => setDraft({ ...draft, sizes: readList(event.target.value) })} placeholder="S, M, L, XL" /></label>
          <label className="admin-field"><span>Colours as hex codes</span><input value={(draft.colors || []).join(', ')} onChange={event => setDraft({ ...draft, colors: readList(event.target.value, 7) })} placeholder="#000000, #ffffff" /></label>
          <label className="admin-field full"><span>Short description</span><textarea value={draft.description || ''} maxLength={280} onChange={event => setDraft({ ...draft, description: event.target.value })} placeholder="Short product description" /></label>
        </div>
        <div className="admin-images"><div><span>Primary image</span>{draft.image ? <img src={draft.image} alt="Product preview" /> : <div className="admin-image-empty">Add a product image</div>}<label className="admin-upload">{uploading ? 'Uploading…' : 'Upload primary image'}<input type="file" accept="image/jpeg,image/png,image/webp" onChange={event => { const file = event.target.files?.[0]; if (file) void uploadImage(file, 'image'); event.currentTarget.value = ''; }} disabled={uploading} /></label></div><div><span>Extra images</span><div className="admin-gallery">{(draft.gallery || []).map((image, index) => <figure key={image}><img src={image} alt="Additional product view" /><button onClick={() => setDraft({ ...draft, gallery: draft.gallery?.filter((_, itemIndex) => itemIndex !== index) })} aria-label="Remove additional image">×</button></figure>)}</div><label className="admin-upload admin-upload-light">Add extra image<input type="file" accept="image/jpeg,image/png,image/webp" onChange={event => { const file = event.target.files?.[0]; if (file) void uploadImage(file, 'gallery'); event.currentTarget.value = ''; }} disabled={uploading || (draft.gallery?.length || 0) >= 8} /></label></div></div>
        <div className="admin-actions"><button className="button button-dark" onClick={() => void saveDraft()} disabled={saving || uploading}>{saving ? 'Saving…' : draft.published === false ? 'Save as draft' : 'Save changes'} <span>↗</span></button><button className="button button-outline" onClick={() => setDraft(null)} disabled={saving}>Cancel</button></div>
      </> : <div className="admin-empty"><h2>Select a product</h2><p>Choose a product from the list or add a new one.</p></div>}</section>
    </section>
  </main>;
}
