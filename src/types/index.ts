/* ──────────────────────────────────────────────────────────────────────────
   Shared domain types for the Jolchap storefront.
   These mirror the Supabase schema (see /supabase/schema.sql) so the same
   shapes flow through both the database and the local fallback content.
   ────────────────────────────────────────────────────────────────────────── */

export interface Category {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  /** lucide icon name, resolved in the UI */
  icon: string;
  image: string;
  /** display order */
  sort: number;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductVariantColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  categorySlug: string;
  categoryName: string;
  price: number;
  compareAtPrice: number | null;
  currency: string;
  rating: number;
  reviewCount: number;
  badge: string | null;
  shortDescription: string;
  description: string; // sanitised HTML
  features: string[];
  specs: ProductSpec[];
  images: string[];
  colors: ProductVariantColor[];
  sizes: string[];
  inStock: boolean;
  stockCount: number;
  /** When true this product ships free, ignoring the delivery-zone charge. */
  freeDelivery?: boolean;
  /** Optional per-product promo. Empty code = no promo. */
  promoCode?: string;
  promoDiscount?: number;
  promoType?: "flat" | "percent";
  /** ISO date (YYYY-MM-DD); empty = never expires. */
  promoExpiry?: string;
  isFeatured: boolean;
  isNew: boolean;
  isBestseller: boolean;
  tags: string[];
}

export interface Author {
  name: string;
  role: string;
  avatar: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // sanitised HTML
  coverImage: string;
  category: string;
  tags: string[];
  author: Author;
  readingTime: number;
  publishedAt: string; // ISO date
  featured: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  rating: number;
  quote: string;
}

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  currency: string;
  size: string | null;
  color: string | null;
  quantity: number;
  freeDelivery: boolean;
  promoCode: string;
  promoDiscount: number;
  promoType: "flat" | "percent";
  promoExpiry: string;
}

export interface NavLink {
  label: string;
  href: string;
  description?: string;
  icon?: string;
}

export interface NavGroup {
  label: string;
  href: string;
  featured?: { title: string; href: string; image: string; copy: string };
  columns?: { heading: string; links: NavLink[] }[];
}
