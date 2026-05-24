export interface Product {
  id: string;
  shopifyVariantId: string; // Required for Shopify Cart Permalink checkout
  name: string;
  description: string;
  price: number;
  category: 'Shirts' | 'Hoodies' | 'Hats' | 'Accessories';
  image: string;
  gallery?: string[]; // Multi-angle gallery
  video?: string;
  badge?: string;
  sizes?: string[];
  colors?: string[];
}

export const products: Product[] = [
  // ── TOPS / SHIRTS & TEES (Price: ₦35,000) ──
  {
    id: "shirt-1",
    shopifyVariantId: "45000000000004",
    name: "YĒĒNKSLUXÉ x STEEZY ‘26 Edition Graphic Tee",
    description: "Premium 280GSM heavyweight cotton graphic tee with drop shoulder silhouette and screenprinted minimal luxury branding.",
    price: 35000,
    category: "Shirts",
    image: "/images/48f48c19-513c-41ce-9e20-4a7ddc9539da.jpg",
    badge: "Limited",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["#000000", "#ffffff"]
  },
  {
    id: "shirt-3",
    shopifyVariantId: "45000000000006",
    name: "YĒĒNKSLUXÉ x STEEZY ‘26 Edition Campaign Tee",
    description: "Signature campaign piece featured in the brand's main editorial shoot. Oversized fit, heavyweight cotton with premium luxury screenprint.",
    price: 35000,
    category: "Shirts",
    image: "/images/a631dacb-ea54-41fe-8b23-7f77fb919746.jpg",
    badge: "Campaign",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000000", "#ffffff"]
  },
  {
    id: "shirt-5",
    shopifyVariantId: "45000000000012",
    name: "YĒĒNKSLUXÉ x STEEZY ‘26 Edition Rhinestone Tee",
    description: "Heavy cotton tee embellished with hand-placed high-index rhinestone branding across the chest. Engineered for durability and high steeze.",
    price: 35000,
    category: "Shirts",
    image: "/images/2636b850-f5d5-40db-a383-bfa29001cdde.jpg",
    badge: "Exclusive",
    sizes: ["M", "L", "XL"],
    colors: ["#000000"]
  },
  {
    id: "shirt-9",
    shopifyVariantId: "45000000000021",
    name: "YĒĒNKSLUXÉ x STEEZY ‘26 Edition Boxy Shirt",
    description: "Boxy silhouette shirt with a clean, raw look. Perfect for layering and relaxed streetwear steeze.",
    price: 35000,
    category: "Shirts",
    image: "/images/494e40da-2c31-4f83-b377-2a1c917a900d.jpg",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#ffffff", "#000000"]
  },
  {
    id: "shirt-11",
    shopifyVariantId: "45000000000023",
    name: "YĒĒNKSLUXÉ x STEEZY ‘26 Edition Editorial Tee",
    description: "Luxury cotton knit tee from the official SS26 runway campaign. Standard relaxed crewneck fit.",
    price: 35000,
    category: "Shirts",
    image: "/images/8b853438-c364-464e-aefc-8eb8368060b9.jpg",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#1a1a1a", "#ffffff"]
  },
  {
    id: "shirt-12",
    shopifyVariantId: "45000000000005",
    name: "YĒĒNKSLUXÉ x STEEZY ‘26 Edition Inscription Tee",
    description: "Premium signature t-shirt detailed with the iconic collection logo print.",
    price: 35000,
    category: "Shirts",
    image: "/images/c540c115-2167-4cce-a411-6acfcc765a57.jpg",
    badge: "New Season",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000000", "#ffffff"]
  },

  // ── TOPS / HOODIES (Price: ₦45,000) ──
  {
    id: "hoodie-1",
    shopifyVariantId: "45000000000030",
    name: "YĒĒNKSLUXÉ x STEEZY ‘26 Edition Hoodie",
    description: "Runway-featured campaign hoodie featuring high-density graphic print, double-lined hood, and kangaroo pocket details.",
    price: 45000,
    category: "Hoodies",
    image: "/images/a3548e8a-a0bd-4271-ae46-c588155d8144.jpg",
    badge: "Campaign",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["#111111", "#ffffff"]
  },

  // ── CAPS & HATS ──
  {
    id: "acc-2",
    shopifyVariantId: "45000000000010",
    name: "Urban Knit Beanie",
    description: "Heavy-ribbed knit beanie designed for slouchy fit and maximum insulation. Embroidered logo label on the cuff.",
    price: 20000,
    category: "Hats",
    image: "/images/f12d0220-a9fe-437b-b736-64a573bb8193.jpg",
    sizes: ["One Size"],
    colors: ["#000000", "#ffffff"]
  },

  // ── ACCESSORIES ──
  {
    id: "acc-1",
    shopifyVariantId: "45000000000009",
    name: "Gold-Trim Premium Socks",
    description: "Woven organic cotton socks featuring double-cushioning and signature gold-lurex stripe detailing.",
    price: 15000,
    category: "Accessories",
    image: "/images/d7d9b8dd-971a-4010-900d-8403c2e44666.jpg",
    sizes: ["One Size"],
    colors: ["#ffffff", "#000000"]
  },
  {
    id: "acc-4",
    shopifyVariantId: "45000000000018",
    name: "Tactical Utility Bag",
    description: "Heavy-duty tech nylon chest rig with modular webbing straps, water-repellent zippers, and gold hardware buckles.",
    price: 60000,
    category: "Accessories",
    image: "/images/d4413ae8-baac-4551-838d-632fd109f35c.jpg",
    badge: "New Release",
    sizes: ["One Size"],
    colors: ["#000000", "#333333"]
  }
];

export const categories = ['Shirts', 'Hoodies', 'Hats', 'Accessories'] as const;
