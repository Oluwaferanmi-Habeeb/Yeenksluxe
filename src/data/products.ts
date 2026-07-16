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
}

// Helper - make sure the image file exists
const img = (filename: string) => `/images/${filename}`;

export const products: Product[] = [
  // ── ORIGINAL COLLECTION ──

  // SHIRTS
  {
    id: "shirt-1",
    shopifyVariantId: "45000000000004",
    name: "YĒĒNKSLUXÉ x STEEZY ‘26 Edition Graphic Tee",
    price: 30000,
    category: "Shirts",
    image: img("48f48c19-513c-41ce-9e20-4a7ddc9539da.jpg"),
    gallery: [img("client_fit_1.jpg")],
    badge: "Limited",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["#000000", "#ffffff"]
  },
  {
    id: "shirt-3",
    shopifyVariantId: "45000000000038",
    name: "YĒĒNKSLUXÉ x STEEZY ‘26 Edition Signature Tank Top",
    price: 30000,
    category: "Shirts",
    image: img("new_prod_6.jpg"),
    gallery: [img("snaptik_7625367276497292565_3_v2.jpeg")],
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000000", "#ffffff"]
  },
  {
    id: "shirt-5",
    shopifyVariantId: "45000000000012",
    name: "YĒĒNKSLUXÉ x STEEZY ‘26 Edition Rhinestone Tee",
    price: 30000,
    category: "Shirts",
    image: img("2636b850-f5d5-40db-a383-bfa29001cdde.jpg"),
    gallery: [img("client_fit_3.jpg")],
    badge: "Exclusive",
    sizes: ["M", "L", "XL"],
    colors: ["#000000"]
  },
  {
    id: "shirt-9",
    shopifyVariantId: "45000000000021",
    name: "YĒĒNKSLUXÉ x STEEZY ‘26 Edition Boxy Shirt",
    price: 30000,
    category: "Shirts",
    image: img("494e40da-2c31-4f83-b377-2a1c917a900d.jpg"),
    gallery: [img("client_fit_4.jpeg")],
    sizes: ["S", "M", "L", "XL"],
    colors: ["#ffffff", "#000000"]
  },
  {
    id: "shirt-11",
    shopifyVariantId: "45000000000023",
    name: "YĒĒNKSLUXÉ x STEEZY ‘26 Edition Editorial Tee",
    price: 30000,
    category: "Shirts",
    image: img("8b853438-c364-464e-aefc-8eb8368060b9.jpg"),
    gallery: [img("snaptik_7621552137285192981_1_v2.jpeg")],
    sizes: ["S", "M", "L", "XL"],
    colors: ["#1a1a1a", "#ffffff"]
  },
  {
    id: "shirt-12",
    shopifyVariantId: "45000000000005",
    name: "YĒĒNKSLUXÉ x MXUNDERSTOOD Tee",
    price: 30000,
    category: "Shirts",
    image: img("c540c115-2167-4cce-a411-6acfcc765a57.jpg"),
    gallery: [img("snaptik_7621552137285192981_2_v2.jpeg")],
    badge: "New Season",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000000", "#ffffff"]
  },
  {
    id: "shirt-13",
    shopifyVariantId: "45000000000033",
    name: "YĒĒNKSLUXÉ x STEEZY ‘26 Edition Fila Tee",
    price: 30000,
    category: "Shirts",
    image: img("new_prod_1.jpg"),
    gallery: [img("snaptik_7621552137285192981_0_v2.jpeg")],
    sizes: ["S", "M", "L", "XL"],
    colors: ["#ffffff", "#000000"]
  },
  {
    id: "shirt-14",
    shopifyVariantId: "45000000000035",
    name: "YĒĒNKSLUXÉ x STEEZY ‘26 Edition Oversized Tee",
    price: 30000,
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
    price: 30000,
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
    name: "YĒĒNKSLUXÉ x STEEZY ‘26 Edition Hoodie",
    price: 35000,
    category: "Hoodies",
    image: img("a3548e8a-a0bd-4271-ae46-c588155d8144.jpg"),
    gallery: [img("new_prod_2.jpg")],
    badge: "Campaign",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["#111111", "#ffffff"]
  },
  {
    id: "hoodie-2",
    shopifyVariantId: "45000000000034",
    name: "YĒĒNKSLUXÉ x STEEZY ‘26 Edition Steeezy Hoodie",
    price: 35000,
    category: "Hoodies",
    image: img("new_prod_2.jpg"),
    gallery: [img("snaptik_7621552137285192981_3_v2.jpeg")],
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["#000000"]
  },

  // HATS
  {
    id: "acc-2",
    shopifyVariantId: "45000000000010",
    name: "Urban Knit Beanie",
    price: 20000,
    category: "Hats",
    image: img("f12d0220-a9fe-437b-b736-64a573bb8193.jpg"),
    gallery: [img("new_prod_6.jpg")],
    sizes: ["One Size"],
    colors: ["#000000", "#ffffff"]
  },

  // ACCESSORIES
  {
    id: "acc-1",
    shopifyVariantId: "45000000000009",
    name: "Gold-Trim Premium Socks",
    price: 15000,
    category: "Accessories",
    image: img("d7d9b8dd-971a-4010-900d-8403c2e44666.jpg"),
    gallery: [img("new_prod_1.jpg")],
    sizes: ["One Size"],
    colors: ["#ffffff", "#000000"]
  },
  {
    id: "acc-4",
    shopifyVariantId: "45000000000018",
    name: "Tactical Utility Bag",
    price: 25000,
    category: "Accessories",
    image: img("d4413ae8-baac-4551-838d-632fd109f35c.jpg"),
    gallery: [img("new_prod_4.jpg")],
    badge: "New Release",
    sizes: ["One Size"],
    colors: ["#000000", "#333333"]
  },

  // ── NEW 28 PRODUCTS (July 15 Drop — WhatsApp Images) ──
  // Distributed across all categories. Rename and re-categorize as needed.

  // Item 1–8: Shirts
  {
    id: "drop3-01",
    shopifyVariantId: "45000000000060",
    name: "SS26 Drop III — Graphic Tee 01",
    price: 30000,
    category: "Shirts",
    image: img("WhatsApp Image 2026-07-15 at 1.56.47 PM (1).jpeg"),
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000000"]
  },
  {
    id: "drop3-02",
    shopifyVariantId: "45000000000061",
    name: "SS26 Drop III — Graphic Tee 02",
    price: 30000,
    category: "Shirts",
    image: img("WhatsApp Image 2026-07-15 at 1.56.47 PM (2).jpeg"),
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000000"]
  },
  {
    id: "drop3-03",
    shopifyVariantId: "45000000000062",
    name: "SS26 Drop III — Graphic Tee 03",
    price: 30000,
    category: "Shirts",
    image: img("WhatsApp Image 2026-07-15 at 1.56.47 PM.jpeg"),
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000000"]
  },
  {
    id: "drop3-04",
    shopifyVariantId: "45000000000063",
    name: "SS26 Drop III — Crew Tee 04",
    price: 30000,
    category: "Shirts",
    image: img("WhatsApp Image 2026-07-15 at 1.56.48 PM (1).jpeg"),
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000000"]
  },
  {
    id: "drop3-05",
    shopifyVariantId: "45000000000064",
    name: "SS26 Drop III — Printed Tee 05",
    price: 30000,
    category: "Shirts",
    image: img("WhatsApp Image 2026-07-15 at 1.56.48 PM (2).jpeg"),
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000000"]
  },
  {
    id: "drop3-06",
    shopifyVariantId: "45000000000065",
    name: "SS26 Drop III — Tee 06",
    price: 30000,
    category: "Shirts",
    image: img("WhatsApp Image 2026-07-15 at 1.56.48 PM (3).jpeg"),
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000000"]
  },
  {
    id: "drop3-07",
    shopifyVariantId: "45000000000066",
    name: "SS26 Drop III — Tee 07",
    price: 30000,
    category: "Shirts",
    image: img("WhatsApp Image 2026-07-15 at 1.56.48 PM (4).jpeg"),
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000000"]
  },
  {
    id: "drop3-08",
    shopifyVariantId: "45000000000067",
    name: "SS26 Drop III — Tee 08",
    price: 30000,
    category: "Shirts",
    image: img("WhatsApp Image 2026-07-15 at 1.56.48 PM.jpeg"),
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000000"]
  },

  // Item 9–14: Hoodies
  {
    id: "drop3-09",
    shopifyVariantId: "45000000000068",
    name: "SS26 Drop III — Hoodie 01",
    price: 35000,
    category: "Hoodies",
    image: img("WhatsApp Image 2026-07-15 at 1.56.49 PM (1).jpeg"),
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["#000000"]
  },
  {
    id: "drop3-10",
    shopifyVariantId: "45000000000069",
    name: "SS26 Drop III — Hoodie 02",
    price: 35000,
    category: "Hoodies",
    image: img("WhatsApp Image 2026-07-15 at 1.56.49 PM (2).jpeg"),
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["#000000"]
  },
  {
    id: "drop3-11",
    shopifyVariantId: "45000000000070",
    name: "SS26 Drop III — Hoodie 03",
    price: 35000,
    category: "Hoodies",
    image: img("WhatsApp Image 2026-07-15 at 1.56.49 PM (3).jpeg"),
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["#000000"]
  },
  {
    id: "drop3-12",
    shopifyVariantId: "45000000000071",
    name: "SS26 Drop III — Hoodie 04",
    price: 35000,
    category: "Hoodies",
    image: img("WhatsApp Image 2026-07-15 at 1.56.49 PM (4).jpeg"),
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["#000000"]
  },
  {
    id: "drop3-13",
    shopifyVariantId: "45000000000072",
    name: "SS26 Drop III — Hoodie 05",
    price: 35000,
    category: "Hoodies",
    image: img("WhatsApp Image 2026-07-15 at 1.56.49 PM.jpeg"),
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["#000000"]
  },
  {
    id: "drop3-14",
    shopifyVariantId: "45000000000073",
    name: "SS26 Drop III — Hoodie 06",
    price: 35000,
    category: "Hoodies",
    image: img("WhatsApp Image 2026-07-15 at 1.56.50 PM (1).jpeg"),
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["#000000"]
  },

  // Item 15–20: Hats
  {
    id: "drop3-15",
    shopifyVariantId: "45000000000074",
    name: "SS26 Drop III — Cap 01",
    price: 25000,
    category: "Hats",
    image: img("WhatsApp Image 2026-07-15 at 1.56.50 PM (2).jpeg"),
    sizes: ["One Size"],
    colors: ["#000000"]
  },
  {
    id: "drop3-16",
    shopifyVariantId: "45000000000075",
    name: "SS26 Drop III — Cap 02",
    price: 25000,
    category: "Hats",
    image: img("WhatsApp Image 2026-07-15 at 1.56.50 PM.jpeg"),
    sizes: ["One Size"],
    colors: ["#000000"]
  },
  {
    id: "drop3-17",
    shopifyVariantId: "45000000000076",
    name: "SS26 Drop III — Cap 03",
    price: 25000,
    category: "Hats",
    image: img("WhatsApp Image 2026-07-15 at 1.56.51 PM (1).jpeg"),
    sizes: ["One Size"],
    colors: ["#000000"]
  },
  {
    id: "drop3-18",
    shopifyVariantId: "45000000000077",
    name: "SS26 Drop III — Cap 04",
    price: 25000,
    category: "Hats",
    image: img("WhatsApp Image 2026-07-15 at 1.56.51 PM (2).jpeg"),
    sizes: ["One Size"],
    colors: ["#000000"]
  },
  {
    id: "drop3-19",
    shopifyVariantId: "45000000000078",
    name: "SS26 Drop III — Cap 05",
    price: 25000,
    category: "Hats",
    image: img("WhatsApp Image 2026-07-15 at 1.56.51 PM.jpeg"),
    sizes: ["One Size"],
    colors: ["#000000"]
  },
  {
    id: "drop3-20",
    shopifyVariantId: "45000000000079",
    name: "SS26 Drop III — Cap 06",
    price: 25000,
    category: "Hats",
    image: img("WhatsApp Image 2026-07-15 at 1.56.52 PM (1).jpeg"),
    sizes: ["One Size"],
    colors: ["#000000"]
  },

  // Item 21–28: Caps (rest of Signature Cap variants)
  {
    id: "drop3-21",
    shopifyVariantId: "45000000000080",
    name: "YĒĒNKSLUXÉ Signature Cap",
    price: 25000,
    category: "Hats",
    image: img("WhatsApp Image 2026-07-15 at 1.56.52 PM (2).jpeg"),
    description: "Top off your look with confidence.",
    features: [
      "Premium cotton construction",
      "High-quality embroidered YĒĒNKSLUXÉ logo",
      "Signature embroidered front patch",
      "Unique metal eyelet detail on the brim",
      "Structured crown for a clean fit",
      "Adjustable strap — one size fits most",
      "Unisex design"
    ],
    care: [
      "Spot clean with a damp cloth",
      "Do not machine wash",
      "Air dry only",
      "Store in a cool, dry place to maintain its shape"
    ],
    fit: "One size fits most — adjustable strap",
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
    description: "Top off your look with confidence.",
    features: [
      "Premium cotton construction",
      "High-quality embroidered YĒĒNKSLUXÉ logo",
      "Signature embroidered front patch",
      "Unique metal eyelet detail on the brim",
      "Structured crown for a clean fit",
      "Adjustable strap — one size fits most",
      "Unisex design"
    ],
    care: [
      "Spot clean with a damp cloth",
      "Do not machine wash",
      "Air dry only",
      "Store in a cool, dry place to maintain its shape"
    ],
    fit: "One size fits most — adjustable strap",
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
    description: "Top off your look with confidence.",
    features: [
      "Premium cotton construction",
      "High-quality embroidered YĒĒNKSLUXÉ logo",
      "Signature embroidered front patch",
      "Unique metal eyelet detail on the brim",
      "Structured crown for a clean fit",
      "Adjustable strap — one size fits most",
      "Unisex design"
    ],
    care: [
      "Spot clean with a damp cloth",
      "Do not machine wash",
      "Air dry only",
      "Store in a cool, dry place to maintain its shape"
    ],
    fit: "One size fits most — adjustable strap",
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
    description: "Top off your look with confidence.",
    features: [
      "Premium cotton construction",
      "High-quality embroidered YĒĒNKSLUXÉ logo",
      "Signature embroidered front patch",
      "Unique metal eyelet detail on the brim",
      "Structured crown for a clean fit",
      "Adjustable strap — one size fits most",
      "Unisex design"
    ],
    care: [
      "Spot clean with a damp cloth",
      "Do not machine wash",
      "Air dry only",
      "Store in a cool, dry place to maintain its shape"
    ],
    fit: "One size fits most — adjustable strap",
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
    description: "Top off your look with confidence.",
    features: [
      "Premium cotton construction",
      "High-quality embroidered YĒĒNKSLUXÉ logo",
      "Signature embroidered front patch",
      "Unique metal eyelet detail on the brim",
      "Structured crown for a clean fit",
      "Adjustable strap — one size fits most",
      "Unisex design"
    ],
    care: [
      "Spot clean with a damp cloth",
      "Do not machine wash",
      "Air dry only",
      "Store in a cool, dry place to maintain its shape"
    ],
    fit: "One size fits most — adjustable strap",
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
    description: "Top off your look with confidence.",
    features: [
      "Premium cotton construction",
      "High-quality embroidered YĒĒNKSLUXÉ logo",
      "Signature embroidered front patch",
      "Unique metal eyelet detail on the brim",
      "Structured crown for a clean fit",
      "Adjustable strap — one size fits most",
      "Unisex design"
    ],
    care: [
      "Spot clean with a damp cloth",
      "Do not machine wash",
      "Air dry only",
      "Store in a cool, dry place to maintain its shape"
    ],
    fit: "One size fits most — adjustable strap",
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
    description: "Top off your look with confidence.",
    features: [
      "Premium cotton construction",
      "High-quality embroidered YĒĒNKSLUXÉ logo",
      "Signature embroidered front patch",
      "Unique metal eyelet detail on the brim",
      "Structured crown for a clean fit",
      "Adjustable strap — one size fits most",
      "Unisex design"
    ],
    care: [
      "Spot clean with a damp cloth",
      "Do not machine wash",
      "Air dry only",
      "Store in a cool, dry place to maintain its shape"
    ],
    fit: "One size fits most — adjustable strap",
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
    description: "Top off your look with confidence.",
    features: [
      "Premium cotton construction",
      "High-quality embroidered YĒĒNKSLUXÉ logo",
      "Signature embroidered front patch",
      "Unique metal eyelet detail on the brim",
      "Structured crown for a clean fit",
      "Adjustable strap — one size fits most",
      "Unisex design"
    ],
    care: [
      "Spot clean with a damp cloth",
      "Do not machine wash",
      "Air dry only",
      "Store in a cool, dry place to maintain its shape"
    ],
    fit: "One size fits most — adjustable strap",
    sizes: ["One Size"],
    colors: ["#000000"],
    colorNames: { "#000000": "Black" }
  }
];

export const categories = ['Shirts', 'Hoodies', 'Hats', 'Accessories'] as const;
