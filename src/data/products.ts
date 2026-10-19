export interface Product {
  id: string;
  shopifyVariantId: string; // Required for Shopify Cart Permalink checkout
  name: string;
  price: number; // Price in Naira (NGN)
  category: 'Shirts' | 'Tanks' | 'Hoodies' | 'Hats' | 'Accessories';
  image: string;
  gallery?: string[];
  video?: string;
  badge?: string;
  sizes?: string[];
  colors?: string[];
  description?: string;   // Short tagline for the product
  features?: string[];    // Key product features
  care?: string[];        // Care instructions
  fit?: string;           // Fit description (e.g. 'Regular fit, true to size')
  colorNames?: Record<string, string>; // Maps hex → color name (e.g. '#ffffff' → 'White')
  colorImages?: Record<string, string>; // Maps a color hex code to its product image
  colorGalleries?: Record<string, string[]>; // Additional views for each color
  styleVariants?: Product[];
  published?: boolean;
}

// Helper - make sure the image file exists
const img = (filename: string) => `/images/${filename}`;

// Shared constants for Signature Caps to avoid duplication
const CAP_FEATURES: string[] = [
  "Premium cotton construction",
  "High-quality embroidered YĒĒNKSLUXÉ logo",
  "Signature embroidered front patch",
  "Unique metal eyelet detail on the brim",
  "Structured crown for a clean fit",
  "Adjustable strap, one size fits most",
  "Unisex design"
];

const CAP_CARE: string[] = [
  "Spot clean with a damp cloth",
  "Do not machine wash",
  "Air dry only",
  "Store in a cool, dry place to maintain its shape"
];

const CAP_FIT = "One size fits most, adjustable strap";

