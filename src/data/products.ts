export interface Product {
  id: string;
  shopifyVariantId: string; // Required for Shopify Cart Permalink checkout
  name: string;
  description: string;
  price: number;
  category: 'Shoes' | 'Shirts' | 'Hats' | 'Accessories';
  image: string;
  gallery?: string[]; // Multi-angle gallery
  video?: string;
  badge?: string;
  sizes?: string[];
  colors?: string[];
}

export const products: Product[] = [
  {
    id: "shoe-1",
    shopifyVariantId: "45000000000001", // Placeholder Shopify variant ID, replace with actual Shopify ID
    name: "Chrome Luxury Sneakers",
    description: "Elite luxury sneakers featuring signature gold chrome eyelets and top-grade Italian calfskin leather. Engineered for street comfort and high-fashion aesthetics.",
    price: 155000,
    category: "Shoes",
    image: "/images/yeenksluxe_shoe.jpg",
    gallery: [
      "/images/snaptik_7621552137285192981_0_v2.jpeg",
      "/images/snaptik_7621552137285192981_1_v2.jpeg"
    ],
    badge: "New Drop",
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
    colors: ["#000000", "#d4af37", "#ffffff"]
  },
  {
    id: "shoe-2",
    shopifyVariantId: "45000000000002",
    name: "Vanguard Leather Slides",
    description: "Sleek, black leather slides styled with a micro-embossed logo strap and responsive contoured footbeds. A summer staple re-imagined for luxury.",
    price: 65000,
    category: "Shoes",
    image: "/images/0c681891-3830-45c5-acae-04a813ea84c4.jpg",
    gallery: ["/images/snaptik_7621552137285192981_2_v2.jpeg"],
    badge: "Best Seller",
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    colors: ["#000000", "#1a1a1a"]
  },
  {
    id: "shoe-3",
    shopifyVariantId: "45000000000003",
    name: "Monolith Street Loafers",
    description: "High-performance urban loafers made with premium suede, featuring handmade stitching and durable rubber lug soles.",
    price: 120000,
    category: "Shoes",
    image: "/images/128157e9-e5e5-4d63-801d-235c61e618f4.jpg",
    gallery: ["/images/snaptik_7621552137285192981_3_v2.jpeg"],
    badge: "Sale",
    sizes: ["40", "41", "42", "43", "44", "45"],
    colors: ["#2d2d2d", "#8b4513", "#000000"]
  },
  {
    id: "shirt-1",
    shopifyVariantId: "45000000000004",
    name: "Signature Graphic Tee",
    description: "Premium 280GSM heavyweight cotton graphic tee with drop shoulder silhouette and screenprinted minimal luxury typography.",
    price: 45000,
    category: "Shirts",
    image: "/images/48f48c19-513c-41ce-9e20-4a7ddc9539da.jpg",
    gallery: ["/images/snaptik_7625367276497292565_0_v2.jpeg"],
    badge: "Limited",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["#000000", "#ffffff"]
  },
  {
    id: "shirt-2",
    shopifyVariantId: "45000000000005",
    name: "Phantom Oversized Hoodie",
    description: "Thick double-layered luxury hoodie featuring distressed ribbing, metallic hardware details, and high-density branding.",
    price: 85000,
    category: "Shirts",
    image: "/images/508ddf59-00e6-4fcb-820a-08845c8a4d02.jpg",
    gallery: ["/images/snaptik_7625367276497292565_1_v2.jpeg"],
    badge: "New Drop",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["#000000", "#333333"]
  },
  {
    id: "shirt-3",
    shopifyVariantId: "45000000000006",
    name: "Editorial Campaign Tee",
    description: "Signature campaign piece featured in the brand's main editorial shoot. Oversized fit, heavyweight cotton with premium luxury screenprint.",
    price: 95000,
    category: "Shirts",
    image: "/images/a631dacb-ea54-41fe-8b23-7f77fb919746.jpg",
    gallery: ["/images/snaptik_7625367276497292565_2_v2.jpeg"],
    badge: "Campaign",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000000", "#ffffff"]
  },
  {
    id: "hat-1",
    shopifyVariantId: "45000000000007",
    name: "Monogram Bucket Hat",
    description: "A vintage-inspired streetwear bucket hat in technical nylon canvas with all-over woven monogram detailing.",
    price: 30000,
    category: "Hats",
    image: "/images/ae11ea75-fe56-4d4b-b9aa-ce625f68d750.jpg",
    gallery: ["/images/snaptik_7625367276497292565_3_v2.jpeg"],
    sizes: ["One Size"],
    colors: ["#000000", "#d4af37"]
  },
  {
    id: "hat-2",
    shopifyVariantId: "45000000000008",
    name: "Signature Strapback Cap",
    description: "Adjustable 6-panel strapback cap made from premium twill cotton, embroidered with the signature logo in gold thread.",
    price: 25000,
    category: "Hats",
    image: "/images/c540c115-2167-4cce-a411-6acfcc765a57.jpg",
    badge: "Best Seller",
    sizes: ["One Size"],
    colors: ["#000000", "#ffffff", "#0c2340"]
  },
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
    id: "acc-2",
    shopifyVariantId: "45000000000010",
    name: "Urban Knit Beanie",
    description: "Heavy-ribbed knit beanie designed for slouchy fit and maximum insulation. Embroidered logo label on the cuff.",
    price: 20000,
    category: "Accessories",
    image: "/images/f12d0220-a9fe-437b-b736-64a573bb8193.jpg",
    sizes: ["One Size"],
    colors: ["#000000", "#ffffff"]
  }
];

export const categories = ['All', 'Shoes', 'Shirts', 'Hats', 'Accessories'] as const;
