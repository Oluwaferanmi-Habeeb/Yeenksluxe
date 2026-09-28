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
    const backupKey = new URL(request.url).searchParams.get('backup');
    const products = await catalogue.get('products', { type: 'json' });
    const snapshots = await catalogue.list({ prefix: 'backups/' });
    const backups = (await Promise.all(snapshots.blobs.map(async blob => {
      const result = await catalogue.getWithMetadata(blob.key, { type: 'json' });
      const value = validateCatalog(result?.data);
      return value ? {
        key: blob.key,
        createdAt: typeof result?.metadata?.createdAt === 'string' ? result.metadata.createdAt : blob.key.slice('backups/'.length, 'backups/'.length + 13),
        productCount: value.length,
      } : null;
    }))).filter((backup): backup is { key: string; createdAt: string; productCount: number } => backup !== null)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    if (backupKey) {
      const backup = backups.find(item => item.key === backupKey);
      if (!backup) return json({ error: 'Backup not found.' }, 404, { 'Cache-Control': 'no-store' });
      const restored = validateCatalog(await catalogue.get(backup.key, { type: 'json' }));
      return restored ? json({ products: restored }, 200, { 'Cache-Control': 'no-store' }) : json({ error: 'Backup not found.' }, 404, { 'Cache-Control': 'no-store' });
    }
    return json({ products: validateCatalog(products), backups }, 200, { 'Cache-Control': 'no-store' });
  }

  if (request.method === 'PUT') {
    const contentLength = Number(request.headers.get('content-length') || 0);
    if (contentLength > 1_000_000) return json({ error: 'Catalogue request is too large.' }, 413);
    let body: unknown;
    try { body = await request.json(); } catch { return json({ error: 'Invalid request body.' }, 400); }
    const payload = body as { products?: unknown; action?: unknown };
    const products = validateCatalog(payload.products);
    if (!products) return json({ error: 'One or more product details are invalid.' }, 422);
    const now = new Date().toISOString();
    const previous = validateCatalog(await catalogue.get('products', { type: 'json' }));
    if (payload.action !== 'restore') {
      if (previous) {
        await catalogue.setJSON(`backups/${Date.now()}-${crypto.randomUUID()}`, previous, {
          metadata: { updatedBy: user.id, createdAt: now },
        });
      }
    }
    await catalogue.setJSON('products', products, { metadata: { updatedBy: user.id, updatedAt: now } });

    const retainedBackups = await catalogue.list({ prefix: 'backups/' });
    const expired = retainedBackups.blobs.sort((a, b) => b.key.localeCompare(a.key)).slice(20);
    await Promise.all(expired.map(blob => catalogue.delete(blob.key)));

    const currentImages = new Set(products.flatMap(product => [product.image, ...(product.gallery || [])])
      .map(path => path.match(/^\/api\/product-image\/([A-Za-z0-9_-]{8,80})$/)?.[1])
      .filter((id): id is string => Boolean(id)));
    const previouslyReferenced = new Set((previous || []).flatMap(product => [product.image, ...(product.gallery || [])])
      .map(path => path.match(/^\/api\/product-image\/([A-Za-z0-9_-]{8,80})$/)?.[1])
      .filter((id): id is string => Boolean(id)));
    const backupPaths = await catalogue.list({ prefix: 'backups/' });
    const backupProducts = await Promise.all(backupPaths.blobs.map(blob => catalogue.get(blob.key, { type: 'json' })));
    const retainedImages = new Set(backupProducts.flatMap(value => validateCatalog(value) || [])
      .flatMap(product => [product.image, ...(product.gallery || [])])
      .map(path => path.match(/^\/api\/product-image\/([A-Za-z0-9_-]{8,80})$/)?.[1])
      .filter((id): id is string => Boolean(id)));
    await Promise.all([...previouslyReferenced].filter(id => !currentImages.has(id) && !retainedImages.has(id))
      .map(id => getStore({ name: IMAGE_STORE, consistency: 'strong' }).delete(`images/${id}`)));
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