export const products: Product[] = [
  // ── ORIGINAL COLLECTION ──

  // SHIRTS
  {
    id: "shirt-3",
    shopifyVariantId: "45000000000038",
    name: "YĒĒNKSLUXÉ x STEEZY ‘26 Edition Signature Tank Top",
    description: "Graphic tank top.",
    price: 30000,
    category: "Tanks",
    image: img("new_prod_6.jpg"),
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000000", "#ffffff", "#c9b99d", "#8b8d62"],
    colorNames: { "#000000": "Black", "#ffffff": "White", "#c9b99d": "Sand", "#8b8d62": "Olive" },
    colorImages: {
      "#000000": img("new_prod_6.jpg"),
      "#ffffff": img("WhatsApp Image 2026-07-15 at 1.56.48 PM (3).jpeg"),
      "#c9b99d": img("WhatsApp Image 2026-07-15 at 1.56.49 PM (1).jpeg"),
      "#8b8d62": img("WhatsApp Image 2026-07-15 at 1.56.48 PM.jpeg")
    },
    colorGalleries: {
      "#8b8d62": [img("WhatsApp Image 2026-07-15 at 1.56.48 PM (1).jpeg")]
    }
  },
  {
        id: "shirt-13",
    shopifyVariantId: "45000000000033",
    name: "YĒĒNKSLUXÉ x STEEZY '26 Edition Signature Cap",
    price: 25000,
    category: "Hats",
    image: img("new_prod_1.jpg"),
    gallery: [img("snaptik_7621552137285192981_0_v2.jpeg")],
    sizes: ["One Size"],
    colors: ["#000000"]
  },
  {
    id: "shirt-14",
    shopifyVariantId: "45000000000035",
    name: "YĒĒNKSLUXÉ x STEEZY ‘26 Edition Oversized Tee",
    price: 35000,
    category: "Shirts",
    image: img("WhatsApp Image 2026-07-15 at 1.56.49 PM.jpeg"),
    gallery: [],
    sizes: ["S", "M", "L", "XL"],
    colors: ["#696969"],
    colorNames: { "#696969": "Grey" },
    colorImages: { "#696969": img("WhatsApp Image 2026-07-15 at 1.56.49 PM.jpeg") }
  },
  {
    id: "shirt-15",
    shopifyVariantId: "45000000000036",
    name: "YĒĒNKSLUXÉ x STEEZY ‘26 Edition Statement Tee",
    price: 35000,
    category: "Shirts",
    image: img("snaptik_7625367276497292565_1_v2.jpeg"),
    gallery: [],
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000000"],
    colorNames: { "#000000": "Black" }
  },
  {
    id: "shirt-16",
    shopifyVariantId: "45000000000037",
    name: "YĒĒNKSLUXÉ x STEEZY ‘26 Edition Premium Hoodie",
    price: 45000,
    category: "Hoodies",
    image: img("new_prod_5.jpg"),
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["#000000"]
  },

  // HOODIES
  {
    id: "hoodie-1",
    shopifyVariantId: "45000000000030",
    name: "YĒĒNKSLUXÉ x STEEZY ’26 Edition Tee",
    price: 35000,
    category: "Shirts",
    image: img("a3548e8a-a0bd-4271-ae46-c588155d8144.jpg"),
    gallery: [],
    badge: "Campaign",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["#111111"]
  },
  {
    id: "hoodie-2",
    shopifyVariantId: "45000000000034",
    name: "YĒĒNKSLUXÉ x STEEZY ’26 Edition Steeezy Tee",
    price: 35000,
    category: "Shirts",
    image: img("snaptik_7625367276497292565_0_v2.jpeg"),
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["#000000"]
  },
// HATS
  {
    id: "acc-2",
    shopifyVariantId: "45000000000010",
    name: "YĒĒNKSLUXÉ x STEEZY x MXUNDERSTOOD Edition Tee",
    price: 35000,
    category: "Shirts",
    image: img("f12d0220-a9fe-437b-b736-64a573bb8193.jpg"),
    gallery: [],
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000000"]
  },

  // ACCESSORIES
  {
    id: "acc-1",
    shopifyVariantId: "45000000000009",
    name: "YĒĒNKSLUXÉ x MXUNDERSTOOD Signature Hat",
    description: "Signature Yeenksluxe cap.",
    features: CAP_FEATURES,
    care: CAP_CARE,
    fit: CAP_FIT,
    price: 25000,
    category: "Hats",
    image: img("d7d9b8dd-971a-4010-900d-8403c2e44666.jpg"),
    sizes: ["One Size"],
    colors: ["#000000"]
  },
  {
    id: "acc-4",
    shopifyVariantId: "45000000000018",
    name: "YĒĒNKSLUXÉ x STEEZY '26 Edition Tee",
    price: 35000,
    category: "Shirts",
    image: img("d4413ae8-baac-4551-838d-632fd109f35c.jpg"),
    gallery: [],
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000000"]
  },

  // New 28 products (July 15 WhatsApp images)
  // Distributed across all categories. Rename and re-categorize as needed.

  // Items 1 to 8: shirts

  {
    id: "drop3-03",
    shopifyVariantId: "45000000000062",
    name: "YĒĒNKSLUXÉ x STEEZY '26 Edition Graphic Hoodie",
    price: 45000,
    category: "Hoodies",
    image: img("WhatsApp Image 2026-07-15 at 1.56.47 PM.jpeg"),
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["#000000"]
  },
  {
    id: "drop3-05",
    shopifyVariantId: "45000000000064",
    name: "YĒĒNKSLUXÉ x STEEZY '26 Edition Printed Hoodie",
    description: "Printed hoodie.",
    price: 45000,
    category: "Hoodies",
    image: img("WhatsApp Image 2026-07-15 at 1.56.48 PM (2).jpeg"),
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["#000000"]
  },
  {
    id: "drop3-07",
    shopifyVariantId: "45000000000066",
    name: "YĒĒNKSLUXÉ x STEEZY '26 Edition Slim Tank",
    description: "Slim tank top.",
    price: 30000,
    category: "Tanks",
    image: img("WhatsApp Image 2026-07-15 at 1.56.48 PM (4).jpeg"),
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000000"]
  },
  {
    id: "drop3-08",
    shopifyVariantId: "45000000000067",
    name: "YĒĒNKSLUXÉ x STEEZY Graphic Tank",
    description: "Graphic tank top.",
    price: 30000,
    category: "Tanks",
    image: img("WhatsApp Image 2026-07-15 at 1.56.48 PM.jpeg"),
    gallery: [img("WhatsApp Image 2026-07-15 at 1.56.48 PM (1).jpeg")],
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000000"]
  },

  // Items 9 to 12: tanks
  {
    id: "drop3-09",
    shopifyVariantId: "45000000000068",
    name: "YĒĒNKSLUXÉ x STEEZY '26 Edition Sleeveless Tank",
    description: "Sleeveless tank top.",
    price: 30000,
    category: "Tanks",
    image: img("WhatsApp Image 2026-07-15 at 1.56.49 PM (1).jpeg"),
    video: "/videos/cream-tank.mp4.b64",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["#000000"]
  },
  // Items 15 to 20: hats

  // Items 21 to 28: remaining signature cap variants
  {
    id: "drop3-21",
    shopifyVariantId: "45000000000080",
    name: "YĒĒNKSLUXÉ Signature Cap",
    price: 25000,
    category: "Hats",
    image: img("WhatsApp Image 2026-07-15 at 1.56.52 PM (2).jpeg"),
    description: "Signature Yeenksluxe cap.",
    features: CAP_FEATURES,
    care: CAP_CARE,
    fit: CAP_FIT,
    sizes: ["One Size"],
    colors: ["#000000"],
    colorNames: { "#000000": "Black" }
  },
  {
    id: "drop3-22",
    shopifyVariantId: "45000000000081",
    name: "YĒĒNKSLUXÉ Signature Cap",
    price: 25000,
    category: "Hats",
    image: img("WhatsApp Image 2026-07-15 at 1.56.52 PM.jpeg"),
    description: "Signature Yeenksluxe cap.",
    features: CAP_FEATURES,
    care: CAP_CARE,
    fit: CAP_FIT,
    sizes: ["One Size"],
    colors: ["#000000"],
    colorNames: { "#000000": "Black" }
  },
  {
    id: "drop3-23",
    shopifyVariantId: "45000000000082",
    name: "YĒĒNKSLUXÉ Signature Cap",
    price: 25000,
    category: "Hats",
    image: img("WhatsApp Image 2026-07-15 at 1.56.53 PM (1).jpeg"),
    description: "Signature Yeenksluxe cap.",
    features: CAP_FEATURES,
    care: CAP_CARE,
    fit: CAP_FIT,
    sizes: ["One Size"],
    colors: ["#000000"],
    colorNames: { "#000000": "Black" }
  },
  {
    id: "drop3-24",
    shopifyVariantId: "45000000000083",
    name: "YĒĒNKSLUXÉ Signature Cap",
    price: 25000,
    category: "Hats",
    image: img("WhatsApp Image 2026-07-15 at 1.56.53 PM.jpeg"),
    description: "Signature Yeenksluxe cap.",
    features: CAP_FEATURES,
    care: CAP_CARE,
    fit: CAP_FIT,
    sizes: ["One Size"],
    colors: ["#000000"],
    colorNames: { "#000000": "Black" }
  },
  {
    id: "drop3-25",
    shopifyVariantId: "45000000000084",
    name: "YĒĒNKSLUXÉ Signature Cap",
    price: 25000,
    category: "Hats",
    image: img("WhatsApp Image 2026-07-15 at 1.56.54 PM.jpeg"),
    description: "Signature Yeenksluxe cap.",
    features: CAP_FEATURES,
    care: CAP_CARE,
    fit: CAP_FIT,
    sizes: ["One Size"],
    colors: ["#000000"],
    colorNames: { "#000000": "Black" }
  },
  {
    id: "drop3-26",
    shopifyVariantId: "45000000000085",
    name: "YĒĒNKSLUXÉ Signature Cap",
    price: 25000,
    category: "Hats",
    image: img("WhatsApp Image 2026-07-15 at 1.56.55 PM (1).jpeg"),
    description: "Signature Yeenksluxe cap.",
    features: CAP_FEATURES,
    care: CAP_CARE,
    fit: CAP_FIT,
    sizes: ["One Size"],
    colors: ["#000000"],
    colorNames: { "#000000": "Black" }
  },
  {
    id: "drop3-27",
    shopifyVariantId: "45000000000086",
    name: "YĒĒNKSLUXÉ Signature Cap",
    price: 25000,
    category: "Hats",
    image: img("WhatsApp Image 2026-07-15 at 1.56.55 PM.jpeg"),
    description: "Signature Yeenksluxe cap.",
    features: CAP_FEATURES,
    care: CAP_CARE,
    fit: CAP_FIT,
    sizes: ["One Size"],
    colors: ["#000000"],
    colorNames: { "#000000": "Black" }
  },
  {
    id: "drop3-28",
    shopifyVariantId: "45000000000087",
    name: "YĒĒNKSLUXÉ Signature Cap",
    price: 25000,
    category: "Hats",
    image: img("WhatsApp Image 2026-07-15 at 1.56.56 PM.jpeg"),
    description: "Signature Yeenksluxe cap.",
    features: CAP_FEATURES,
    care: CAP_CARE,
    fit: CAP_FIT,
    sizes: ["One Size"],
    colors: ["#000000"],
    colorNames: { "#000000": "Black" }
  }
];

