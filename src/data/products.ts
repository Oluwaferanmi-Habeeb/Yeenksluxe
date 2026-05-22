export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Shoes' | 'Shirts' | 'Hats' | 'Accessories';
  image: string;
  video?: string;
  badge?: string;
  sizes?: string[];
  colors?: string[];
}

export const products: Product[] = [
  {
    id: "shoe-1",
    name: "Chrome Luxury Sneakers",
    description: "Elite luxury sneakers featuring signature gold chrome eyelets and top-grade Italian calfskin leather. Engineered for street comfort and high-fashion aesthetics.",
    price: 155000,
    category: "Shoes",
    image: "/images/WhatsApp Image 2026-05-12 at 10.30.43 AM.jpeg",
    video: "/images/WhatsApp Video 2026-05-12 at 10.30.42 AM.mp4",
    badge: "New Drop",
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
    colors: ["#000000", "#d4af37", "#ffffff"]
  },
  {
    id: "shoe-2",
    name: "Vanguard Leather Slides",
    description: "Sleek, black leather slides styled with a micro-embossed logo strap and responsive contoured footbeds. A summer staple re-imagined for luxury.",
    price: 65000,
    category: "Shoes",
    image: "/images/WhatsApp Image 2026-05-12 at 10.30.44 AM (1).jpeg",
    video: "/images/WhatsApp Video 2026-05-12 at 10.30.53 AM.mp4",
    badge: "Best Seller",
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    colors: ["#000000", "#1a1a1a"]
  },
  {
    id: "shoe-3",
    name: "Monolith Street Loafers",
    description: "High-performance urban loafers made with premium suede, featuring handmade stitching and durable rubber lug soles.",
    price: 120000,
    category: "Shoes",
    image: "/images/WhatsApp Image 2026-05-12 at 10.30.44 AM.jpeg",
    video: "/images/WhatsApp Video 2026-05-12 at 10.31.47 AM.mp4",
    badge: "Sale",
    sizes: ["40", "41", "42", "43", "44", "45"],
    colors: ["#2d2d2d", "#8b4513", "#000000"]
  },
  {
    id: "shirt-1",
    name: "Signature Graphic Tee",
    description: "Premium 280GSM heavyweight cotton graphic tee with drop shoulder silhouette and screenprinted minimal luxury typography.",
    price: 45000,
    category: "Shirts",
    image: "/images/WhatsApp Image 2026-05-12 at 10.31.42 AM.jpeg",
    badge: "Limited",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["#000000", "#ffffff"]
  },
  {
    id: "shirt-2",
    name: "Phantom Oversized Hoodie",
    description: "Thick double-layered luxury hoodie featuring distressed ribbing, metallic hardware details, and high-density branding.",
    price: 85000,
    category: "Shirts",
    image: "/images/WhatsApp Image 2026-05-12 at 11.02.55 AM.jpeg",
    video: "/images/WhatsApp Video 2026-05-12 at 11.02.54 AM.mp4",
    badge: "New Drop",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["#000000", "#333333"]
  },
  {
    id: "shirt-3",
    name: "Editorial Campaign Tee",
    description: "Signature campaign piece featured in the brand's main editorial shoot. Oversized fit, heavyweight cotton with premium luxury screenprint.",
    price: 95000,
    category: "Shirts",
    image: "/images/new.jpg.jpeg",
    video: "/images/WhatsApp Video 2026-05-12 at 3.01.02 PM.mp4",
    badge: "Campaign",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000000", "#ffffff"]
  },
  {
    id: "hat-1",
    name: "Monogram Bucket Hat",
    description: "A vintage-inspired streetwear bucket hat in technical nylon canvas with all-over woven monogram detailing.",
    price: 30000,
    category: "Hats",
    image: "/images/WhatsApp Image 2026-05-12 at 11.31.31 AM (1).jpeg",
    video: "/images/WhatsApp Video 2026-05-12 at 3.00.17 PM.mp4",
    sizes: ["One Size"],
    colors: ["#000000", "#d4af37"]
  },
  {
    id: "hat-2",
    name: "Signature Strapback Cap",
    description: "Adjustable 6-panel strapback cap made from premium twill cotton, embroidered with the signature logo in gold thread.",
    price: 25000,
    category: "Hats",
    image: "/images/WhatsApp Image 2026-05-12 at 11.31.33 AM (2).jpeg",
    badge: "Best Seller",
    sizes: ["One Size"],
    colors: ["#000000", "#ffffff", "#0c2340"]
  },
  {
    id: "acc-1",
    name: "Gold-Trim Premium Socks",
    description: "Woven organic cotton socks featuring double-cushioning and signature gold-lurex stripe detailing.",
    price: 15000,
    category: "Accessories",
    image: "/images/WhatsApp Image 2026-05-12 at 11.31.33 AM (1).jpeg",
    sizes: ["One Size"],
    colors: ["#ffffff", "#000000"]
  }
];

export const categories = ['All', 'Shoes', 'Shirts', 'Hats', 'Accessories'] as const;
