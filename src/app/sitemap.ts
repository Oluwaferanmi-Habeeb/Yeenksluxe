import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yeenksluxe.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/shipping', '/returns', '/size-guide', '/privacy', '/cookies', '/terms'];

  return routes.map((route) => ({ url: `${siteUrl}${route}` }));
}