// Shared constants for Signature Caps to avoid duplication

export const categories = ['Shirts', 'Tanks', 'Hoodies', 'Hats', 'Accessories'] as const;

export function normalizeProductVariants(catalog: Product[]): Product[] {
  const signatureTank = catalog.find(product => product.id === 'shirt-3');
  if (!signatureTank) return catalog;

  const tankIds = new Set(['shirt-3', 'shirt-14', 'drop3-07', 'drop3-08', 'drop3-09']);
  const slimTank = catalog.find(product => product.id === 'drop3-07');
  const tankBase = products.find(product => product.id === 'shirt-3') || signatureTank;
  const tankStyles: Product[] = [];
  if (signatureTank.published !== false) tankStyles.push({
    ...tankBase,
    ...signatureTank,
    category: 'Tanks',
    image: tankBase.image,
    colors: tankBase.colors,
    colorNames: tankBase.colorNames,
    colorImages: tankBase.colorImages,
    colorGalleries: tankBase.colorGalleries,
  });
  if (slimTank && slimTank.published !== false) tankStyles.push({ ...slimTank, category: 'Tanks' });
  const mergedTank: Product = {
    ...signatureTank,
    id: 'steezy-tanks',
    name: 'YĒĒNKSLUXÉ x STEEZY Tank Tops',
    category: 'Tanks',
    image: tankBase.image,
    colors: tankBase.colors,
    colorNames: tankBase.colorNames,
    colorImages: tankBase.colorImages,
    colorGalleries: tankBase.colorGalleries,
    styleVariants: tankStyles,
    published: tankStyles.length > 0,
  };

  const teeIds = new Set(['shirt-15', 'hoodie-1', 'hoodie-2', 'acc-2', 'acc-4']);
  const teeStyles = catalog.filter(product => teeIds.has(product.id) && product.published !== false).map(product => {
    if (product.id === 'shirt-15') return { ...product, image: img('snaptik_7625367276497292565_1_v2.jpeg'), gallery: [], colors: ['#000000'] };
    if (product.id === 'hoodie-1') return { ...product, image: img('a3548e8a-a0bd-4271-ae46-c588155d8144.jpg'), gallery: [], colors: ['#111111'] };
    if (product.id === 'hoodie-2') return { ...product, image: img('snaptik_7625367276497292565_0_v2.jpeg'), gallery: [img('snaptik_7625367276497292565_2_v2.jpeg')], colors: ['#000000'] };
    if (product.id === 'acc-2') return { ...product, image: img('f12d0220-a9fe-437b-b736-64a573bb8193.jpg'), gallery: [], colors: ['#000000'] };
    return { ...product, image: img('d4413ae8-baac-4551-838d-632fd109f35c.jpg'), gallery: [], colors: ['#000000'] };
  });
  const firstTee = teeStyles[0];
  const groupedTees: Product | null = firstTee ? {
    ...firstTee,
    id: 'steezy-tees',
    name: 'YĒĒNKSLUXÉ x STEEZY Tees',
    category: 'Shirts',
    styleVariants: teeStyles,
  } : null;

  const selectedCapIds = new Set(['drop3-23', 'drop3-24', 'drop3-25', 'drop3-26', 'drop3-28']);
  const hiddenCapIds = new Set([...selectedCapIds, 'shirt-13', 'acc-1', 'drop3-21', 'drop3-22', 'drop3-27']);
  const caps = catalog.filter(product => selectedCapIds.has(product.id) && product.published !== false);
  const patchCap = caps.find(product => product.id === 'drop3-23');
  const capImage = (id: string) => products.find(product => product.id === id)?.image;
  const mergedCap: Product | null = patchCap ? {
    ...patchCap,
    colors: ['#d2bd9a', '#c66b2f', '#111111', '#737b55', '#f2aa00'],
    colorNames: {
      '#d2bd9a': 'Sand / brown',
      '#c66b2f': 'Rust / navy',
      '#111111': 'Black',
      '#737b55': 'Olive / black',
      '#f2aa00': 'Yellow',
    },
    colorImages: {
      '#d2bd9a': capImage('drop3-23') || patchCap.image,
      '#c66b2f': capImage('drop3-24') || patchCap.image,
      '#111111': capImage('drop3-25') || patchCap.image,
      '#737b55': capImage('drop3-26') || patchCap.image,
      '#f2aa00': img('WhatsApp Image 2026-07-15 at 1.56.52 PM (1).jpeg'),
    },
    colorGalleries: {
      '#d2bd9a': [capImage('drop3-28')].filter((image): image is string => Boolean(image)),
    },
  } : null;

  const hiddenIds = new Set([...tankIds, ...teeIds, ...hiddenCapIds, 'shirt-15']);
  return catalog.flatMap(product => {
    if (product.id === 'shirt-3') return [mergedTank];
    if (product.id === 'shirt-15') return groupedTees ? [groupedTees] : [];
    if (product.id === 'drop3-23') return mergedCap ? [mergedCap] : [];
    if (hiddenIds.has(product.id)) return [];
    if (product.id === 'shirt-13') return [{ ...product, colors: ['#000000'], colorNames: { '#000000': 'Black' } }];
    if (product.id === 'shirt-16') return [{ ...product, gallery: [] }];
    if (product.id === 'acc-1') return [{ ...product, gallery: [], colors: ['#000000'], colorNames: { '#000000': 'Black' } }];
    return [product];
  });
}

