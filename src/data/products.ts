export interface Product {
  id: string;
  shopifyVariantId: string; // Required for Shopify Cart Permalink checkout
  name: string;
  price: number; // Price in Naira (NGN)
  category: 'Shirts' | 'Hoodies' | 'Hats' | 'Accessories';
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
  colorImages?: Record<string, string>;
  colorGalleries?: Record<string, string[]>;
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
    category: "Shirts",
    image: img("new_prod_6.jpg"),
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000000", "#696969", "#ffffff", "#b59b72", "#8b8d62"],
    colorNames: { "#000000": "Black", "#696969": "Grey", "#ffffff": "White", "#b59b72": "Brown", "#8b8d62": "Olive" },
    colorImages: {
      "#000000": img("new_prod_6.jpg"),
      "#696969": img("WhatsApp Image 2026-07-15 at 1.56.48 PM (4).jpeg"),
      "#ffffff": img("WhatsApp Image 2026-07-15 at 1.56.48 PM (3).jpeg"),
      "#b59b72": img("WhatsApp Image 2026-07-15 at 1.56.49 PM (1).jpeg"),
      "#8b8d62": img("WhatsApp Image 2026-07-15 at 1.56.48 PM.jpeg")
    },
    colorGalleries: {
      "#8b8d62": [img("WhatsApp Image 2026-07-15 at 1.56.48 PM (1).jpeg")]
    }
  {
        id: "shirt-13",
    shopifyVariantId: "45000000000033",
    name: "YĒĒNKSLUXÉ x STEEZY '26 Edition Signature Cap",
    price: 25000,
    category: "Hats",
    image: img("new_prod_1.jpg"),
    gallery: [img("snaptik_7621552137285192981_0_v2.jpeg")],
    sizes: ["One Size"],
    colors: ["#000000", "#ffffff"]
  },
  {
    id: "shirt-14",
    shopifyVariantId: "45000000000035",
    name: "YĒĒNKSLUXÉ x STEEZY ‘26 Edition Oversized Tee",
    price: 35000,
    category: "Shirts",
    image: img("new_prod_3.jpg"),
    gallery: [img("snaptik_7621552137285192981_4_v2.jpeg")],
    sizes: ["S", "M", "L", "XL"],
    colors: ["#ffffff", "#000000"]
  },
  {
    id: "shirt-15",
    shopifyVariantId: "45000000000036",
    name: "YĒĒNKSLUXÉ x STEEZY ‘26 Edition Statement Tee",
    price: 35000,
    category: "Shirts",
    image: img("new_prod_4.jpg"),
    gallery: [img("snaptik_7625367276497292565_1_v2.jpeg")],
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000000"]
  },
  {
    id: "shirt-16",
    shopifyVariantId: "45000000000037",
    name: "YĒĒNKSLUXÉ x STEEZY ‘26 Edition Premium Hoodie",
    price: 45000,
    category: "Hoodies",
    image: img("new_prod_5.jpg"),
    gallery: [img("snaptik_7625367276497292565_2_v2.jpeg")],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["#333333", "#000000"]
  },

  // HOODIES
  {
    id: "hoodie-1",
    shopifyVariantId: "45000000000030",
    name: "YĒĒNKSLUXÉ x STEEZY ’26 Edition Tee",
    price: 35000,
    category: "Shirts",
    image: img("a3548e8a-a0bd-4271-ae46-c588155d8144.jpg"),
    gallery: [img("new_prod_2.jpg")],
    badge: "Campaign",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["#111111", "#ffffff"]
  },
  {
    id: "hoodie-2",
    shopifyVariantId: "45000000000034",
    name: "YĒĒNKSLUXÉ x STEEZY ’26 Edition Steeezy Tee",
    price: 35000,
    category: "Shirts",
    image: img("new_prod_2.jpg"),
    gallery: [img("snaptik_7621552137285192981_3_v2.jpeg")],
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
    gallery: [img("new_prod_6.jpg")],
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000000", "#ffffff"]
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
    gallery: [img("new_prod_1.jpg")],
    sizes: ["One Size"],
    colors: ["#ffffff", "#000000"]
  },
  {
    id: "acc-4",
    shopifyVariantId: "45000000000018",
    name: "YĒĒNKSLUXÉ x STEEZY '26 Edition Tee",
    price: 35000,
    category: "Shirts",
    image: img("d4413ae8-baac-4551-838d-632fd109f35c.jpg"),
    gallery: [img("new_prod_4.jpg")],
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000000", "#ffffff"]
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

  // Items 9 to 12: tanks
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
    gallery: [img("WhatsApp Image 2026-07-15 at 1.56.51 PM (2).jpeg")],
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

export const categories = ['Shirts', 'Hoodies', 'Hats', 'Accessories'] as const;

export function normalizeProductVariants(catalog: Product[]): Product[] {
  const variantIds = new Set(['drop3-06', 'drop3-07', 'drop3-08', 'drop3-09']);
  return catalog.filter(product => !variantIds.has(product.id));
}
