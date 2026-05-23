export interface Product {
  id: string;
  shopifyVariantId: string; // Required for Shopify Cart Permalink checkout
  name: string;
  description: string;
  price: number;
  category: 'Shirts' | 'Hats' | 'Accessories';
  image: string;
  gallery?: string[]; // Multi-angle gallery
  video?: string;
  badge?: string;
  sizes?: string[];
  colors?: string[];
}

export const products: Product[] = [
  {
    id: "shirt-1",
    shopifyVariantId: "45000000000004",
    name: "Signature Graphic Tee",
    description: "Premium 280GSM heavyweight cotton graphic tee with drop shoulder silhouette and screenprinted minimal luxury branding.",
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
    badge: "Best Seller",
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
    id: "shirt-4",
    shopifyVariantId: "45000000000011",
    name: "Vanguard Tracksuit Set",
    description: "Full luxury streetwear tracksuit set. Relaxed fit pullover jacket and matching cargo sweatpants styled with signature metal zippers.",
    price: 185000,
    category: "Shirts",
    image: "/images/b4fb32c7-6ce4-4dff-9ef8-a606e5684c73.jpg",
    gallery: ["/images/1dd03c07-a8d2-4b13-83af-e01286a518a1.jpg"],
    badge: "SS26 Premium",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000000", "#1a1a1a"]
  },
  {
    id: "shirt-5",
    shopifyVariantId: "45000000000012",
    name: "Signature Rhinestone Tee",
    description: "Heavy cotton tee embellished with hand-placed high-index rhinestone branding across the chest. Engineered for durability and high steeze.",
    price: 95000,
    category: "Shirts",
    image: "/images/24dfb707-3a60-4d06-9eed-adfa96f7af70.jpg",
    badge: "Exclusive",
    sizes: ["M", "L", "XL"],
    colors: ["#000000"]
  },
  {
    id: "shirt-6",
    shopifyVariantId: "45000000000013",
    name: "Phantom Knit Sweater",
    description: "Premium cotton-suede blend knitted crewneck with intricate horizontal visual knit detailing and slightly cropped silhouette.",
    price: 145000,
    category: "Shirts",
    image: "/images/4ee1cda2-5c57-4889-b018-deb09bd83deb.jpg",
    badge: "New Season",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#1a1a1a", "#2b2b2b"]
  },
  {
    id: "shirt-7",
    shopifyVariantId: "45000000000014",
    name: "Distressed Denim Jacket",
    description: "Heavyweight 14oz Japanese denim jacket featuring distressed raw edge detailing, custom embossed metal buttons, and back branding panel.",
    price: 220000,
    category: "Shirts",
    image: "/images/b76c8e3f-a1c4-42cf-8562-f481718d61ea.jpg",
    badge: "Limited Drop",
    sizes: ["M", "L", "XL"],
    colors: ["#0a0a0a", "#1c1c1c"]
  },
  {
    id: "shirt-8",
    shopifyVariantId: "45000000000015",
    name: "Monogram Windbreaker",
    description: "Water-resistant matte nylon windbreaker featuring all-over tonal jacquard monogram print, adjustable bungee hems, and mesh lining.",
    price: 175000,
    category: "Shirts",
    image: "/images/1dd03c07-a8d2-4b13-83af-e01286a518a1.jpg",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#050505"]
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
    colors: ["#000000", "#ffffff"]
  },
  {
    id: "hat-3",
    shopifyVariantId: "45000000000016",
    name: "SS26 Campaign Cap",
    description: "Distressed raw-edge cotton cap with embroidered collection branding and adjustable metal slide back closure.",
    price: 35000,
    category: "Hats",
    image: "/images/7683c590-dc42-47ec-b0e4-28d748076d05.jpg",
    sizes: ["One Size"],
    colors: ["#111111", "#ffffff"]
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
  },
  {
    id: "acc-3",
    shopifyVariantId: "45000000000017",
    name: "Luxe Leather Belt",
    description: "Top-grain calfskin leather belt detailed with signature gold chrome metal buckle and engraved branding.",
    price: 85000,
    category: "Accessories",
    image: "/images/654912a1-3e02-4f9d-9e64-c51e6ddb720b.jpg",
    badge: "Exclusive",
    sizes: ["85", "90", "95", "100"],
    colors: ["#000000", "#8b4513"]
  },
  {
    id: "acc-4",
    shopifyVariantId: "45000000000018",
    name: "Tactical Utility Bag",
    description: "Heavy-duty tech nylon chest rig with modular webbing straps, water-repellent zippers, and gold hardware buckles.",
    price: 120000,
    category: "Accessories",
    image: "/images/d4413ae8-baac-4551-838d-632fd109f35c.jpg",
    badge: "New Release",
    sizes: ["One Size"],
    colors: ["#000000", "#333333"]
  }
];

export const categories = ['Shirts', 'Hats', 'Accessories'] as const;
