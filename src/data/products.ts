export interface Product {
  id: string;
  shopifyVariantId: string; // Required for Shopify Cart Permalink checkout
  name: string;
  description: string;
  price: number;
  category: 'Shirts' | 'Armless Tops' | 'Hats' | 'Accessories';
  image: string;
  gallery?: string[]; // Multi-angle gallery
  video?: string;
  badge?: string;
  sizes?: string[];
  colors?: string[];
}

export const products: Product[] = [
  // ── SHIRTS & TEES (Price: ₦20,000) ──
  {
    id: "shirt-1",
    shopifyVariantId: "45000000000004",
    name: "Signature Graphic Tee",
    description: "Premium 280GSM heavyweight cotton graphic tee with drop shoulder silhouette and screenprinted minimal luxury branding.",
    price: 20000,
    category: "Shirts",
    image: "/images/48f48c19-513c-41ce-9e20-4a7ddc9539da.jpg",
    gallery: ["/images/snaptik_7625367276497292565_0_v2.jpeg"],
    badge: "Limited",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["#000000", "#ffffff"]
  },
  {
    id: "shirt-3",
    shopifyVariantId: "45000000000006",
    name: "Editorial Campaign Tee",
    description: "Signature campaign piece featured in the brand's main editorial shoot. Oversized fit, heavyweight cotton with premium luxury screenprint.",
    price: 20000,
    category: "Shirts",
    image: "/images/a631dacb-ea54-41fe-8b23-7f77fb919746.jpg",
    gallery: ["/images/snaptik_7625367276497292565_2_v2.jpeg"],
    badge: "Campaign",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000000", "#ffffff"]
  },
  {
    id: "shirt-5",
    shopifyVariantId: "45000000000012",
    name: "Signature Rhinestone Tee",
    description: "Heavy cotton tee embellished with hand-placed high-index rhinestone branding across the chest. Engineered for durability and high steeze.",
    price: 20000,
    category: "Shirts",
    image: "/images/24dfb707-3a60-4d06-9eed-adfa96f7af70.jpg",
    badge: "Exclusive",
    sizes: ["M", "L", "XL"],
    colors: ["#000000"]
  },
  {
    id: "shirt-9",
    shopifyVariantId: "45000000000021",
    name: "Minimalist Boxy Shirt",
    description: "Boxy silhouette shirt with a clean, raw look. Perfect for layering and relaxed streetwear steeze.",
    price: 20000,
    category: "Shirts",
    image: "/images/494e40da-2c31-4f83-b377-2a1c917a900d.jpg",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#ffffff", "#000000"]
  },
  {
    id: "shirt-10",
    shopifyVariantId: "45000000000022",
    name: "Luxe Campaign Tee",
    description: "High-density knit luxury tee featuring soft pre-shrunk cotton and front logo branding panel.",
    price: 20000,
    category: "Shirts",
    image: "/images/2636b850-f5d5-40db-a383-bfa29001cdde.jpg",
    badge: "New Drop",
    sizes: ["M", "L", "XL"],
    colors: ["#000000"]
  },
  {
    id: "shirt-11",
    shopifyVariantId: "45000000000023",
    name: "SS26 Editorial Tee",
    description: "Luxury cotton knit tee from the official SS26 runway campaign. Standard relaxed crewneck fit.",
    price: 20000,
    category: "Shirts",
    image: "/images/8b853438-c364-464e-aefc-8eb8368060b9.jpg",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#1a1a1a", "#ffffff"]
  },

  // ── ARMLESS TOPS (Price: ₦30,000) ──
  {
    id: "armless-1",
    shopifyVariantId: "45000000000024",
    name: "Vanguard Armless Top",
    description: "Premium armless tank top styled with raw edge detailing, signature luxury stitching, and a comfortable relaxed cut.",
    price: 30000,
    category: "Armless Tops",
    image: "/images/ca25884a-e701-435e-9a8e-e21ceff2a72c.jpg",
    badge: "Hot Drop",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000000", "#ffffff"]
  },
  {
    id: "armless-2",
    shopifyVariantId: "45000000000025",
    name: "Phantom Armless Tee",
    description: "Sleek, lightweight armless top featuring high-density typography print and distressed hem borders.",
    price: 30000,
    category: "Armless Tops",
    image: "/images/73f7c4aa-02d0-4006-9096-e2f6bb98edfe.jpg",
    sizes: ["M", "L", "XL"],
    colors: ["#111111"]
  },
  {
    id: "armless-3",
    shopifyVariantId: "45000000000026",
    name: "Signature Tank Top",
    description: "High-grade rib-knit luxury tank top with low scoop neckline and gold thread logo embroidery on the back.",
    price: 30000,
    category: "Armless Tops",
    image: "/images/3caca3e0-ce04-4c28-ae7c-9d519ce15f6d.jpg",
    badge: "SS26 Hero",
    sizes: ["S", "M", "L"],
    colors: ["#ffffff", "#000000"]
  },
  {
    id: "armless-4",
    shopifyVariantId: "45000000000027",
    name: "Editorial Armless Vest",
    description: "Designed for modern styling, this heavy cotton armless vest features structured shoulder lines and minimal screenprinting.",
    price: 30000,
    category: "Armless Tops",
    image: "/images/a8ecf932-d5e0-49ac-84bc-597bd8130cd0.jpg",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000000"]
  },
  {
    id: "armless-5",
    shopifyVariantId: "45000000000028",
    name: "Raw Cut Armless Top",
    description: "Raw-edge sleeveless streetwear top in luxury pre-shrunk organic cotton fleece.",
    price: 30000,
    category: "Armless Tops",
    image: "/images/ba2f3141-5495-4b97-a422-97be4c4ae52c.jpg",
    badge: "Exclusive",
    sizes: ["M", "L", "XL"],
    colors: ["#2d2d2d", "#ffffff"]
  },

  // ── HOODIES, JACKETS & OUTERWEAR ──
  {
    id: "shirt-2",
    shopifyVariantId: "45000000000005",
    name: "Phantom Oversized Hoodie",
    description: "Thick double-layered luxury hoodie featuring distressed ribbing, metallic hardware details, and high-density branding.",
    price: 40000,
    category: "Shirts",
    image: "/images/508ddf59-00e6-4fcb-820a-08845c8a4d02.jpg",
    gallery: ["/images/snaptik_7625367276497292565_1_v2.jpeg"],
    badge: "Best Seller",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["#000000", "#333333"]
  },
  {
    id: "hoodie-1",
    shopifyVariantId: "45000000000029",
    name: "Urban Vanguard Hoodie",
    description: "Heavyweight drop-shoulder street hoodie detailed with reinforced stitching and custom utility hardware pullers.",
    price: 40000,
    category: "Shirts",
    image: "/images/a3548e8a-a0bd-4271-ae46-c588155d8144.jpg",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000000", "#1a1a1a"]
  },
  {
    id: "hoodie-2",
    shopifyVariantId: "45000000000030",
    name: "SS26 Campaign Hoodie",
    description: "Runway-featured campaign hoodie featuring high-density graphic print, double-lined hood, and kangaroo pocket details.",
    price: 40000,
    category: "Shirts",
    image: "/images/WhatsApp Image 2026-05-23 at 9.44.46 AM.jpeg",
    gallery: ["/images/WhatsApp Image 2026-05-23 at 9.44.46 AM (1).jpeg"],
    badge: "Campaign",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["#111111", "#ffffff"]
  },
  {
    id: "shirt-6",
    shopifyVariantId: "45000000000013",
    name: "Phantom Knit Sweater",
    description: "Premium cotton-suede blend knitted crewneck with intricate horizontal visual knit detailing and slightly cropped silhouette.",
    price: 40000,
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
    price: 45000,
    category: "Shirts",
    image: "/images/b76c8e3f-a1c4-42cf-8562-f481718d61ea.jpg",
    badge: "Limited Drop",
    sizes: ["M", "L", "XL"],
    colors: ["#0a0a0a", "#1c1c1c"]
  },
  {
    id: "shirt-12",
    shopifyVariantId: "45000000000031",
    name: "Vanguard Canvas Jacket",
    description: "Structured streetwear canvas jacket with contrast panels and metal zip closure. Designed for urban daily wear.",
    price: 45000,
    category: "Shirts",
    image: "/images/625d0334-5f9a-42ac-9dee-51a9bfcf0948.jpg",
    sizes: ["M", "L", "XL"],
    colors: ["#000000", "#333333"]
  },
  {
    id: "shirt-8",
    shopifyVariantId: "45000000000015",
    name: "Monogram Windbreaker",
    description: "Water-resistant matte nylon windbreaker featuring all-over tonal jacquard monogram print, adjustable bungee hems, and mesh lining.",
    price: 45000,
    category: "Shirts",
    image: "/images/1dd03c07-a8d2-4b13-83af-e01286a518a1.jpg",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#050505"]
  },
  {
    id: "shirt-4",
    shopifyVariantId: "45000000000011",
    name: "Vanguard Tracksuit Set",
    description: "Full luxury streetwear tracksuit set. Relaxed fit pullover jacket and matching cargo sweatpants styled with signature metal zippers.",
    price: 85000,
    category: "Shirts",
    image: "/images/b4fb32c7-6ce4-4dff-9ef8-a606e5684c73.jpg",
    gallery: ["/images/1dd03c07-a8d2-4b13-83af-e01286a518a1.jpg"],
    badge: "SS26 Premium",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000000", "#1a1a1a"]
  },

  // ── HATS ──
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
    price: 30000,
    category: "Hats",
    image: "/images/7683c590-dc42-47ec-b0e4-28d748076d05.jpg",
    sizes: ["One Size"],
    colors: ["#111111", "#ffffff"]
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
    price: 50000,
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
    price: 60000,
    category: "Accessories",
    image: "/images/d4413ae8-baac-4551-838d-632fd109f35c.jpg",
    badge: "New Release",
    sizes: ["One Size"],
    colors: ["#000000", "#333333"]
  }
];

export const categories = ['Shirts', 'Armless Tops', 'Hats', 'Accessories'] as const;
