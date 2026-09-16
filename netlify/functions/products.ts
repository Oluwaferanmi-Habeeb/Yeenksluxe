import type { Config } from '@netlify/functions';
import { getStore } from '@netlify/blobs';
import { CATALOG_STORE, json, validateCatalog } from './_shared/catalog';

export default async (request: Request) => {
  if (request.method !== 'GET') return json({ error: 'Method not allowed.' }, 405, { Allow: 'GET' });
  const stored = await getStore({ name: CATALOG_STORE, consistency: 'strong' }).get('products', { type: 'json' });
  const products = validateCatalog(stored);
  if (!products) return json({ products: null }, 404, { 'Cache-Control': 'no-store' });
  return json({ products }, 200, { 'Cache-Control': 'no-store' });
};

export const config: Config = { path: '/api/products', method: ['GET'] };
