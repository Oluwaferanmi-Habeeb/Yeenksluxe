import type { Config, Context } from '@netlify/functions';
import { getStore } from '@netlify/blobs';
import { IMAGE_STORE } from './_shared/catalog';

export default async (_request: Request, context: Context) => {
  const id = context.params.id;
  if (!id || !/^[A-Za-z0-9_-]{8,80}$/.test(id)) return new Response('Not found', { status: 404 });
  const result = await getStore({ name: IMAGE_STORE }).getWithMetadata(`images/${id}`, { type: 'arrayBuffer' });
  if (!result?.data) return new Response('Not found', { status: 404 });
  const contentType = typeof result.metadata?.contentType === 'string' ? result.metadata.contentType : 'application/octet-stream';
  return new Response(result.data, { headers: { 'Content-Type': contentType, 'Cache-Control': 'public, max-age=31536000, immutable' } });
};

export const config: Config = { path: '/api/product-image/:id', method: ['GET'] };
