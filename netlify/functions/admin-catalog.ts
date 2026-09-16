import type { Config } from '@netlify/functions';
import { getStore } from '@netlify/blobs';
import { getUser } from '@netlify/identity';
import { CATALOG_STORE, IMAGE_STORE, json, sameOrigin, validateCatalog } from './_shared/catalog';

const MAX_IMAGE_BYTES = 4 * 1024 * 1024;
const allowedTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);

async function requireAdmin(request: Request) {
  if (!sameOrigin(request)) return null;
  const user = await getUser();
  const isAdmin = user?.role === 'admin' || user?.roles?.includes('admin');
  return isAdmin ? user : null;
}

export default async (request: Request) => {
  const user = await requireAdmin(request);
  if (!user) return json({ error: 'Administrator access is required.' }, 403, { 'Cache-Control': 'no-store' });
  const catalogue = getStore({ name: CATALOG_STORE, consistency: 'strong' });

  if (request.method === 'GET') {
    const products = await catalogue.get('products', { type: 'json' });
    return json({ products: validateCatalog(products) }, 200, { 'Cache-Control': 'no-store' });
  }

  if (request.method === 'PUT') {
    const contentLength = Number(request.headers.get('content-length') || 0);
    if (contentLength > 1_000_000) return json({ error: 'Catalogue request is too large.' }, 413);
    let body: unknown;
    try { body = await request.json(); } catch { return json({ error: 'Invalid request body.' }, 400); }
    const products = validateCatalog((body as { products?: unknown })?.products);
    if (!products) return json({ error: 'One or more product details are invalid.' }, 422);
    await catalogue.setJSON('products', products, { metadata: { updatedBy: user.id, updatedAt: new Date().toISOString() } });
    return json({ products });
  }

  if (request.method === 'POST') {
    let body: { mimeType?: unknown; data?: unknown };
    try { body = await request.json(); } catch { return json({ error: 'Invalid image request.' }, 400); }
    const mimeType = typeof body.mimeType === 'string' ? body.mimeType : '';
    const data = typeof body.data === 'string' ? body.data : '';
    if (!allowedTypes.has(mimeType) || !/^[A-Za-z0-9+/=]+$/.test(data)) return json({ error: 'Use a JPG, PNG or WebP image.' }, 422);
    const bytes = Buffer.from(data, 'base64');
    if (!bytes.length || bytes.length > MAX_IMAGE_BYTES) return json({ error: 'Image must be below 4 MB.' }, 413);
    const id = crypto.randomUUID().replace(/-/g, '');
    const imageData = await new Blob([bytes]).arrayBuffer();
    await getStore({ name: IMAGE_STORE, consistency: 'strong' }).set(`images/${id}`, imageData, { metadata: { contentType: mimeType, uploadedBy: user.id, uploadedAt: new Date().toISOString() } });
    return json({ path: `/api/product-image/${id}` }, 201);
  }

  return json({ error: 'Method not allowed.' }, 405, { Allow: 'GET, POST, PUT' });
};

export const config: Config = { path: '/api/admin/products', method: ['GET', 'POST', 'PUT'] };
