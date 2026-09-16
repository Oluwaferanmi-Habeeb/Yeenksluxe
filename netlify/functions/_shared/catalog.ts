export const CATALOG_STORE = 'yeenks-catalog-v1';
export const IMAGE_STORE = 'yeenks-product-images-v1';

export const CATEGORIES = ['Shirts', 'Hoodies', 'Hats', 'Accessories'] as const;
type Category = (typeof CATEGORIES)[number];

export interface CatalogProduct {
  id: string;
  shopifyVariantId: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  gallery?: string[];
  video?: string;
  badge?: string;
  sizes?: string[];
  colors?: string[];
  description?: string;
  features?: string[];
  care?: string[];
  fit?: string;
  colorNames?: Record<string, string>;
  published?: boolean;
}

const text = (value: unknown, max: number) => typeof value === 'string'
  ? value.normalize('NFKC').replace(/[<>\u0000-\u001F\u007F]/g, '').replace(/\s+/g, ' ').trim().slice(0, max)
  : '';

const safeMediaPath = (value: unknown) => {
  const path = text(value, 300);
  return /^(?:\/images\/[^?]+|\/api\/product-image\/[A-Za-z0-9_-]{8,80}|\/videos\/[^?]+)$/.test(path) && !path.includes('..') ? path : '';
};

const stringList = (value: unknown, maxItems: number, maxLength: number) => Array.isArray(value)
  ? value.map(item => text(item, maxLength)).filter(Boolean).slice(0, maxItems)
  : [];

export function validateCatalog(value: unknown): CatalogProduct[] | null {
  if (!Array.isArray(value) || value.length > 150) return null;
  const ids = new Set<string>();
  const products: CatalogProduct[] = [];

  for (const item of value) {
    if (!item || typeof item !== 'object') return null;
    const input = item as Record<string, unknown>;
    const id = text(input.id, 64).toLowerCase().replace(/[^a-z0-9_-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    const name = text(input.name, 140);
    const price = Number(input.price);
    const category = text(input.category, 24) as Category;
    const image = safeMediaPath(input.image);
    if (!id || ids.has(id) || !name || !CATEGORIES.includes(category) || !Number.isInteger(price) || price < 0 || price > 10_000_000 || !image) return null;
    ids.add(id);

    const colors = stringList(input.colors, 12, 16).filter(color => /^#[0-9a-fA-F]{6}$/.test(color));
    const product: CatalogProduct = {
      id,
      shopifyVariantId: text(input.shopifyVariantId, 80) || `ceo-${id}`,
      name,
      price,
      category,
      image,
      published: input.published !== false,
    };
    const gallery = stringList(input.gallery, 8, 300).map(safeMediaPath).filter(Boolean);
    const sizes = stringList(input.sizes, 12, 20);
    const features = stringList(input.features, 10, 180);
    const care = stringList(input.care, 10, 180);
    if (gallery.length) product.gallery = gallery;
    if (sizes.length) product.sizes = sizes;
    if (colors.length) product.colors = colors;
    const description = text(input.description, 280); if (description) product.description = description;
    const badge = text(input.badge, 36); if (badge) product.badge = badge;
    const video = safeMediaPath(input.video); if (video) product.video = video;
    const fit = text(input.fit, 180); if (fit) product.fit = fit;
    if (features.length) product.features = features;
    if (care.length) product.care = care;
    products.push(product);
  }
  return products;
}

export const json = (body: unknown, status = 200, headers: HeadersInit = {}) => new Response(JSON.stringify(body), {
  status,
  headers: { 'Content-Type': 'application/json; charset=utf-8', ...headers },
});

export function sameOrigin(request: Request) {
  const origin = request.headers.get('origin');
  return !origin || origin === new URL(request.url).origin;
}
