import type { NavGroup, NavLink } from "@/types";

/**
 * Single source of truth for brand-level content.
 * Anything a client would routinely change (phone, WhatsApp, address, socials)
 * is read from env first so it can be configured without touching code —
 * see .env.local.example for every key.
 */

const env = (key: string, fallback: string) =>
  (process.env[key] && process.env[key]!.trim()) || fallback;

export const siteConfig = {
  name: "Jolchap",
  legalName: "Jolchap Lifestyle",
  tagline: "Make It Yours",
  shortDescription:
    "Custom seals & stamps, personalised apparel, mugs, bags and gifts — designed with you and made to order in Dhaka.",
  description:
    "Jolchap is a Dhaka-based custom print & personalisation studio. From rubber stamps and wax seals to printed t-shirts, photo mugs, tote bags and gifts — we turn your idea into something you can hold. Free design preview, nationwide delivery.",
  url: env("NEXT_PUBLIC_SITE_URL", "https://jolchap.com.bd"),
  established: 2019,
  ogImage: "/images/og/jolchap-og.webp",

  contact: {
    phone: env("NEXT_PUBLIC_CONTACT_PHONE", "+880 1700-000000"),
    email: env("NEXT_PUBLIC_CONTACT_EMAIL", "hello@jolchap.com.bd"),
    whatsapp: env("NEXT_PUBLIC_WHATSAPP_NUMBER", "+880 1700-000000"),
    whatsappMessage:
      "Hi Jolchap 👋 — I'd like to customise a product. Can you help me get started?",
    address: {
      line1: "Shop 12, Level 4, Bashundhara City",
      city: "Dhaka",
      region: "Dhaka",
      postcode: "1215",
      country: "Bangladesh",
    },
    hours: "Sat–Thu · 10:00–20:00",
  },

  socials: {
    instagram: env("NEXT_PUBLIC_SOCIAL_INSTAGRAM", "https://instagram.com/"),
    facebook: env("NEXT_PUBLIC_SOCIAL_FACEBOOK", "https://www.facebook.com/jolchaplifestyle"),
    youtube: env("NEXT_PUBLIC_SOCIAL_YOUTUBE", "https://youtube.com/"),
    tiktok: env("NEXT_PUBLIC_SOCIAL_TIKTOK", "https://tiktok.com/"),
    x: env("NEXT_PUBLIC_SOCIAL_X", "https://x.com/"),
  },

  /** Trust signals surfaced under the hero and at checkout. */
  trust: [
    { label: "Free design preview before you pay", icon: "PencilRuler" },
    { label: "Fast delivery across Bangladesh", icon: "Truck" },
    { label: "Quality-checked, satisfaction guaranteed", icon: "BadgeCheck" },
    { label: "Trusted by 8,000+ happy customers", icon: "Gift" },
  ],
} as const;

/** Primary mega-menu (modelled on a full custom-print catalogue). */
export const mainNav: NavGroup[] = [
  {
    label: "Seals & Stamps",
    href: "/category/seals-stamps",
    featured: {
      title: "Custom Round Rubber Stamp",
      href: "/product/custom-round-rubber-stamp",
      image: "/images/products/custom-round-rubber-stamp-1.webp",
      copy: "Your logo or text, laser-cut for a crisp, lasting impression.",
    },
    columns: [
      {
        heading: "Stamps",
        links: [
          { label: "Rubber Stamps", href: "/category/seals-stamps?type=rubber" },
          { label: "Self-Inking Stamps", href: "/category/seals-stamps?type=self-inking" },
          { label: "Pre-Inked Stamps", href: "/category/seals-stamps?type=pre-inked" },
          { label: "Date & Address Stamps", href: "/category/seals-stamps?type=date" },
        ],
      },
      {
        heading: "Seals",
        links: [
          { label: "Wax Seal Kits", href: "/category/seals-stamps?type=wax" },
          { label: "Monogram Brass Seals", href: "/category/seals-stamps?type=monogram" },
          { label: "Company Seals", href: "/category/seals-stamps?type=company" },
        ],
      },
    ],
  },
  {
    label: "Apparel",
    href: "/category/apparel",
    featured: {
      title: "Couple Matching T-Shirts",
      href: "/product/couple-matching-tshirts",
      image: "/images/products/couple-matching-tshirts-1.webp",
      copy: "Your design, your colours — made to order in soft cotton.",
    },
    columns: [
      {
        heading: "Tops",
        links: [
          { label: "Custom T-Shirts", href: "/category/apparel?type=tshirt" },
          { label: "Couple Tees", href: "/category/apparel?type=couple" },
          { label: "Family Combo", href: "/category/apparel?type=family" },
          { label: "Printed Panjabi", href: "/category/apparel?type=panjabi" },
        ],
      },
      {
        heading: "Outerwear",
        links: [
          { label: "Custom Hoodies", href: "/category/apparel?type=hoodie" },
          { label: "Team Jerseys", href: "/category/apparel?type=jersey" },
        ],
      },
    ],
  },
  {
    label: "Mugs & Bottles",
    href: "/category/drinkware",
    columns: [
      {
        heading: "Drinkware",
        links: [
          { label: "Photo Mugs", href: "/category/drinkware?type=mug" },
          { label: "Magic Mugs", href: "/category/drinkware?type=magic" },
          { label: "Steel Bottles", href: "/category/drinkware?type=bottle" },
          { label: "Tumblers", href: "/category/drinkware?type=tumbler" },
        ],
      },
    ],
  },
  {
    label: "Bags",
    href: "/category/bags",
  },
  {
    label: "Gifts",
    href: "/category/gifts",
    columns: [
      {
        heading: "Personalised Gifts",
        links: [
          { label: "Photo Frames", href: "/category/gifts?type=frame" },
          { label: "Engraved Keychains", href: "/category/gifts?type=keychain" },
          { label: "Name Plates", href: "/category/gifts?type=nameplate" },
          { label: "Gift Hampers", href: "/category/gifts?type=hamper" },
        ],
      },
    ],
  },
  {
    label: "Stationery",
    href: "/category/stationery",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "Offers",
    href: "/shop?sale=true",
  },
];

/** Footer link architecture. */
export const footerNav: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Shop",
    links: [
      { label: "Seals & Stamps", href: "/category/seals-stamps" },
      { label: "Custom Apparel", href: "/category/apparel" },
      { label: "Mugs & Bottles", href: "/category/drinkware" },
      { label: "Bags", href: "/category/bags" },
      { label: "Personalised Gifts", href: "/category/gifts" },
      { label: "Business & Stationery", href: "/category/stationery" },
      { label: "New Arrivals", href: "/shop?sort=new" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "How to Order", href: "/faq" },
      { label: "Delivery & Shipping", href: "/shipping" },
      { label: "Returns & Refunds", href: "/returns" },
      { label: "Artwork & File Guide", href: "/size-guide" },
      { label: "Track Your Order", href: "/contact#track" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "The Jolchap Journal", href: "/blog" },
      { label: "Corporate & Bulk Orders", href: "/contact#wholesale" },
      { label: "Become a Reseller", href: "/contact#affiliate" },
      { label: "Reviews", href: "/about#reviews" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Shipping Policy", href: "/shipping" },
      { label: "Refund Policy", href: "/returns" },
    ],
  },
];

export type SiteConfig = typeof siteConfig;
